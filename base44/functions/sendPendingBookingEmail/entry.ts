import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Max age for a booking to be eligible for a receipt email (30 minutes in ms)
const MAX_BOOKING_AGE_MS = 30 * 60 * 1000;

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const body = await req.json();
        const { booking_id } = body;

        // Require booking_id — no arbitrary payloads accepted
        if (!booking_id || typeof booking_id !== 'string' || booking_id.trim() === '') {
            return Response.json({ error: 'Invalid request' }, { status: 400 });
        }

        // Load booking server-side — never trust client-supplied email
        let booking;
        try {
            booking = await base44.asServiceRole.entities.Booking.get(booking_id.trim());
        } catch (_) {
            // Generic — do not reveal whether the ID exists
            return Response.json({ success: false });
        }

        if (!booking) {
            return Response.json({ success: false });
        }

        // Only send for pending bookings
        if (booking.status !== 'pending') {
            return Response.json({ success: false });
        }

        // Abuse reduction: only send receipts for recently-created bookings
        if (booking.created_date) {
            const age = Date.now() - new Date(booking.created_date).getTime();
            if (age > MAX_BOOKING_AGE_MS) {
                console.warn("sendPendingBookingEmail: booking too old, skipping", booking_id);
                return Response.json({ success: false });
            }
        }

        if (!booking.customer_email) {
            return Response.json({ success: false });
        }

        const serviceLabel = booking.selected_product
            ? booking.selected_product.split('(')[0].trim()
            : (booking.service_type || 'chimney service').replace(/_/g, ' ');

        const emailBody = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#d97706;">Booking Received – We'll Be in Touch Shortly! 🕐</h2>
  <p>Hi ${booking.customer_name},</p>
  <p>Thank you for booking with <strong>KOM Chimney Care</strong>! We've received your request and a specialist will contact you within 2 hours to confirm your appointment.</p>
  <br>
  <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;padding:16px;">
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Booking Ref</td><td style="padding:8px 12px;font-weight:700;color:#111827;">${booking.booking_number}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Service</td><td style="padding:8px 12px;text-transform:capitalize;">${serviceLabel}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Preferred Date</td><td style="padding:8px 12px;">${booking.preferred_date}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Preferred Time</td><td style="padding:8px 12px;">${booking.preferred_time}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Address</td><td style="padding:8px 12px;">${booking.customer_address}</td></tr>
  </table>
  <br>
  <p>Need immediate assistance? Call us directly:</p>
  <p style="font-size:18px;font-weight:700;color:#d97706;">📞 (734) 666-2338</p>
  <br>
  <p style="color:#6b7280;font-size:13px;">Thank you for choosing KOM Chimney Care!</p>
</div>`;

        try {
            await base44.asServiceRole.integrations.Core.SendEmail({
                from_name: "KOM Chimney Care",
                to: booking.customer_email,
                subject: `Booking Received – ${booking.booking_number}`,
                body: emailBody,
            });
            return Response.json({ success: true });
        } catch (emailError) {
            // Email may fail for non-registered users — log but don't fail the booking flow
            console.warn("Email send failed:", emailError.message);
            return Response.json({ success: false });
        }
    } catch (error) {
        console.error("sendPendingBookingEmail error:", error.message);
        return Response.json({ error: 'An error occurred' }, { status: 500 });
    }
});