import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    title: "Why Every Local Business Needs a Website in 2026",
    excerpt: "In today's digital-first world, not having a website means losing customers to competitors. Learn why even a simple one-page website can transform your local business.",
    date: "March 5, 2026",
    readTime: "5 min read",
    author: "Raj Singh",
    tag: "Business Growth",
    slug: "why-local-business-needs-website",
  },
  {
    title: "5 Ways a Website Helps Your Restaurant Get More Customers",
    excerpt: "From online menus to Google Maps integration, discover how a professional website can help your restaurant attract more diners and increase revenue.",
    date: "Feb 28, 2026",
    readTime: "4 min read",
    author: "Raj Singh",
    tag: "Restaurants",
    slug: "website-helps-restaurant",
  },
  {
    title: "How Clinics Can Use Websites to Build Patient Trust",
    excerpt: "Patients search online before choosing a doctor. A well-designed clinic website with doctor profiles and services builds credibility and trust instantly.",
    date: "Feb 20, 2026",
    readTime: "6 min read",
    author: "Raj Singh",
    tag: "Healthcare",
    slug: "clinics-website-patient-trust",
  },
  {
    title: "WhatsApp Integration: Convert Visitors Into Enquiries",
    excerpt: "Adding a WhatsApp button to your website lets customers reach you instantly. Learn how this simple feature can dramatically increase your enquiries.",
    date: "Feb 12, 2026",
    readTime: "3 min read",
    author: "Raj Singh",
    tag: "Tips & Tricks",
    slug: "whatsapp-integration-convert-visitors",
  },
];

const Blog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => { 
    document.title = "Blog | DigiYugg"; 

    const ctx = gsap.context(() => {
      const reveals = document.querySelectorAll(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.2,
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

  return (
    <div ref={containerRef} className="pt-20 bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 border-b border-white/5">
        <div className="max-width-container">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Insights</span>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.8] tracking-tighter mb-12">
            Intelligence <br/> <span className="text-primary italic">& Future.</span>
          </h1>
          <p className="max-w-2xl text-white/40 text-lg font-medium leading-relaxed">
            Exploring the intersection of local traditional business and advanced digital infrastructure. 
            Strategies for the next generation of retailers.
          </p>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="py-24">
        <div className="max-width-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {blogPosts.map((post, i) => (
              <div key={i} className="bg-black p-12 group gsap-reveal relative overflow-hidden">
                {/* Visual Numbering */}
                <span className="absolute top-12 right-12 text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors">0{i+1}</span>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-1.5 h-1.5 bg-primary rotate-45" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{post.tag}</span>
                  </div>
                  
                  <h3 className="text-3xl font-black text-white mb-8 leading-tight tracking-tight group-hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/40 text-base font-medium leading-relaxed mb-12 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-8 text-[9px] font-black uppercase tracking-widest text-white/20">
                      <span className="flex items-center gap-2"><User className="w-3 h-3" /> {post.author}</span>
                      <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    
                    <button 
                      onClick={() => toast({ title: "Module Locked", description: "This deep-dive is currently in preview mode." })}
                      className="group/btn flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:text-primary transition-colors"
                    >
                      Read <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter / CTA */}
          <div className="mt-24 gsap-reveal">
            <div className="border border-white/10 p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-primary/20" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-primary/20" />
              
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter uppercase">
                Stay Ahead of the <br/> <span className="text-primary italic">Digital Curve</span>
              </h2>
              <p className="text-white/40 text-lg font-medium max-w-xl mb-12">
                Join our private intelligence stream for local business owners. 
                No fluff, just pure digital growth strategies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                 <input 
                   type="email" 
                   placeholder="Enter Workspace Email" 
                   className="bg-white/5 border border-white/10 rounded-none h-16 px-8 text-white focus:outline-none focus:border-primary transition-colors flex-1 font-bold text-xs uppercase tracking-widest"
                 />
                 <Button className="bg-primary text-black hover:bg-white h-16 px-10 rounded-none font-black text-xs uppercase tracking-[0.3em] transition-all">
                   Subscribe
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
