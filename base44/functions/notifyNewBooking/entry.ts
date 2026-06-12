import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// Authentication strategy:
// - Automation calls: must pass the NOTIFY_NEW_BOOKING_SECRET in the request body
//   as { secret: "...", event: {...}, data: {...} }  (via function_args in the automation config)
// - Admin manual calls (dashboard testing): must be authenticated as admin user.
//   Pass { admin_test: true, booking_id: "..." } — no secret required for admin.
// - All other callers: rejected.

const NOTIFY_SECRET = Deno.env.get("NOTIFY_NEW_BOOKING_SECRET");

// Hardcoded admin recipient list — never pulled from request payload
const ADMIN_EMAILS = [
    "aran.segal@gmail.com",
    "Kom.construction.llc@gmail.com",
];

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const payload = await req.json();

        const providedSecret = payload.secret || payload.args?.secret;
        const isAdminTest = payload.admin_test === true;

        if (isAdminTest) {
            // Admin manual test path — require admin auth
            const user = await base44.auth.me();
            if (!user || user.role !== 'admin') {
                return Response.json({ error: 'Forbidden' }, { status: 403 });
            }
        } else {
            // Automation path — require shared secret
            if (!NOTIFY_SECRET) {
                console.error("notifyNewBooking: NOTIFY_NEW_BOOKING_SECRET is not configured");
                return Response.json({ error: 'Server misconfiguration' }, { status: 500 });
            }
            if (!providedSecret || providedSecret !== NOTIFY_SECRET) {
                return Response.json({ error: 'Forbidden' }, { status: 403 });
            }
        }

        // Resolve booking data
        let booking = payload.data;
        const entityId = payload.event?.entity_id || payload.booking_id;

        if (!booking && entityId) {
            try {
                booking = await base44.asServiceRole.entities.Booking.get(entityId);
            } catch (_) {
                return Response.json({ error: 'Booking not found' }, { status: 404 });
            }
        }

        if (!booking) {
            return Response.json({ error: 'No booking data' }, { status: 400 });
        }

        if (!booking.customer_name || !booking.booking_number) {
            return Response.json({ error: 'Invalid booking data' }, { status: 400 });
        }

        const serviceLabel = booking.selected_product || 'General Chimney Diagnostic';

        // Strip [REQUEST CART] JSON blob from notes — never show raw JSON in emails
        const cleanNotes = (booking.notes || '')
            .replace(/\n*\[REQUEST CART\]\n[\s\S]*/m, '')
            .trim();

        const emailSubject = `New Booking Request - ${booking.customer_name}`;
        const emailBody = `<p>A new booking request has been submitted on KOM Chimney Care.</p>
<br>
<p><strong>Customer:</strong> ${booking.customer_name}</p>
<p><strong>Phone:</strong> ${booking.customer_phone}</p>
<p><strong>Email:</strong> ${booking.customer_email || 'N/A'}</p>
<p><strong>Address:</strong> ${booking.customer_address}</p>
<p><strong>Service / Items:</strong> ${serviceLabel || 'General Diagnostics'}</p>
<p><strong>Preferred Date:</strong> ${booking.preferred_date}</p>
<p><strong>Preferred Time:</strong> ${booking.preferred_time}</p>
<p><strong>Notes:</strong> ${cleanNotes || 'None'}</p>
<p><strong>Booking Ref:</strong> ${booking.booking_number}</p>
<br>
<p>Log in to the <a href="https://kom-heat-fix.base44.app/AdminDashboard">Admin Dashboard</a> to manage this booking.</p>
<br>
<p style="color:#999;font-size:12px;">If you'd like to unsubscribe and stop receiving these emails <a href="mailto:Kom.construction.llc@gmail.com?subject=Unsubscribe">click here</a>.</p>`;

        await Promise.all(
            ADMIN_EMAILS.map((to) =>
                base44.asServiceRole.integrations.Core.SendEmail({
                    to,
                    subject: emailSubject,
                    body: emailBody,
                })
            )
        );

        return Response.json({ success: true });
    } catch (error) {
        console.error("notifyNewBooking error:", error.message);
        return Response.json({ error: 'An error occurred' }, { status: 500 });
    }
});