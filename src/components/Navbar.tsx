import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

const navLinks = [
  { label: "Home", path: "/", hash: "#about" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/portfolio" },
  { label: "Products", path: "/products" },
  { label: "Pricing", path: "/pricing" },

];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash?: string) => {
    if (hash && location.pathname === "/") {
      e.preventDefault();
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b [transform:translateZ(0)] ${scrolled
          ? "bg-black backdrop-blur-md border-white/5 py-4"
          : "bg-black/60 backdrop-blur-md border-white/10 lg:bg-transparent lg:border-transparent py-6"
          }`}
      >
        <nav className="max-width-container flex items-center justify-between">
          <Link to="/" className={`flex items-center group transition-opacity duration-300 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <img
              src="/logo.png"
              alt="DigiYugg Logo"
              className="h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.path}
                onClick={(e) => handleNavClick(e, l.hash)}
                className={`
                text-sm font-bold uppercase tracking-widest transition-all duration-300 
                ${(location.pathname === l.path && !l.hash) || (l.hash && location.pathname === "/" && window.location.hash === l.hash)
                    ? "text-primary"
                    : "text-white/60 hover:text-primary"
                  }
              `}
              >
                {l.label}
              </Link>
            ))}

            <div className="w-px h-6 bg-white/20 mx-2" />

            <div className="flex items-center gap-4">

              <Button asChild variant="outline" className="hidden border-white/20 hover:border-primary hover:text-black  text-white rounded-none border-2 px-8 h-12 uppercase text-xs font-black tracking-widest transition-all md:flex">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2 relative z-[10000]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Moved outside header for proper stacking */}
      <div
        className={`lg:hidden fixed inset-0 w-[70%] md:w-[50%] transition-opacity transition-transform duration-500 ease-expo ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        style={{
          backgroundColor: '#000000',
          zIndex: 9999,
          opacity: open ? 1 : 0,
          height: '100dvh'
        }}
      >
        <div className="flex flex-col h-full   pt-8 px-5">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" onClick={() => setOpen(false)}>
              <img src="/logo.png" alt="DigiYugg" className="h-10 w-auto" />
            </Link>

          </div>

          <div className="flex  flex-col gap-6">
            {navLinks.map((l, i) => (
              <Link
                key={l.label}
                to={l.path}
                onClick={(e) => {
                  handleNavClick(e, l.hash);
                  setOpen(false);
                }}
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`
                  text-2xl font-black uppercase tracking-tighter transition-all duration-500
                  ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}
                  ${location.pathname === l.path && !l.hash ? "text-primary" : "text-white hover:text-primary"}
                `}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div
            style={{ transitionDelay: `${navLinks.length * 100}ms` }}
            className={`mt-12 transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Button asChild className="w-full bg-primary text-black rounded-none h-16 uppercase font-black tracking-widest text-xs hover:scale-[1.02] transition-transform">
              <Link to="/contact" onClick={() => setOpen(false)}>Initialize Build</Link>
            </Button>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Quick Connect</p>
              <p className="text-white font-bold text-lg tracking-tight">hello@digiyugg.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
