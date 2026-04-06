import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  secondaryCta?: string;
  secondaryLink?: string;
  watermark?: string;
  metrics?: { title: string; value: string; label: string }[];
}

const HeroSection = ({ title, subtitle, ctaText, ctaLink, secondaryCta, secondaryLink, watermark, metrics }: HeroSectionProps) => (
  <section className="relative min-h-[50vh] flex items-center overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/12 via-cyan-500/6 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
    </div>

    {watermark && (
      <div className="absolute top-[25%] left-0 -z-10 select-none opacity-[0.02] pointer-events-none hidden lg:block">
        <h1 className="text-[18rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap">{watermark}</h1>
      </div>
    )}

    <div className="container py-12 md:py-16 lg:py-20 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-3 w-3" />
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mt-2">{title}</h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl">{subtitle}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link to={ctaLink}>{ctaText}</Link>
            </Button>
            {secondaryCta && (
              <Button asChild variant="outline" size="lg">
                <Link to={secondaryLink!}>{secondaryCta}</Link>
              </Button>
            )}
          </div>
        </motion.div>
        {metrics && (
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="hidden lg:block">
            {/* Metrics card content */}
            <div className="relative rounded-3xl bg-hero-gradient p-10 text-primary-foreground shadow-2xl">
              {/* Add metrics display */}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  </section>
);

export default HeroSection;

