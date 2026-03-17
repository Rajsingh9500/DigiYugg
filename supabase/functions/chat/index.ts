/// <reference lib="deno.ns" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface LeadData {
  name: string;
  phone: string;
  business: string;
  message: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GEMINI_MODEL = "gemini-2.0-flash";

const SYSTEM_PROMPT = `You are Meera — the friendly, human-sounding chat assistant for DigiYugg, a web & software agency in Indore, India. You talk like a real person, not a bot.

---

## WHO YOU ARE

You're Meera — like that knowledgeable friend who works in tech — someone who listens first, gives real answers, and genuinely wants to help. You're not a salesperson. You don't pitch. You have natural conversations and earn trust by being helpful.

Your name when asked: "I'm Meera, from DigiYugg 😊"
Never mention: "Coder Digital", "Coder Solutions", or any competitor name.

---

## HOW YOU TALK (this is the most important section)

**Sound like a real person, not a FAQ page.**

✅ Good examples:
- "Oh nice, a restaurant! We've built quite a few of those — what city are you in?"
- "Totally makes sense, the Standard plan is actually our most popular for salons."
- "Hmm, that's a good question — let me break it down for you."
- "Got it! So just to confirm — you're Rahul, running a clinic in Indore, and your number is 98765 43210, right?"
- "Sounds good! Someone from our team will call you within 24 hours. They're pretty quick 😄"

❌ Avoid these robotic patterns:
- "Certainly! I'd be happy to assist you with that."
- "Great question! Here is the information you requested."
- "Please provide your name, business type, and phone number."
- "Our team will contact you shortly." (too stiff)
- Listing all 3 info requests in one message — ask them one at a time, naturally.

**Key voice rules:**
- Use contractions: "we've", "you'll", "it's", "don't", "that's"
- Mirror the user's energy — if they're casual, be casual; if they're formal, match it
- Acknowledge what they said before responding — don't just jump to the answer
- It's okay to say "honestly", "actually", "yeah", "sure thing"
- Use light humour when appropriate, never forced
- Ask ONE question at a time — never bullet-point a list of questions at someone
- Short paragraphs only. 1–3 sentences max per paragraph.

---

## WHAT DIGIYUGG OFFERS

**Website Packages** (for restaurants, clinics, gyms, salons, e-commerce, and more):

🥉 **STARTER — ₹8,000** — *"Get online and get noticed"*
For new businesses taking their first digital step.
- Pages as per business need (Home, About, Contact & more)
- Mobile-first design
- WhatsApp & Google Maps integration
- Social media links, Contact form, SSL security
- Basic on-page SEO
- Delivered in **7 business days**

🥈 **GROWTH — ₹22,000** — *"Turn visitors into customers"* ⭐ Most Popular
For established businesses ready to scale digitally.
- Pages as per business need (Home, About, Services, Gallery, Booking, Blog, Contact & more)
- Appointment / table booking system
- Lead capture & inquiry management
- Advanced SEO setup & Google Analytics dashboard
- Speed & performance optimization
- **3 months post-launch support**
- Delivered in **15 business days**

🥇 **ELITE — ₹55,000+** — *"Your business, fully digitized"*
For brands that want a complete digital ecosystem.
- Unlimited pages, fully custom as per business need
- Online payment gateway (Razorpay/UPI)
- Custom admin panel & dashboard
- CRM & third-party integrations
- Multi-language support (Hindi + English)
- Staff & operations portal
- Priority support & dedicated strategist
- **1 year maintenance included**
- Delivered in **30 business days**

**Software Products:**
- POS System (billing & inventory for shops/restaurants)
- Library Management System
- Campus OS — school/college management
- Inventory Management System

---

## HOW TO COLLECT LEAD INFO (do this naturally, not like a form)

When someone seems interested in a project or service, collect these 3 things — but ONE AT A TIME, woven into the conversation:
1. Their **name** — ask casually first ("By the way, what's your name?")
2. Their **business type** — you probably already know from context, confirm it
3. Their **phone number** — ask last ("And what's a good number for our team to reach you?")

Once you have all 3, warmly confirm the details back to them, then say the team will call within 24 hours. Include [LEAD_CAPTURED] at the very end of that message (this is a hidden system marker, do not explain it).

If someone is just browsing or asking questions, help them freely. Don't push for their info.

---

## PRICING QUESTIONS

Be honest and upfront. Don't dodge pricing. If they ask, explain the plan clearly and what they get. Always recommend based on their **actual business need** — not the highest price. For example, a new small shop → Starter. A growing clinic → Growth. A multi-branch brand → Elite.

---

## IF YOU DON'T KNOW SOMETHING

Say so honestly: "Honestly, I'm not 100% sure about that — let me have our team clarify when they call you." Don't make things up.`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

/**
 * Extracts lead data from the full conversation history using regex patterns.
 * Returns null if any required field is missing.
 */
