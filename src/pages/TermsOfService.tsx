import { motion } from "framer-motion";
import { FileText, Hammer, Scale, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  const sections = [
    {
      icon: UserCheck,
      title: "User Obligations",
      content: "By accessing our platforms, you agree to provide accurate information and use our services responsibly. This includes adhering to security protocols and respecting the intellectual property rights of Razite and its partners.",
    },
    {
      icon: Hammer,
      title: "Service Terms",
      content: "Razite provides digital products and technical consultancy. We strive for excellence, but our services are provided on an 'as-is' basis. We reserve the right to modify or discontinue features to improve overall user experience.",
    },
    {
      icon: FileText,
      title: "Liability & Governance",
      content: "While we aim for the highest standards of reliability, Razite is not liable for indirect or consequential damages resulting from our service's use. These terms are governed by national and international digital regulations.",
    },
    {
      icon: Scale,
      title: "Legal Updates",
      content: "We may update our Terms of Service to reflect changes in our business practices or legal requirements. We encourage users to review this document regularly to stay informed of their rights and obligations.",
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
            Digital Governance
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight"
          >
            Terms of <span className="text-gradient">Service</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed font-medium"
          >
            Last Updated: April 6, 2026. These terms govern your use of Razite's platforms and services.
          </motion.p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="grid gap-8 md:gap-12">
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <motion.div 
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative p-8 md:p-12 rounded-3xl border border-border bg-card/60 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle top indicator */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-all">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-6">{section.title}</h2>
                      <div className="prose prose-slate max-w-none">
                        <p className="text-muted-foreground text-lg leading-relaxed mix-blend-plus-lighter">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Support CTA */}
          <div className="mt-24 p-8 md:p-16 rounded-3xl bg-hero-gradient text-primary-foreground text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-4xl font-black mb-6 tracking-tight">Need further clarification?</h3>
              <p className="text-xl text-primary-foreground/90 font-medium mb-10 leading-relaxed">
                If you have any specific concerns about our terms, our legal and support team is here to provide clarity.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="font-bold px-10 transition-transform group-hover:scale-105">
                  <Link to="/contact">Get HelpNow <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold px-10">
                  <Link to="/about">Our Philosophy</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
