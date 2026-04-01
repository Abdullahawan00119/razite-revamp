import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/SectionHeading";

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
      <section className="section-padding">
        <div className="container">
          <SectionHeading label="Contact Us" title="Let's Build Something Great" description="Drop us a message and get expert guidance on your next big idea." />

          <div className="grid lg:grid-cols-[1fr_380px] gap-12 max-w-4xl mx-auto">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <Input required placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input required type="email" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
                <Input placeholder="+1 234 567 8900" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <Textarea required rows={5} placeholder="Tell us about your project..." />
              </div>
              <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
                {loading ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="font-semibold text-foreground">Other Ways to Reach Us</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "info@razite.com", href: "mailto:info@razite.com" },
                  { icon: Phone, label: "Phone", value: "+92 339-8222888", href: "tel:+923398222888" },
                  { icon: MapPin, label: "Address", value: "House No. 32, Phase-3, Shahbaz Town, 87300, Quetta, Pakistan" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
