import { motion } from "framer-motion";
import { Target, Eye, Users, Zap, Award, Users2, TrendingUp, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

const team = [
  { name: "Syed Raza Abbas Kazmi", role: "Founder & CEO", bio: "Visionary leader driving innovation and strategic growth.", color: "from-blue-500 to-cyan-500" },
  { name: "Malik Muzzammil", role: "Co-Founder & CTO", bio: "Technical architect behind Razite's cutting-edge solutions.", color: "from-purple-500 to-pink-500" },
  { name: "Kamran Aziz", role: "Chief Strategy Officer", bio: "R&D champion shaping the future of our product offerings.", color: "from-emerald-500 to-teal-500" },
];

const values = [
  { icon: Target, title: "Mission", desc: "To empower businesses with innovative, scalable technology solutions that drive real impact and measurable growth.", accent: "from-blue-500/20 via-blue-500/10 to-transparent" },
  { icon: Eye, title: "Vision", desc: "To be the most trusted technology partner for businesses navigating digital transformation worldwide.", accent: "from-purple-500/20 via-purple-500/10 to-transparent" },
  { icon: Users, title: "Culture", desc: "We foster collaboration, continuous learning, and a relentless pursuit of excellence in everything we build.", accent: "from-emerald-500/20 via-emerald-500/10 to-transparent" },
];

const stats = [
  { value: "50+", label: "Projects Delivered", icon: Code2 },
  { value: "30+", label: "Team Members", icon: Users2 },
  { value: "5", label: "Years of Excellence", icon: Award },
  { value: "95%", label: "Client Satisfaction", icon: TrendingUp },
];

const milestones = [
  { year: "2019", title: "Founded", desc: "Razite was born with a mission to revolutionize digital solutions." },
  { year: "2020", title: "First Major Client", desc: "Partnered with our first enterprise client, scaling rapidly." },
  { year: "2022", title: "Team Expansion", desc: "Grew to 30+ talented engineers and strategists." },
  { year: "2024", title: "Market Leader", desc: "Recognized as innovation leader in tech consulting." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const About = () => (
  <>
    {/* Hero Section */}
    <section className="section-padding overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              About Razite
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mt-6">
              Bridging{" "}
              <span className="text-gradient">Ideas to Reality</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-lg">
              We're a team of engineers, designers, and strategists passionate about transforming ambitious visions into production-ready digital products that scale and create real impact.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link to="/contact">Start a Project</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-semibold">
                <Link to="/services">Explore Services</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-md h-96">
              {/* Outer glow */}
              <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 blur-3xl opacity-60"></div>
              
              {/* Main card */}
              <div className="relative rounded-3xl bg-hero-gradient p-12 text-primary-foreground h-full flex flex-col justify-center items-center shadow-2xl">
                {/* Decorative corners */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary-foreground/20 rounded-tr-2xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary-foreground/20 rounded-bl-2xl"></div>
                
                <div className="text-center space-y-6 relative z-10">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Zap className="h-20 w-20 mx-auto opacity-90" />
                  </motion.div>
                  <div>
                    <div className="text-6xl font-bold">50+</div>
                    <div className="text-lg opacity-90 mt-2">Projects Delivered</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stats Grid */}
    <section className="py-16 border-y border-border bg-gradient-to-b from-muted/30 to-background">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              custom={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative"
            >
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-primary/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 blur transition-all duration-300"></div>
              <div className="relative p-6 text-center rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card transition-all duration-300">
                <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-cyan-500/10 mb-4 group-hover:from-primary/20 group-hover:to-cyan-500/20 transition-all">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-3">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>

    {/* Story Section */}
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="Our Story" title="From Vision to Impact" description="Founded on the principle that great technology solves real problems at scale." />
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Razite was founded on the belief that every ambitious idea deserves access to world-class technology expertise. We saw a gap between visionary startups and enterprise-grade capabilities, and we built Razite to bridge that divide.
            </p>
            <div className="space-y-4">
              {[
                { icon: "💡", title: "Problem Solving", desc: "We tackle complex technical challenges with innovative solutions." },
                { icon: "⚡", title: "Speed & Excellence", desc: "Fast delivery without compromising on quality or best practices." },
                { icon: "🤝", title: "Partnership Approach", desc: "We integrate seamlessly with your team as true collaborators." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex gap-4 p-5 rounded-xl border border-border/50 bg-gradient-to-br from-card to-background hover:from-primary/5 hover:to-card/50 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-transparent blur-3xl -z-10"></div>
            <div className="relative p-10 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/8 via-muted/40 to-background/80 backdrop-blur-sm">
              <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/10 to-cyan-500/5 rounded-full blur-2xl"></div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-8 relative">Today's Impact</h4>
              <ul className="space-y-6 relative">
                {[
                  { label: "Startups", value: "Scaling MVPs with robust infrastructure", icon: "🚀" },
                  { label: "SMEs", value: "Modernizing operations and digital presence", icon: "📈" },
                  { label: "Enterprises", value: "Transforming at scale with proven expertise", icon: "🏢" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="pb-6 border-b border-border/30 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground mt-1">{item.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-primary/20">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Our Foundation</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">30+ Visionaries</p>
                <p className="text-sm text-muted-foreground mt-2">Engineers, designers & strategists building the future</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Values Section */}
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <SectionHeading label="Core Values" title="What Drives Us" description="These principles guide every decision we make." />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                className="group relative overflow-hidden"
              >
                {/* Gradient background */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${v.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur -z-10`}></div>
                
                {/* Card content */}
                <div className="relative p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card via-card to-background group-hover:border-primary/40 transition-all duration-300">
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-cyan-500/20 transition-all duration-300 transform group-hover:scale-110">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h3 className="font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Timeline Section */}
    <section className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <SectionHeading label="Milestones" title="Our Journey" description="Key moments that shaped Razite's growth and vision." />
        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Center line with gradient */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/10 transform -translate-x-1/2"></div>

              <div className="space-y-16">
                {milestones.map((m, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className={`flex gap-12 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? "text-right pr-12" : "text-left pl-12"}`}>
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="p-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/12 via-card to-background hover:from-primary/18 hover:border-primary/50 transition-all duration-300 group cursor-default"
                      >
                        <div className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-primary/30 to-cyan-500/20 text-primary text-sm font-bold mb-4 group-hover:from-primary/40 group-hover:to-cyan-500/30 transition-all">
                          {m.year}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{m.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{m.desc}</p>
                      </motion.div>
                    </div>

                    {/* Center dot with animation */}
                    <div className="flex justify-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: i * 0.15 + 0.3 }}
                        whileHover={{ scale: 1.3 }}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-cyan-500 border-4 border-background shadow-lg shadow-primary/50 relative flex-shrink-0"
                      >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-cyan-500 blur opacity-75 animate-pulse"></div>
                      </motion.div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            <div className="relative pl-10">
              {/* Left line for mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/10"></div>

              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="relative"
                >
                  {/* Mobile dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-cyan-500 border-4 border-background shadow-lg shadow-primary/50"
                  ></motion.div>

                  <div className="p-6 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/12 via-card to-background hover:from-primary/18 transition-all">
                    <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3">
                      {m.year}
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Team Section */}
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="Meet the Team" title="Leadership Excellence" description="Visionaries and builders united by a shared mission." />
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative"
            >
              {/* Glow background */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg -z-10 from-primary/50 via-primary/30 to-cyan-500/20"></div>
              
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-card to-background border border-border/50 group-hover:border-primary/30 transition-all duration-300">
                {/* Accent bar on top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`}></div>
                
                {/* Avatar */}
                <div className={`relative w-40 h-40 rounded-2xl bg-gradient-to-br ${t.color} mx-auto mb-6 flex items-center justify-center text-primary-foreground text-5xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2`}>
                  <span>{t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
                  
                  {/* Glow effect inside avatar */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-20 blur-xl`}></div>
                </div>
                
                {/* Content */}
                <div className="text-center">
                  <h3 className="font-bold text-xl text-foreground">{t.name}</h3>
                  <p className="text-sm font-semibold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent mt-2">{t.role}</p>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{t.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="section-padding bg-hero-gradient text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl -z-10"></div>
      
      <div className="container text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Ready to Work Together?</h2>
          <p className="mt-6 text-lg text-primary-foreground/90 leading-relaxed">
            Let's transform your vision into a scalable digital solution that drives growth and creates lasting impact.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/contact">Get In Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-semibold border-primary-foreground/20 hover:border-primary-foreground">
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

export default About;
