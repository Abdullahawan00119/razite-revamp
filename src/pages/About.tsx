import { motion, useInView, type Variants } from "framer-motion";
import { Target, Eye, Users, Zap, Award, Users2, TrendingUp, Code2, ArrowRight, CheckCircle2, Sparkles, Globe, Rocket, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const team = [
  {
    name: "Syed Raza Abbas Kazmi",
    role: "Founder & CEO",
    bio: "Visionary leader with a passion for transforming ambitious ideas into production-ready digital products that scale.",
    color: "from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/25",
    initial: "SR",
    badge: "Leadership",
  },
  {
    name: "Malik Muzzammil",
    role: "Co-Founder & CTO",
    bio: "Technical architect driving innovation through cutting-edge engineering solutions and modern development culture.",
    color: "from-violet-500 to-indigo-500",
    shadowColor: "shadow-violet-500/25",
    initial: "MM",
    badge: "Technology",
  },
  {
    name: "Kamran Aziz",
    role: "Chief Strategy Officer",
    bio: "R&D champion shaping the future of our product offerings with data-driven strategy and bold thinking.",
    color: "from-emerald-500 to-teal-500",
    shadowColor: "shadow-emerald-500/25",
    initial: "KA",
    badge: "Strategy",
  },
];

const values = [
  {
    icon: Target,
    title: "Mission",
    desc: "To empower businesses with innovative, scalable technology solutions that drive real impact and measurable growth.",
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "To be the most trusted technology partner for businesses navigating digital transformation worldwide.",
    gradient: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Heart,
    title: "Culture",
    desc: "We foster collaboration, continuous learning, and a relentless pursuit of excellence in everything we build.",
    gradient: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered", icon: Code2 },
  { value: 30, suffix: "+", label: "Team Members", icon: Users2 },
  { value: 5, suffix: "", label: "Years of Excellence", icon: Award },
  { value: 95, suffix: "%", label: "Client Satisfaction", icon: TrendingUp },
];

const milestones = [
  { year: "2019", title: "Founded", desc: "Razite was born with a mission to revolutionize digital solutions for startups and enterprises alike.", icon: Rocket },
  { year: "2020", title: "First Major Client", desc: "Partnered with our first enterprise client, delivering scalable digital infrastructure at speed.", icon: Globe },
  { year: "2022", title: "Team Expansion", desc: "Grew to 30+ talented engineers, designers, and strategists united by one shared mission.", icon: Users },
  { year: "2024", title: "Market Leader", desc: "Recognized as an innovation leader in tech consulting with ISO certifications and global partnerships.", icon: Award },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.55 } }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Animated counter component
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (value / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
      {count}{suffix}
    </div>
  );
}

