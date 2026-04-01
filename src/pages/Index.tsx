import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Database, Monitor, BarChart3, HardDrive, Globe, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: Shield, title: "IT Consultancy", desc: "Cloud strategy, cybersecurity, and digital transformation guidance." },
  { icon: Lightbulb, title: "Smart App Development", desc: "Intelligent, user-focused AI web and application solutions." },
  { icon: Database, title: "Data Processing", desc: "End-to-end data cleaning, transformation, and integration." },
  { icon: Monitor, title: "Hardware & Accessories", desc: "Desktops, laptops, servers, peripherals, and components." },
  { icon: BarChart3, title: "Analytics & BI", desc: "Interactive dashboards, predictive analytics, and reporting." },
  { icon: HardDrive, title: "Data Warehousing", desc: "Scalable data warehousing, ETL, and governance frameworks." },
  { icon: Globe, title: "Geo-Spatial Data", desc: "GIS analysis, satellite imagery, and digital terrain modeling." },
];

const testimonials = [
  { quote: "Technology is not just about innovation — it's about solving real problems at scale.", name: "Syed Raza Abbas Kazmi", role: "Founder & CEO" },
  { quote: "Behind every great product is a team that knows how to build and adapt.", name: "Malik Muzzammil", role: "Co-Founder & CTO" },
  { quote: "R&D is not just a process; it's the heart of who we are as a company.", name: "Kamran Aziz", role: "Chief Strategy Officer" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => (
  <>
    {/* Hero */}
    <section className="section-padding overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Team that moves{" "}
              <span className="text-gradient">ideas forward.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
              From startup sparks to enterprise engines, we turn bold visions into high-impact digital products.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/contact">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-hero-gradient opacity-90 flex items-center justify-center">
              <div className="absolute inset-4 rounded-2xl bg-background/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <div className="text-6xl font-bold">R</div>
                  <div className="text-sm uppercase tracking-[0.3em] mt-2 opacity-80">Razite</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="container grid grid-cols-3 gap-8 text-center">
        {[
          ["Powering", "Ideas with Technology"],
          ["Code", "to Launch From"],
          ["Tech", "You Can Trust"],
        ].map(([bold, sub], i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <span className="text-xl md:text-2xl font-bold text-foreground">{bold}</span>
            <span className="block text-xs md:text-sm text-primary font-medium uppercase tracking-wide mt-1">{sub}</span>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Services overview */}
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="What We Do" title="Our Services" description="We build the digital infrastructure that keeps you moving forward." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline">
            <Link to="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-hero-gradient text-primary-foreground">
      <div className="container text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-bold">"We Code." You Grow.</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
            We deliver high-impact digital solutions tailored to your unique workflows, customers, and growth goals.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
            <Link to="/contact">Start Your Project</Link>
          </Button>
        </motion.div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="Testimonials" title="Trusted by Startups and Scaleups" />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <Quote className="h-6 w-6 text-primary/40 mb-4" />
              <p className="text-muted-foreground leading-relaxed italic mb-6">{t.quote}</p>
              <div>
                <div className="font-semibold text-sm text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="section-padding bg-muted/30">
      <div className="container text-center">
        <SectionHeading label="Let's Talk" title="Ready to Build Something Great?" description="Drop us a message and get expert guidance on your next big idea." />
        <Button asChild size="lg">
          <Link to="/contact">Contact Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </>
);

export default Index;
