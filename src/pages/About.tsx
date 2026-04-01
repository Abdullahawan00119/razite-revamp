import { motion } from "framer-motion";
import { Target, Eye, Users } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const team = [
  { name: "Syed Raza Abbas Kazmi", role: "Founder & CEO", bio: "Visionary leader driving innovation and strategic growth." },
  { name: "Malik Muzzammil", role: "Co-Founder & CTO", bio: "Technical architect behind Razite's cutting-edge solutions." },
  { name: "Kamran Aziz", role: "Chief Strategy Officer", bio: "R&D champion shaping the future of our product offerings." },
];

const values = [
  { icon: Target, title: "Mission", desc: "To empower businesses with innovative, scalable technology solutions that drive real impact and measurable growth." },
  { icon: Eye, title: "Vision", desc: "To be the most trusted technology partner for businesses navigating digital transformation worldwide." },
  { icon: Users, title: "Culture", desc: "We foster collaboration, continuous learning, and a relentless pursuit of excellence in everything we build." },
];

const About = () => (
  <>
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="About Us" title="Who We Are" description="We combine innovation, strategy, and cutting-edge technology to build solutions that scale with your business." />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed space-y-4"
        >
          <p>Razite is a technology company that bridges the gap between ambitious ideas and production-ready digital products. Founded with a passion for solving real-world problems at scale, we serve startups, SMEs, and enterprises across multiple industries.</p>
          <p>Our team of engineers, designers, and strategists work collaboratively to deliver solutions that are not only technically robust but also aligned with your business objectives.</p>
        </motion.div>
      </div>
    </section>

    <section className="section-padding bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border text-center"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container">
        <SectionHeading label="Our Team" title="Meet the Leadership" description="Driven individuals who bring expertise, passion, and vision to every project." />
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-24 h-24 rounded-full bg-hero-gradient mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </div>
              <h3 className="font-semibold text-foreground">{t.name}</h3>
              <p className="text-xs text-primary font-medium mt-1">{t.role}</p>
              <p className="text-sm text-muted-foreground mt-2">{t.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default About;