const About = () => (
  <>
    {/* ─── HERO ─────────────────────────────────────────────────────────── */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Layered ambient gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/12 via-cyan-500/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – text */}
          <motion.div initial="hidden" animate="visible" variants={fadeLeft}>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="h-3 w-3" /> About Razite
            </motion.span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.08] mt-4">
              Bridging{" "}
              <span className="text-gradient">Ideas</span>{" "}
              <br className="hidden sm:block" />to{" "}
              <span className="relative">
                Reality
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-500 rounded-full origin-left"
                />
              </span>
            </h1>

            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-[480px]">
              We're a team of engineers, designers, and strategists passionate about transforming ambitious visions into production-ready digital products that scale and create real impact.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-semibold shadow-lg shadow-primary/20">
                <Link to="/contact">
                  Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>

            {/* Mini trust badges */}
            <div className="mt-12 flex flex-wrap gap-3">
              {["ISO 9001 Certified", "AWS Partner", "50+ Projects", "5-Star Rated"].map((badge) => (
                <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground px-3 py-1.5 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm">
                  <CheckCircle2 className="h-3 w-3 text-primary" /> {badge}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right – visual cards stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Glow halo */}
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-[50%] blur-3xl -z-10" />

            {/* Main hero card */}
            <div className="relative rounded-3xl bg-hero-gradient p-10 text-primary-foreground shadow-2xl">
              <div className="absolute top-4 right-4 w-14 h-14 border-t-2 border-r-2 border-white/20 rounded-tr-2xl" />
              <div className="absolute bottom-4 left-4 w-14 h-14 border-b-2 border-l-2 border-white/20 rounded-bl-2xl" />

              <div className="text-center space-y-5 py-4">
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                  <Zap className="h-16 w-16 mx-auto opacity-90" />
                </motion.div>
                <div>
                  <div className="text-6xl font-extrabold">50+</div>
                  <div className="text-base opacity-85 mt-1.5 font-medium">Projects Delivered</div>
                </div>
                <div className="pt-4 border-t border-white/20 grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">5</div>
                    <div className="opacity-75 text-xs mt-0.5">Years Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">30+</div>
                    <div className="opacity-75 text-xs mt-0.5">Team Members</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-8 p-4 rounded-2xl bg-card border border-border/60 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">95% Satisfaction</div>
                  <div className="text-xs text-muted-foreground">Client Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Top-right floating card */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-6 -right-6 p-4 rounded-2xl bg-card border border-border/60 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Global Reach</div>
                  <div className="text-xs text-muted-foreground">ISO Certified</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ─── ANIMATED STATS BAR ───────────────────────────────────────────── */}
    <section className="border-y border-border bg-gradient-to-r from-muted/30 via-background to-muted/30 py-14">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative"
              >
                <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-primary/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                <div className="relative p-6 text-center rounded-xl border border-border/50 bg-card/60 hover:border-primary/30 hover:bg-card transition-all duration-300 backdrop-blur-sm">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 mb-4 group-hover:from-primary/20 group-hover:to-cyan-500/20 transition-all">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-2">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ─── OUR STORY ──────────────────────────────────────────────────────── */}
    <section className="py-32 px-4 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeLeft}
            className="lg:col-span-7 space-y-10"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4"
              >
                Our Journey & Ethos
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
                From Groundbreaking Vision <br />
                <span className="text-gradient">to Global Impact</span>
              </h2>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-0.5 w-12 bg-primary/40 rounded-full" />
                <p className="text-lg font-medium text-foreground/80 italic">
                  "Every digital revolution begins with a single bold idea."
                </p>
              </div>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Founded on the belief that every ambitious idea deserves access to world-class technology expertise. We saw a gap between visionary startups and enterprise-grade capabilities — and built Razite to bridge that divide.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 lg:gap-6">
              {[
                { icon: "💡", title: "Problem Solving", desc: "Tackling complex challenges with innovation." },
                { icon: "⚡", title: "Speed & Excellence", desc: "Fast delivery without quality compromise." },
                { icon: "🤝", title: "Partnership Approach", desc: "Seamless integration as collaborators." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right impact panel - Bento Style */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeRight}
            className="lg:col-span-5 relative"
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="col-span-2 p-8 rounded-3xl bg-hero-gradient text-white flex flex-col justify-between group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Rocket className="h-32 w-32" />
                </div>
                <div className="relative z-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Our Footprint</span>
                  <h4 className="text-2xl font-bold mt-2 mb-4">Empowering the Ecosystem</h4>
                  <p className="text-sm text-white/80 leading-relaxed">We provide the technical backbone for the next generation of digital leaders.</p>
                </div>
                <div className="relative z-10 mt-8 pt-6 border-t border-white/20 grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xl font-bold">50+</div>
                    <div className="text-[10px] opacity-70">Projects</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">95%</div>
                    <div className="text-[10px] opacity-70">Satisfied</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold">5+</div>
                    <div className="text-[10px] opacity-70">Years</div>
                  </div>
                </div>
              </div>

              {[
                { label: "Startups", icon: "🚀", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { label: "SMEs", icon: "📈", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
              ].map((item, i) => (
                <div key={item.label} className={`p-6 rounded-3xl border ${item.border} ${item.bg} flex flex-col items-center justify-center text-center gap-3 group hover:scale-[1.03] transition-all`}>
                  <span className="text-3xl group-hover:animate-bounce">{item.icon}</span>
                  <p className="font-bold text-foreground text-sm">{item.label}</p>
                </div>
              ))}
              
              <div className="col-span-2 p-6 rounded-3xl border border-violet-500/20 bg-violet-500/5 flex items-center justify-between group hover:border-violet-500/40 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">🏢</div>
                  <div>
                    <p className="font-bold text-foreground">Enterprises</p>
                    <p className="text-xs text-muted-foreground">Modernization at global scale.</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-violet-500 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* ─── VALUES ─────────────────────────────────────────────────────────── */}
    <section className="py-24 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            Core Values
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-[1.1]">What Drives Us</h2>
          <p className="mt-4 text-muted-foreground">These principles guide every decision we make.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-background hover:border-primary/30 transition-all duration-300 cursor-default"
              >
                {/* Accent top border on hover */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${v.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                {/* Inner glow on hover */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${v.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 -z-10`} />

                <div className="p-8">
                  <div className={`h-14 w-14 rounded-xl ${v.bg} border ${v.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className={`font-bold text-2xl text-foreground mb-3 group-hover:bg-gradient-to-r group-hover:${v.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all`}>
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* ─── TIMELINE / MILESTONES ──────────────────────────────────────────── */}
    <section className="py-24 px-4">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-[1.1]">Our Journey</h2>
          <p className="mt-4 text-muted-foreground">Key moments that shaped Razite's growth and vision.</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop alternating timeline */}
          <div className="hidden md:block relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent -translate-x-1/2" />

            <div className="space-y-14">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={`relative flex gap-8 items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Card */}
                    <div className="flex-1">
                      <motion.div
                        whileHover={{ y: -4 }}
                        className={`p-7 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-background hover:from-primary/15 hover:border-primary/40 transition-all duration-300 group cursor-default ${i % 2 === 0 ? "mr-6" : "ml-6"}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 transition-all">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="inline-block text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-2">{m.year}</div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{m.title}</h3>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: i * 0.15 + 0.3 }}
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-cyan-500 border-4 border-background shadow-lg shadow-primary/40 flex items-center justify-center"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-cyan-500 blur-sm opacity-60 animate-pulse" />
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-5 relative pl-10">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/10" />
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute -left-7 top-4 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-cyan-500 border-3 border-background shadow-md shadow-primary/40"
                  />
                  <div className="p-5 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 via-card to-background">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="inline-block text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full mb-1.5">{m.year}</div>
                        <h3 className="font-bold text-base text-foreground">{m.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    {/* ─── TEAM ────────────────────────────────────────────────────────────── */}
    <section className="py-24 px-4 bg-gradient-to-b from-muted/20 to-background overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            Leadership
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-[1.1]">Meet Our Team</h2>
          <p className="mt-4 text-muted-foreground">Visionaries and builders united by a shared mission to transform technology.</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4 [&>div]:pl-4">
              {team.map((t, i) => (
                <CarouselItem key={t.name} className="basis-full sm:basis-1/2 lg:basis-1/3">
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group relative h-full"
                  >
                    {/* Outer glow on hover */}
                    <div className={`absolute -inset-3 rounded-3xl bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500 -z-10`} />

                    <div className="relative h-full rounded-2xl border border-border/50 bg-gradient-to-br from-card to-background group-hover:border-primary/25 transition-all duration-300 overflow-hidden flex flex-col">
                      {/* Top gradient bar */}
                      <div className={`h-1 w-full bg-gradient-to-r ${t.color}`} />

                      {/* Card body */}
                      <div className="p-8 text-center flex flex-col flex-grow">
                        {/* Avatar */}
                        <div className="relative inline-block mb-6 mx-auto">
                          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-3xl font-bold shadow-xl ${t.shadowColor} group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300`}>
                            {t.initial}
                          </div>
                          {/* Badge */}
                          <div className={`absolute -bottom-2 -right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${t.color} text-white shadow-sm`}>
                            {t.badge}
                          </div>
                        </div>

                        <h3 className="font-bold text-lg text-foreground leading-snug">{t.name}</h3>
                        <p className={`text-sm font-semibold bg-gradient-to-r ${t.color} bg-clip-text text-transparent mt-1.5`}>{t.role}</p>
                        <p className="text-sm text-muted-foreground mt-4 leading-relaxed flex-grow">{t.bio}</p>

                        {/* Divider */}
                        <div className={`mt-6 mb-6 h-px w-16 mx-auto bg-gradient-to-r ${t.color} opacity-40`} />

                        {/* Bottom stat row */}
                        <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-primary" /> Certified
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3 text-primary" /> Core
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12 group">
              <CarouselPrevious className="static translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary/5 text-primary" />
              <CarouselNext className="static translate-y-0 h-10 w-10 border-primary/20 hover:bg-primary/5 text-primary" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>

    {/* ─── CTA ─────────────────────────────────────────────────────────────── */}
    <section className="py-24 px-4 bg-hero-gradient text-primary-foreground relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.05)_0%,_transparent_65%)]" />

      <div className="container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <Sparkles className="h-10 w-10 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Ready to Work Together?
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/85 leading-relaxed max-w-lg mx-auto">
            Let's transform your vision into a scalable digital solution that drives growth and creates lasting impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button asChild size="lg" variant="secondary" className="font-semibold shadow-lg">
              <Link to="/contact">Get In Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-semibold border-primary-foreground/25 hover:border-primary-foreground text-primary-foreground hover:text-primary-foreground hover:bg-white/10"
            >
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

export default About;
