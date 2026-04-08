import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Code2, Sparkles, Share2, Users, Clock, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";
import { PROJECTS, type ProjectData as Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

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
  const [sectionProgress, setSectionProgress] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const scroll = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scroll.scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    if (!id) {
      setError("Invalid project URL");
      setLoading(false);
      return;
    }
    
    const foundProject = PROJECTS.find(p => p.slug === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      setError("Project not found");
    }
    setLoading(false);
  }, [id]);

  const relatedProjects = PROJECTS.filter(p => p.slug !== id && p.projectType === project?.projectType).slice(0, 3);

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
          <Button asChild={true}><Link to="/projects">Back to Projects</Link></Button>
        </div>
      </section>
    );
  }

  const colorIdx = (project.title.charCodeAt(0) || 0) % COLORS.length;
  const gradient = COLORS[colorIdx];
  const techInitials = project.title.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  const shareUrl = `https://yourdomain.com/projects/${id}`;

  return (
    <div className="pt-24 pb-20 relative" ref={ref}>
      <motion.div style={{ y }} className="absolute inset-0 -z-10 bg-gradient-to-br from-background to-muted/50" />

      {/* BREADCRUMBS */}
      <nav className="container max-w-7xl px-4 md:px-8 lg:px-12 mb-12 lg:mb-20">
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-muted-foreground mb-10"
        >
          <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <span className="opacity-30">/</span>
          <span className="text-primary">{project.projectType}</span>
        </motion.nav>
      </nav>

      {/* ENHANCED HERO */}
      <section className="w-full mb-20 lg:mb-32 -mt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-8 lg:px-12 relative overflow-hidden rounded-2xl -mx-4 md:-mx-8 lg:-mx-12"
        >
          <div className="aspect-[16/9] md:aspect-[3/1] lg:aspect-[4/1] w-full bg-gradient-to-br from-gray-900/20 to-transparent rounded-2xl overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} showcase`}
                className="w-full h-full object-contain object-center max-h-[80vh] md:max-h-[90vh] lg:max-h-[85vh] hover:scale-105 transition-transform duration-1000"
                loading="eager"
              />
            ) : (
              <div className={`w-full h-full ${gradient}`} />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent lg:from-black/60" />
          </div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center max-w-4xl mx-auto px-6 z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 drop-shadow-2xl"
            >
              {project.title}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-8 md:gap-12 gap-y-6 pt-10 bg-black/30 backdrop-blur-md rounded-3xl px-8 py-8 md:py-10 border border-white/30 max-w-3xl shadow-2xl"
            >
              {[
                { label: "Client", value: project.client || "Proprietary", icon: Users },
                { label: "Year", value: project.year || "2024" },
                { label: "Type", value: project.projectType },
                ...(project.teamSize ? [{ label: "Team", value: project.teamSize }] : []),
                ...(project.duration ? [{ label: "Duration", value: project.duration }] : []),
              ].map((item, i) => (
                <div key={i} className="space-y-1 text-white text-center md:text-left flex items-center gap-2">
                  {item.icon && <item.icon className="h-4 w-4 opacity-80 flex-shrink-0" />}
                  <div>
                    <p className="text-xs md:text-sm font-black uppercase tracking-widest opacity-70">{item.label}</p>
                    <p className="text-xl md:text-2xl font-black">{item.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>


          </div>
          
          {!project.image && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-white text-5xl md:text-7xl lg:text-8xl font-black opacity-10 pointer-events-none select-none">
                {techInitials}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* ─── GALLERY ──────────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="container max-w-7xl px-4 md:px-8 lg:px-12 mb-24 lg:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-6">
              <span className="text-xs font-black px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-[0.2em]">Gallery</span>
              <h2 className="text-3xl md:text-4xl font-black">Project Screenshots</h2>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: false
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {project.gallery.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="p-1 border-2 border-border/50 rounded-2xl bg-card shadow-2xl">
                      <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                        <img src={img} alt={`${project.title} screenshot ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </motion.div>
        </section>
      )}

      {/* ─── CASE STUDY BODY ──────────────────────────────────────────── */}
      <section className="container max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">
          
          {/* MAIN CONTENT */}
          <div className="md:col-span-2 lg:col-span-8 space-y-20 md:space-y-24 lg:space-y-32">
            
            {/* Challenge/Solution/Outcome */}
            {[
              { id: "challenge", title: "The Challenge", content: project.challenge, icon: "🎯" },
              { id: "solution", title: "Our Solution", content: project.solution, icon: "⚡" },
              { id: "outcome", title: "The Outcome", content: project.outcome, icon: "📈" },
            ].map((section, idx) => 
              section.content ? (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: 0, y: 30 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-10 md:space-y-12"
                >
                  <div className="flex items-center gap-6 md:gap-8">
                    <span className="text-sm font-black px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-[0.2em] whitespace-nowrap">Section {idx + 1}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">{section.title}</h2>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium opacity-90 whitespace-pre-line max-w-4xl">
                    {section.content}
                  </p>
                </motion.div>
              ) : null
            )}

            {/* Fallback */}
            {(!project.challenge && !project.solution && !project.outcome) ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="space-y-10 md:space-y-12"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">Project Context</h2>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium max-w-4xl">
                  {project.description}
                </p>
              </motion.div>
            ) : null}

            {/* Testimonials */}
            {project.highlights && project.highlights.length > 0 && (
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="flex items-center gap-6">
                  <Sparkles className="h-8 w-8 text-primary opacity-80" />
                  <h3 className="text-3xl md:text-4xl font-black">Key Results</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  {project.highlights.slice(0, 4).map((highlight, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="group flex items-start gap-4 p-6 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/10 transition-all group-hover:scale-[1.02] hover:-translate-y-2"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2 opacity-80 group-hover:scale-125 transition-transform" />
                      <p className="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

          </div>

          {/* ENHANCED SIDEBAR */}
          <aside className="md:col-span-1 lg:col-span-4 md:sticky md:top-24 lg:top-32 h-fit space-y-10 md:space-y-12 lg:space-y-16">
            
            {/* Tech Stack */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="p-6 md:p-8 lg:p-10 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md shadow-2xl shadow-black/10 group hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <Code2 className="h-5 w-5 md:h-6 md:w-6 text-primary group-hover:rotate-12 transition-transform" />
                <h3 className="text-sm md:text-base font-black uppercase tracking-[0.2em] lg:tracking-[0.3em]">Core Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {project.technologies.map((tech, i) => (
                  <motion.span 
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="text-xs md:text-sm font-bold uppercase tracking-wider px-4 py-2 md:px-3 md:py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/25 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tech Deep-Dive Accordion */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md shadow-2xl"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tech">
                  <AccordionTrigger className="hover:no-underline">
                    Tech Stack Deep Dive
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="grid grid-cols-2 gap-3 mt-2 text-sm text-muted-foreground">
                      {project.technologies.slice(0, 6).map(tech => (
                        <li key={tech} className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent hover:text-foreground transition-colors">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Share */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 lg:p-10 rounded-3xl border border-border/50 bg-card/50 backdrop-blur-md shadow-2xl shadow-black/10 hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <Share2 className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-black uppercase tracking-[0.2em]">Share Case Study</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild={true} className="flex-1">
                  <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${project.title}`} target="_blank">Twitter</a>
                </Button>
                <Button variant="outline" size="sm" asChild={true} className="flex-1">
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank">LinkedIn</a>
                </Button>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 md:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-primary/90 text-primary-foreground shadow-2xl hover:shadow-3xl border border-primary/50 transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent -z-10" />
              <h4 className="text-xl md:text-2xl lg:text-3xl font-black mb-4 leading-tight">Ready to build?</h4>
              <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed font-medium">Bring technical excellence to your project.</p>
              <Button asChild={true} className="w-full h-14 md:h-16 text-lg font-bold shadow-lg hover:shadow-xl bg-white hover:bg-white text-foreground border-2 border-transparent hover:border-primary/50">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </motion.div>

            {/* Section Progress Dots */}
            <div className="flex gap-2 pt-4">
              {[1,2,3,4].map(i => (
                <div key={i} className={`h-2 w-2 rounded-full transition-all ${sectionProgress[i-1] > 0.5 ? 'bg-primary scale-125' : 'bg-border'}`} />
              ))}
            </div>

          </aside>
        </div>
      </section>

      {/* ─── RELATED PROJECTS ──────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <section className="container max-w-7xl px-4 md:px-8 lg:px-12 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 text-center"
          >
            <div className="flex flex-col items-center gap-6">
              <span className="text-xs font-black px-5 py-2 rounded-full bg-secondary text-secondary-foreground uppercase tracking-[0.2em]">Related</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black max-w-2xl mx-auto">
                More {project.projectType} Excellence
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p, i) => (
                <ProjectCard key={p._id} project={p} index={i} />
              ))}
            </div>
            <Button asChild={true} variant="outline" size="lg">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </motion.div>
        </section>
      )}

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="container max-w-6xl px-4 md:px-8 lg:px-12 mt-24 md:mt-32 lg:mt-48">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 md:p-16 lg:p-24 rounded-[4rem] overflow-hidden text-center bg-gradient-to-br from-background via-card to-background/80 border border-border/50 shadow-2xl shadow-black/5 backdrop-blur-xl max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 -z-10" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-12 lg:space-y-14">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.9] bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Ready to transform your <span className="text-primary italic drop-shadow-lg">idea</span> into reality?
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-semibold leading-relaxed opacity-90 mx-auto max-w-2xl">
              Partner with engineers who deliver precision engineering and exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 lg:gap-8 justify-center items-center pt-4">
              <Button asChild={true} className="rounded-3xl px-10 py-8 md:px-12 md:py-10 text-xl md:text-2xl font-black shadow-2xl hover:shadow-3xl min-w-[220px] h-auto">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild={true} variant="outline" className="rounded-3xl px-8 py-8 md:px-12 md:py-10 text-xl md:text-2xl font-black shadow-xl hover:shadow-2xl border-2 min-w-[220px] h-auto">
                <Link to="/projects">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ProjectDetail;

