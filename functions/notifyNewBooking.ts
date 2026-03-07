import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const payload = await req.json();
        const booking = payload.data;

        await base44.asServiceRole.integrations.Core.SendEmail({
            to: "aran.segal@gmail.com",
            subject: `New Booking Request - ${booking.customer_name}`,
            body: `A new booking request has been submitted on KOM Water Heaters.

Customer: ${booking.customer_name}
Phone: ${booking.customer_phone}
Email: ${booking.customer_email || 'N/A'}
Address: ${booking.customer_address}
Service: ${booking.service_type}
Heater Type: ${booking.heater_type || 'N/A'}
Preferred Date: ${booking.preferred_date}
Preferred Time: ${booking.preferred_time}
Notes: ${booking.notes || 'None'}
Booking Ref: ${booking.booking_number}

Log in to the admin dashboard to manage this booking: https://kom-heat-fix.base44.app/AdminDashboard

If you'd like to unsubscribe and stop receiving these emails, reply to this email with "Unsubscribe".`
        });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});