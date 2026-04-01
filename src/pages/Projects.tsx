import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const projects = [
  { title: "Enterprise Data Platform", category: "Data Engineering", desc: "Built a scalable data warehousing and analytics platform for a mid-size logistics company, enabling real-time decision-making.", tags: ["ETL", "Cloud", "BI Dashboards"] },
  { title: "AI-Powered CRM", category: "Application Development", desc: "Developed an intelligent CRM system with predictive lead scoring and automated workflows for a B2B SaaS startup.", tags: ["AI/ML", "React", "Node.js"] },
  { title: "GIS Mapping Solution", category: "Geo-Spatial", desc: "Created a comprehensive GIS mapping tool for urban planning that processes satellite imagery and terrain data.", tags: ["GIS", "Remote Sensing", "Python"] },
  { title: "IT Infrastructure Overhaul", category: "IT Consultancy", desc: "Redesigned and migrated legacy infrastructure to the cloud for a financial services firm, improving uptime by 99.9%.", tags: ["AWS", "Security", "DevOps"] },
  { title: "E-Commerce Analytics Dashboard", category: "Analytics & BI", desc: "Delivered an interactive analytics suite with real-time KPIs, cohort analysis, and revenue forecasting.", tags: ["Tableau", "SQL", "Data Viz"] },
  { title: "Smart Inventory System", category: "Application Development", desc: "Built an IoT-connected inventory management system with automated reordering and real-time stock tracking.", tags: ["IoT", "React", "Firebase"] },
];

const Projects = () => (
  <>
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="Our Work" title="Featured Projects" description="A selection of projects that showcase our expertise across industries and technologies." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-hero-gradient opacity-80 flex items-center justify-center">
                <ExternalLink className="h-8 w-8 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">{p.category}</span>
                <h3 className="font-semibold text-foreground mt-1 mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-muted/30">
      <div className="container text-center">
        <h2 className="text-3xl font-bold text-foreground">Have a Project in Mind?</h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">We'd love to hear about it. Let's discuss how we can bring your vision to life.</p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/contact">Start a Conversation <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </>
);

export default Projects;
