import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { projectsAPI } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  technologies: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getAll();
        const projectsData = (response.data as unknown as Project[]) || [];
        setProjects(projectsData);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <section className="section-padding">
        <div className="container">
          <SectionHeading label="Our Work" title="Featured Projects" description="A selection of projects that showcase our expertise across industries and technologies." />
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            </div>
          ) : projects.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-muted-foreground">No projects available yet.</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p, i) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-40 bg-hero-gradient opacity-80 flex items-center justify-center">
                    <ExternalLink className="h-8 w-8 text-primary-foreground/50 group-hover:text-primary-foreground/80 transition-colors" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">{p.projectType}</span>
                    <h3 className="font-semibold text-foreground mt-1 mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies && p.technologies.map((t) => (
                        <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-foreground">Have a Project in Mind?</h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">We'd love to hear about it. Let's discuss how we can bring your vision to life.</p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/contact">Start a Conversation <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Projects;
