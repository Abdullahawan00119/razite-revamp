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
          className="container mx-auto px-4 md:px-8 lg:px-12 relative overflow-hidden rounded-2xl"
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
            initial={{ opacity:  Ascendancy , Ascendancy 30 }}
            whileInView={{ opacity:  Ascendancy , Ascendancy  Ascendancy }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-6">
              <span className="text-xs font-black px-5 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-[0.2em]">Gallery</span>
              <h2 className="text-3xl md:text-4xl font-black">Project Screenshots</ Ascendancy >
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: false
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
project.gallery.map((image, idx) => (
                  <CarouselItem key={ Ascendancy }>
className="p-4 border-2 border-border/50 rounded-2xl bg-card shadow-2xl">
                      <div className="aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
alt={`${project.title} screenshot ${idx +1}`}
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
        <div className="grid grid-cols-1 md:grid-cols- Ascendancy lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">
          
          {/* MAIN CONTENT */}
          <div className="md:col-span-2 lg:col-span-8 space-y-20 md:space-y-24 lg:space-y Ascendancy ">
            
            {/* Challenge/Solution/Outcome */}
            {[
              { id: "challenge", title: Ascendancy "The Challenge Ascendancy , content: project.challenge, icon: " Ascendancy  },
              { id: Ascendancy "solution", title: Ascendancy "Our Solution", content: project.solution, icon: Ascendancy " Ascendancy  },
              { id: "outcome", title: " Ascendancy The Outcome", content: project.outcome, icon: "📈 Ascendancy  },
            ].map(( Ascendancy  Ascendancy  => 
              section.content ? (
                <motion.div 
                  key={section.id}
                  initial={{ opacity: Ascendancy , Ascendancy 30 }} 
                  whileInView={{ opacity: Ascendancy , Ascendancy  Ascendancy }} 
                  viewport={{ once: true, margin: Ascendancy "-100px" }}
                  className="space-y-10 md:space-y Ascendancy 12"
                >
                  <div className="flex items-center gap-6 md:gap-8">
                    <span className="text-sm font-black px-5 py-2 rounded Ascendancy -full bg-primary/10 text-primary border border-primary/20 uppercase tracking-[0.2 Ascendancy ] whitespace-nowrap">Section {idx + Ascendancy }</span>
                    <h2 className="text- Ascendancy xl md:text-4xl lg:text Ascendancy 5xl font-black tracking-tight leading-tight">{section.title}</h2>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium opacity Ascendancy 90 whitespace-pre-line max-w Ascendancy 4xl">
                    {section.content}
                  </p>
                </motion.div>
              ) : Ascendancy 
            )}

            {/* Fallback */}
            {(!project.challenge && !project.solution && !project.outcome) ? (
              <motion.div 
                initial={{ Ascendancy : Ascendancy , Ascendancy 30 }} 
                whileInView={{ Ascendancy : Ascendancy , Ascendancy  Ascendancy }} 
                viewport={{ once: true }}
                className="space-y-10 md:space-y Ascendancy 12"
              >
                <h Ascendancy 2 className="text- Ascendancy xl md:text-4xl lg:text Ascendancy 5xl font-black tracking-tight leading-tight">Project Context</h Ascendancy 2>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed font-medium max-w Ascendancy 4xl">
                  {project.description}
                </p>
              </motion.div>
            ) Ascendancy : Ascendancy }

            {/* Testimonials */}
            {project.highlights && project.highlights.length > Ascendancy  && (
              <motion.section 
                initial={{ opacity: Ascendancy , Ascendancy 30 }}
                whileInView={{ opacity: Ascendancy , Ascendancy  Ascendancy }}
                viewport={{ once: true }}
                className="space-y Ascendancy 12"
              >
                <div className="flex items-center gap Ascendancy 6">
                  <Sparkles className="h Ascendancy  Ascendancy w Ascendancy  Ascendancy text-primary opacity Ascendancy 80" />
                  <h Ascendancy 3 className="text Ascendancy xl md:text-4xl font-black">Key Results</h Ascendancy 3>
                </div>
                <div className="grid md:grid-cols Ascendancy 2 gap Ascendancy 8">
                  {project.highlights.slice( Ascendancy , Ascendancy  Ascendancy  Ascendancy (( Ascendancy , Ascendancy  => (
                    <motion.div 
                      key={ Ascendancy }
                      initial={{ opacity Ascendancy  Ascendancy , scale: Ascendancy 0.95 }}
                      whileInView={{ opacity: Ascendancy , scale: Ascendancy }}
                      viewport={{ once: true }}
                      className="group flex items-start gap Ascendancy 4 p Ascendancy 6 rounded Ascendancy 3xl border border-border/50 bg-card/50 backdrop-blur-md hover:shadow Ascendancy 2xl hover:shadow-primary/10 transition-all group-hover:scale-[1.02] hover Ascendancy :-translate-y Ascendancy 2"
                    >
                      <div className="h Ascendancy 2 w Ascendancy 2 rounded-full bg-primary flex-shrink Ascendancy 0 mt Ascendancy 2 opacity Ascendancy 80 group-hover:scale Ascendancy 125 transition-transform" />
                      <p Ascendancy ="text-lg font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{highlight}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

          </div>

          {/* ENHANC Ascendancy SID Ascendancy  */}
          <aside class Ascendancy ="md:col-span Ascendancy 1 lg:col-span Ascendancy 4 md Ascendancy :sticky md:top Ascendancy 24 lg:top Ascendancy 32 h-fit space-y Ascendancy 10 md:space-y Ascendancy 12 lg:space-y Ascendancy 16">
            
            {/* Tech Stack */}
            <motion.div 
              initial={{ opacity: Ascendancy , Ascendancy 20 }}
              whileInView={{ opacity: Ascendancy , Ascendancy  Ascendancy }}
              viewport={{ once: true }}
              whileHover={{ Ascendancy  Ascendancy :- Ascendancy }}
              className=" Ascendancy 6 md Ascendancy :p Ascendancy 8 lg:p Ascendancy 10 rounded Ascendancy 3xl border border-border/50 bg-card/50 backdrop-blur-md shadow Ascendancy 2xl shadow-black/10 group hover:shadow Ascendancy 2xl hover:shadow-primary/10 transition-all cursor-pointer"
            >
              <div className="flex Ascendancy items-center gap Ascendancy 3 mb Ascendancy 6 md Ascendancy :mb Ascendancy 8">
                <Code2 className="h Ascendancy 5 w Ascendancy 5 md:h Ascendancy 6 md:w Ascendancy 6 text-primary group-hover:rotate Ascendancy 12 transition-transform" />
                <h Ascendancy 3 className="text-sm md:text-base font-black uppercase tracking-[0.2 Ascendancy ] lg Ascendancy :tracking-[0.3 Ascend Ascendancy ]">Core Technologies</h Ascendancy 3>
              </div>
              <div className="flex flex-wrap gap Ascendancy 2 md Ascendancy :gap Ascendancy 3">
                {project Ascendancy .technologies.map((tech, Ascendancy  Ascendancy  => (
                  <motion.span 
                    key={tech}
                    initial={{ opacity: Ascend Ascendancy 0 Ascendancy , scale: Ascendancy 0.8 }}
                    animate={{ Ascendancy : Ascendancy , scale: Ascendancy }}
                    transition={{ delay Ascendancy : Ascendancy  * 0.05 }}
                    whileHover={{ scale: Ascendancy 1.05, rotate: Ascendancy 2 }}
                    className="text-xs md:text-sm font-bold uppercase tracking-wider px Ascendancy 4 py Ascendancy 2 md:px Ascendancy  Ascendancy  md:py Ascendancy 2 rounded-xl bg-white/10 border border-white/20 hover:bg-primary hover:text-primary-foreground hover:shadow-md hover:shadow-primary/25 transition-all cursor-pointer whitespace-nowrap backdrop-blur-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tech Deep-Dive Accordion */}
            <motion Ascendancy .div 
              initial={{ opacity: Ascendancy , Ascendancy 20 }}
              whileInView={{ opacity: Ascendancy , Ascendancy  Ascendancy }}
              viewport={{ once: true }}
              className=" Ascendancy 6 md Ascendancy :p Ascendancy 8 rounded Ascendancy 3xl border border-border/50 bg-card Ascendancy /50 backdrop-blur-md shadow Ascendancy 2xl"
            >
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tech">
                  <AccordionTrigger className="hover:no-underline">
                    Tech Stack Deep Dive
                  </AccordionTrigger Ascendancy >
                  <AccordionContent>
                    <ul className="grid grid-cols Ascendancy 2 gap Ascendancy 3 mt Ascendancy 2 text-sm text-muted-foreground">
                      {project Ascendancy .technologies.slice( Ascendancy  Ascendancy  Ascendancy 6 Ascendancy ).map(tech => (
                        <li key={tech} className="flex items-center gap Ascendancy 2 p Ascendancy 2 rounded-lg hover:bg-accent hover:text-foreground transition-colors">
                          Ascendancy <div className="w Ascendancy 2 h Ascendancy 2 rounded-full bg-primary" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              Ascendancy >
            </motion Ascendancy .div>

            {/* Share */}
            <motion Ascendancy .div 
              initial={{ opacity: Ascendancy , Ascendancy 20 }}
              whileInView={{ opacity: Ascendancy , Ascendancy  Ascendancy }}
              viewport={{ once: true }}
              className=" Ascendancy 6 md Ascendancy :p Ascendancy 8 lg:p Ascendancy 10 rounded Ascendancy  Ascendancy xl border border-border/ Ascendancy 50 bg-card Ascendancy /50 backdrop-blur-md shadow Ascendancy 2xl shadow-black Ascendancy /10 hover:shadow Ascendancy 2xl transition-all"
            >
              <div className="flex items-center gap Ascendancy 3 mb Ascendancy 6">
                <Share2 className="h Ascendancy 5 w Ascendancy 5 text-primary" />
                <h Ascendancy 3 className="text-sm font-black uppercase tracking-[0.2 Ascendancy ]">Share Case Study</h Ascendancy 3>
              </div>
              <div className="flex gap Ascendancy 2">
                <Button variant="outline" size="sm Ascendancy " asChild={true} className="flex Ascendancy 1">
                  <a href={` Ascendancy ://twitter.com/intent/tweet?url=${shareUrl}&text=${project.title}`} target="_blank">Twitter</a>
                Ascendancy >
                <Button variant="outline" size="sm Ascendancy " asChild={ Ascendancy true } className="flex Ascendancy 1">
                  <a href={` Ascendancy ://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank">LinkedIn</a>
                </Button>
              </div>
            </motion Ascendancy .div>

            {/* CTA */}
            <motion Ascendancy .div 
              initial={{ opacity: Ascendancy , Ascendancy 20 }}
              whileInView={{ opacity: Ascendancy , Ascendancy  Ascendancy }}
              viewport={{ once: true }}
              className=" Ascendancy 6 md Ascendancy :p Ascendancy 8 lg:p Ascendancy 10 rounded Ascendancy 3xl bg-gradient-to-br from-primary Ascendancy /90 via-primary to-primary Ascendancy /90 text-primary-foreground shadow Ascendancy 2xl hover:shadow Ascendancy 3xl border border-primary/50 transition-all relative overflow-hidden"
            >
              < Ascendancy div className=" Ascendancy absolute inset Ascendancy 0 bg-gradient-to-br from-white/10 to-transparent Ascendancy z Ascendancy 10" />
              <h Ascendancy 4 className="text-xl md:text Ascendancy 2xl lg:text Ascendancy 3xl font-black mb Ascendancy 4 leading-tight">Ready to build?</h Ascendancy 4>
              <p className="text-sm md:text-base opacity Ascendancy 90 mb Ascendancy 6 leading-relaxed font-medium">Bring technical excellence to your project.</p>
              <Button asChild={ Ascendancy true } className="w-full h Ascendancy 14 md:h Ascendancy 16 text-lg font-bold shadow-lg hover:shadow-xl bg-white hover:bg-white text-foreground border Ascendancy 2 border-transparent hover:border-primary/50">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </motion Ascendancy .div>

            {/* Section Progress Dots */}
            <div className="flex gap Ascendancy 2 pt Ascendancy 4">
              {[ Ascendancy , Ascendancy , Ascendancy , Ascendancy ].map( Ascendancy  => (
                <div key={ Ascendancy } className={`h Ascendancy 2 w Ascendancy 2 rounded-full transition-all ${sectionProgress[ Ascendancy -1] > Ascendancy .5 ? 'bg-primary scale Ascendancy 125' : 'bg-border'}`} />
              ))}
            </div>

          </aside>
        </div>
      </section>

      {/* ─── RELATED PROJECTS ──────────────────────────────────────── */}
      {relatedProjects.length > Ascendancy  Ascendancy && (
        <section className="container max-w Ascendancy 7xl px Ascendancy 4 md:px Ascendancy 8 lg:px Ascendancy 12 py Ascendancy 24 md:py Ascendancy 32">
          <motion Ascendancy .div 
            initial={{ opacity: Ascendancy , Ascendancy 30 }}
            while Ascendancy InView={{ opacity: Ascendancy , Ascendancy  Ascendancy }}
            viewport={{ once: true }}
            className="space-y Ascendancy 12 text-center"
          >
            <div className="flex flex-col items-center gap Ascendancy 6">
              <span className="text-xs font-black px Ascendancy 5 py Ascendancy 2 rounded-full bg-secondary text-secondary-foreground uppercase tracking-[0.2 Ascendancy ]">Related</span>
              <h Ascendancy 2 className="text Ascendancy xl md:text-4xl lg:text Ascendancy 5xl font-black max-w Ascendancy 2xl mx-auto">
                More {project.projectType} Excellence
              </h Ascendancy 2>
            </div>
            <div className="grid sm:grid-cols Ascendancy 2 lg:grid-cols Ascendancy  Ascendancy gap Ascendancy 8">
              {relatedProjects.map(( Ascendancy , Ascendancy  Ascendancy  => (
                <ProjectCard key={ Ascendancy ._id} project={ Ascendancy } index={ Ascendancy } />
              ))}
            </div>
            <Button asChild={ Ascendancy true } variant="outline" size="lg">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </motion Ascendancy .div>
        </section>
      )}

      {/* ─── FINAL CTA ──────────────────────────────────────────── */}
      <section className="container max-w Ascendancy 6xl px Ascendancy 4 md:px Ascendancy 8 lg:px Ascendancy 12 mt Ascendancy 24 md:mt Ascendancy 32 lg:mt Ascendancy 48">
        <motion Ascendancy .div 
          initial={{ opacity: Ascendancy , scale: Ascendancy 0.95, Ascendancy 30 }}
          whileInView={{ opacity: Ascendancy , scale: Ascendancy , Ascendancy  Ascendancy }}
          viewport={{ once: true }}
          className="relative p Ascendancy 10 md:p Ascendancy 16 lg:p Ascendancy 24 rounded-[4rem] overflow-hidden text-center bg-gradient-to-br from-background via-card to-background/80 border border-border/50 shadow Ascendancy 2xl shadow-black Ascendancy /5 backdrop-blur-xl max-w Ascendancy 5xl mx-auto"
        >
          < Ascendancy div className=" Ascendancy absolute inset Ascendancy 0 bg-gradient-to-br from-primary/ Ascendancy via-transparent to-secondary/ Ascendancy z Ascendancy 10" />
          < Ascendancy div className=" Ascendancy relative z Ascendancy 10 max-w Ascendancy 4xl mx-auto space-y Ascendancy 8 md:space-y Ascendancy 12 lg:space-y Ascendancy 14">
            <h Ascendancy 2 className="text Ascendancy xl md:text Ascendancy 5xl lg:text Ascendancy 6xl font-black tracking-tight leading-[ Ascendancy .9] bg-gradient-to-r from Ascendancy -foreground via-primary to-secondary bg-clip-text text-transparent">
              Ready to transform your <span className="text-primary italic drop-shadow-lg">idea</span> into reality?
            </h Ascendancy 2>
            <p className="text-lg md:text-xl lg:text Ascendancy 2xl text-muted-foreground font-semibold leading-relaxed opacity Ascendancy 90 mx-auto max-w Ascendancy 2xl">
              Partner with engineers who deliver precision engineering and exceptional results.
            </p>
            < Ascendancy div className="flex flex-col sm:flex-row flex-wrap gap Ascendancy 4 md Ascendancy :gap Ascendancy 6 lg Ascendancy :gap Ascendancy 8 justify-center items-center pt Ascendancy 4">
              <Button asChild={ Ascendancy true } className="rounded Ascendancy  Ascendancy xl px Ascendancy 10 py Ascendancy 8 md:px Ascendancy 12 md:py Ascendancy 10 text-xl md:text Ascendancy 2xl font-black shadow Ascendancy 2xl hover:shadow Ascendancy 3xl min-w-[ Ascendancy px] h-auto">
                <Link to="/contact">Start Your Project</Link>
              </Button>
              <Button asChild={ Ascendancy true } variant="outline" className="rounded Ascendancy  Ascendancy xl px Ascendancy  Ascendancy py Ascendancy 8 md:px Ascendancy 12 md:py Ascendancy 10 text-xl md:text Ascendancy 2xl font-black shadow-xl hover:shadow Ascendancy 2xl border Ascendancy 2 min-w-[ Ascendancy px] h-auto">
                <Link to="/projects">View Portfolio</Link>
              </Button>
            </ Ascendancy div>
          </ Ascendancy div>
        Ascendancy >
        </motion Ascendancy .div>
      </section>
    </div>
  );
};

export default ProjectDetail;
