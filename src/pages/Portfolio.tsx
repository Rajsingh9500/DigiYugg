import { Button } from "@/components/ui/button";
import { ExternalLink, UtensilsCrossed, Stethoscope, Dumbbell, Scissors, GraduationCap } from "lucide-react";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  { icon: UtensilsCrossed, title: "Culinary Digital", category: "Hospitality", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" },
  { icon: Stethoscope, title: "Health Logic", category: "Medical", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80" },
  { icon: Dumbbell, title: "Iron System", category: "Fitness", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80" },
  { icon: Scissors, title: "Luxe Cut", category: "Salon", img: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80" },
  { icon: GraduationCap, title: "Vision Academy", category: "Education", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" },
  { icon: Globe, title: "Global Retail", category: "E-commerce", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80" },
];

import { Globe } from "lucide-react";

const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => { 
    document.title = "Projects | Coder Digital Solutions"; 

    const ctx = gsap.context(() => {
      const items = document.querySelectorAll(".portfolio-item");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: i % 2 === 0 ? 100 : 200,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%",
          }
        });

        // Parallax effect
        gsap.to(item.querySelector("img"), {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen pt-20">
      {/* Intro Header */}
      <section className="py-24 border-b border-white/5">
        <div className="max-width-container">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Showcase</span>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] mb-12">
            Selected <br/> <span className="text-primary italic">Works</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg font-medium leading-relaxed">
            A curated selection of digital systems designed to empower local businesses. 
            Each project is a testament to our commitment to precision and performance.
          </p>
        </div>
      </section>

      {/* Scattered Gallery */}
      <section className="py-32">
        <div className="max-width-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {portfolioItems.map((item, i) => (
              <div 
                key={i} 
                className={`portfolio-item group relative ${i % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0D0D10] border border-white/5">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end">
                     <Button 
                        variant="link" 
                        className="text-white p-0 h-auto justify-start gap-4 uppercase font-black tracking-widest text-xs"
                        onClick={() => toast({ title: "Coming soon!", description: "High-fidelity demo is being prepared." })}
                     >
                        View Project <ExternalLink className="w-4 h-4" />
                     </Button>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between items-end">
                  <div>
                    <span className="text-primary font-bold uppercase tracking-widest text-[9px] mb-2 block">{item.category}</span>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">{item.title}</h3>
                  </div>
                  <item.icon className="w-10 h-10 text-white/10 group-hover:text-primary transition-colors mb-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-padding bg-white/[0.01] border-y border-white/5 text-center px-4">
        <div className="max-width-container">
           <h2 className="text-3xl md:text-5xl font-black text-white/80 tracking-tighter leading-tight max-w-4xl mx-auto mb-16">
             "We don't just build websites; we architect digital presence that converts local traffic into loyal customers."
           </h2>
           <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none h-16 px-12 text-xs font-black uppercase tracking-widest">
              <a href="/contact">Start Your Journey</a>
           </Button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
