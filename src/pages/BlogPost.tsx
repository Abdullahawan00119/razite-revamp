import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentBlock {
  type: "paragraph" | "heading";
  text: string;
}

interface BlogPostContent {
  title: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: ContentBlock[];
  relatedPosts: string[];
}

const blogPosts: Record<string, BlogPostContent> = {
  "digital-transformation-2025": {
    title: "Digital Transformation Trends to Watch in 2025",
    author: "Sarah Johnson",
    date: "Mar 15, 2026",
    category: "Industry Insights",
    readTime: "8 min read",
    excerpt: "Explore the key technology trends reshaping how businesses operate and compete in a rapidly evolving digital landscape.",
    content: [
      {
        type: "paragraph",
        text: "As we navigate through 2026, the digital transformation landscape continues to evolve at an unprecedented pace. Organizations across all industries are recognizing that digital transformation is no longer optional—it's essential for survival and growth."
      },
      {
        type: "heading",
        text: "1. AI and Automation Take Center Stage"
      },
      {
        type: "paragraph",
        text: "Artificial Intelligence has moved from the \"nice-to-have\" to \"must-have\" category. Businesses are leveraging AI to automate repetitive tasks, improve customer experiences, and gain competitive advantages. From chatbots to predictive analytics, AI is becoming the backbone of modern enterprises."
      },
      {
        type: "heading",
        text: "2. Cloud-Native Architecture"
      },
      {
        type: "paragraph",
        text: "The shift to cloud-native architectures is accelerating. Microservices, containerization, and serverless computing are becoming standard practices. This allows organizations to scale more efficiently and reduce infrastructure costs significantly."
      },
      {
        type: "heading",
        text: "3. Data Becoming the New Currency"
      },
      {
        type: "paragraph",
        text: "Data governance and analytics are now critical business functions. Organizations that can effectively collect, manage, and analyze data will have a significant competitive advantage. Investment in data warehousing and business intelligence platforms is at an all-time high."
      },
      {
        type: "heading",
        text: "4. Cybersecurity as a Priority"
      },
      {
        type: "paragraph",
        text: "With increased digital operations, cybersecurity threats are also escalating. Companies are investing heavily in security infrastructure, employee training, and compliance frameworks to protect their digital assets."
      },
      {
        type: "paragraph",
        text: "The year 2026 promises to be transformative. Organizations that embrace these trends and invest in the right technologies will be well-positioned for sustained growth and success."
      }
    ],
    relatedPosts: ["data-driven-decisions", "cloud-migration-guide", "ai-application-development"]
  },
  "data-driven-decisions": {
    title: "How Data-Driven Decision Making Fuels Growth",
    author: "Malik Muzzammil",
    date: "Mar 8, 2026",
    category: "Data Analytics",
    readTime: "6 min read",
    excerpt: "Learn how organizations leverage analytics and BI tools to make smarter, faster, and more confident business decisions.",
    content: [
      {
        type: "paragraph",
        text: "Data-driven decision making has become the hallmark of successful organizations. Gone are the days of hunches and gut feelings—modern businesses rely on insights derived from data to make strategic decisions."
      },
      {
        type: "heading",
        text: "The Power of Analytics"
      },
      {
        type: "paragraph",
        text: "Analytics and Business Intelligence tools have democratized data access. Teams across departments can now access real-time dashboards and insights, enabling faster decision-making cycles and better alignment across organizations."
      },
      {
        type: "heading",
        text: "From Raw Data to Actionable Insights"
      },
      {
        type: "paragraph",
        text: "The journey from raw data to actionable insights involves multiple steps: data collection, cleaning, transformation, analysis, and visualization. Organizations that master this pipeline gain significant competitive advantages."
      },
      {
        type: "heading",
        text: "Building a Data Culture"
      },
      {
        type: "paragraph",
        text: "Success with data goes beyond tools and technology. Organizations must foster a culture that values data literacy and encourages data-driven decision making at all levels. This requires training, leadership support, and the right infrastructure."
      },
      {
        type: "heading",
        text: "Case Study: Real Results"
      },
      {
        type: "paragraph",
        text: "Companies implementing comprehensive data strategies have seen 20-30% improvement in operational efficiency, 15-25% increase in revenue, and significantly better customer satisfaction scores. The ROI is clear and measurable."
      },
      {
        type: "paragraph",
        text: "If you're not already leveraging data in your decision-making process, now is the time to start. The competitive advantage is too significant to ignore."
      }
    ],
    relatedPosts: ["digital-transformation-2025", "cybersecurity-essentials", "ai-application-development"]
  },
  "cloud-migration-guide": {
    title: "A Practical Guide to Cloud Migration",
    author: "Kamran Aziz",
    date: "Feb 28, 2026",
    category: "Cloud Strategy",
    readTime: "10 min read",
    excerpt: "Step-by-step best practices for migrating your legacy systems to the cloud without disrupting business operations.",
    content: [
      {
        type: "paragraph",
        text: "Cloud migration is one of the most significant technological shifts organizations undertake. When done right, it can dramatically improve efficiency, reduce costs, and enable scalability. However, poor execution can lead to data loss, downtime, and wasted resources."
      },
      {
        type: "heading",
        text: "Phase 1: Assessment and Planning"
      },
      {
        type: "paragraph",
        text: "Before moving anything to the cloud, conduct a thorough assessment of your current infrastructure. Identify which workloads are suitable for cloud migration, estimate costs, and develop a detailed migration plan with timelines and resource allocation."
      },
      {
        type: "heading",
        text: "Phase 2: Pilot Migration"
      },
      {
        type: "paragraph",
        text: "Start small with a non-critical application. This allows your teams to learn, identify potential issues, and refine your migration processes before moving critical systems."
      },
      {
        type: "heading",
        text: "Phase 3: Full-Scale Migration"
      },
      {
        type: "paragraph",
        text: "With lessons learned from the pilot, begin migrating your critical systems. Maintain parallel running of old and new systems during this period to ensure business continuity. Gradually transition as confidence increases."
      },
      {
        type: "heading",
        text: "Phase 4: Optimization"
      },
      {
        type: "paragraph",
        text: "Post-migration, focus on optimization. Monitor performance, right-size instances, implement cost-saving strategies, and ensure all systems are running efficiently in the cloud."
      },
      {
        type: "heading",
        text: "Key Considerations"
      },
      {
        type: "paragraph",
        text: "Budget for unexpected costs, invest in team training, prioritize security and compliance, and don't hesitate to seek expert help. Cloud migration is complex but highly rewarding when executed properly."
      }
    ],
    relatedPosts: ["digital-transformation-2025", "cybersecurity-essentials"]
  },
  "ai-application-development": {
    title: "Building AI-Powered Applications That Users Love",
    author: "Sarah Johnson",
    date: "Feb 20, 2026",
    category: "App Development",
    readTime: "7 min read",
    excerpt: "From ideation to deployment — how to design and build intelligent applications that solve real user problems.",
    content: [
      {
        type: "paragraph",
        text: "AI-powered applications are no longer confined to research labs. They're becoming mainstream, solving real problems for millions of users every day. But building an AI app that users actually love requires more than just machine learning models."
      },
      {
        type: "heading",
        text: "Start with the Problem"
      },
      {
        type: "paragraph",
        text: "Before writing a single line of code, deeply understand the problem you're solving. Who are your users? What pain points do they experience? How can AI specifically help? This user-centric approach ensures your AI application creates real value."
      },
      {
        type: "heading",
        text: "Choose the Right Model"
      },
      {
        type: "paragraph",
        text: "Not all AI models are created equal. Consider factors like accuracy requirements, latency constraints, and resource availability. Sometimes a simple rule-based system outperforms a complex neural network."
      },
      {
        type: "heading",
        text: "Data Quality is Everything"
      },
      {
        type: "paragraph",
        text: "AI models are only as good as the data they're trained on. Invest time in data collection, cleaning, and validation. Poor data leads to biased, unreliable models that users won't trust."
      },
      {
        type: "heading",
        text: "Focus on User Experience"
      },
      {
        type: "paragraph",
        text: "Transparency and explainability matter. Users want to understand why your application made a particular decision. Build interfaces that clearly communicate AI-driven results and allow users to provide feedback."
      },
      {
        type: "paragraph",
        text: "The most successful AI applications are those where AI serves the user, not the other way around. Keep this principle at the forefront of your design and development process."
      }
    ],
    relatedPosts: ["digital-transformation-2025", "data-driven-decisions"]
  },
  "geospatial-technology": {
    title: "The Rise of Geospatial Technology in Urban Planning",
    author: "Malik Muzzammil",
    date: "Feb 10, 2026",
    category: "Geo-Spatial",
    readTime: "9 min read",
    excerpt: "How GIS and remote sensing are transforming city planning, disaster management, and environmental monitoring.",
    content: [
      {
        type: "paragraph",
        text: "Geospatial technology has emerged as a game-changer in urban planning and environmental management. GIS (Geographic Information Systems) combined with remote sensing and satellite imagery is enabling cities to make smarter, data-driven decisions."
      },
      {
        type: "heading",
        text: "Understanding Urban Growth"
      },
      {
        type: "paragraph",
        text: "GIS tools allow urban planners to visualize and analyze urban growth patterns over time. This data helps identify sprawl issues, optimize infrastructure development, and plan for sustainable growth."
      },
      {
        type: "heading",
        text: "Disaster Management and Response"
      },
      {
        type: "paragraph",
        text: "When natural disasters strike, geospatial data becomes invaluable. Real-time satellite imagery enables rapid assessment of damage, identification of affected areas, and coordination of relief efforts."
      },
      {
        type: "heading",
        text: "Environmental Monitoring"
      },
      {
        type: "paragraph",
        text: "From tracking deforestation to monitoring air and water quality, geospatial technology provides comprehensive environmental insights. This data drives policy decisions and environmental protection initiatives."
      },
      {
        type: "heading",
        text: "Transportation and Infrastructure"
      },
      {
        type: "paragraph",
        text: "GIS is revolutionizing how cities plan transportation networks and infrastructure. Spatial analysis helps optimize road layouts, identify congestion points, and plan efficient public transportation systems."
      },
      {
        type: "paragraph",
        text: "As cities continue to grow and face increasing environmental challenges, geospatial technology will become increasingly important in creating sustainable, resilient urban environments."
      }
    ],
    relatedPosts: ["digital-transformation-2025", "data-driven-decisions"]
  },
  "cybersecurity-essentials": {
    title: "Cybersecurity Essentials for Growing Businesses",
    author: "Syed Raza Abbas Kazmi",
    date: "Jan 30, 2026",
    category: "Security",
    readTime: "8 min read",
    excerpt: "A practical checklist of security measures every SME should implement to protect their digital assets.",
    content: [
      {
        type: "paragraph",
        text: "Growing businesses are increasingly targeted by cybercriminals. Yet many SMEs lack comprehensive security strategies. This checklist outlines essential security measures every business should implement."
      },
      {
        type: "heading",
        text: "1. Strong Authentication"
      },
      {
        type: "paragraph",
        text: "Implement multi-factor authentication (MFA) across all systems. Password alone is no longer sufficient. MFA significantly reduces unauthorized access risks."
      },
      {
        type: "heading",
        text: "2. Regular Software Updates"
      },
      {
        type: "paragraph",
        text: "Keep all software, operating systems, and applications updated. Security patches are critical and should be deployed promptly to protect against known vulnerabilities."
      },
      {
        type: "heading",
        text: "3. Employee Training"
      },
      {
        type: "paragraph",
        text: "Human error is the weakest link in security. Regular training on phishing, social engineering, and safe browsing habits is essential. A well-trained workforce is your best defense."
      },
      {
        type: "heading",
        text: "4. Data Encryption"
      },
      {
        type: "paragraph",
        text: "Encrypt sensitive data both in transit and at rest. This ensures that even if data is compromised, it remains unreadable to unauthorized parties."
      },
      {
        type: "heading",
        text: "5. Regular Backups"
      },
      {
        type: "paragraph",
        text: "Maintain regular backups of critical data. In case of ransomware or data loss, backups enable quick recovery without paying ransom or losing valuable data."
      },
      {
        type: "paragraph",
        text: "Security is not a one-time project but an ongoing commitment. Implement these essentials and continuously update your security practices as threats evolve."
      }
    ],
    relatedPosts: ["digital-transformation-2025", "cloud-migration-guide"]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  if (!slug || !blogPosts[slug]) {
    return (
      <section className="section-padding">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">Sorry, we couldn't find the blog post you're looking for.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </section>
    );
  }

  const post = blogPosts[slug];
  interface RelatedPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
  }

  const relatedPosts: RelatedPost[] = post.relatedPosts.map((slug: string) => ({
    slug,
    title: blogPosts[slug].title,
    excerpt: blogPosts[slug].excerpt,
    category: blogPosts[slug].category,
    date: blogPosts[slug].date
  }));

  return (
    <>
      {/* Header */}
      <section className="section-padding bg-hero-gradient text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl -z-10"></div>

        <div className="container relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/80 mb-4">{post.category}</span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 max-w-3xl">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-semibold">
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container max-w-3xl">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            {post.content.map((block: ContentBlock, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {block.type === "paragraph" && (
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {block.text}
                  </p>
                )}
                {block.type === "heading" && (
                  <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                    {block.text}
                  </h2>
                )}
              </motion.div>
            ))}
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-12">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post: RelatedPost, i: number) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all block h-full"
                  >
                    <div className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">
                      {post.category}
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      {post.date}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-hero-gradient text-primary-foreground text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Discuss Your Project?</h2>
          <p className="text-primary-foreground/90 max-w-lg mx-auto mb-8 text-lg">
            Let's explore how we can help you achieve your digital transformation goals.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
};

export default BlogPost;
