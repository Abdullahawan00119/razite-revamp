import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Linkedin, Twitter, Github, Facebook } from "lucide-react";
import logo from "@/assets/razite-logo.jpeg";

const footerLinks = {
  company: [
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Projects", path: "/projects" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ],
  services: [
    { label: "IT Consultancy", path: "/services" },
    { label: "App Development", path: "/services" },
    { label: "Data Processing", path: "/services" },
    { label: "Analytics & BI", path: "/services" },
    { label: "Geo-Spatial Data", path: "/services" },
    { label: "Hardware & Accessories", path: "/services" },
  ],
};

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/company/razite", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/razite", label: "Twitter" },
  { icon: Github, href: "https://github.com/razite", label: "GitHub" },
  { icon: Facebook, href: "https://facebook.com/razite", label: "Facebook" },
];

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container px-4 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-background/10 auto-rows-fr lg:min-h-[220px]">
        {/* Brand */}
        <div className="lg:col-span-1">
          <img src={logo} alt="Razite" className="h-10 w-auto mb-5 brightness-0 invert" />
          <p className="text-sm text-background/65 leading-relaxed mb-6">
            From startup sparks to enterprise engines, we turn bold visions into high-impact digital products.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="h-9 w-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-xs font-bold mb-5 uppercase tracking-widest text-background/50">Company</h4>
          <ul className="space-y-3">
            {footerLinks.company.map(({ label, path }) => (
              <li key={path + label}>
                <Link
                  to={path}
                  className="text-sm text-background/70 hover:text-background transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="text-xs font-bold mb-5 uppercase tracking-widest text-background/50">Services</h4>
          <ul className="space-y-3">
            {footerLinks.services.map(({ label, path }) => (
              <li key={label}>
                <Link
                  to={path}
                  className="text-sm text-background/70 hover:text-background transition-colors flex items-center gap-1.5 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold mb-5 uppercase tracking-widest text-background/50">Get in Touch</h4>
          <ul className="space-y-4">
            <li>
              <a href="mailto:info@razite.com" className="flex items-start gap-3 group">
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-background/40 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm text-background/70 group-hover:text-background transition-colors">info@razite.com</p>
                </div>
              </a>
            </li>
            <li>
              <a href="tel:+923398222888" className="flex items-start gap-3 group">
                <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[11px] text-background/40 uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-sm text-background/70 group-hover:text-background transition-colors">+92 339-8222888</p>
                </div>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[11px] text-background/40 uppercase tracking-wider mb-0.5">Address</p>
                <p className="text-sm text-background/70 leading-relaxed">House No. 32, Phase-3, Shahbaz Town, Quetta, Pakistan</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/40">
        <p>© {new Date().getFullYear()} Razite Technologies. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-background/70 transition-colors underline-offset-4 hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-background/70 transition-colors underline-offset-4 hover:underline">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
