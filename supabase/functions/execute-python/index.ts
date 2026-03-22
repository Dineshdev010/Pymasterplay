import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const rateLimitCache = new Map<string, { count: number, resetAt: number }>();

serve(async (req) => {
  // Simple Memory-based DDOS Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  let record = rateLimitCache.get(ip);
  if (!record || now > record.resetAt) {
    record = { count: 0, resetAt: now + 60000 };
  }
  if (record.count >= 20) {
    return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait 1 minute." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 429,
    });
  }
  record.count++;
  rateLimitCache.set(ip, record);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    if (!code) {
      throw new Error("No Python code provided");
    }

    // Proxy the request securely to piston.
    // This hides your Piston backend from the user's browser, preventing abuse and allowing you to insert Rate Limiting.
    const pistonRes = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: "python",
        version: "3.10.0",
        files: [{ name: "main.py", content: code }],
      }),
    });

    const data = await pistonRes.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
