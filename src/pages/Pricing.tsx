import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Sparkles, ShieldCheck, Zap, Globe, Cpu, ChevronRight, MessageSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Basic",
    price: "₹3,000",
    desc: "Single-point digital gateway for emerging shops.",
    features: [
      "Single Page Architecture",
      "Mobile Responsive Logic",
      "WhatsApp Secure Bridge",
      "Google Maps Integration",
      "Standard Encryption"
    ],
    highlighted: false,
    icon: Globe,
  },
  {
    name: "Standard",
    price: "₹8,000",
    desc: "Integrated multi-page system for clinics & high-traffic restaurants.",
    features: [
      "Multi-Page Infrastructure",
      "Advanced Booking/Menu Logic",
      "Tier-1 SEO Architecture",
      "Lead Management Console",
      "Priority Technical Support"
    ],
    highlighted: true,
    icon: Zap,
  },
  {
    name: "Premium",
    price: "₹15,000+",
    desc: "Bespoke industrial ecosystems and high-scale retail hubs.",
    features: [
      "Custom Enterprise Logic",
      "Multi-Location Hub Control",
      "Full Maintenance Protocol",
      "Scalable API Integrations",
      "Dedicated Technical Strategist"
    ],
    highlighted: false,
    icon: Cpu,
  },
];

const faqs = [
  { q: "What is included in 'Full Maintenance'?", a: "Our Premium plan includes comprehensive maintenance: security patches, 24/7 uptime monitoring, monthly SEO audits, and unlimited content updates to keep your ecosystem at peak performance." },
  { q: "Can I upgrade my system later?", a: "Absolutely. All our architectures are built to be scalable. You can transition from Basic to Standard or Premium as your business intelligence requirements grow." },
  { q: "Are there any recurring costs?", a: "While the build fee is one-time, standard domain and hosting renewals apply annually. We provide transparent management of these costs to ensure continuous service." },
  { q: "How long is the deployment cycle?", a: "Basic systems deploy in 3-5 standard cycles (days). Standard and Premium architectures range from 7-10 cycles depending on custom logic complexity." },
];

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    document.title = "Pricing | DigiYugg"; 

    const ctx = gsap.context(() => {
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 bg-black text-white min-h-screen relative overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,127,0,0.03)_0,transparent_70%)] pointer-events-none" />
      
      {/* Header Section */}
      <section className="py-24 border-b border-white/5 relative z-10">
        <div className="max-width-container">
          <div className="flex items-center gap-4 mb-8 gsap-reveal">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Pricing & Plans</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 gsap-reveal uppercase">
                Transparent <br/> <span className="text-primary">Pricing.</span>
              </h1>
            </div>
            <div className="pb-4 gsap-reveal">
              <p className="max-w-xl text-white/70 text-lg font-medium leading-relaxed">
                Professional digital solutions designed for local business growth. 
                Simple, transparent structures with zero hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-32 relative z-10">
        <div className="max-width-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`gsap-reveal flex flex-col p-12 border transition-all duration-500 relative group overflow-hidden ${plan.highlighted ? 'bg-white/[0.03] border-primary/40' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
              >
                <div className="mb-14 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <plan.icon className={`w-5 h-5 ${plan.highlighted ? 'text-primary' : 'text-white/60'}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${plan.highlighted ? 'text-primary' : 'text-white/60'}`}>
                            {plan.name}
                        </span>
                      </div>
                      {plan.highlighted && (
                        <span className="px-3 py-1 bg-primary text-[8px] font-black uppercase tracking-widest text-black">
                          Recommended
                        </span>
                      )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  </div>
                  <p className="text-white/60 text-sm font-medium leading-relaxed mt-6">{plan.desc}</p>
                </div>

                <div className="space-y-5 mb-16 flex-grow relative z-10">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-4 group/feature">
                      <Check className={`w-4 h-4 ${plan.highlighted ? 'text-primary' : 'text-white/40'}`} />
                      <span className="text-xs font-medium text-white/70 group-hover/feature:text-white transition-colors">{f}</span>
                    </div>
                  ))}
                </div>

                <Button 
                   asChild 
                   className={`h-14 rounded-none font-black uppercase tracking-widest text-[10px] transition-all ${plan.highlighted ? 'bg-primary text-black hover:bg-white' : 'bg-white text-black hover:bg-primary'}`}
                >
                  <Link to="/contact">
                   Get Started <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & FAQ Combined Section */}
      <section className="py-40 border-t border-white/5 relative bg-white/[0.01]">
        <div className="max-width-container relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              <div className="gsap-reveal">
                 <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Support & Trust</span>
                 <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight uppercase mb-10">
                   Simplified <span className="text-primary italic">Support.</span>
                 </h2>
                 <p className="text-white/70 text-lg font-medium leading-relaxed max-w-lg mb-12">
                   We provide dedicated attention to your local business needs, from automated bookings for clinics to interactive menus for restaurants. Our pricing reflects the high-quality results we deliver.
                 </p>
                 <div className="flex items-center gap-12">
                    <div>
                      <p className="text-white font-black text-3xl tracking-tighter">98%</p>
                      <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Satisfaction</p>
                    </div>
                    <div className="w-px h-12 bg-white/10" />
                    <div>
                      <p className="text-white font-black text-3xl tracking-tighter">24/7</p>
                      <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Assistance</p>
                    </div>
                 </div>
              </div>

              <div className="gsap-reveal">
                 <Accordion type="single" collapsible className="space-y-3">
                    {faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="bg-white/[0.02] border border-white/5 px-6 hover:bg-white/[0.03] transition-all duration-300">
                        <AccordionTrigger className="text-left font-bold text-sm text-white/90 hover:text-white hover:no-underline py-6">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-white/60 text-sm font-medium leading-relaxed pb-6">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                 </Accordion>
              </div>
           </div>
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="py-20 border-t border-white/5 text-center opacity-20">
         <span className="text-[9px] font-bold uppercase tracking-[1em] text-white">DigiYugg</span>
      </div>
    </div>
  );
};

export default Pricing;

