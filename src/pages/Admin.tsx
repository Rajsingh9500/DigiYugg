import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Users, Loader2, RefreshCw, Phone, Calendar, ShieldAlert, Database, Share2, MessageCircle, CheckCircle, ShieldCheck } from "lucide-react";
import { User } from "@supabase/supabase-js";

type Lead = {
  id: string;
  name: string;
  business: string | null;
  phone: string;
  type: string;
  message: string | null;
  created_at: string;
};

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCheckingRole, setIsCheckingRole] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [expandedLeads, setExpandedLeads] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchLeads = useCallback(async () => {
    console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);
    console.log("Supabase Key (last 5):", import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.slice(-5));
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error fetching leads:", error);
      toast({ title: `Signal Interference (Error: ${error.message}). Access denied.`, variant: "destructive" });
      setLeads([]);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    document.title = "Intelligence Hub | Coder Digital Solutions";

    const checkAdminRole = async (userId: string) => {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      if (error || !data) {
        toast({ title: "Access Denied", description: "You do not have administrative privileges.", variant: "destructive" });
        navigate("/");
      } else {
        setIsCheckingRole(false);
        fetchLeads();
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) { navigate("/auth"); return; }
      setUser(session.user);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/auth"); return; }
      setUser(session.user);
      checkAdminRole(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate, fetchLeads, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleShare = async (lead: Lead) => {
    const text = `Lead Details:\nName: ${lead.name}\nBusiness: ${lead.business || "N/A"}\nPhone: ${lead.phone}\nMessage: ${lead.message || "N/A"}\n\nSent from Coder Digital Hub.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Lead: ${lead.name}`,
          text: text,
        });
        toast({ title: "System share dialog initialized." });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Share failed:", err);
        }
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "Details copied to clipboard.", description: "System share not supported." });
    }
  };

  const handleWhatsApp = (lead: Lead, thankYou = false) => {
    const cleanPhone = lead.phone.replace(/\D/g, "");
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    
    let text = `Greetings from Coder Digital Solutions! 🚀 We've received your inquiry. We will contact you soon to discuss how we can build your digital presence.`;
    
    if (thankYou) {
      text = `Thank you for contacting Coder Digital Solutions, ${lead.name}! We have received your request and our team will contact you shortly.`;
    }

    const message = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, "_blank");
  };

  const assignAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    if (!email || !password) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('create_admin_account', {
        admin_email: email,
        admin_password: password
      });

      if (error) throw error;

      if (data?.success) {
        toast({ title: "Privileges Granted", description: data.message });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({ title: "Assignment Blocked", description: data?.error || "Unknown error", variant: "destructive" });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Protocol Failed";
      toast({ title: "Protocol Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedLeads(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (d: string) => {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    });
  };

  if (isCheckingRole) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 animate-pulse">Authenticating_Clearance...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 min-h-screen bg-black text-white relative overflow-hidden">
      {/* Structural Accents & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 right-[-10%] w-[60vw] h-[60vh] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Header - Industrial Stealth */}
      <header className="py-10 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-20 z-40">
        <div className="max-width-container flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 border border-primary/30 bg-primary/5 flex items-center justify-center relative group">
              <div className="absolute top-0 left-0 w-2 h-2 bg-primary group-hover:w-full transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary group-hover:w-full transition-all duration-300" />
              <Database className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-white leading-none">Intelligence Hub</h1>
                <span className="px-2 py-0.5 border border-primary/40 bg-primary/10 text-[8px] font-black uppercase tracking-widest text-primary animate-pulse">Live_Sync</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mt-3 flex items-center gap-2">
                <ShieldAlert className="w-3 h-3 text-primary/70" /> {user?.email} // secure_encryption_active
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="lg" onClick={fetchLeads} disabled={loading} className="border-white/10 bg-white/[0.02] rounded-none h-14 px-8 text-[10px] font-black uppercase tracking-[0.3em] hover:border-primary hover:text-black hover:bg-primary transition-all group">
              <RefreshCw className={`h-4 w-4 mr-3 group-hover:rotate-180 transition-transform duration-500 ${loading ? "animate-spin" : ""}`} /> Sync_Data
            </Button>
            <Button variant="outline" size="lg" onClick={handleLogout} className="border-red-900/20 bg-red-900/5 rounded-none h-14 px-8 text-[10px] font-black uppercase tracking-[0.3em] text-red-500 hover:bg-red-500 hover:text-white transition-all">
              <LogOut className="h-4 w-4 mr-3" /> Terminate
            </Button>
          </div>
        </div>
      </header>

      <main className="py-16 relative z-10">
        <div className="max-width-container">
          {/* Stats Bar - Stealth Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { label: "Total_Engagements", val: leads.length, icon: Users, delay: 0 },
              { label: "Daily_Influx", val: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length, icon: Calendar, delay: 0.1 },
              { label: "Active_Protocols", val: leads.filter(l => new Date(l.created_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: ShieldAlert, delay: 0.2 }
            ].map((stat, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 p-10 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center gap-8">
                  <div className="p-4 bg-white/[0.05] border border-white/10 group-hover:border-primary transition-colors">
                    <stat.icon className="h-6 w-6 text-white/60 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-4xl font-black text-white leading-none mb-2 tracking-tighter">{stat.val}</p>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table Container - Industrial Frame */}
          <div className="border border-white/10 bg-black/60 backdrop-blur-md relative">
            {/* Table Header Decorations */}
            <div className="absolute top-0 left-0 w-32 h-1 bg-primary" />
            <div className="absolute top-0 right-0 w-1 h-20 border-r border-white/10" />

            <div className="p-10 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white">Lead_Database</h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary/80">Secure_Query_Terminal_Active</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-8">
                  <div className="relative">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <div className="absolute inset-0 bg-primary/20 blur-xl" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 animate-pulse">Decrypting_Datastreams...</span>
                </div>
              ) : leads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-40 gap-8 opacity-20">
                  <ShieldAlert className="h-16 w-16" />
                  <p className="text-xs font-black uppercase tracking-[0.4em]">Zero_Entries_Found.</p>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.05]">
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">Lead_Identity</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white text-center">Industry</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">Communications</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">Status_Code</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white">Execution</th>
                      <th className="p-8 text-[10px] font-black uppercase tracking-[0.3em] text-white text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-white/[0.03] transition-all group">
                        <td className="p-8">
                          <p className="text-sm font-black uppercase tracking-widest text-white group-hover:text-primary transition-colors">{lead.name}</p>
                          <div className="mt-2 max-w-md">
                            <p className={`text-[11px] font-medium text-white/60 leading-relaxed ${!expandedLeads[lead.id] ? "line-clamp-2" : ""}`}>
                              {lead.message || "No technical directive."}
                            </p>
                            {lead.message && lead.message.length > 100 && (
                              <button 
                                onClick={() => toggleExpand(lead.id)}
                                className="text-[9px] font-black uppercase tracking-widest text-primary mt-2 hover:text-white transition-colors"
                              >
                                {expandedLeads[lead.id] ? "[-] Show_Less" : "[+] Read_More"}
                              </button>
                            )}
                          </div>
                        </td>
                        <td className="p-8 text-center">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{lead.business || "General"}</span>
                        </td>
                        <td className="p-8">
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-xs font-black text-white/80 hover:text-primary transition-colors">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </a>
                        </td>
                        <td className="p-8">
                          <span className="inline-flex items-center px-4 py-1.5 border border-primary/40 bg-primary/10 text-[9px] font-black uppercase tracking-widest text-primary shadow-[0_0_15px_rgba(255,127,0,0.1)]">
                            {lead.type}
                          </span>
                        </td>
                        <td className="p-8">
                          <div className="flex items-center gap-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleWhatsApp(lead)}
                              title="Standard Outreach"
                              className="w-10 h-10 p-0 border-white/10 bg-white/[0.03] hover:border-primary/50 hover:bg-primary/5 text-white/60 hover:text-primary transition-all group/wa"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleWhatsApp(lead, true)}
                              title="Send Thank You & Automation"
                              className="w-10 h-10 p-0 border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary text-primary hover:text-black transition-all group/thanks"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleShare(lead)}
                              title="Share Lead"
                              className="w-10 h-10 p-0 border-white/10 bg-white/[0.03] hover:border-primary/50 hover:bg-primary/5 text-white/60 hover:text-primary transition-all group/share"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-8 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{formatDate(lead.created_at)}</span>
                            <div className="w-8 h-px bg-white/10 mt-2 group-hover:w-full transition-all duration-300" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>


          {/* Security & Delegation - Stealth Panel */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-white/10 bg-black/60 backdrop-blur-md p-10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/40 group-hover:bg-primary transition-colors" />
              <div className="flex items-center gap-4 mb-8">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-black uppercase tracking-[0.3em] text-white">Security_Protocols</h2>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-8 leading-relaxed">
                Assign administrative privileges to new personnel via identity endpoint. // Action_Logged
              </p>
              <form onSubmit={assignAdmin} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    name="email"
                    type="email" 
                    placeholder="NEW_ADMIN@CODERDIGITAL.IN" 
                    required
                    className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 text-xs font-black uppercase tracking-widest text-white focus:outline-none focus:border-primary transition-all"
                  />
                  <input 
                    name="password"
                    type="password" 
                    placeholder="SECURITY_KEYPHRASE" 
                    required
                    minLength={6}
                    className="flex-1 bg-white/[0.03] border border-white/10 px-6 py-4 text-xs font-black uppercase tracking-widest text-white focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <Button type="submit" disabled={loading} className="bg-primary text-black hover:bg-white rounded-none h-14 w-full font-black text-[10px] uppercase tracking-widest">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Grant_Access & Create_Profile
                </Button>
              </form>
            </div>

            <div className="border border-white/10 bg-white/[0.02] p-10 flex flex-col justify-center gap-4 opacity-40">
               <span className="text-[8px] font-black uppercase tracking-[0.6em]">// SYSTEM_VERSION_2.9.5 // ROLE_DELEGATION_ENABLED</span>
               <div className="w-full h-1 bg-white/5 relative">
                  <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/20" />
               </div>
               <p className="text-[9px] font-medium text-white/50 leading-relaxed uppercase tracking-tighter">
                 All role assignments are permanent until manual revocation via SQL terminal. Ensure credentials are verified before execution.
               </p>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
            <span className="text-[8px] font-black uppercase tracking-[0.6em]">// SYSTEM_VERSION_2.9.4 // ROOT_ENCRYPTION_LAYER_ACTIVE</span>
            <div className="flex gap-8">
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">Lat: 22.7196° N</span>
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">Lon: 75.8577° E</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
