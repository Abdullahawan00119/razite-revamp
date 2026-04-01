import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { blogsAPI } from "@/lib/api";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogsAPI.getAll({ status: 'published' });
        const blogsData = (response.data as unknown as BlogPost[]) || [];
        setPosts(blogsData);
      } catch (error) {
        console.error('Failed to load blogs:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="section-padding overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -z-10"></div>

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              Blog & Insights
            </span>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mt-6">
              Insights & <span className="text-gradient">Industry Perspectives</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-lg">
              Thoughts, guides, and industry perspectives from the Razite team on technology, innovation, and digital transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading blogs...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No blogs available yet.</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {posts.map((post, i) => (
                <motion.article
                  key={post._id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <div className="h-full flex flex-col rounded-2xl border border-border/50 bg-card overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      {/* Header Image */}
                      <div className="h-40 bg-hero-gradient opacity-90 flex items-center justify-center p-6 group-hover:opacity-100 transition-opacity relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <span className="text-xs font-bold text-primary-foreground/80 uppercase tracking-widest relative z-10">{post.category}</span>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                          <Calendar className="h-3 w-3" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        
                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Footer */}
                        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                          Read More <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary/10 via-background to-primary/5 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 p-8 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent"
          >
            <Sparkles className="h-8 w-8 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-foreground mb-1">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">Subscribe to our newsletter for the latest insights and updates.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Blog;
