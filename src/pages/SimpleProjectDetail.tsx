import { useParams, Link } from "react-router-dom";
import { Users, ExternalLink, Code2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

type Project = typeof PROJECTS[0];

const SimpleProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="container max-w-4xl mx-auto px-4 text-center py-12">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-6">{error || "The requested project does not exist."}</p>
          <Button asChild>
            <Link to="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-24">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <Link to="/projects" className="text-muted-foreground hover:text-primary font-medium">
            Projects / {project.projectType}
          </Link>
        </nav>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Client</p>
                  <p className="font-bold">{project.client || "Proprietary"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
                <Code2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Type</p>
                  <p className="font-bold">{project.projectType}</p>
                </div>
              </div>
            </div>


          </div>

          <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-2xl overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-muted-foreground/50">
                {project.title.split(' ').map(w => w[0]).slice(0,2).join('')}
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.slice(0,6).map((img, i) => (
                <div key={i} className="aspect-video rounded-2xl overflow-hidden bg-muted group hover:shadow-xl transition-all">
                  <img 
                    src={img} 
                    alt={`${project.title} screenshot ${i+1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16 mb-16">
          {project.challenge && (
            <section>
              <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">{project.challenge}</p>
            </section>
          )}
          
          {project.solution && (
            <section>
              <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">{project.solution}</p>
            </section>
          )}
          
          {project.outcome && (
            <section>
              <h2 className="text-3xl font-bold mb-6">The Outcome</h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">{project.outcome}</p>
            </section>
          )}

          {project.description && !project.challenge && !project.solution && !project.outcome && (
            <section>
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">{project.description}</p>
            </section>
          )}
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Key Results</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.highlights.slice(0, 4).map((highlight, i) => (
                <div key={i} className="p-6 bg-muted/50 rounded-2xl border">
                  <p className="text-lg font-semibold">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="border-t pt-16">
            <h2 className="text-3xl font-bold mb-12 text-center">
              More {project.projectType} Projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((p) => (
                <ProjectCard key={p._id} project={p} index={0} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">View All Projects</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Final CTA */}
        <div className="mt-24 p-12 lg:p-16 rounded-3xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
            Ready to transform your idea into reality?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Partner with engineers who deliver precision engineering and exceptional results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="min-w-[220px]">
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[220px]">
              <Link to="/projects">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProjectDetail;

