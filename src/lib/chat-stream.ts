import { supabase } from "@/integrations/supabase/client";

export type ChatMessage = { role: "user" | "assistant"; content: string };

const BOT_RESPONSES = [
  { match: /ecommerce|online shop|store|jewellery|shop|cloth/i, response: "An online store is a fantastic way to grow your business! We can build a beautiful, secure, and easy-to-manage e-commerce website for your shop. Could you please tell me your name so we can discuss this further?" },
  { match: /want (a )?website|need (a )?website|create (a )?website|idea|project|build/i, response: "That's exactly what we do best! We can build a custom website tailored specifically to your business needs, whether it's a portfolio, a blog, or an online store. Could you please tell me your name so we can discuss this further?" },
  { match: /price|cost|pricing|fee|plan/i, response: "Our pricing plans are tailored to your specific needs. For a basic web infrastructure, it starts at $99/mo. For custom solutions and e-commerce, please reach out to our team!" },
  { match: /service|web development|app development|offer/i, response: "We offer comprehensive services including Web Development, App Development, Digital Ecosystem Strategy, UI/UX Design, and more." },
  { match: /contact|talk|whatsapp|call|meet|schedule/i, response: "You can reach out to us directly via WhatsApp, or through the contact form on our contact page. We're always here to help!" },
  { match: /hello|hi|hey|greetings/i, response: "Hello! How can I assist you with DigiYugg's services today? If you have a project in mind, tell me about it!" },
  { match: /who are you|name/i, response: "I am DigiYugg AI, designed to help you navigate our services, pricing, and infrastructure." },
  { match: /^(ok|okay|cool|thanks|thank you|sounds good|awesome|great|sure)(\s|$)/i, response: "Is there anything else I can help you with today?" },
];

const DEFAULT_RESPONSE = "I am DigiYugg AI. I can help answer questions about our **services**, **pricing**, or how to **contact** us. If you have an idea for a business or project, feel free to share it!";

export async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: ChatMessage[];
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const userMessages = messages.filter(m => m.role === "user");
  const lastUserMessage = userMessages[userMessages.length - 1]?.content || "";
  
  const assistantMessages = messages.filter(m => m.role === "assistant");
  const lastAssistantMessage = assistantMessages[assistantMessages.length - 1]?.content || "";

  let finalResponse = "";

  // STAGE 2: If the bot previously asked for their name
  if (lastAssistantMessage.includes("Could you please tell me your name")) {
    finalResponse = `Nice to meet you, ${lastUserMessage}! Could you please provide your contact number (or email) so our team can reach out to you?`;
  }
  // STAGE 3: If the bot previously asked for their contact number
  else if (lastAssistantMessage.includes("Could you please provide your contact number")) {
    const contactInfo = lastUserMessage;
    const name = userMessages[userMessages.length - 2]?.content || "Unknown";
    const businessIdea = userMessages[userMessages.length - 3]?.content || "Not specified";

    try {
      await supabase.from("leads").insert({
        name: name,
        phone: contactInfo,
        message: `Chatbot Lead - Idea: ${businessIdea}`,
        type: "Chatbot Inquiry",
      });
      finalResponse = `Thank you, ${name}! We have securely saved your details. Our enterprise architects will contact you shortly to discuss your project.`;
    } catch (error) {
      console.error("Failed to save lead:", error);
      finalResponse = "Thank you! However, we had an issue saving your details to our system. Please try contacting us via WhatsApp.";
    }
  } 
  // STAGE 1: Standard parsing for general questions or starting the flow
  else {
    let matched = false;
    for (const rule of BOT_RESPONSES) {
      if (rule.match.test(lastUserMessage)) {
        finalResponse = rule.response;
        matched = true;
        break;
      }
    }
    if (!matched) {
      finalResponse = DEFAULT_RESPONSE;
    }
  }

  // Simulate streaming output for a smooth UI experience
  const chars = finalResponse.split("");
  let index = 0;

  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (index < chars.length) {
        onDelta(chars[index]);
        index++;
      } else {
        clearInterval(interval);
        onDone();
        resolve();
      }
    }, 20); // 20ms per character for a typing effect
  });
}
