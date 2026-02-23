import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

// QuickBooks OAuth - Step 1: Get authorization URL
// Step 2: Exchange code for tokens
// Tokens are stored in environment or a simple entity

const CLIENT_ID = Deno.env.get("QUICKBOOKS_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("QUICKBOOKS_CLIENT_SECRET");
const REDIRECT_URI = "https://app.base44.com/api/functions/quickbooksAuth"; // update with your actual function URL
const SCOPES = "com.intuit.quickbooks.accounting";
const AUTH_URL = "https://appcenter.intuit.com/connect/oauth2";
const TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const url = new URL(req.url);
        const action = url.searchParams.get("action");
        const code = url.searchParams.get("code");
        const realmId = url.searchParams.get("realmId");

        // Return auth URL for admin to visit
        if (action === "getAuthUrl" || !code) {
            const authUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&state=quickbooks_auth`;
            return Response.json({ auth_url: authUrl });
        }

        // Exchange code for tokens
        if (code && realmId) {
            const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
            const tokenRes = await fetch(TOKEN_URL, {
                method: "POST",
                headers: {
                    "Authorization": `Basic ${credentials}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    code,
                    redirect_uri: REDIRECT_URI,
                }),
            });

            const tokens = await tokenRes.json();

            if (tokens.error) {
                return Response.json({ error: tokens.error, details: tokens.error_description }, { status: 400 });
            }

            // Store tokens - admin should save these as secrets or in a secure entity
            return Response.json({
                message: "QuickBooks connected successfully! Save these tokens securely.",
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                realm_id: realmId,
                expires_in: tokens.expires_in,
                instruction: "Please set QUICKBOOKS_ACCESS_TOKEN, QUICKBOOKS_REFRESH_TOKEN, and QUICKBOOKS_REALM_ID as secrets in your app settings."
            });
        }

        return Response.json({ error: "Invalid request" }, { status: 400 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});