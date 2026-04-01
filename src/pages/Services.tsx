import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Database, Monitor, BarChart3, HardDrive, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const services = [
  { icon: Shield, title: "IT Consultancy Services", desc: "We provide IT consultancy services to help businesses navigate the complexities of technology, including cloud strategy, cybersecurity, and digital transformation.", features: ["Cloud Strategy", "Cybersecurity", "Digital Transformation", "Infrastructure Planning"] },
  { icon: Lightbulb, title: "Smart Application Development", desc: "We design intelligent, user-focused AI web and application solutions that deliver real value from automation tools to seamless integrations.", features: ["AI-Powered Apps", "Web Development", "Mobile Apps", "Automation Tools"] },
  { icon: Database, title: "Data Processing Services", desc: "End-to-end data processing solutions, including data cleaning, transformation, validation, and integration for accurate, structured datasets.", features: ["Data Cleaning", "Transformation", "Validation", "Integration"] },
  { icon: Monitor, title: "Computer Hardware & Accessories", desc: "We provide computer hardware goods and related IT equipment, including desktops, laptops, servers, peripherals, and components.", features: ["Desktops & Laptops", "Servers", "Peripherals", "Components"] },
  { icon: BarChart3, title: "Data Analytics & Business Intelligence", desc: "Advanced analytics and BI solutions that transform processed data into meaningful insights with dashboards and automated reporting.", features: ["Predictive Analytics", "Dashboards", "Automated Reporting", "Data Visualization"] },
  { icon: HardDrive, title: "Data Warehousing & Management", desc: "Scalable data warehousing solutions that centralize and secure enterprise data with ETL development and governance frameworks.", features: ["ETL Development", "Cloud Platforms", "Data Governance", "Secure Storage"] },
  { icon: Globe, title: "Geo-Spatial Data Processing", desc: "Specialized geospatial data services, including GIS analysis, satellite imagery processing, remote sensing, and digital terrain modeling.", features: ["GIS Analysis", "Satellite Imagery", "Remote Sensing", "Terrain Modeling"] },
];

const Services = () => (
  <>
    <section className="section-padding">
      <div className="container">
        <SectionHeading label="Our Services" title="What We Offer" description="From startups to growing enterprises, we build the digital infrastructure that keeps you moving forward." />
        <div className="space-y-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid md:grid-cols-[auto_1fr] gap-6 p-6 md:p-8 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.features.map((f) => (
                    <span key={f} className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{f}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding bg-hero-gradient text-primary-foreground">
      <div className="container text-center">
        <h2 className="text-3xl font-bold">Need a Custom Solution?</h2>
        <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">Let's discuss how we can tailor our services to your specific needs.</p>
        <Button asChild size="lg" variant="secondary" className="mt-6">
          <Link to="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  </>
);

export default Services;
