import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

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
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      key={post._id}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="group/article"
    >
      <Link to={`/blog/${post.slug}`} className="block h-full group/card relative">
        {/* Outer glow on hover */}
        <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 opacity-0 group-hover/card:opacity-100 blur-xl transition-all duration-500 -z-10" />

        <div className="h-full flex flex-col rounded-2xl border border-white/10 bg-card/60 backdrop-blur-xl overflow-hidden hover:border-primary/25 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:scale-[1.01]">
          {/* Header Image area */}
          <div className="h-48 bg-muted/20 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-hero-gradient opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            
            <motion.span 
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1 }}
              className="text-[10px] font-black text-white uppercase tracking-[0.3em] px-5 py-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/20 relative z-10 shadow-2xl"
            >
              {post.category}
            </motion.span>
            
            {/* Animated focus ring on hover */}
            <div className="absolute inset-0 border-2 border-white/0 group-hover/card:border-white/10 transition-all duration-700 pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-1 relative">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-5 opacity-70 group-hover/card:opacity-100 transition-opacity">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>

            <h3 className="text-xl md:text-2xl font-black text-foreground mb-4 group-hover/card:text-primary transition-colors leading-tight line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-10 line-clamp-3 opacity-90 group-hover/card:opacity-100 transition-opacity flex-1 font-medium">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-8 border-t border-border/20">
              <span className="text-xs font-black text-primary group-hover/card:gap-4 flex items-center gap-2 transition-all tracking-[0.2em]">
                READ ARTICLE <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-1" />
              </span>
              <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                <ArrowRight className="h-4.5 w-4.5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
