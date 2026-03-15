import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe, Shield, Target, Zap, Building, Trophy, Briefcase,
  Cpu, Terminal, Layers, ShieldCheck, ChevronRight, Activity,
  Server, HardDrive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);


const capabilities = [
  {
    title: "Technical_Precision",
    icon: Target,
    desc: "Building high-fidelity digital systems tailored to specific business logic and workflows."
  },
  {
    title: "Core_Stability",
    icon: ShieldCheck,
    desc: "Industrial-grade hosting and 24/7 endpoint monitoring to ensure zero-downtime operations."
  },
  {
    title: "Digital_Migration",
    icon: Layers,
    desc: "Seamlessly transitioning local enterprises into competitive digital market leaders with modern tech stakcs."
  }
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "About Us | DigiYugg";

    const ctx = gsap.context(() => {
      // Reveal Animations
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

      // Logo Grid Stagger - Fast trigger
      gsap.from(".client-logo", {
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".client-grid",
          start: "top 95%" // Trigger earlier
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen pt-20 relative overflow-hidden">
      {/* Subtle Ambient Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,127,0,0.03)_0,transparent_70%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 z-10">
        <div className="max-width-container text-center gsap-reveal">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">About Us</span>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] max-w-5xl mx-auto mb-12 uppercase">
            Building A <span className="text-primary">Reliable</span> <br /> Digital Foundation.
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            DigiYugg is a trusted technology partner for local businesses,
            providing integrated digital services that empower sustainable growth.
          </p>
        </div>
      </section>



      {/* Philosophy Section */}
      <section className="py-32 relative z-10">
        <div className="max-width-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="gsap-reveal">
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Philosophy</span>

              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-10 uppercase">
                Architecture <br />
                Built For <span className="text-primary italic">Performance.</span>
              </h2>

              <div className="space-y-8 text-white/70 text-lg font-medium leading-relaxed">
                <p>
                  We focus on delivering creative, high-quality projects that meet professional standards. We take special care to ensure our projects are delivered with precision and reliability.
                </p>
                <p>
                  Our goal is to connect small businesses—clinics, restaurants, and boutiques—with the digital world by designing clean, modern, and mobile-responsive websites.
                </p>
              </div>
            </div>

            <div className="relative aspect-video gsap-reveal group overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                alt="Philosophy"
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid (Cards) - RESTORED */}
      <section className="py-32 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-width-container">
          <div className="text-center mb-20 gsap-reveal">
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Our Values</span>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Foundations of Success</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((v, i) => (
              <div key={i} className="gsap-reveal group bg-white/[0.02] border border-white/[0.05] p-10 hover:border-primary/40 transition-all duration-500">
                <div className="mb-6 w-12 h-12 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                  <v.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>

                <h3 className="text-lg font-black text-white mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">{v.title.replace('_', ' ')}</h3>
                <p className="text-white/60 text-sm font-medium leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process (Premium Stepped Cards) */}
      <section className="py-40 relative z-10 border-t border-white/5">
        <div className="max-width-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 gsap-reveal">
            <div className="max-w-xl">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Execution Lifecycle</span>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">How We <br /> <span className="text-primary italic">Scale Success.</span></h2>
            </div>
            <p className="text-white/60 text-lg font-medium max-w-sm leading-relaxed">
              A refined technical roadmap designed to transform primitive concepts into high-performance digital landmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {[
              { step: "01", title: "Discovery", desc: "Technical audit of business infrastructure to identify growth nodes and digital opportunities." },
              { step: "02", title: "Blueprint", desc: "Architecting a custom strategic roadmap with high-fidelity design prototypes." },
              { step: "03", title: "Synthesis", desc: "Development phase focused on performance optimization and structural integrity." },
              { step: "04", title: "Launch", desc: "Continuous deployment and enterprise-grade support for sustainable ecosystem health." }
            ].map((p, i) => (
              <div key={i} className="gsap-reveal group p-12 bg-black hover:bg-white/[0.01] transition-colors duration-500 relative overflow-hidden">
                {/* Step Number Accent */}
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-80 transition-all duration-500">
                  <span className="text-8xl font-black text-white leading-none tracking-tighter">{p.step}</span>
                </div>

                <div className="relative z-10">
                  <div className="w-8 h-px bg-primary mb-8 group-hover:w-16 transition-all duration-500" />
                  <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] mb-4 block">Phase_{p.step}</span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-6 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-white/60 text-sm font-medium leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-white/10 group-hover:border-primary transition-colors" />
              </div>
            ))}
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

export default About;
