import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Database, Monitor, BarChart3, HardDrive, Globe, ArrowRight, CheckCircle2, Zap, Users, Target, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: Lightbulb, title: "Smart Application Development", desc: "Intelligent, user-focused AI web and application solutions.", features: ["AI-Powered Apps", "Web Development", "Mobile Apps", "Automation Tools"], color: "from-blue-500 to-cyan-500" },
  { icon: Shield, title: "IT Consultancy Services", desc: "Navigate complex technology landscapes with expert guidance.", features: ["Cloud Strategy", "Cybersecurity", "Digital Transformation", "Infrastructure"], color: "from-indigo-500 to-blue-500" },
  { icon: Database, title: "Data Processing Services", desc: "End-to-end data solutions for accurate, structured datasets.", features: ["Data Cleaning", "Transformation", "Validation", "Integration"], color: "from-emerald-500 to-teal-500" },
  { icon: BarChart3, title: "Data Analytics & BI", desc: "Transform data into actionable insights with advanced analytics.", features: ["Predictive Analytics", "Dashboards", "Automated Reporting", "Visualization"], color: "from-orange-500 to-red-500" },
  { icon: HardDrive, title: "Data Warehousing & Management", desc: "Scalable, secure enterprise data centralization solutions.", features: ["ETL Development", "Cloud Platforms", "Data Governance", "Storage"], color: "from-indigo-500 to-blue-500" },
  { icon: Globe, title: "Geo-Spatial Data Processing", desc: "Specialized GIS and satellite imagery analysis services.", features: ["GIS Analysis", "Satellite Imagery", "Remote Sensing", "Terrain Modeling"], color: "from-cyan-500 to-blue-500" },
  { icon: Monitor, title: "Hardware & Accessories", desc: "Enterprise-grade IT equipment and components supply.", features: ["Desktops & Laptops", "Servers", "Peripherals", "Components"], color: "from-slate-500 to-gray-500" },
];

const benefits = [
  { icon: Zap, label: "Fast Implementation", desc: "Quick turnarounds without compromising quality" },
  { icon: Users, label: "Expert Team", desc: "30+ talented engineers and strategists" },
  { icon: Target, label: "Goal-Focused", desc: "Solutions aligned with your business objectives" },
  { icon: CheckCircle2, label: "Quality Assured", desc: "Rigorous testing and quality standards" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Services = () => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Layered ambient gradients (About page style) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/12 via-blue-500/6 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/8 to-transparent rounded-full blur-3xl rotate-12" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        {/* Watermark background title */}
        <div className="absolute top-[35%] left-0 -z-10 select-none opacity-[0.02] pointer-events-none hidden lg:block">
          <h1 className="text-[18rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
            SOLUTIONS
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left – text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary mb-10 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-xl shadow-primary/5">
              <Sparkles className="h-4 w-4" /> Comprehensive Offerings
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mt-4">
              Enterprise-Grade <br className="hidden sm:block" /> 
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-indigo-500">Tech Solutions</span>
            </h1>
            
            <p className="mt-10 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl font-medium opacity-90">
              From startups to growing enterprises, we build the digital infrastructure that keeps you moving forward with scalable, innovative solutions.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="font-semibold shadow-xl shadow-primary/20">
                <Link to="/contact">
                  Request a Solution <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="hidden sm:flex items-center gap-2 ml-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-muted-foreground ml-2">Trusted by 50+ Clients</span>
              </div>
            </div>
          </motion.div>

          {/* Right – Service Matrix Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Outer glow */}
            <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 to-indigo-500/10 rounded-[50%] blur-3xl -z-10" />

            <div className="relative rounded-3xl bg-hero-gradient p-10 text-primary-foreground shadow-2xl overflow-hidden group">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
              <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-black/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-8 py-4">
                <div className="flex items-center justify-between">
                  <Monitor className="h-12 w-12 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/10 rounded-full border border-white/20">Tech Matrix</span>
                </div>
                
                <div>
                  <div className="text-7xl font-black tracking-tighter">7</div>
                  <div className="text-lg font-bold opacity-90 mt-1 uppercase tracking-widest text-[14px]">Strategic Domains</div>
                </div>

                <div className="pt-8 border-t border-white/20 grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-2xl font-bold">ISO</div>
                    <div className="text-[10px] uppercase font-black tracking-widest opacity-70 mt-1">Certified QMS</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-[10px] uppercase font-black tracking-widest opacity-70 mt-1">Active Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent badge */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-card border border-border/60 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-black text-foreground uppercase tracking-tight">Scalable Build</div>
                  <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Fast Delivery</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className="py-16 border-y border-border bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Why Razite</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">Why Choose Razite</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={i}
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-background hover:border-primary/30 hover:bg-card transition-all duration-300"
              >
                <Icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-foreground mb-2">{b.label}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Services Grid */}
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="Core Offerings" title="Our Services" description="Comprehensive solutions tailored to your business needs." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group h-full"
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-15 transition-opacity duration-300 blur-xl -z-10"></div>

                <div className="relative h-full p-8 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-background group-hover:border-primary/30 transition-all duration-300 flex flex-col">
                  {/* Accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`}></div>

                  {/* Icon */}
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{s.desc}</p>

                  {/* Features */}
                  <div className="space-y-3 mb-6 pt-6 border-t border-border/30">
                    {s.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-xs font-medium text-muted-foreground">{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button asChild variant="outline" size="sm" className="w-full mt-auto group-hover:border-primary/50 group-hover:text-primary transition-colors">
                    <Link to="/contact" className="flex items-center justify-center">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Service Approach */}
    <section className="section-padding bg-gradient-to-b from-muted/20 to-background">
      <div className="container">
        <SectionHeading label="Our Approach" title="How We Work" description="A proven methodology for delivering exceptional results" />
        <div className="grid lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { num: "01", title: "Discovery", desc: "Understand your unique challenges and goals" },
            { num: "02", title: "Strategy", desc: "Develop a tailored solution roadmap" },
            { num: "03", title: "Execution", desc: "Implement with precision and expertise" },
            { num: "04", title: "Support", desc: "Provide ongoing optimization and support" },
          ].map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group relative text-center"
            >
              {i < 3 && (
                <div className="hidden lg:block absolute top-10 right-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent transform translate-x-1/2"></div>
              )}
              <div className="relative p-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 border-2 border-primary/30 mb-4 group-hover:from-primary/30 group-hover:to-cyan-500/20 group-hover:border-primary/50 transition-all">
                  <span className="text-2xl font-bold text-primary">{step.num}</span>
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured CTA */}
    <section className="section-padding bg-hero-gradient text-primary-foreground relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">Ready to Transform Your Business?</h2>
          <p className="mt-6 text-lg text-primary-foreground/90 leading-relaxed">
            Let's explore how our services can drive innovation and growth for your organization.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <Button asChild size="lg" variant="secondary" className="font-semibold">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="font-semibold border-primary-foreground/20">
              <Link to="/about">Learn About Us</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

export default Services;
