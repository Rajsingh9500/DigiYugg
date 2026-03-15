import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    price: "₹3,000",
    desc: "Essential digital presence for small shops.",
    features: ["Single Page System", "Mobile Responsive", "WhatsApp Integration", "Google Maps Setup", "Standard Security"],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₹8,000",
    desc: "Complete system for clinics and restaurants.",
    features: ["Multi-Page Architecture", "Booking/Menu System", "Advanced SEO Setup", "Custom Dashboards", "Priority Support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Tailored industrial and retail ecosystems.",
    features: ["Bespoke Logic", "Multi-location Support", "Full Maintenance", "API Integrations", "Dedicated Account Lead"],
    highlighted: false,
  },
];

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    document.title = "Pricing | Coder Digital Solutions"; 

    const ctx = gsap.context(() => {
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 bg-black text-white min-h-screen">
      <section className="py-24 border-b border-white/5">
        <div className="max-width-container">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Investment</span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter mb-12">
            Transparent <br/> <span className="text-primary">Value.</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg font-medium leading-relaxed">
            Professional digital architectures at competitive rates. 
            No hidden costs, just high-performance results for your local business.
          </p>
        </div>
      </section>

      <section className="py-32">
        <div className="max-width-container">
          <div className="grid grid-cols-1 md:grid-cols-3 border border-white/10">
            {plans.map((plan, i) => (
              <div 
                key={i} 
                className={`gsap-reveal flex flex-col p-12 border border-white/10 relative transition-all duration-500 hover:bg-white/[0.02] ${plan.highlighted ? 'bg-primary/5' : 'bg-black'}`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                )}
                
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                     <span className={`text-[10px] font-black uppercase tracking-widest ${plan.highlighted ? 'text-primary' : 'text-white/40'}`}>
                        {plan.name}
                     </span>
                     {plan.highlighted && <Sparkles className="w-4 h-4 text-primary" />}
                  </div>
                  <div className="text-6xl font-black text-white tracking-tighter mb-4">{plan.price}</div>
                  <p className="text-white/30 text-xs font-semibold leading-relaxed">{plan.desc}</p>
                </div>

                <div className="space-y-6 mb-16 flex-grow">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-4 group">
                      <div className={`w-1.5 h-1.5 ${plan.highlighted ? 'bg-primary' : 'bg-white/20'} rotate-45`} />
                      <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{f}</span>
                    </div>
                  ))}
                </div>

                <Button 
                   asChild 
                   className={`h-16 rounded-none uppercase font-black tracking-widest text-[10px] transition-all transform hover:scale-[1.02] ${plan.highlighted ? 'bg-primary text-black hover:bg-primary/90' : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'}`}
                >
                  <Link to="/contact">Establish System</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="pb-32 px-4">
        <div className="max-width-container border-t border-white/5 pt-20">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-[1.1] uppercase">
                Building trust through <br/> <span className="text-primary">technical precision</span> and <br/> fair engagement.
              </h2>
              <div className="space-y-6">
                <p className="text-white/40 font-medium leading-relaxed">
                  Every package includes specialized attention to your local niche. Whether you're a clinic requiring automated bookings or a restaurant needing an interactive menu, our pricing reflects the value we bring to your operational efficiency.
                </p>
                <div className="w-12 h-px bg-primary" />
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
