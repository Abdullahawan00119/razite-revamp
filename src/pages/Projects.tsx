import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projectsAPI } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  technologies?: string[];
  highlights?: string[];
  image?: string;
  slug?: string;
}

const COLORS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-sky-500 to-blue-500",
];

const ITEMS_PER_PAGE = 9;

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getAll();
        const projectsData = (response.data as unknown as Project[]) || [];
        setProjects(projectsData);
      } catch (error) {
        console.error("Failed to load projects:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const paginated = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────── */}
<section className="relative min-h-[50vh] flex items-center overflow-hidden">
        {/* Layered ambient gradients (About page style) */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/12 via-cyan-500/6 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 pt-16 pb-16 md:pb-24 lg:pb-32">
          {/* Watermark background title */}
          <div className="absolute top-[35%] left-0 -z-10 select-none opacity-[0.02] pointer-events-none hidden lg:block">
            <h1 className="text-[18rem] font-black uppercase tracking-tighter leading-none whitespace-nowrap">
              PORTFOLIO
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left – text */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-primary mb-10 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm shadow-xl shadow-primary/5">
                <Sparkles className="h-4 w-4" /> Elite Showcase
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mt-4">
                Featured <br className="hidden sm:block" /> 
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-indigo-500">Projects</span>
              </h1>
              
              <p className="mt-10 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-xl font-medium opacity-90">
                A selection of high-impact digital products and strategic solutions built for startups, SMEs, and global enterprise leaders.
              </p>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="font-semibold shadow-lg shadow-primary/20">
                  <Link to="/contact">
                    Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="hidden sm:flex flex-wrap gap-3 mt-4 sm:mt-0 items-center ml-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground px-4 py-2 rounded-full border border-border/60 bg-card/60 backdrop-blur-sm">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Multi-Industry
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right – Visual Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              {/* Outer glow */}
              <div className="absolute -inset-10 bg-gradient-to-br from-primary/20 to-blue-500/10 rounded-[50%] blur-3xl -z-10" />

              <div className="relative rounded-3xl bg-hero-gradient p-10 text-primary-foreground shadow-2xl overflow-hidden group">
                {/* Decorative background elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-700" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-8 py-4">
                  <div className="flex items-center justify-between">
                    <Layers className="h-12 w-12 opacity-80" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/10 rounded-full border border-white/20">Portfolio Metrics</span>
                  </div>
                  
                  <div>
                    <div className="text-7xl font-black tracking-tighter">50+</div>
                    <div className="text-lg font-bold opacity-90 mt-1">Global Deployments</div>
                  </div>

                  <div className="pt-8 border-t border-white/20 grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-2xl font-bold">12+</div>
                      <div className="text-[10px] uppercase font-black tracking-widest opacity-70 mt-1">Industries</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-[10px] uppercase font-black tracking-widest opacity-70 mt-1">Client Trust</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-card border border-border/60 shadow-xl backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-foreground uppercase tracking-tight">Case Study Driven</div>
                    <div className="text-[10px] text-muted-foreground font-medium">Proven Results</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── GRID ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-transparent via-muted/5 to-transparent">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Curating portfolio pieces...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Code2 className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-30" />
                <p className="text-muted-foreground text-xl font-medium tracking-tight">Expanding our portfolio. Check back soon.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                {paginated.map((p, i) => (
                  <ProjectCard key={p._id} project={p} index={i + (page - 1) * ITEMS_PER_PAGE} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <Button
                      key={pg}
                      variant={pg === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pg)}
                      className="w-9 h-9 p-0"
                    >
                      {pg}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container text-center max-w-2xl mx-auto">
          <SectionHeading label="Work With Us" title="Have a Project in Mind?" description="We'd love to hear about it. Let's discuss how we can bring your vision to life." />
          <Button asChild size="lg" className="shadow-lg shadow-primary/20">
            <Link to="/contact">Start a Conversation <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Projects;
