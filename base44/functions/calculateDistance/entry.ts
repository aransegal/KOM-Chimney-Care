import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const ORIGIN = "15533 Woodward Wilson St, Detroit, MI 48238, United States";
const DISTANCE_THRESHOLD_MILES = 25;
const DISTANCE_FEE = 50;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const address = (body.address || '').trim();
    if (!address) return Response.json({ error: 'Address is required' }, { status: 400 });

    const apiKey = Deno.env.get("GOOGLE_MAPS_API_KEY");
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const originEncoded = encodeURIComponent(ORIGIN);
    const destEncoded = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originEncoded}&destinations=${destEncoded}&units=imperial&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return Response.json({ error: `Distance Matrix API error: ${data.status}` }, { status: 502 });
    }

    const element = data.rows?.[0]?.elements?.[0];
    if (!element || element.status !== 'OK') {
      return Response.json({ error: `Could not calculate distance: ${element?.status || 'unknown'}` }, { status: 502 });
    }

    // distance.value is in meters; convert to miles
    const meters = element.distance.value;
    const miles = Math.round((meters / 1609.344) * 10) / 10;
    const overThreshold = miles > DISTANCE_THRESHOLD_MILES;
    const fee = overThreshold ? DISTANCE_FEE : 0;

    return Response.json({
      miles,
      over_threshold: overThreshold,
      distance_fee: fee,
      threshold: DISTANCE_THRESHOLD_MILES,
      duration_text: element.duration?.text || null,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});