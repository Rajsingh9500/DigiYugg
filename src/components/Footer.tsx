import { Link } from "react-router-dom";
import { Code2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-black border-t border-white/10 text-white py-12">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <div className="flex items-center gap-3 font-bold text-xl mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <img src="/logo.png" alt="DigiYugg" className="h-10 w-auto object-contain" />

        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          We help local businesses build professional websites so customers can find them online.
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-300">Quick Links</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          {["Services", "Portfolio", "Pricing", "Blog", "Contact"].map((l) => (
            <li key={l}><Link to={`/${l.toLowerCase()}`} className="hover:text-white transition-colors">{l}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-slate-300">Contact</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@digiyugg.in</li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 62622 53146</li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Indore , India</li>
        </ul>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-500">
      © {new Date().getFullYear()} DigiYugg. All rights reserved.
    </div>
  </footer>
);

export default Footer;
