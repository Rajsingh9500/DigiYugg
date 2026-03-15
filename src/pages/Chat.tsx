import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, Loader2, User, ArrowLeft, Trash2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { streamChat, type ChatMessage } from "@/lib/chat-stream";
import { gsap } from "gsap";

const STORAGE_KEY = "coder-digital-chat-industrial";
const DEFAULT_MSG: ChatMessage = { role: "assistant", content: "System Online. I am the **Coder Digital AI Architect**. I can assist with:\n\n- 🌐 **Web Infrastructure** Strategy\n- 💰 **Economic Models** (Pricing)\n- 🏗️ **Architectural** Feasibility\n- 📡 **Connectivity** with our team\n\nSpecify your objective." };

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }
    return [DEFAULT_MSG];
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Smaller threshold for more precise detection
      const atBottom = scrollHeight - clientHeight - scrollTop <= 50;
      if (atBottom !== isAtBottom) {
        setIsAtBottom(atBottom);
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const lastMsg = messages[messages.length - 1];
      // Force scroll on new user entry OR if we are sticking to bottom during typing
      if (lastMsg?.role === "user" || isAtBottom) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: isLoading && lastMsg?.role !== "user" ? "auto" : "smooth"
        });
      }
    }
  }, [messages, isLoading, isAtBottom]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    setMessages([DEFAULT_MSG]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";
    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: upsert,
        onDone: () => setIsLoading(false),
      });
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Error: System interruption.";
      setMessages(prev => [...prev, { role: "assistant", content: errorMessage }]);
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Digital Ecosystem Strategy",
    "Infrastructure Pricing",
    "Deployment Timelines",
    "WhatsApp Node Integration",
  ];

  return (
    <div className="h-screen bg-black text-white font-sans overflow-hidden relative flex flex-col pt-20">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[#050505] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
      
      <div className="flex-1 max-width-container max-w-3xl flex flex-col py-8 relative z-10 overflow-hidden mx-auto w-full">
        
        {/* Simplified Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-5">
            <Link to="/">
              <div className="p-2 border border-white/10 hover:border-primary transition-colors cursor-pointer group">
                <ArrowLeft className="h-4 w-4 text-white/70 group-hover:text-primary" />
              </div>
            </Link>
            <div className="relative">
              <div className="w-10 h-10 border border-primary/40 bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-black uppercase tracking-widest text-white">AI Assistant</h1>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary font-mono mt-0.5">Ready for Input</p>
            </div>
          </div>
          <Button 
            onClick={clearChat} 
            variant="ghost" 
            className="h-8 px-3 rounded-none border border-white/5 hover:border-red-500/50 hover:text-red-500 hover:bg-transparent text-[9px] font-black uppercase tracking-widest text-white/20"
          >
            Clear History
          </Button>
        </div>

        {/* Focused Message Feed */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          data-lenis-prevent
          className="flex-1 overflow-y-auto space-y-8 mb-8 pr-2 custom-scrollbar min-h-0 py-2 touch-pan-y"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[85%] border px-6 py-5 relative ${
                msg.role === "user" 
                  ? "border-primary/20 bg-primary/[0.05] text-white" 
                  : "border-white/10 bg-white/[0.03] text-white/95 shadow-lg"
              }`}>
                <div className="prose prose-invert prose-sm max-w-none text-[15px] leading-relaxed font-medium prose-strong:text-white prose-strong:font-black">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex flex-col items-start px-2 py-2">
                 <div className="flex items-center gap-2 mb-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Thinking...</span>
                 </div>
                 <div className="flex gap-1.5 ml-1">
                    <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-primary/60 animate-pulse [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-primary/30 animate-pulse [animation-delay:0.4s]" />
                 </div>
              </div>
            )}
        </div>

        {/* User-Friendly Input */}
        <div className="relative pt-6 border-t border-white/10 mt-auto">
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s); }}
                  className="text-[9px] font-bold uppercase tracking-widest px-4 py-2 border border-white/5 bg-white/[0.02] text-white/40 hover:border-primary hover:text-primary transition-all rounded-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative flex gap-3">
            <input
              placeholder="Ask anything about our services..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-5 text-white text-sm font-medium focus:outline-none focus:border-primary/40 transition-all placeholder:text-white/20 rounded-sm"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="w-16 h-14 flex items-center justify-center bg-primary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,102,0,0.4)] transition-all duration-300 disabled:opacity-50 disabled:grayscale relative group overflow-hidden"
              disabled={isLoading || !input.trim()}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Send className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform" />
            </button>
          </form>
          <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.2em] text-white/20 text-center">
            Encrypted End-to-End // Coder Digital Solutions 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
