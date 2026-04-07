import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { BLOGS, BlogPostData as BlogPost } from "@/data/blogs";

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
  const posts: BlogPost[] = BLOGS.filter(post => post.status === 'published');
  const [loading] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Layered ambient gradients (About page style) */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/12 via-cyan-500/6 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-primary/8 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 pt-16 pb-16 md:pb-24 lg:pb-32">
          {/* Watermark background title */}
          <div className="absolute top-[35%] left-0 -z-10 select-none opacity-[0.02] pointer-events-none hidden lg:block">
            <h1 className="text-[18rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
              JOURNAL
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
                <Sparkles className="h-4 w-4" /> Insights & Perspectives
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mt-6">
                Our <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-indigo-500">Journal</span>
              </h1>
              <p className="mt-10 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl font-medium opacity-90">
                Thoughts, guides, and industry perspectives from the Razite team on technology, innovation, and digital transformation.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground px-4 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> Weekly Updates
                </div>
              </div>
            </motion.div>

            {/* Right – Journal Metrics Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 to-indigo-500/10 rounded-[50%] blur-3xl -z-10" />

              <div className="relative rounded-3xl bg-hero-gradient p-10 text-primary-foreground shadow-2xl overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-8 py-4">
                  <div className="flex items-center justify-between">
                    <Sparkles className="h-12 w-12 opacity-80" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/10 rounded-full border border-white/20">Reader Hub</span>
                  </div>
                  
                  <div>
                    <div className="text-7xl font-black tracking-tighter">30+</div>
                    <div className="text-lg font-bold opacity-90 mt-1">Expert Guides</div>
                  </div>

                  <div className="pt-8 border-t border-white/20 grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-2xl font-bold">5K+</div>
                      <div className="text-[10px] uppercase font-black tracking-widest opacity-70 mt-1">Monthly Readers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12+</div>
                      <div className="text-[10px] uppercase font-black tracking-widest opacity-70 mt-1">Categories</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-4 rounded-2xl bg-card border border-border/60 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-foreground uppercase tracking-tight">Latest Insight</div>
                    <div className="text-[10px] text-muted-foreground font-medium">Updated 2 days ago</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-transparent via-muted/5 to-transparent">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground font-medium">Gathering our latest thoughts...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-30" />
                <p className="text-muted-foreground text-xl font-medium tracking-tight">New perspectives are being drafted. Stay tuned.</p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
              {posts.map((post, i) => (
                <BlogCard key={post._id} post={post} index={i} />
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
