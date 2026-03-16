import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Monitor,
  BookOpen,
  GraduationCap,
  Database,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "pos",
    title: "POS System",
    badge: "Cloud-Based",
    desc: "A powerful, intuitive Point of Sale system designed for modern retail and restaurants. Track sales, manage inventory, and handle payments seamlessly.",
    icon: Monitor,
    features: ["Real-time Sales Tracking", "Inventory Management", "Customer Loyalty Programs", "multi-Payment Integration"],
    img: "/images/product_pos.png"
  },
  {
    id: "library",
    title: "Library Management",
    badge: "Automation Pro",
    desc: "Complete library automation system for schools, colleges, and private libraries. Effortless cataloging, circulation, and member management.",
    icon: BookOpen,
    features: ["Automated Cataloging", "Smart Circulation Flow", "Member Record Tracking", "Late Fee Management"],
    img: "/images/product_library.png"
  },
  {
    id: "school",
    title: "School Management",
    badge: "Campus OS",
    desc: "An all-in-one educational ecosystem to manage student data, fee collection, attendance, and administrative tasks with precision.",
    icon: GraduationCap,
    features: ["Student Profile Management", "Automated Fee Invoicing", "Attendance Tracking", "Exam & Result Portal"],
    img: "/images/product_school.png"
  },
  {
    id: "inventory",
    title: "Inventory Management",
    badge: "Supply Chain V2",
    desc: "Streamline your supply chain with real-time stock tracking, order fulfillment, and supplier management designed for growing businesses.",
    icon: Database,
    features: ["Real-time Stock Audits", "Low Stock Alerts", "Supplier Relationship Management", "Purchase Order Automation"],
    img: "/images/product_inventory.png"
  }
];

const Products = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Our Products – Subscription Management Systems | DigiYugg";

    const ctx = gsap.context(() => {
      // Hero reveal
      gsap.from(".product-hero-tag", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from(".product-hero-heading", { y: 40, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2 });

      // Card reveals
      const productCards = document.querySelectorAll(".product-section");
      productCards.forEach((card) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen pt-20 overflow-x-hidden">
      {/* Page Header */}
      <section className="py-24 border-b border-white/5">
        <div className="max-width-container">
          <div className="max-w-4xl">
            <span className="product-hero-tag text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Subscription Architectures</span>
            <h1 className="product-hero-heading text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-12 uppercase">
              Management <br /> <span className="text-primary italic">Ecosystems</span>
            </h1>
            <p className="text-white/40 text-xl font-medium leading-relaxed max-w-2xl">
              Precision-engineered subscription systems for the modern enterprise.
              Automate your workflows, eliminate manual errors, and scale your operations
              with our modular management solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="space-y-0 relative">
        {products.map((p, i) => (
          <section key={p.id} className="product-section py-32 border-b border-white/5 relative group">
            <div className="max-width-container">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                {/* Product Content */}
                <div className={i % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-primary/10 border border-primary/20">
                      <p.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-primary/60 font-black uppercase tracking-widest text-[10px]">{p.badge}</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-8">
                    {p.title}
                  </h2>

                  <p className="text-white/40 text-lg font-medium leading-relaxed mb-12">
                    {p.desc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {p.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 group/item">
                        <div className="w-1.5 h-1.5 bg-primary/40 group-hover/item:bg-primary transition-colors" />
                        <span className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover/item:text-white transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-6 pt-4">
                    <Button asChild className="bg-primary text-black hover:bg-white rounded-none px-8 h-14 font-black uppercase tracking-widest text-[10px] transition-all transform hover:scale-105">
                      <Link to="/contact">Get Started</Link>
                    </Button>
                    <Button variant="outline" className="border-white/10 text-white hover:border-primary rounded-none px-8 h-14 font-black uppercase tracking-widest text-[10px] transition-all">
                      Request Demo
                    </Button>
                  </div>
                </div>

                {/* Product Visual */}
                <div className={`relative ${i % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="aspect-video relative overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all duration-700 bg-[#0D0D10]">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover brightness-50  group-hover:brightness-90 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                    {/* Floating Tech Element */}
                    <div className="absolute bottom-8 right-8 p-4 bg-black border border-white/10 flex items-center gap-4 animate-pulse">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Subscription Active</span>
                    </div>
                  </div>
                  {/* Subtle Glow */}
                  <div className="absolute -inset-4 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
                </div>

              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Subscription Features Grid */}
      <section className="py-40 bg-zinc-950 border-t border-white/5">
        <div className="max-width-container">
          <div className="text-center mb-20 gsap-reveal">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Why Choose Our Ecosystems</span>
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-12 uppercase">
              The Subscription <br /> <span className="text-primary italic">Advantage</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: "Zero Setup Cost", desc: "No massive upfront investment required. Pay as you go with our modular pricing." },
              { icon: Clock, title: "24/7 Monitoring", desc: "Our engineers monitor your system health around the clock for maximum uptime." },
              { icon: GraduationCap, title: "Expert Training", desc: "We provide comprehensive onboarding and staff training for your new system." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 border border-white/5 hover:border-primary/20 transition-all duration-500">
                <feature.icon className="w-10 h-10 text-primary mb-8" />
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{feature.title}</h3>
                <p className="text-white/40 text-sm font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative flex items-center justify-center border-t border-white/5">
        <div className="max-width-container text-center">
          <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-tight mb-16">
            READY TO <br />
            <span className="text-primary tracking-[0.2em]">MODERNIZE?</span>
          </h2>
          <Button asChild className="bg-primary text-black hover:bg-white rounded-none h-20 px-16 text-xs font-black uppercase tracking-[0.4em] transition-all transform hover:scale-105 active:scale-95 shadow-[0_30px_60px_-15px_rgba(255,127,0,0.3)]">
            <Link to="/contact">Initialize Setup</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Products;
