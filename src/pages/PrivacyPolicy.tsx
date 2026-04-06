import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Data Protection",
      content: "We take the security of your data seriously. Razite implements industry-standard encryption and security protocols to ensure your information remains private and protected at all times.",
    },
    {
      icon: Lock,
      title: "Information We Collect",
      content: "We only collect information that is necessary for providing our services. This may include contact details, project requirements, and technical data used to improve our digital products.",
    },
    {
      icon: Eye,
      title: "How We Use Data",
      content: "Your data is used solely to deliver high-impact digital solutions, communicate project progress, and personalize your experience with our platforms. We never sell your personal information to third parties.",
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal data held by Razite. If you have any concerns regarding your privacy, our team is ready to assist you in exercising these rights.",
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden border-b border-border bg-muted/30">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 px-6 py-3 rounded-full bg-primary/10 border border-primary/20"
          >
            Compliance & Privacy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight"
          >
            Privacy <span className="text-gradient">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed"
          >
            Last Updated: April 6, 2026. Your privacy is our priority. This document outlines how we collect, use, and protect your personal information.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="grid gap-12">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div 
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-8 rounded-3xl border border-border bg-card/50 hover:border-primary/20 hover:bg-card transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight mb-4">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="mt-20 p-12 rounded-3xl bg-hero-gradient text-primary-foreground text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Shield className="h-32 w-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Questions about your privacy?</h3>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
                We're here to help. Reach out to our data protection officer if you have any questions regarding our privacy practices.
              </p>
              <Button asChild size="lg" variant="secondary" className="font-bold">
                <Link to="/contact">Contact Support <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
