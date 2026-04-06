import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "info@razite.com",
    sub: "We reply within 24 hours",
    href: "mailto:info@razite.com",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+92 339-8222888",
    sub: "Mon–Fri, 9am–6pm PKT",
    href: "tel:+923398222888",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "House No. 32, Phase-3, Shahbaz Town",
    sub: "Quetta, Balochistan, Pakistan",
    href: "https://maps.google.com/?q=Shahbaz+Town+Quetta+Pakistan",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 9:00 AM – 6:00 PM",
    sub: "Saturday by appointment",
    gradient: "from-orange-500 to-amber-500",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent!", description: "We'll get back to you shortly." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <>
      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section className="relative bg-hero-gradient text-primary-foreground overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_65%)]" />

        <div className="container relative z-10 py-20 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 mb-5 px-4 py-2 rounded-full bg-white/10 border border-white/20">
              <MessageSquare className="h-3.5 w-3.5" /> Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mt-3">
              Let's Build Something{" "}
              <span className="block mt-1 opacity-90">Great Together</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-lg mx-auto leading-relaxed">
              Drop us a message and get expert guidance on your next big idea. We're ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT INFO CARDS ──────────────────────────────────────── */}
      <section className="py-14 px-4 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const card = (
                <motion.div
                  custom={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-default"
                >
                  <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground mb-1">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </motion.div>
              );
              return item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                  {card}
                </a>
              ) : (
                <div key={item.label}>{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FORM + MAP ──────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                  Send a Message
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">Start the Conversation</h2>
                <p className="text-muted-foreground mt-3 leading-relaxed">Fill in the form and we'll get back to you within one business day.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                    <Input required placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                    <Input required type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                    <Input placeholder="+92 300 1234567" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
                    <Input placeholder="Project Inquiry" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
                  <Textarea required rows={5} placeholder="Tell us about your project..." />
                </div>
                <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/20">
                  {loading ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>

            {/* Map + extra info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Map embed */}
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl h-[340px]">
                <iframe
                  title="Razite Location"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.5!2d66.9995!3d30.1908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ed2e9d9c0b99b43%3A0x2fe3de4a1c4bdea0!2sShahbaz%20Town%2C%20Quetta%2C%20Balochistan!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                  className="w-full h-full border-0"
                  style={{ filter: "grayscale(20%) contrast(1.05)" }}
                />
                {/* Overlay badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg border border-border flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-foreground">Razite HQ</span>
                </div>
              </div>

              {/* Quick contact panel */}
              <div className="p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <h3 className="text-base font-bold text-foreground mb-4">Prefer direct contact?</h3>
                <div className="space-y-3">
                  <a href="mailto:info@razite.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="group-hover:underline">info@razite.com</span>
                  </a>
                  <a href="tel:+923398222888" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="group-hover:underline">+92 339-8222888</span>
                  </a>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>House No. 32, Phase-3, Shahbaz Town, Quetta, Pakistan</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
