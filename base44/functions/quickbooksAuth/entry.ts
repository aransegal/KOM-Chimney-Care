import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

// QuickBooks OAuth 2.0 flow
// Step 1 (getAuthUrl): Admin-only — generates the Intuit authorization URL.
// Step 2 (callback): Intuit redirects here with code + realmId. Auth is not
//   available during the callback because Intuit calls this URL as an external
//   redirect, not as a logged-in user. We validate the state parameter as a
//   lightweight integrity check. Keep QUICKBOOKS_OAUTH_STATE as a secret.

const CLIENT_ID = Deno.env.get("QUICKBOOKS_CLIENT_ID");
const CLIENT_SECRET = Deno.env.get("QUICKBOOKS_CLIENT_SECRET");
const REDIRECT_URI = "https://app.base44.com/api/functions/quickbooksAuth";
const SCOPES = "com.intuit.quickbooks.accounting";
const AUTH_URL = "https://appcenter.intuit.com/connect/oauth2";
const TOKEN_URL = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer";

// A shared secret stored in app secrets to validate the OAuth callback state.
// If not set, state validation is skipped with a warning.
const OAUTH_STATE_SECRET = Deno.env.get("QUICKBOOKS_OAUTH_STATE") || "quickbooks_auth";

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const url = new URL(req.url);
        let action = url.searchParams.get("action");
        let code = url.searchParams.get("code");
        let realmId = url.searchParams.get("realmId");
        let stateParam = url.searchParams.get("state");

        // Also check request body (for dashboard testing via JSON payload)
        if (req.method === "POST" && req.headers.get("content-type")?.includes("application/json")) {
            const body = await req.json();
            if (body.code) code = body.code;
            if (body.realmId) realmId = body.realmId;
            if (body.action) action = body.action;
            if (body.state) stateParam = body.state;
        }

        // Step 1: Generate auth URL — admin only
        if (action === "getAuthUrl" || (!code && !realmId)) {
            const user = await base44.auth.me();
            if (!user || user.role !== 'admin') {
                return Response.json({ error: 'Forbidden' }, { status: 403 });
            }
            const authUrl = `${AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&state=${encodeURIComponent(OAUTH_STATE_SECRET)}`;
            return Response.json({ auth_url: authUrl });
        }

        // Step 2: OAuth callback — Intuit redirects here, no user session available.
        // Validate the state parameter as a lightweight integrity check.
        if (code && realmId) {
            if (stateParam !== OAUTH_STATE_SECRET) {
                console.warn("quickbooksAuth: state mismatch, possible CSRF", stateParam);
                return Response.json({ error: 'Invalid state parameter' }, { status: 400 });
            }

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
                console.error("quickbooksAuth token exchange error:", tokens.error);
                return Response.json({ error: 'Token exchange failed' }, { status: 400 });
            }

            // Return tokens for admin to save as secrets.
            // NOTE: This response is visible to whoever receives the redirect.
            // Admin must immediately save these as app secrets:
            //   QUICKBOOKS_ACCESS_TOKEN, QUICKBOOKS_REFRESH_TOKEN, QUICKBOOKS_REALM_ID
            return Response.json({
                message: "QuickBooks connected successfully! Save these tokens as app secrets immediately.",
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                realm_id: realmId,
                expires_in: tokens.expires_in,
                instruction: "Set QUICKBOOKS_ACCESS_TOKEN, QUICKBOOKS_REFRESH_TOKEN, and QUICKBOOKS_REALM_ID as secrets in app settings."
            });
        }

        return Response.json({ error: 'Invalid request' }, { status: 400 });

    } catch (error) {
        console.error("quickbooksAuth error:", error.message);
        return Response.json({ error: 'An error occurred' }, { status: 500 });
    }
});