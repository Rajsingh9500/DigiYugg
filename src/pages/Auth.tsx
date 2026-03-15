import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus, ShieldCheck } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { document.title = "Access Control | DigiYugg"; }, []);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/admin");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        toast({ title: "Account created! You can now sign in." });
        setIsLogin(true);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed";
      toast({ title: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-black text-white p-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 border border-white/10 bg-black/80 backdrop-blur-xl p-10 md:p-16">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-primary/40" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-primary/40" />

        <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 border border-primary/20 bg-primary/5 mb-8">
               <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-widest text-white leading-none">
              {isLogin ? "System Login" : "Provision Profile"}
            </h1>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/40 mt-4 block italic">Authorized Access Only</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
             <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block ml-1">Identity Endpoint</label>
             <input type="email" placeholder="ADMIN@DIGIYUGG.IN" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white/5 border-b border-white/20 px-4 py-4 focus:outline-none focus:border-primary transition-colors text-white font-bold text-xs uppercase tracking-widest" />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] block ml-1">Security Keyphrase</label>
             <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="w-full bg-white/5 border-b border-white/20 px-4 py-4 focus:outline-none focus:border-primary transition-colors text-white font-bold text-xs uppercase tracking-widest" />
          </div>
          
          <Button type="submit" className="w-full bg-primary text-black hover:bg-white h-20 rounded-none font-black text-xs uppercase tracking-[0.4em] transition-all transform hover:scale-[1.02] shadow-[0_20px_40px_rgba(255,127,0,0.1)]" disabled={loading}>
            {loading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <LogIn className="mr-3 h-5 w-5" />}
            Execute Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
