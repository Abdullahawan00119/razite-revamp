import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/razite-logo.jpeg";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <img src={logo} alt="Razite" className="h-10 w-auto mb-4 brightness-0 invert" />
          <p className="text-sm opacity-70 leading-relaxed">
            From startup sparks to enterprise engines, we turn bold visions into high-impact digital products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider opacity-60">Company</h4>
          <ul className="space-y-2.5 text-sm opacity-80">
            {[["About Us", "/about"], ["Services", "/services"], ["Projects", "/projects"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, path]) => (
              <li key={path}><Link to={path} className="hover:opacity-100 transition-opacity">{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider opacity-60">Services</h4>
          <ul className="space-y-2.5 text-sm opacity-80">
            <li>IT Consultancy</li>
            <li>App Development</li>
            <li>Data Processing</li>
            <li>Analytics & BI</li>
            <li>Geo-Spatial Data</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider opacity-60">Get in Touch</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> info@razite.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +92 339-8222888</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> House No. 32, Phase-3, Shahbaz Town, Quetta, Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs opacity-50">
        © {new Date().getFullYear()} Razite. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
