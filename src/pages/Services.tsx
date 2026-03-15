import { Card, CardContent } from "@/components/ui/card";
import { Globe, FileText, Layers, MapPin, MessageCircle, Wrench, ArrowRight, Target, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Globe, title: "Mobile Systems", desc: "Digital first solutions for the modern mobile consumer." },
  { icon: FileText, title: "Retail Architect", desc: "Transforming physical retail into digital dominance." },
  { icon: Layers, title: "Enterprise Logic", desc: "Scalable systems for growing local enterprises." },
  { icon: MapPin, title: "Local Presence", desc: "Precision mapping and community engagement tools." },
  { icon: MessageCircle, title: "Real-time Connect", desc: "Instant communication channels for your customers." },
  { icon: Wrench, title: "Full Management", desc: "24/7 technical oversight and system maintenance." },
];

const expertiseCards = [
  { 
    title: "Enterprise Solutions", 
    desc: "Our efficient project execute team ensure projects are delivered in a timely manners including to perform inspection and quality check prior to the handover.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
  },
  { 
    title: "Digital Consultation", 
    desc: "Strategy-led development focusing on user-centric design and technical precision.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
  },
  { 
    title: "Specialist Delivery", 
    desc: "Reinstatement specialists and high-performance system delivery for complex local businesses.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
  }
];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    document.title = "Our Services – Coder Digital Solutions"; 

    const ctx = gsap.context(() => {
      // Grid reveal
      gsap.from(".service-grid-item", {
        scale: 0.9,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".service-grid",
          start: "top 85%"
        }
      });

      // Card reveals
      const cards = document.querySelectorAll(".expertise-card");
      cards.forEach((card) => {
        gsap.from(card, {
          x: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 bg-black text-white min-h-screen">
      {/* Services Grid Intro */}
      <section className="py-24 border-b border-white/5">
        <div className="max-width-container">
          <div className="gsap-reveal mb-20">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Services</span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter">
              Our Area of <br/> Expertise Space
            </h1>
          </div>
          
          <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-white/10">
            {services.map((s, i) => (
              <div key={i} className="service-grid-item group relative aspect-square border border-white/10 p-12 flex flex-col justify-between overflow-hidden bg-black transition-colors hover:bg-primary/5">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-primary" />
                <div className="relative z-10">
                  <s.icon className="h-10 w-10 text-primary mb-12" />
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{s.title}</h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed group-hover:text-white/80 transition-colors">
                    {s.desc}
                  </p>
                </div>
                <div className="relative z-10 flex justify-end">
                   <div className="text-6xl font-black text-white/[0.03] group-hover:text-primary transition-colors">0{i+1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Cards Section */}
      <section className="section-padding relative overflow-hidden bg-white/[0.01]">
        <div className="max-width-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseCards.map((card, i) => (
              <div key={i} className="expertise-card group relative">
                <div className="relative aspect-[3/4] overflow-hidden border border-white/10 mb-8 bg-[#0D0D10]">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-10 flex flex-col justify-end">
                    <div className="w-12 h-px bg-primary mb-6" />
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{card.title}</h3>
                    <p className="text-white/40 text-xs font-medium leading-relaxed h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Digital Architecture Section */}
      <section className="py-40 bg-white/[0.02] border-y border-white/5 overflow-hidden">
        <div className="max-width-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="gsap-reveal">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Future-Proof</span>
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-12 uppercase">
                3D Digital <br/> <span className="text-primary italic">Architecture</span>
              </h2>
              <p className="text-white/40 text-xl font-medium leading-relaxed mb-12">
                We don't just build pages; we architect immersive digital environments. 
                Our systems are engineered for depth, performance, and industrial-grade stability.
              </p>
              <div className="space-y-4">
                 {[
                   "Volumetric User Interfaces",
                   "Dynamic Physics-based Motion",
                   "Industrial Data Stream Integration"
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 group">
                      <div className="w-1.5 h-1.5 bg-primary translate-y-px" />
                      <span className="text-xs font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{item}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* CSS 3D Cube Simulation */}
            <div className="relative aspect-square flex items-center justify-center pt-20">
               <div className="cube-container w-48 h-48 md:w-64 md:h-64 perspective-[1000px]">
                  <div className="cube relative w-full h-full preserve-3d animate-spin-slow">
                    <div className="face flex items-center justify-center absolute w-full h-full bg-primary/10 border border-primary/40 -translate-z-[96px] md:-translate-z-[128px]">
                       <Globe className="w-12 h-12 text-primary opacity-40" />
                    </div>
                    <div className="face flex items-center justify-center absolute w-full h-full bg-primary/10 border border-primary/40 translate-z-[96px] md:translate-z-[128px]">
                       <Target className="w-12 h-12 text-primary" />
                    </div>
                    <div className="face flex items-center justify-center absolute w-full h-full bg-primary/10 border border-primary/40 translate-y-[96px] md:translate-y-[128px] rotate-x-90">
                       <Zap className="w-12 h-12 text-primary opacity-40" />
                    </div>
                    <div className="face flex items-center justify-center absolute w-full h-full bg-primary/10 border border-primary/40 -translate-y-[96px] md:-translate-y-[128px] rotate-x-90 text-[10px] font-black uppercase tracking-widest text-primary p-4 text-center">
                       Digital Core
                    </div>
                    <div className="face flex items-center justify-center absolute w-full h-full bg-primary/10 border border-primary/40 translate-x-[96px] md:translate-x-[128px] rotate-y-90">
                        <Layers className="w-12 h-12 text-primary opacity-40" />
                    </div>
                    <div className="face flex items-center justify-center absolute w-full h-full bg-primary/10 border border-primary/40 -translate-x-[96px] md:-translate-x-[128px] rotate-y-90">
                        <Shield className="w-12 h-12 text-primary opacity-40" />
                    </div>
                  </div>
                  {/* Outer Glow Ring */}
                  <div className="absolute inset-0 border border-primary/10 rounded-full scale-150 blur-2xl opacity-20" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative flex items-center justify-center border-t border-white/5">
        <div className="max-width-container text-center">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-12">
              On Time, On Budget, <br/>
              <span className="text-primary tracking-[0.2em]">Beyond Expectations</span>
            </h2>
            <Button asChild className="bg-primary text-black hover:bg-primary/90 rounded-none h-16 px-12 text-xs font-black uppercase tracking-[0.3em] transition-all transform hover:scale-105">
              <Link to="/contact">Discuss Your Systems</Link>
            </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
