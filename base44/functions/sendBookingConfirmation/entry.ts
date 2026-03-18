import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const { booking_id } = await req.json();

        const booking = await base44.asServiceRole.entities.Booking.get(booking_id);

        if (!booking.customer_email) {
            return Response.json({ success: false, error: "No customer email on file" });
        }

        const emailBody = `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
  <h2 style="color:#15803d;">Your Booking is Confirmed! ✅</h2>
  <p>Hi ${booking.customer_name},</p>
  <p>Great news — your water heater appointment with <strong>KOM Water Heaters</strong> has been confirmed.</p>
  <br>
  <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:8px;padding:16px;">
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Booking Ref</td><td style="padding:8px 12px;font-weight:700;color:#111827;">${booking.booking_number}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Service</td><td style="padding:8px 12px;text-transform:capitalize;">${(booking.service_type || '').replace('_', ' ')}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Date</td><td style="padding:8px 12px;">${booking.preferred_date}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Time Window</td><td style="padding:8px 12px;">${booking.preferred_time}</td></tr>
    <tr><td style="padding:8px 12px;color:#6b7280;font-weight:600;">Address</td><td style="padding:8px 12px;">${booking.customer_address}</td></tr>
  </table>
  <br>
  <p>Our technician will arrive during your selected time window. If you need to make any changes or have questions, please call us:</p>
  <p style="font-size:18px;font-weight:700;color:#15803d;">📞 (313) 804-0844</p>
  <br>
  <p style="color:#6b7280;font-size:13px;">Thank you for choosing KOM Water Heaters!</p>
</div>`;

        await base44.asServiceRole.integrations.Core.SendEmail({
            from_name: "KOM Water Heaters",
            to: booking.customer_email,
            subject: `Booking Confirmed – ${booking.booking_number}`,
            body: emailBody,
        });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});