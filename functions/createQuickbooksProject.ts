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
    const baseUrl = `https://quickbooks.api.intuit.com/v3/company/${realmId}`;

    // First, create or find the customer
    const customerQuery = await fetch(
        `${baseUrl}/query?query=select * from Customer where DisplayName = '${booking.customer_name.replace(/'/g, "\\'")}'&minorversion=65`,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "application/json",
            },
        }
    );
    const customerData = await customerQuery.json();
    let customerId;

    if (customerData.QueryResponse?.Customer?.length > 0) {
        customerId = customerData.QueryResponse.Customer[0].Id;
    } else {
        // Create a new customer
        const createCustomer = await fetch(`${baseUrl}/customer?minorversion=65`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                DisplayName: booking.customer_name,
                PrimaryPhone: booking.customer_phone ? { FreeFormNumber: booking.customer_phone } : undefined,
                PrimaryEmailAddr: booking.customer_email ? { Address: booking.customer_email } : undefined,
                BillAddr: booking.customer_address ? {
                    Line1: booking.customer_address,
                } : undefined,
            }),
        });
        const newCustomer = await createCustomer.json();
        customerId = newCustomer.Customer?.Id;
    }

    if (!customerId) {
        throw new Error("Failed to create or find QuickBooks customer");
    }

    // Create a sub-customer (project) under the customer
    const serviceLabel = booking.service_type?.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const projectName = `${booking.customer_name} - ${serviceLabel} (${booking.booking_number || "KOM"})`;

    const createProject = await fetch(`${baseUrl}/customer?minorversion=65`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            DisplayName: projectName,
            ParentRef: { value: customerId },
            IsProject: true,
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
        const booking = await base44.asServiceRole.entities.Booking.get(booking_id);

        if (!booking) {
            return Response.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Get QB credentials from secrets
        let accessToken = Deno.env.get("QUICKBOOKS_ACCESS_TOKEN");
        const refreshToken = Deno.env.get("QUICKBOOKS_REFRESH_TOKEN");
        const realmId = Deno.env.get("QUICKBOOKS_REALM_ID");

        if (!accessToken || !refreshToken || !realmId) {
            return Response.json({
                error: "QuickBooks not fully connected. Please complete OAuth setup first.",
                instruction: "Go to Dashboard > Code > Functions > quickbooksAuth and call it with action=getAuthUrl to start the OAuth flow."
            }, { status: 400 });
        }

        // Try with current token, refresh if needed
        let project;
        try {
            project = await createProjectInQuickBooks(accessToken, realmId, booking);
        } catch (e) {
            // Try refreshing token
            const newTokens = await refreshAccessToken(refreshToken);
            if (newTokens.access_token) {
                accessToken = newTokens.access_token;
                project = await createProjectInQuickBooks(accessToken, realmId, booking);
            } else {
                throw new Error("Failed to refresh QuickBooks token. Please re-authorize.");
            }
        }

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