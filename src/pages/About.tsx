import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Shield, Target, Zap, Users2, Building, Trophy, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  { name: "Shell", icon: Globe },
  { name: "Swire", icon: Building },
  { name: "Xilinx", icon: Zap },
  { name: "Jera", icon: Target },
  { name: "Symphony", icon: Trophy },
  { name: "Global", icon: Globe },
  { name: "Local", icon: Building },
  { name: "Enterprise", icon: Briefcase },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "About Us | Coder Digital Solutions";
    
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".about-hero-content", {
        y: 60,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      // Reveal Animations
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // Logo Grid Stagger
      gsap.from(".client-logo", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".client-grid",
          start: "top 80%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen pt-20 overflow-x-hidden">
      {/* Radial Glow Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-32 px-4 border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[100vh] bg-primary/20 rounded-full blur-[180px] opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-primary/10 rounded-full blur-[120px] opacity-30" />
        </div>

        <div className="max-width-container relative z-10 text-center about-hero-content">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-12 block">About Us</span>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] max-w-6xl mx-auto mb-16">
            Establishing A <span className="text-primary">Reliable</span> Digital Foundation for Every Local Enterprise.
          </h1>
          <p className="text-white/40 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            Coder Digital Solutions is a trusted partner for small and medium businesses, 
            providing integrated digital services that empower local growth in India and beyond.
          </p>
        </div>
        
        {/* Curved Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] h-[20vh] bg-primary/30 rounded-[100%] blur-[80px] opacity-40 -mb-[10vh]" />
      </section>

      {/* Client Logo Grid */}
      <section className="py-24 border-b border-white/5 bg-black/40">
        <div className="max-width-container">
          <div className="client-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {clients.map((client, i) => (
              <div key={i} className="client-logo bg-black p-12 flex items-center justify-center group grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex flex-col items-center gap-4 group-hover:scale-110 transition-transform">
                  <client.icon className="w-10 h-10 text-white/20 group-hover:text-primary transition-colors" />
                  <span className="text-white/10 group-hover:text-white uppercase font-black tracking-widest text-[10px]">{client.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding relative">
        <div className="max-width-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="gsap-reveal">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Our Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-10">
                Performance Driven <br/>
                Digital Architecture
              </h2>
              <div className="space-y-8 text-white/40 text-lg font-medium leading-relaxed">
                <p>
                  As digital transformation professionals, we focus on delivering innovative, creative projects which meet our client's standards. We take special care to ensure our projects are delivered on time and within budget.
                </p>
                <p>
                  Our goal is to connect small businesses—clinics, restaurants, boutiques—with the digital world by designing modern, mobile-responsive websites that showcase their heartbeat.
                </p>
              </div>
            </div>
            
            <div className="relative aspect-square gsap-reveal">
              <div className="absolute inset-0 border border-primary/20 rotate-3 p-4">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80" 
                  alt="Philosophy" 
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                />
              </div>
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Stack */}
      <section className="section-padding bg-white/[0.01] border-t border-white/5">
        <div className="max-width-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Precision", icon: Target, desc: "Building accurate digital systems tailored to specific business workflows." },
              { title: "Stability", icon: Shield, desc: "Reliable hosting and 24/7 support to ensure your business never sleeps." },
              { title: "Transformation", icon: Zap, desc: "Turning local shops into digital leaders with modern tech stacks." }
            ].map((v, i) => (
              <div key={i} className="gsap-reveal group">
                <div className="mb-8 p-6 bg-white/5 border border-white/10 inline-block group-hover:bg-primary transition-colors">
                  <v.icon className="w-8 h-8 text-primary group-hover:text-black" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{v.title}</h3>
                <p className="text-white/30 text-base font-medium leading-relaxed group-hover:text-white/60 transition-colors">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
