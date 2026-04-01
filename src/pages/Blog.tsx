import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const posts = [
  { slug: "digital-transformation-2025", title: "Digital Transformation Trends to Watch in 2025", excerpt: "Explore the key technology trends reshaping how businesses operate and compete in a rapidly evolving digital landscape.", date: "Mar 15, 2026", category: "Industry Insights" },
  { slug: "data-driven-decisions", title: "How Data-Driven Decision Making Fuels Growth", excerpt: "Learn how organizations leverage analytics and BI tools to make smarter, faster, and more confident business decisions.", date: "Mar 8, 2026", category: "Data Analytics" },
  { slug: "cloud-migration-guide", title: "A Practical Guide to Cloud Migration", excerpt: "Step-by-step best practices for migrating your legacy systems to the cloud without disrupting business operations.", date: "Feb 28, 2026", category: "Cloud Strategy" },
  { slug: "ai-application-development", title: "Building AI-Powered Applications That Users Love", excerpt: "From ideation to deployment — how to design and build intelligent applications that solve real user problems.", date: "Feb 20, 2026", category: "App Development" },
  { slug: "geospatial-technology", title: "The Rise of Geospatial Technology in Urban Planning", excerpt: "How GIS and remote sensing are transforming city planning, disaster management, and environmental monitoring.", date: "Feb 10, 2026", category: "Geo-Spatial" },
  { slug: "cybersecurity-essentials", title: "Cybersecurity Essentials for Growing Businesses", excerpt: "A practical checklist of security measures every SME should implement to protect their digital assets.", date: "Jan 30, 2026", category: "Security" },
];

const Blog = () => (
  <section className="section-padding">
    <div className="container">
      <SectionHeading label="Blog" title="Insights & Updates" description="Thoughts, guides, and industry perspectives from the Razite team." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-36 bg-hero-gradient opacity-70 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground/80 uppercase tracking-widest">{post.category}</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                <Calendar className="h-3 w-3" />
                {post.date}
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
              <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                Read More <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
