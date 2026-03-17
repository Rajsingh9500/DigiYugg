import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Zap, Globe, Cpu, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Starter",
    tagline: "Get online and get noticed",
    price: "₹8,000",
    desc: "For new businesses taking their first digital step.",
    delivery: "7 Business Days",
    support: null,
    features: [
      "Pages as per business need",
      "Mobile-First Design",
      "WhatsApp & Google Maps Integration",
      "Social Media Links",
      "Contact Form",
      "SSL Security",
      "Basic On-Page SEO",
    ],
    highlighted: false,
    icon: Globe,
  },
  {
    name: "Growth",
    tagline: "Turn visitors into customers",
    price: "₹22,000",
    desc: "For established businesses ready to scale digitally.",
    delivery: "15 Business Days",
    support: "3 Months Post-Launch Support",
    features: [
      "Pages as per business need",
      "Appointment / Table Booking System",
      "Lead Capture & Inquiry Management",
      "Advanced SEO Setup",
      "Google Analytics Dashboard",
      "Speed & Performance Optimization",
      "3 Months Post-Launch Support",
    ],
    highlighted: true,
    icon: Zap,
  },
  {
    name: "Elite",
    tagline: "Your business, fully digitized",
    price: "₹55,000+",
    desc: "For brands that want a complete digital ecosystem.",
    delivery: "30 Business Days",
    support: "1 Year Maintenance Included",
    features: [
      "Unlimited Pages, Fully Custom",
      "Online Payment Gateway (Razorpay/UPI)",
      "Custom Admin Panel & Dashboard",
      "CRM & Third-Party Integrations",
      "Multi-Language Support (Hindi + English)",
      "Staff & Operations Portal",
      "Dedicated Technical Strategist",
      "1 Year Maintenance Included",
    ],
    highlighted: false,
    icon: Cpu,
  },
];

const faqs = [
  {
    q: "How many pages will my website have?",
    a: "We build pages based on your actual business needs — not a fixed number. A restaurant might need Home, Menu, Gallery, Booking & Contact. A clinic might need different pages. We scope it properly during our call.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. All our websites are built to be scalable. You can start with Starter and move to Growth or Elite as your business grows — we make the transition smooth.",
  },
  {
    q: "Are there any recurring costs?",
    a: "The build fee is one-time. Standard domain and hosting renewals apply annually. We're fully transparent about these — no hidden surprises.",
  },
  {
    q: "What does '1 Year Maintenance' in Elite include?",
    a: "Security patches, uptime monitoring, content updates, SEO audits, and priority support for a full year — so your website stays fast, secure, and up to date without any extra cost.",
  },
  {
    q: "Do you work with businesses outside Indore?",
    a: "Yes! While we're based in Indore, we work with businesses across India. Everything is handled remotely and our team stays in close contact throughout the project.",
  },
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
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 bg-black text-white min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,127,0,0.03)_0,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <section className="py-24 border-b border-white/5 relative z-10">
        <div className="max-width-container">
          <div className="flex items-center gap-4 mb-8 gsap-reveal">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px]">Pricing & Plans</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 gsap-reveal uppercase">
                Transparent <br /> <span className="text-primary">Pricing.</span>
              </h1>
            </div>
            <div className="pb-4 gsap-reveal">
              <p className="max-w-xl text-white/70 text-lg font-medium leading-relaxed">
                Professional digital solutions built around your business needs.
                Simple, transparent pricing with zero hidden fees.
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
                className={`gsap-reveal flex flex-col p-12 border transition-all duration-500 relative group overflow-hidden ${plan.highlighted
                  ? "bg-white/[0.03] border-primary/40"
                  : "bg-white/[0.01] border-white/5 hover:border-white/10"
                  }`}
              >
                <div className="mb-10 relative z-10">
                  {/* Plan Name & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <plan.icon className={`w-5 h-5 ${plan.highlighted ? "text-primary" : "text-white/60"}`} />
                      <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${plan.highlighted ? "text-primary" : "text-white/60"}`}>
                        {plan.name}
                      </span>
                    </div>
                    {plan.highlighted && (
                      <span className="px-3 py-1 bg-primary text-[8px] font-black uppercase tracking-widest text-black">
                        Most Popular
                      </span>
                    )}
                  </div>

                  {/* Tagline */}
                  <p className={`text-[11px] font-bold uppercase tracking-widest mb-6 ${plan.highlighted ? "text-primary/70" : "text-white/30"}`}>
                    "{plan.tagline}"
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  </div>

                  {/* Desc */}
                  <p className="text-white/50 text-sm font-medium leading-relaxed mb-4">{plan.desc}</p>

                  {/* Delivery Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 border text-[10px] font-bold uppercase tracking-widest ${plan.highlighted ? "border-primary/30 text-primary/80" : "border-white/10 text-white/40"
                    }`}>
                    ⏱ {plan.delivery}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-14 flex-grow relative z-10">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-4 group/feature">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-primary" : "text-white/40"}`} />
                      <span className="text-xs font-medium text-white/70 group-hover/feature:text-white transition-colors leading-relaxed">
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className={`h-14 rounded-none font-black uppercase tracking-widest text-[10px] transition-all ${plan.highlighted
                    ? "bg-primary text-black hover:bg-white"
                    : "bg-white text-black hover:bg-primary"
                    }`}
                >
                  <Link to="/contact">
                    Get Started <ChevronRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <p className="text-center text-white/30 text-xs font-medium mt-10 gsap-reveal">
            Not sure which plan fits? Our team will help you choose the right one — free of charge.{" "}
            <Link to="/contact" className="text-primary underline underline-offset-4">Talk to us →</Link>
          </p>
        </div>
      </section>

      {/* Trust & FAQ Section */}
      <section className="py-40 border-t border-white/5 relative bg-white/[0.01]">
        <div className="max-width-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="gsap-reveal">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Support & Trust</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight uppercase mb-10">
                Simplified <span className="text-primary italic">Support.</span>
              </h2>
              <p className="text-white/70 text-lg font-medium leading-relaxed max-w-lg mb-12">
                From automated bookings for clinics to custom menus for restaurants — we build what your business actually needs. Every project is scoped personally, not templated.
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
                <div className="w-px h-12 bg-white/10" />
                <div>
                  <p className="text-white font-black text-3xl tracking-tighter">50+</p>
                  <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Projects Done</p>
                </div>
              </div>
            </div>

            <div className="gsap-reveal">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-white/[0.02] border border-white/5 px-6 hover:bg-white/[0.03] transition-all duration-300"
                  >
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