import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bot, Send, Loader2, User, ArrowLeft, Trash2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { streamChat, type ChatMessage } from "@/lib/chat-stream";
import { gsap } from "gsap";

const STORAGE_KEY = "digiyugg-chat-industrial";
const DEFAULT_MSG: ChatMessage = { role: "assistant", content: "System Online. I am the **DigiYugg AI Architect**. I can assist with:\n\n- 🌐 **Web Infrastructure** Strategy\n- 💰 **Economic Models** (Pricing)\n- 🏗️ **Architectural** Feasibility\n- 📡 **Connectivity** with our team\n\nSpecify your objective." };

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
    <div className="h-screen bg-[#020202] text-white font-sans overflow-hidden relative flex flex-col pt-16">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ff66000a_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-20" />
      
      <div className="flex-1 max-w-4xl w-full flex flex-col relative z-10 overflow-hidden mx-auto">
        
        {/* Modern Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <Link to="/">
              <div className="p-2 border border-white/10 hover:border-primary/50 transition-all rounded-lg group">
                <ArrowLeft className="h-4 w-4 text-white/50 group-hover:text-primary" />
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl border border-primary/20 bg-primary/5 flex items-center justify-center shadow-[0_0_15px_rgba(255,102,0,0.1)]">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#020202] rounded-full shadow-lg" />
              </div>
              <div>
                <h1 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">AI Architect</h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                  <p className="text-[8px] font-bold uppercase tracking-widest text-primary/60 font-mono">System Active</p>
                </div>
              </div>
            </div>
          </div>
          <Button 
            onClick={clearChat} 
            variant="ghost" 
            className="h-8 px-3 rounded-lg border border-white/5 hover:border-red-500/30 hover:text-red-500 hover:bg-red-500/5 text-[9px] font-black uppercase tracking-widest text-white/30 transition-all"
          >
            Clear History
          </Button>
        </div>

        {/* Dynamic Message Feed */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          data-lenis-prevent
          className="flex-1 overflow-y-auto space-y-6 px-6 py-8 custom-scrollbar scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[80%] px-5 py-4 rounded-2xl relative transition-all duration-300 ${
                msg.role === "user" 
                  ? "bg-primary text-black font-semibold shadow-[0_4px_20px_rgba(255,102,0,0.2)]" 
                  : "bg-white/[0.03] border border-white/10 text-white/90 shadow-xl backdrop-blur-sm"
              }`}>
                <div className={`prose prose-sm max-w-none text-sm leading-relaxed ${msg.role === 'user' ? 'prose-p:text-black prose-strong:text-black font-medium' : 'prose-invert prose-p:text-white/80 prose-strong:text-white'}`}>
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
                {msg.role === 'assistant' && (
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-white/[0.03] border-l border-t border-white/10 rotate-[-45deg] -z-10" />
                )}
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-widest mt-2 ${msg.role === 'user' ? 'text-primary' : 'text-white/20'}`}>
                {msg.role === 'user' ? 'Operator' : 'AI Node'}
              </span>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex flex-col items-start px-2 py-4">
               <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 px-4 py-3 rounded-2xl shadow-lg animate-pulse">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Processing Output...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Command Center Input */}
        <div className="p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(s); }}
                    className="text-[9px] font-bold uppercase tracking-widest px-4 py-2 bg-white/[0.02] border border-white/5 text-white/40 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all rounded-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="relative group">
              <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative flex items-center gap-3 bg-[#0a0a0a] border border-white/10 p-1 rounded-2xl focus-within:border-primary/50 transition-all shadow-2xl">
                <input
                  placeholder="Type your command..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="flex-1 bg-transparent px-5 py-4 text-white text-sm font-medium focus:outline-none placeholder:text-white/10"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="w-12 h-12 flex items-center justify-center bg-primary text-black rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:scale-100 shadow-[0_0_20px_rgba(255,102,0,0.2)]"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              <div className="absolute -inset-0.5 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10" />
            </div>
            
            <div className="flex justify-between items-center px-2">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/10">
                End-to-End Encrypted Session // DigiYugg v2.4
              </p>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                <div className="w-1.5 h-1.5 rounded-full bg-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
