import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { blogsAPI } from "@/lib/api";

interface BlogPostData {
  _id?: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  readTime?: string;
  excerpt: string;
  content: ContentBlock[] | string;
  createdAt?: string;
  updatedAt?: string;
}

interface ContentBlock {
  type: "heading" | "paragraph";
  text: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError("Invalid blog post URL");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await blogsAPI.getBySlug(slug);
        
        if (response.success && response.data) {
          // Extract the blog post data - handle nested response
          let blogData: unknown = response.data;
          
          // If the response contains a nested data property, extract it
          if (blogData && typeof blogData === 'object' && 'data' in blogData && !('title' in blogData)) {
            blogData = (blogData as Record<string, unknown>).data;
          }
          
          // Validate that we have required fields
          if (blogData && typeof blogData === 'object' && 'title' in blogData && 'content' in blogData) {
            setPost(blogData as unknown as BlogPostData);
          } else {
            setError("Invalid blog post format");
          }
        } else {
          setError(response.message || "Blog post not found");
        }
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError(err instanceof Error ? err.message : "Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <section className="section-padding min-h-screen flex items-center">
        <div className="container text-center">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="section-padding min-h-screen flex items-center">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
          <p className="text-muted-foreground mb-6">Sorry, we couldn't find the blog post you're looking for.</p>
          <p className="text-sm text-muted-foreground/70 mb-6">{error || "The requested blog post does not exist"}</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </section>
    );
  }

  // Calculate reading time if not provided
  const readTime = post.readTime || `${Math.ceil(((post.content as unknown as string)?.split(' ').length || 0) / 200)} min read`;
  
  // Parse content to separate paragraphs and headings
  const parseContent = (content: unknown): ContentBlock[] => {
    // If content is already an array of ContentBlock objects, return it directly
    if (Array.isArray(content) && content.length > 0 && 'type' in content[0] && 'text' in content[0]) {
      return content as ContentBlock[];
    }
    
    // If content is a string, parse it
    if (typeof content === 'string' && content.trim() !== '') {
      const lines = content.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        return lines.map(line => ({
          type: line.startsWith('##') || line.startsWith('#') ? 'heading' : 'paragraph',
          text: line.replace(/^#+\s*/, '')
        }));
      }
    }
    
    // Fallback: generate content from excerpt
    if (post.excerpt) {
      return [
        { type: 'paragraph', text: post.excerpt }
      ];
    }
    return [];
  };

  const contentBlocks = parseContent(post.content);
  
  const formattedDate = new Date(post.date || post.createdAt || new Date()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

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
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/80 mb-4">
              {post.category || 'Blog'}
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8 max-w-3xl">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author || 'Razite Team'}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
              <div className="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-semibold">
                {readTime}
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
            className="max-w-none"
          >
            {contentBlocks && contentBlocks.length > 0 ? (
              contentBlocks.map((block: ContentBlock, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  {block.type === "paragraph" && (
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6 whitespace-pre-wrap">
                      {block.text}
                    </p>
                  )}
                  {block.type === "heading" && (
                    <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
                      {block.text}
                    </h2>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="py-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {post.excerpt || "Content for this blog post is being prepared."}
                </p>
              </div>
            )}
          </motion.article>

          {/* Back to Blog Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-border"
          >
            <Button asChild variant="outline">
              <Link to="/blog" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to All Articles
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

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
