import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

const CLIENT_ID = Deno.env.get("QUICKBOOKS_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("QUICKBOOKS_CLIENT_SECRET");
const TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

async function refreshAccessToken(refreshToken) {
    const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const res = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Authorization": `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        }),
    });
    return res.json();
}

async function createProjectInQuickBooks(accessToken, realmId, booking) {
    // Use sandbox URL for development/testing; change to production when ready
    const baseUrl = `https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}`;

    const qbHeaders = {
        "Authorization": `Bearer ${accessToken}`,
        "Accept": "application/json",
        "Accept-Encoding": "identity",
    };

    // Verify company info first (diagnostic)
    const companyInfoRes = await fetch(`${baseUrl}/companyinfo/${realmId}?minorversion=65`, { headers: qbHeaders });
    const companyInfo = await companyInfoRes.json();
    console.log("QB companyinfo response:", JSON.stringify(companyInfo));
    if (companyInfo.Fault) {
        throw new Error(`QuickBooks company access failed (realmId=${realmId}): ${JSON.stringify(companyInfo.Fault)}`);
    }

    // Always create a new customer (skip query to avoid SystemFault on sandbox)
    const customerBody = { DisplayName: `${booking.customer_name} - ${Date.now()}` };
    if (booking.customer_phone) customerBody.PrimaryPhone = { FreeFormNumber: booking.customer_phone };
    if (booking.customer_email) customerBody.PrimaryEmailAddr = { Address: booking.customer_email };
    if (booking.customer_address) customerBody.BillAddr = { Line1: booking.customer_address };

    const createCustomerRes = await fetch(`${baseUrl}/customer?minorversion=65`, {
        method: "POST",
        headers: { ...qbHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(customerBody),
    });
    const newCustomer = await createCustomerRes.json();
    console.log("QB create customer response:", JSON.stringify(newCustomer));
    const customerId = newCustomer.Customer?.Id;

    if (!customerId) {
        throw new Error(`Failed to create QuickBooks customer: ${JSON.stringify(newCustomer)}`);
    }

    // Create a sub-customer (project) under the customer
    const serviceLabel = booking.service_type?.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const projectName = `${booking.customer_name} - ${serviceLabel} (${booking.booking_number || "KOM"})`;

    const createProject = await fetch(`${baseUrl}/customer?minorversion=65`, {
        method: "POST",
        headers: { ...qbHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
            DisplayName: projectName,
            ParentRef: { value: customerId },
            Job: true,
            Notes: `Service: ${serviceLabel}\nAddress: ${booking.customer_address || "N/A"}\nDate: ${booking.preferred_date || "TBD"}\nTime: ${booking.preferred_time || "TBD"}\nHeater Type: ${booking.heater_type || "N/A"}\nBooking Fee: $${booking.booking_fee || 79}`,
        }),
    });

    const projectData = await createProject.json();

    if (projectData.Fault) {
        throw new Error(`QuickBooks error: ${JSON.stringify(projectData.Fault)}`);
    }

    return projectData.Customer;
}

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (user?.role !== 'admin') {
            return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { booking_id } = await req.json();

        if (!booking_id) {
            return Response.json({ error: 'booking_id is required' }, { status: 400 });
        }

        // Get the booking
        const bookings = await base44.asServiceRole.entities.Booking.filter({ id: booking_id });
        const booking = bookings?.[0];

        if (!booking) {
            return Response.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Get QB credentials from secrets
        let accessToken = Deno.env.get("QUICKBOOKS_ACCESS_TOKEN");
        const refreshToken = Deno.env.get("QUICKBOOKS_REFRESH_TOKEN");
        const realmId = Deno.env.get("QUICKBOOKS_REALM_ID");
        console.log("Using realmId:", realmId);

        if (!accessToken || !refreshToken || !realmId) {
            return Response.json({
                error: "QuickBooks not fully connected. Please complete OAuth setup first.",
                instruction: "Go to Dashboard > Code > Functions > quickbooksAuth and call it with action=getAuthUrl to start the OAuth flow."
            }, { status: 400 });
        }

        // Always refresh token first to ensure it's valid
        const newTokens = await refreshAccessToken(refreshToken);
        console.log("Token refresh response:", JSON.stringify(newTokens));
        if (newTokens.access_token) {
            accessToken = newTokens.access_token;
        }

        const project = await createProjectInQuickBooks(accessToken, realmId, booking);

        // Update booking with QB project ID
        await base44.asServiceRole.entities.Booking.update(booking_id, {
            technician_notes: (booking.technician_notes || "") + `\nQB Project ID: ${project.Id}`
        });

        return Response.json({
            success: true,
            project_id: project.Id,
            project_name: project.DisplayName,
        });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});