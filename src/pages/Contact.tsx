import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const businessTypes = ["Restaurant", "Clinic", "Gym", "Salon", "Coaching Institute", "Retail Shop", "Other"];

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", business: "", phone: "", type: "", message: "" });

  useEffect(() => {
    document.title = "Contact | Coder Digital Solutions";

    const ctx = gsap.context(() => {
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.type) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        name: form.name.trim(),
        business: form.business.trim() || null,
        phone: form.phone.trim(),
        type: form.type,
        message: form.message.trim() || null,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="pt-20 bg-black text-white min-h-screen">
      <section className="py-24 border-b border-white/5">
        <div className="max-width-container">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Inquiry</span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter mb-12">
            Let's Start <br /> <span className="text-primary">Something.</span>
          </h1>
          <p className="max-w-2xl text-white/70 text-lg font-medium leading-relaxed">
            Ready to establish your digital dominance? Fill in the details below
            and our enterprise architects will reach out within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        {/* Background Grids & Scans */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

        <div className="max-width-container grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

          {/* Form Side - Command Center Card */}
          <div className="lg:col-span-7 gsap-reveal">
            <div className="relative group">
              {/* Hardware Frame Accents */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-500" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-white/20" />

              <div className="bg-[#050505] border border-white/10 p-8 md:p-12 relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none" />

                {submitted ? (
                  <div className="py-20 text-center flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center mb-8 relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                      <CheckCircle className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-4xl font-black text-white tracking-tight mb-4 uppercase">Transmission Success</h3>
                    <p className="text-white/70 text-lg max-w-sm font-medium leading-relaxed mb-6">Our architects are processing your data. Expect a secure communication within 24 hours.</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                      <Button
                        className="bg-primary text-black hover:bg-white transition-all rounded-none h-16 px-12 font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3"
                        onClick={() => {
                          const message = encodeURIComponent(`Hi Coder Digital Solutions, I've just submitted an inquiry. Thank you for your time, looking forward to connecting!`);
                          window.open(`https://wa.me/916262253146?text=${message}`, "_blank");
                        }}
                      >
                        <MessageCircle className="h-5 w-5" /> Connect on WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/10 hover:border-primary transition-all rounded-none h-16 px-12 font-black text-xs uppercase tracking-[0.3em]"
                        onClick={() => { setSubmitted(false); setForm({ name: "", business: "", phone: "", type: "", message: "" }); }}
                      >
                        New Transmission
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-6">
                      <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Inquiry Terminal</h2>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">System Status: Ready // Secure Link Active</p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <p className="text-[10px] text-primary font-black uppercase tracking-widest">Node: Indore_HQ</p>
                        <div className="flex gap-1 justify-end mt-1">
                          <div className="w-1 h-1 bg-primary" />
                          <div className="w-4 h-1 bg-primary/20" />
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/90 uppercase tracking-[0.4em] block pl-1">Full Name <span className="text-primary">*</span></label>
                          <Input className="bg-white/[0.03] border-white/10 focus-visible:ring-1 focus-visible:ring-primary h-14 rounded-none text-white placeholder:text-white/30 text-lg transition-all border-l-2 border-primary focus-visible:border-primary" placeholder="Enter your name..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/90 uppercase tracking-[0.4em] block pl-1">Business Name</label>
                          <Input className="bg-white/[0.03] border-white/10 focus-visible:ring-1 focus-visible:ring-primary h-14 rounded-none text-white placeholder:text-white/30 text-lg transition-all border-l-2 border-white/20 focus-visible:border-primary" placeholder="Company name (optional)..." value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/90 uppercase tracking-[0.4em] block pl-1">Phone Number <span className="text-primary">*</span></label>
                          <Input className="bg-white/[0.03] border-white/10 focus-visible:ring-1 focus-visible:ring-primary h-14 rounded-none text-white placeholder:text-white/30 text-lg transition-all border-l-2 border-primary focus-visible:border-primary" placeholder="+91 00000 00000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-white/90 uppercase tracking-[0.4em] block pl-1">Business Type <span className="text-primary">*</span></label>
                          <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                            <SelectTrigger className="bg-white/[0.03] border-white/10 focus:ring-1 focus:ring-primary h-14 rounded-none text-white text-lg transition-all border-l-2 border-primary focus:border-primary">
                              <SelectValue placeholder="Select business niche" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0a0a0a] border-white/10 text-white rounded-none">
                              {businessTypes.map((t) => <SelectItem key={t} value={t} className="focus:bg-primary focus:text-black rounded-none">{t}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-white/90 uppercase tracking-[0.4em] block pl-1">Tell us about your project</label>
                        <Textarea className="bg-white/[0.03] border-white/10 focus-visible:ring-1 focus-visible:ring-primary rounded-none text-white placeholder:text-white/30 text-lg transition-all resize-none min-h-[120px] pt-4 border-l-2 border-l-white/20 focus-visible:border-primary" placeholder="Briefly describe your goals..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      </div>

                      <Button type="submit" className="bg-primary text-black hover:bg-white w-full h-20 rounded-none font-black text-xs uppercase tracking-[0.5em] transition-all relative overflow-hidden group/btn" disabled={loading}>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                          {loading ? "Transmitting..." : "Initiate Protocol"}
                        </span>
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between gsap-reveal">
            <div className="space-y-12">
              <div>
                <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Global Infrastructure</span>
                <div className="space-y-10">
                  <div className="group">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Primary Node</p>
                    <div className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 bg-primary rotate-45" />
                      <span className="text-3xl font-black text-white tracking-tighter group-hover:text-primary transition-colors">Indore, India</span>
                    </div>
                  </div>

                  <div className="group">
                    <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2">Direct Channel</p>
                    <div className="flex flex-col gap-2">
                      <a href="mailto:contact@coderdigital.in" className="text-2xl font-bold text-white/90 hover:text-primary transition-colors tracking-tight italic">contact@coderdigital.in</a>
                      <a href="tel:+916262253146" className="text-2xl font-bold text-white/90 hover:text-primary transition-colors tracking-tight">+91 62622 53146</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 border border-white/5 bg-white/[0.02] relative overflow-hidden group cursor-pointer">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/10 group-hover:border-primary/50 transition-colors" />
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] mb-4">Urgent Operations</p>
                <h4 className="text-xl font-black text-white uppercase mb-6 tracking-tighter">Secure encrypted WhatsApp channel available for priority clients.</h4>
                <a
                  href="https://wa.me/916262253146"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] hover:gap-4 transition-all"
                >
                  Connect Now <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="hidden lg:block pt-12">
              <div className="flex gap-4">
                <div className="w-px h-12 bg-white/10" />
                <p className="text-[10px] text-white/30 font-medium leading-relaxed max-w-[200px]">
                  All transmissions are secure and subject to our enterprise privacy protocols. CODER DIGITAL SOLUTIONS © 2024
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
