import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Globe, FileText, Layers, MapPin, MessageCircle, Wrench,
  Star, Linkedin, ArrowRight, Users, CheckCircle, Building2, Sparkles, Shield, Clock
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: Globe, title: "Restaurant Digital Systems", desc: "Online menus, table bookings, and delivery integration for local eateries." },
  { icon: FileText, title: "Clinic Management Sites", desc: "Professional appointment booking systems and patient information portals." },
  { icon: Layers, title: "Gym & Fitness Platforms", desc: "Membership management, class schedules, and trainer profiles." },
  { icon: MapPin, title: "Salon Booking Solutions", desc: "Service catalogs with instant WhatsApp booking and location mapping." },
  { icon: MessageCircle, title: "Local Shop E-commerce", desc: "Turn your local inventory into an online store with secure payments." },
  { icon: Wrench, title: "Full Maintenance", desc: "24/7 support, security patches, and SEO updates for your local business." },
];

const stats = [
  { icon: CheckCircle, value: "50+", label: "Projects Completed" },
  { icon: Users, value: "40+", label: "Happy Clients" },
  { icon: Building2, value: "10+", label: "Industries Served" },
];

const testimonials = [
  { name: "Rajesh Kumar", business: "Kumar's Kitchen", text: "Coder Digital built a perfect ordering system for my restaurant. My local orders increased by 40%!", rating: 5 },
  { name: "Dr. Anjali Mehta", business: "Mehta Dental Clinic", text: "The appointment booking system they built is flawless. It has saved us hours of manual calls.", rating: 5 },
  { name: "Suresh Singh", business: "City Fitness Gym", text: "Having a professional website changed how people in the neighborhood see my gym. Highly professional team!", rating: 5 },
];

const whyChooseUs = [
  { icon: Sparkles, title: "Modern Design", desc: "Clean, professional websites that impress your customers." },
  { icon: Shield, title: "Reliable Support", desc: "We're always available for updates, fixes, and questions." },
  { icon: Clock, title: "Fast Delivery", desc: "Your website is ready within 5–7 business days." },
];