function extractLeadFromConversation(messages: ChatMessage[]): LeadData | null {
  const allUserText = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join("\n");

  // Phone: Indian mobile numbers (with or without +91 / 0 prefix)
  const phoneMatch = allUserText.match(/(?:\+91[\s-]?|0)?[6-9]\d{9}/);
  if (!phoneMatch) return null;

  // Name: look for patterns like "I'm John", "my name is John", "This is John"
  const nameMatch = allUserText.match(
    /(?:i(?:'?m| am)|my name is|this is|call me)\s+([A-Z][a-z]+(?: [A-Z][a-z]+)?)/i
  );

  // Business: look for patterns like "I run a salon", "we have a clinic", "it's a gym"
  const businessMatch = allUserText.match(
    /(?:i (?:run|have|own)|we (?:have|run|own)|it(?:'?s)?|our business is)(?: a| an)?\s+([a-z ]{3,30})/i
  );

  return {
    name: nameMatch?.[1]?.trim() ?? "Chat Lead",
    phone: phoneMatch[0].replace(/[\s-]/g, ""),
    business: businessMatch?.[1]?.trim() ?? "Not specified",
    message: allUserText,
  };
}

/**
 * Saves a lead to Supabase. Silently fails to avoid breaking the stream.
 */
async function saveLead(lead: LeadData, aiResponse: string): Promise<void> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    console.warn("Supabase env vars missing — skipping lead save");
    return;
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { error } = await supabase.from("leads").insert({
      name: lead.name,
      phone: lead.phone,
      business: lead.business,
      type: "Chat Lead",
      message: `User Messages:\n${lead.message}\n\nAI Response:\n${aiResponse}`,
    });
    if (error) console.error("Lead save error:", error.message);
    else console.log(`✅ Lead saved: ${lead.name} (${lead.phone})`);
  } catch (err) {
    console.error("Unexpected lead save error:", err);
  }
}

// ─── Stream Parser ────────────────────────────────────────────────────────────

/**
 * Parses the Gemini streaming response (array of JSON chunks separated by commas/newlines)
 * and yields text deltas.
 */
async function* parseGeminiStream(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // Extract complete JSON objects using brace depth tracking
      let start = buffer.indexOf("{");
      while (start !== -1) {
        let depth = 0;
        let end = -1;

        for (let i = start; i < buffer.length; i++) {
          if (buffer[i] === "{") depth++;
          else if (buffer[i] === "}") {
            depth--;
            if (depth === 0) {
              end = i;
              break;
            }
          }
        }

        if (end === -1) break; // incomplete object — wait for more data

        const jsonStr = buffer.slice(start, end + 1);
        buffer = buffer.slice(end + 1);
        start = buffer.indexOf("{");

        try {
          const data = JSON.parse(jsonStr);
          const text: string =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (text) yield text;
        } catch {
          // Malformed chunk — skip silently
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  // ── Validate request ──────────────────────────────────────────────────────
  let messages: ChatMessage[];
  try {
    const body = await req.json();
    if (!Array.isArray(body?.messages)) throw new Error("Invalid payload");
    messages = body.messages;
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  // ── Validate env ──────────────────────────────────────────────────────────
  const AI_API_KEY = Deno.env.get("AI_API_KEY");
  if (!AI_API_KEY) {
    console.error("AI_API_KEY is not set");
    return jsonResponse({ error: "Server configuration error" }, 500);
  }

  // ── Build Gemini request ──────────────────────────────────────────────────
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const geminiBody = {
    contents,
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 1024,
      topP: 0.9,
    },
  };

  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${AI_API_KEY}`;

  // ── Call Gemini ───────────────────────────────────────────────────────────
  let geminiResponse: Response;
  try {
    geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiBody),
    });
  } catch (err) {
    console.error("Network error calling Gemini:", err);
    return jsonResponse({ error: "Failed to reach AI service" }, 502);
  }

  if (!geminiResponse.ok) {
    const errorText = await geminiResponse.text();
    console.error(`Gemini ${geminiResponse.status}:`, errorText);
    
    if (geminiResponse.status === 429) {
      return jsonResponse({ 
        error: "I'm receiving a lot of messages right now! 😅 Please wait a few seconds and try again. I'll be ready to help you then!" 
      }, 429);
    }

    let message = `AI service error (${geminiResponse.status})`;
    try {
      message = JSON.parse(errorText)?.error?.message ?? message;
    } catch { /* ignore */ }
    return jsonResponse({ error: message }, geminiResponse.status);
  }

  // ── Stream response back to client ────────────────────────────────────────
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  let fullContent = "";

  (async () => {
    try {
      for await (const text of parseGeminiStream(geminiResponse.body!)) {
        fullContent += text;
        const chunk = JSON.stringify({ choices: [{ delta: { content: text } }] });
        await writer.write(encoder.encode(`data: ${chunk}\n\n`));
      }
    } catch (err) {
      console.error("Stream error:", err);
    } finally {
      await writer.write(encoder.encode("data: [DONE]\n\n"));
      writer.close();

      // ── Lead capture (post-stream) ────────────────────────────────────
      const hasMarker = fullContent.includes("[LEAD_CAPTURED]");
      const hasTriggerPhrase = [
        "reach out",
        "call you",
        "contact you",
        "touch base",
        "our team will",
        "within 24 hours",
      ].some((p) => fullContent.toLowerCase().includes(p));

      if (hasMarker || hasTriggerPhrase) {
        const lead = extractLeadFromConversation(messages);
        if (lead) await saveLead(lead, fullContent);
        else console.log("Trigger found but no extractable lead data yet");
      }
    }
  })();

  return new Response(readable, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
});