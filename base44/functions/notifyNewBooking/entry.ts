import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const payload = await req.json();
        let booking = payload.data;

        // If payload was too large, fetch the booking directly
        if (!booking && payload.event?.entity_id) {
            booking = await base44.asServiceRole.entities.Booking.get(payload.event.entity_id);
        }

        if (!booking) {
            return Response.json({ error: "No booking data found" }, { status: 400 });
        }

        const emailSubject = `New Booking Request - ${booking.customer_name}`;
        const emailBody = `<p>A new booking request has been submitted on KOM Chimney Care.</p>
<br>
<p><strong>Customer:</strong> ${booking.customer_name}</p>
<p><strong>Phone:</strong> ${booking.customer_phone}</p>
<p><strong>Email:</strong> ${booking.customer_email || 'N/A'}</p>
<p><strong>Address:</strong> ${booking.customer_address}</p>
<p><strong>Service:</strong> ${booking.service_type}</p>
<p><strong>Heater Type:</strong> ${booking.heater_type || 'N/A'}</p>
<p><strong>Preferred Date:</strong> ${booking.preferred_date}</p>
<p><strong>Preferred Time:</strong> ${booking.preferred_time}</p>
<p><strong>Notes:</strong> ${booking.notes || 'None'}</p>
<p><strong>Booking Ref:</strong> ${booking.booking_number}</p>
<br>
<p>Log in to the <a href="https://kom-heat-fix.base44.app/AdminDashboard">Admin Dashboard</a> to manage this booking.</p>
<br>
<p style="color:#999;font-size:12px;">If you'd like to unsubscribe and stop receiving these emails <a href="mailto:Kom.construction.llc@gmail.com?subject=Unsubscribe">click here</a>.</p>`;

        await Promise.all([
            base44.asServiceRole.integrations.Core.SendEmail({
                to: "aran.segal@gmail.com",
                subject: emailSubject,
                body: emailBody,
            }),
            base44.asServiceRole.integrations.Core.SendEmail({
                to: "Kom.construction.llc@gmail.com",
                subject: emailSubject,
                body: emailBody,
            }),
        ]);

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});