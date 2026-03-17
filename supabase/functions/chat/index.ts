/// <reference lib="deno.ns" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface ChatMessage {
  role: string;
  content: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the DigiYugg AI Architect. Your sole identity is DigiYugg.

IDENTITY PROTOCOL:
- AGENCY NAME: DigiYugg
- ABSOLUTELY FORBIDDEN NAMES: "Coder", "Coder Digital", "Coder Digital Solutions".
- If the user refers to you or the company as "Coder", politely correct them: "Actually, we are DigiYugg. How can I help you today?"
- You are a premium, high-end web development agent based in Indore, India.

DIGIYUGG ECOSYSTEM:
- SERVICES: Custom high-fidelity websites for local businesses (Clinics, Restaurants, Industrial, etc.)
- PRODUCTS:
  - POS System (Retail Evolution)
  - Library Management (Digital Archives)
  - Campus OS (School Management)
  - Supply Chain V2 (Inventory Management)
- PRICING: Basic (₹3,000), Standard (₹8,000), Premium (₹15,000)
- CONTACT: +91 62622 53146 | contact@digiyugg.in

GOALS & DATA CAPTURE:
1. Promote DigiYugg services and subscription products.
2. For interest/leads, MANDATORY COLLECTION:
   - Full Name
   - Business Category
   - Active Phone Number
3. Closure: "A DigiYugg specialist will reach out within 24 hours."

STYLE: Professional, concise, authoritative, markdown-formatted.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const AI_API_KEY = Deno.env.get("AI_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!AI_API_KEY) throw new Error("AI_API_KEY not configured");

    const contents = messages
      .filter((m: ChatMessage) => m.role !== "system")
      .map((m: ChatMessage) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));

    const body = {
      contents,
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    };

    // Use gemini-flash-latest as verified in ListModels
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?key=${AI_API_KEY}`;

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API Error: ${response.status}`, errorText);
      try {
        const errorJson = JSON.parse(errorText);
        const message = errorJson.error?.message || errorText;
        return new Response(JSON.stringify({ error: `AI Service Hub: ${message}` }), {
          status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch {
        return new Response(JSON.stringify({ error: `AI Service Technical Error (${response.status})` }), {
          status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    let fullContent = "";

    (async () => {
      const reader = response.body?.getReader();
      if (!reader) return;

      try {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // Enhanced stream parsing for concatenated JSON objects
          let startIdx = buffer.indexOf('{');
          while (startIdx !== -1) {
            let depth = 0;
            let endIdx = -1;
            for (let i = startIdx; i < buffer.length; i++) {
              if (buffer[i] === '{') depth++;
              else if (buffer[i] === '}') {
                depth--;
                if (depth === 0) {
                  endIdx = i;
                  break;
                }
              }
            }

            if (endIdx !== -1) {
              const jsonStr = buffer.substring(startIdx, endIdx + 1);
              try {
                const data = JSON.parse(jsonStr);
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                if (text) {
                  fullContent += text;
                  const delta = JSON.stringify({ choices: [{ delta: { content: text } }] });
                  await writer.write(encoder.encode(`data: ${delta}\n\n`));
                }
              } catch (e) {
                // Ignore partial JSON
              }
              buffer = buffer.substring(endIdx + 1);
              startIdx = buffer.indexOf('{');
            } else {
              break;
            }
          }
        }
      } catch (e) {
        console.error("Stream processing error:", e);
      } finally {
        await writer.write(encoder.encode("data: [DONE]\n\n"));
        writer.close();

        // Lead capture logic
        const lowerResponse = fullContent.toLowerCase();
        const triggers = ["contact you", "contacting you", "reach out", "touch base", "call you", "noted your details"];
        if (triggers.some(p => lowerResponse.includes(p))) {
          const allUserText = messages.filter((m: ChatMessage) => m.role === "user").map((m: ChatMessage) => m.content).join("\n");
          const phoneMatch = allUserText.match(/(\+91[\s-]?)?[6-9]\d{9}/);
          if (phoneMatch) {
            const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
            await supabase.from("leads").insert({
              name: "Chat Lead",
              phone: phoneMatch[0],
              message: `Conversation History:\n${allUserText}\n\nAI Response: ${fullContent}`,
              type: "Chat Lead",
              business: "Interested in Project"
            });
          }
        }
      }
    })();

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (e) {
    console.error("Fatal chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