const faqs = [
  { q: "How much does a website cost?", a: "Our plans start at just ₹3,000 for a single-page website. Multi-page sites range from ₹8,000 to ₹15,000 depending on features." },
  { q: "How long does it take to build a website?", a: "A basic one-page website takes 3–5 days. Multi-page websites take 7–10 business days." },
  { q: "Do I need to know anything technical?", a: "Not at all! We handle everything — from design to development to hosting." },
  { q: "Will my website work on mobile phones?", a: "Yes! Every website we build is fully responsive and looks great on all devices." },
  { q: "Do you provide website maintenance?", a: "Yes, we offer ongoing maintenance plans covering content updates, security, and performance." },
  { q: "Can I see a demo before paying?", a: "Absolutely! We offer a free website demo so you can see your website before committing." },
  { q: "What if I want changes after the website is built?", a: "We include revision rounds in every plan. Our maintenance plans cover ongoing changes at affordable rates." },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    document.title = "Coder Digital Solutions – Modern Digital Systems for Local Enterprises";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-tag", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".hero-heading", { y: 40, opacity: 0, duration: 1, ease: "power4.out" }, "-=0.6")
        .from(".hero-description", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
        .from(".hero-actions", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(".hero-visual", { scale: 0.95, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=0.8");

      // Smooth Background Parallax
      gsap.to(".hero-bg-accent", {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Stats Counters
      const counters = document.querySelectorAll(".stat-counter");
      counters.forEach((counter) => {
        const value = parseInt(counter.getAttribute("data-value") || "0");
        gsap.from(counter, {
          textContent: 0,
          duration: 2,
          ease: "expo.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
          },
        });
      });

      // Unified Section Reveals
      const revealSections = document.querySelectorAll(".gsap-reveal");
      revealSections.forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="bg-background text-foreground noise-bg overflow-x-hidden">
      {/* Hero / About Split Section */}
      <section id="about" className="relative min-h-screen flex items-center pt-32 pb-20 border-b border-white/5 overflow-hidden">
        {/* Background Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            className="w-full h-full object-cover grayscale brightness-50 opacity-60 transition-opacity duration-1000"
          >
            <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27dbcc6a765354d5410898a9cd411802ebde164&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          </video>
          {/* Brand Tint Overlay */}
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="max-width-container w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch">

            {/* Left Column: About Intro */}
            <div className="flex flex-col justify-center space-y-12 py-12 gsap-reveal">
              <div>
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Elevate Your Presence</span>
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-10">
                  Establish A Strong <span className="text-primary">Presence,</span> In A Digital World
                </h1>
                <p className="text-white/40 text-lg max-w-lg font-medium leading-relaxed mb-12">
                  Coder Digital Solutions helps local businesses like restaurants, clinics, and shops build professional, affordable websites that reach more customers.
                </p>

                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  {[
                    { label: "Who We Are", id: "who-we-are" },
                    { label: "Our Values", id: "values" },
                    { label: "Our Team", id: "founders" },
                    { label: "Solutions", id: "solutions" }
                  ].map(link => (
                    <button
                      key={link.label}
                      onClick={() => scrollToSection(link.id)}
                      className="flex items-center gap-2 group"
                    >
                      <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-primary border-b-[5px] border-b-transparent transition-transform group-hover:translate-x-1" />
                      <span className="text-white font-black uppercase tracking-[0.2em] text-[10px] group-hover:text-primary transition-colors">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative aspect-video rounded-none overflow-hidden border border-white/10 mt-12">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
                  alt="Digital Agency Team"
                  className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                />
              </div>
            </div>

            {/* Vertical Divider (Desktop Only) */}
            <div className="vertical-divider mt-20">
              <div className="divider-dot" style={{ top: '35%' }} />
            </div>

            {/* Right Column: Key Stats / Who We Are */}
            <div id="who-we-are" className="flex flex-col justify-center space-y-20 py-12 md:pl-24 gsap-reveal">
              <div>
                <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-12 block">Who We Are</span>

                <div className="space-y-20">
                  {[
                    { num: "02", label: "Visionary\nFounders" },
                    { num: "50+", label: "Digital Projects\nCompleted" },
                    { num: "24/7", label: "Reliable\nSupport" }
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-14 group">
                      <div className="text-8xl md:text-[10rem] font-black text-primary leading-none tracking-tighter transition-transform duration-500 group-hover:scale-105">
                        {s.num}
                      </div>
                      <div className="pt-6">
                        <p className="text-primary font-black uppercase tracking-[0.2em] text-[11px] leading-relaxed whitespace-pre-line group-hover:text-white transition-colors">
                          {s.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section id="values" className="section-padding relative border-b border-white/5">
        <div className="max-width-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="gsap-reveal">
              <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Our Values</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight max-w-xl">
                The Principles That <br />
                Drive Our Excellence
              </h2>
            </div>

            <div className="space-y-px bg-white/10 border border-white/10 gsap-reveal">
              {[
                { title: "Presence", desc: "Helping small businesses establish a unique digital identity and reach customers online." },
                { title: "Precision", desc: "Modern, mobile-responsive designs optimized for clinics, gyms, and retail shops." },
                { title: "Integration", desc: "Seamless domain, hosting, Google Maps, and WhatsApp communication tools." },
                { title: "Expansion", desc: "Long-term support for SEO, digital marketing, and software transformation." }
              ].map((v, i) => (
                <div key={i} className="group relative bg-black p-10 flex items-start justify-between transition-colors hover:bg-primary/5">
                  <div className="max-w-md">
                    <h3 className="text-primary font-bold text-2xl mb-4 transition-colors group-hover:text-white">{v.title}</h3>
                    <p className="text-white/40 text-sm font-medium leading-relaxed group-hover:text-white/60 transition-colors">{v.desc}</p>
                  </div>
                  <div className="text-7xl font-black text-primary/10 tracking-tighter transition-all duration-500 group-hover:text-primary group-hover:scale-110">
                    0{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Showcase / Solutions */}
      <section id="solutions" className="section-padding bg-black border-y border-white/5 relative overflow-hidden">
        <div className="max-width-container relative z-10">
          <div className="gsap-reveal mb-16 md:mb-32">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Sector Solutions</span>
            <h2 className="text-4xl md:text-8xl font-black text-white tracking-tighter leading-[0.8]">
              Engineered For <br /> <span className="text-primary italic">Every Industry.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { title: "Restaurant", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9", desc: "Digital dining systems & mobile menus." },
              { title: "Clinic", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d", desc: "Seamless appointment & patient booking." },
              { title: "Gym & Fitness", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48", desc: "Membership logic & class coordination." },
              { title: "Salon & Spa", img: "https://images.unsplash.com/photo-1560066984-138dadb4c035", desc: "High-end booking & schedule management." },
              { title: "Local Enterprise", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab", desc: "Corporate grade local digital presence." },
              { title: "Retail Hub", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8", desc: "E-commerce & inventory transformation." }
            ].map((sol, i) => (
              <div key={i} className="bg-black p-12 group gsap-reveal relative overflow-hidden transition-colors hover:bg-primary/5">
                <div className="absolute inset-0 opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000">
                  <img src={`${sol.img}?auto=format&fit=crop&q=80`} alt={sol.title} className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-32">
                    <div className="w-1.5 h-1.5 bg-primary rotate-45" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">System 0{i + 1}</span>
                  </div>

                  <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight group-hover:text-primary transition-colors">{sol.title}</h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed mb-10">{sol.desc}</p>

                  <Button variant="ghost" asChild className="p-0 h-auto text-[10px] font-black uppercase tracking-[0.3em] text-white hover:text-primary hover:bg-transparent transition-colors">
                    <Link to="/contact" className="flex items-center gap-4">Initialize Build <ArrowRight className="w-4 h-4" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="section-padding relative overflow-hidden">
        <div className="max-width-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 gsap-reveal">
              <div className="grid grid-cols-2 gap-4 h-[600px]">
                {[
                  { name: "Raj Singh", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
                  { name: "Vaibhav Gupta", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" }
                ].map((f, i) => (
                  <div key={i} className={`relative group h-full ${i === 1 ? 'pt-20' : ''}`}>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <img src={f.img} alt={f.name} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
                    <div className="absolute bottom-4 left-4 z-20">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white">{f.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="gsap-reveal">
                <h2 className="text-[10rem] md:text-[14rem] font-black text-primary/10 leading-[0.8] tracking-tighter absolute -left-20 top-0 -z-10 select-none">
                  Meet Our <br /> Founders
                </h2>
                <div className="relative z-10 pt-20">
                  <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block">Our Leadership</span>
                  <p className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-10">
                    "We empower small businesses to grow digitally and compete in the modern marketplace."
                  </p>
                  <div className="w-20 h-px bg-primary mb-10" />
                  <p className="text-white/40 text-lg font-medium leading-relaxed">
                    Founded by Raj Singh and Vaibhav Gupta, Coder Digital provides reliable digital solutions to help local enterprises nourish and expand.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding bg-white/[0.01]">
        <div className="max-width-container">
          <div className="gsap-reveal text-center mb-20 md:mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Voices of Success.</h2>
            <p className="text-muted-foreground mt-6 text-xl font-medium">Trusted by founders and enterprises across the region.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="gsap-reveal">
                <div className="glass-card h-full p-10 rounded-[2.5rem] flex flex-col justify-between group">
                  <div>
                    <div className="flex gap-1 mb-8">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} className={`h-4 w-4 ${si < t.rating ? "text-white fill-white" : "text-white/10"}`} />
                      ))}
                    </div>
                    <p className="text-xl text-white/90 leading-relaxed font-medium italic">"{t.text}"</p>
                  </div>
                  <div className="mt-12 flex items-center gap-5 pt-8 border-t border-white/10">
                    <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-black text-xl shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                      {t.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{t.name}</div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{t.business}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding border-t border-white/5 relative">
        <div className="max-width-container max-w-4xl mx-auto">
          <div className="gsap-reveal text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Common Inquiries.</h2>
          </div>
          <div className="gsap-reveal">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white/[0.03] border border-white/10 rounded-3xl px-8 data-[state=open]:border-white/20 transition-all duration-500 overflow-hidden">
                  <AccordionTrigger className="text-left font-bold text-xl text-white hover:no-underline py-8">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA: Scattered Gallery Style */}
      <section className="py-40 relative overflow-hidden bg-black border-t border-white/5">
        <div className="absolute inset-x-0 top-20 text-center pointer-events-none select-none opacity-5">
          <span className="text-[30vw] font-black text-primary leading-none tracking-tighter">coder</span>
        </div>

        <div className="max-width-container relative z-10">
          <div className="flex flex-col items-center text-center mb-32">
            <span className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] mb-8 block grayscale opacity-50">Future-Focused</span>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] mb-12">
              Bring Your <br /> <span className="text-primary italic">Vision to Life.</span>
            </h2>
            <p className="max-w-2xl text-white/40 text-xl font-medium leading-relaxed mb-16">
              Partner with Coder Digital to transform your local business into a digital landmark.
              Our enterprise-grade systems are built for the next decade of internet commerce.
            </p>
            <Button asChild className="bg-primary text-black hover:bg-primary/90 h-20 px-16 rounded-none font-black text-xs uppercase tracking-[0.4em] transition-all transform hover:scale-105 shadow-[0_20px_60px_rgba(255,127,0,0.2)]">
              <Link to="/contact">Start Your Journey</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 gsap-reveal">
            {[
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
              "https://images.unsplash.com/photo-1497366216548-37526070297c",
              "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
              "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            ].map((url, i) => (
              <div key={i} className={`aspect-video border border-white/10 overflow-hidden relative group transform transition-all duration-700 hover:scale-[1.02] ${i % 2 === 0 ? 'md:mt-12' : ''}`}>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-all z-10" />
                <img
                  src={`${url}?auto=format&fit=crop&q=80`}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  alt="Work Sample"
                />
                <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1">Project 0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[50vh] bg-primary/5 rounded-[100%] blur-[120px] pointer-events-none -mb-[25vh]" />
      </section>
    </div>
  );
};

export default Index;
