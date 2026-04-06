import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2, Code2, Calendar, Tag, ArrowRight, Sparkles, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { projectsAPI } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  technologies: string[];
  image?: string;
  slug?: string;
  client?: string;
  duration?: string;
  year?: string;
  liveUrl?: string;
  highlights?: string[];
  challenge?: string;
  solution?: string;
  outcome?: string;
}

const COLORS = [
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-sky-500 to-blue-500",
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) { setError("Invalid project URL"); setLoading(false); return; }
      try {
        setLoading(true);
        setError(null);
        const response = await projectsAPI.getBySlug(id);
        if (response.success && response.data) {
          setProject(response.data as unknown as Project);
        } else {
          setError(response.message || "Project not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project case study...</p>
        </div>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="min-h-screen flex items-center justify-center section-padding">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The requested project does not exist."}</p>
          <Button asChild><Link to="/projects">Back to Projects</Link></Button>
        </div>
      </section>
    );
  }

  const colorIdx = (project.title.charCodeAt(0) || 0) % COLORS.length;
  const gradient = COLORS[colorIdx];
  const techInitials = project.title.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="pt-24 pb-20">
      {/* ─── ARTICLE HEADER ───────────────────────────────────────────── */}
      <header className="container max-w-5xl mb-12 lg:mb-20">
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-10"
        >
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <span className="opacity-30">/</span>
          <span className="text-primary">{project.projectType}</span>
        </motion.nav>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] mb-10 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground"
        >
          {project.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-x-12 gap-y-6 pt-10 border-t border-border"
        >
          {[
            { label: "Client", value: project.client || "Proprietary" },
            { label: "Year", value: project.year || "2024" },
            { label: "Type", value: project.projectType },
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">{item.label}</p>
              <p className="text-base font-bold text-foreground">{item.value}</p>
            </div>
          ))}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-auto group flex items-center gap-3 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            >
              LAUNCH PROJECT <ExternalLink className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
          )}
        </motion.div>
      </header>

      {/* ─── MAIN BANNER ──────────────────────────────────────────────── */}
      <section className="container mb-20 lg:mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] overflow-hidden aspect-[16/9] lg:aspect-[21/9] bg-muted/20 border border-border shadow-2xl"
        >
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
              <div className="text-white text-8xl sm:text-[12rem] font-black opacity-20 pointer-events-none select-none">
                {techInitials}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ─── CASE STUDY BODY ──────────────────────────────────────────── */}
      <section className="container max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* COLUMN 1: EDITORIAL CONTENT */}
          <div className="lg:col-span-8 space-y-24">
            {[
              { id: "challenge", title: "The Challenge", content: project.challenge, icon: "🎯" },
              { id: "solution", title: "Our Solution", content: project.solution, icon: "⚡" },
              { id: "outcome", title: "The Outcome", content: project.outcome, icon: "📈" },
            ].map((section, idx) => (
              section.content && (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-5">
                    <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-[0.2em]">Section 0{idx + 1}</span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">{section.title}</h2>
                  </div>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium opacity-90 whitespace-pre-line">
                    {section.content}
                  </p>
                </motion.div>
              )
            ))}

            {/* Fallback description */}
            {!project.challenge && !project.solution && !project.outcome && (
              <div className="space-y-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">Project Context</h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                  {project.description}
                </p>
              </div>
            )}
          </div>

          {/* COLUMN 2: STICKY SIDEBAR (Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
            
            {/* Tech Stack Card */}
            <div className="p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-sm shadow-xl shadow-black/5">
              <div className="flex items-center gap-3 mb-8">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em]">Core Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.technologies?.map((tech) => (
                  <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-primary hover:text-white transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights / Quick Stats Card */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="p-8 rounded-3xl border border-border bg-card/40 backdrop-blur-sm shadow-xl shadow-black/5 overflow-hidden relative">
                <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-[0.03] text-primary" />
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em]">Project Facts</h3>
                </div>
                <ul className="space-y-6">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-4">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      <span className="text-sm text-muted-foreground font-semibold leading-normal">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA in sidebar */}
            <div className="p-8 rounded-3xl bg-hero-gradient text-primary-foreground shadow-2xl">
              <h4 className="text-xl font-black mb-4">Interested?</h4>
              <p className="text-sm opacity-80 mb-8 leading-relaxed">Let's discuss how we can bring same level of technical precision to your next project.</p>
              <Button asChild className="w-full bg-white text-foreground hover:bg-white/90">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>

          </aside>
        </div>
      </section>

      {/* ─── FINAL FOOTER CTA ─────────────────────────────────────────── */}
      <section className="container mt-20 lg:mt-40">
        <div className="relative p-12 lg:p-24 rounded-[50px] overflow-hidden text-center bg-card border border-border shadow-2xl shadow-primary/5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 -z-10" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-10"
          >
            <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-none">
              Push your <span className="text-primary italic">vision</span> forward.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
              From technical strategy to full-scale deployment, we are the team that moves ideas forward.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Button asChild size="lg" className="rounded-full px-12 py-8 text-lg font-bold">
                <Link to="/contact">Start a Discussion</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-12 py-8 text-lg font-bold">
                <Link to="/projects">Project Archive</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
