import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface ChatMessage {
  role: string;
  content: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a friendly AI assistant for Coder Digital Solutions, a web development agency based in Indore, India.

About the company:
- We build custom websites for local businesses (restaurants, clinics, gyms, salons, etc.)
- Contact: +91 62622 53146, contact@coderdigital.in
- Pricing: Basic (₹3k), Standard (₹8k), Premium (₹15k)

Your goals:
1. Answer questions about our services and pricing.
2. If a user expresses interest in a project, you MUST collect:
   - Their Name
   - Their Business Type (e.g., Restaurant, Salon)
   - Their Phone Number
3. Once you have this info, tell them our team will contact them within 24 hours.
4. IMPORTANT: Keep your response concise. Use markdown.`;

Deno.serve(async (req) => {
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
