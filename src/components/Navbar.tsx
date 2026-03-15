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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled
        ? "bg-black/90 backdrop-blur-md border-white/5 py-4"
        : "bg-transparent border-transparent py-6"
        }`}
    >
      <nav className="max-width-container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-4xl font-black text-primary tracking-tighter transition-transform duration-300 group-hover:scale-105">coder</span>
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
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black pt-24 px-6 animate-fade-in">
          <div className="flex flex-col gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.path}
                onClick={(e) => {
                  handleNavClick(e, l.hash);
                  setOpen(false);
                }}
                className={`
                  text-3xl font-black uppercase tracking-tighter
                  ${location.pathname === l.path && !l.hash ? "text-primary" : "text-white"}
                `}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="outline" className="w-full mt-8 border-primary text-primary rounded-none h-16 uppercase font-black tracking-widest">
              <Link to="/contact" onClick={() => setOpen(false)}>Contact Us</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
