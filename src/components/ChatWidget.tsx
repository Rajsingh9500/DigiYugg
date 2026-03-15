import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User, Maximize2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { streamChat, type ChatMessage } from "@/lib/chat-stream";

const STORAGE_KEY = "digiyugg-chat-widget";
const DEFAULT_MSG: ChatMessage = { role: "assistant", content: "Hi! 👋 I'm the DigiYugg assistant. How can I help you today? I can answer questions about our web development services, pricing, or help you get started!" };

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed) && parsed.length) return parsed; }
    } catch (e) {
      console.warn("Failed to parse chat history:", e);
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
      const errorMessage = e instanceof Error ? e.message : "Sorry, something went wrong. Please try again.";
      setMessages(prev => [...prev, { role: "assistant", content: errorMessage }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-[60] w-14 h-14 bg-primary text-black flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,102,0,0.3)] rounded-lg"
          aria-label="Open chat"
        >
          <Bot className="h-7 w-7" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[60] w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-[#050505] border border-white/10 flex flex-col overflow-hidden shadow-2xl">
          {/* Simplified Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
             <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white">AI Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                   <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Secured Node</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/chat" onClick={() => setOpen(false)}>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-white/5 hover:border-primary transition-colors">
                  <Maximize2 className="h-4 w-4 text-white/40" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border border-white/5 hover:border-red-500 transition-colors" onClick={() => setOpen(false)}>
                <X className="h-4 w-4 text-white/40" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            data-lenis-prevent
            className="flex-1 overflow-y-auto px-6 py-8 space-y-8 min-h-0 touch-pan-y custom-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[85%] border px-4 py-3 relative ${
                  msg.role === "user"
                    ? "border-primary/30 bg-primary/[0.05] text-white"
                    : "border-white/10 bg-white/[0.03] text-white/95 shadow-lg"
                }`}>
                   <div className="prose prose-sm prose-invert max-w-none text-[13px] text-inherit [&>p]:mb-0 font-medium leading-relaxed prose-strong:text-white prose-strong:font-black">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex flex-col items-start px-1">
                 <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary/40 mb-3">Processor_Active...</span>
                 <div className="flex gap-1.5 ml-1 mb-4">
                    <div className="w-1.5 h-1.5 bg-primary animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-primary/60 animate-pulse [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-primary/30 animate-pulse [animation-delay:0.4s]" />
                 </div>
                 <div className="flex items-center gap-2 px-1">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-xs text-white/60">Thinking...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Clean Input Section */}
          <div className="px-3 py-4 border-t border-white/10 bg-white/[0.01]">
            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input
                placeholder="Ask anything..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="flex-1 bg-white/[0.03] border border-white/10 px-4 py-3 text-white text-[11px] font-medium focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20 rounded-md"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="w-11 h-11 flex items-center justify-center bg-primary text-black hover:bg-white transition-all disabled:opacity-50 rounded-md"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-3 flex justify-between items-center px-1">
               <span className="text-[10px] text-white/30">Powered by DigiYugg AI</span>
               {messages.length > 1 && (
                 <button onClick={clearChat} className="text-[10px] text-white/30 hover:text-red-500 transition-colors flex items-center gap-1">
                   <Trash2 className="h-3 w-3" /> Clear Chat
                 </button>
               )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
