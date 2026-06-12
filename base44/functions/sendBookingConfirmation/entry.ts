import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);

        // Admin-only: only admin can trigger booking confirmations
        const user = await base44.auth.me();
        if (!user || user.role !== 'admin') {
            return Response.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { booking_id } = await req.json();

        if (!booking_id) {
            return Response.json({ error: 'booking_id is required' }, { status: 400 });
        }

        let booking;
        try {
            booking = await base44.asServiceRole.entities.Booking.get(booking_id);
        } catch (_) {
            return Response.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (!booking) {
            return Response.json({ error: 'Booking not found' }, { status: 404 });
        }

        if (!booking.customer_email) {
            return Response.json({ success: false, error: "No customer email on file" });
        }

        // Build readable service label — never expose [REQUEST CART] JSON or truncate at "("
        const rawProduct = booking.selected_product || '';
        const serviceLabel = rawProduct
            ? rawProduct.split(';').map(s => s.trim()).join('<br>')
            : (booking.service_type || 'chimney service').replace(/_/g, ' ');

        const emailBody = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#15803d;">Your Appointment is Confirmed! ✅</h2>
  <p>Hi ${booking.customer_name},</p>
  <p>Great news — your chimney care appointment with <strong>KOM Chimney Care</strong> has been confirmed. Our technician will arrive during your selected time window.</p>
  <br>
  <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;padding:16px;">
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Booking Ref</td><td style="padding:8px 12px;font-weight:700;color:#111827;">${booking.booking_number}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;vertical-align:top;">Service / Items</td><td style="padding:8px 12px;">${serviceLabel}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Date</td><td style="padding:8px 12px;">${booking.preferred_date}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Time Window</td><td style="padding:8px 12px;">${booking.preferred_time}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Address</td><td style="padding:8px 12px;">${booking.customer_address}</td></tr>
  </table>
  <br>
  <p>If you need to make any changes or have questions, please call us:</p>
  <p style="font-size:18px;font-weight:700;color:#15803d;">📞 (734) 666-2338</p>
  <br>
  <p style="color:#6b7280;font-size:13px;">Thank you for choosing KOM Chimney Care!</p>
</div>`;

        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: "KOM Chimney Care",
            to: booking.customer_email,
            subject: `Appointment Confirmed – ${booking.booking_number}`,
            body: emailBody,
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error("sendBookingConfirmation error:", error.message);
        return Response.json({ error: 'An error occurred' }, { status: 500 });
    }
});