import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// This function is called by a Base44 entity automation when a new Booking is created.
// It is NOT called directly from the frontend.
// Protection: requires either a valid entity automation payload (event.entity_id present)
// OR admin auth for manual testing.

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const payload = await req.json();

        const isAutomationPayload = payload.event?.entity_id || payload.data?.id;

        // If this doesn't look like an automation payload, require admin auth
        if (!isAutomationPayload) {
            const user = await base44.auth.me();
            if (!user || user.role !== 'admin') {
                return Response.json({ error: 'Forbidden' }, { status: 403 });
            }
        }

        let booking = payload.data;

        // If payload was too large or missing, fetch the booking directly
        if (!booking && payload.event?.entity_id) {
            try {
                booking = await base44.asServiceRole.entities.Booking.get(payload.event.entity_id);
            } catch (_) {
                return Response.json({ error: 'Booking not found' }, { status: 404 });
            }
        }

        if (!booking) {
            return Response.json({ error: 'No booking data found' }, { status: 400 });
        }

        // Validate booking has minimum required fields
        if (!booking.customer_name || !booking.booking_number) {
            return Response.json({ error: 'Invalid booking data' }, { status: 400 });
        }

        const serviceLabel = booking.selected_product
            ? booking.selected_product.split('(')[0].trim()
            : (booking.service_type || 'chimney service').replace(/_/g, ' ');

        const emailSubject = `New Booking Request - ${booking.customer_name}`;
        const emailBody = `<p>A new booking request has been submitted on KOM Chimney Care.</p>
<br>
<p><strong>Customer:</strong> ${booking.customer_name}</p>
<p><strong>Phone:</strong> ${booking.customer_phone}</p>
<p><strong>Email:</strong> ${booking.customer_email || 'N/A'}</p>
<p><strong>Address:</strong> ${booking.customer_address}</p>
<p><strong>Service:</strong> ${serviceLabel}</p>
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
        console.error("notifyNewBooking error:", error.message);
        return Response.json({ error: 'An error occurred' }, { status: 500 });
    }
});