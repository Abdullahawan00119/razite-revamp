import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  technologies?: string[];
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

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const gradient = COLORS[index % COLORS.length];
  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const detailPath = `/projects/${project.slug || project._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group/card relative h-full rounded-2xl border border-border/50 bg-gradient-to-br from-card to-background hover:border-primary/25 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-primary/5 hover:scale-[1.01]"
    >
      {/* Outer glow on hover */}
      <div className={`absolute -inset-3 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover/card:opacity-10 blur-xl transition-all duration-500 -z-10`} />

      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient} shrink-0`} />

      {/* Header Visual: Image or Fallback */}
      <div className="relative h-56 overflow-hidden bg-muted/20">
        {project.image ? (
          <div className="h-full w-full relative group-hover/card:scale-110 transition-transform duration-700 ease-in-out">
            <img 
              src={project.image} 
              alt={project.title} 
              className="h-full w-full object-cover"
            />
            {/* Overlay for better text readability and depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
            {/* Pattern overlay for fallback */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-2xl font-black shadow-xl"
            >
              {initials}
            </motion.div>
          </div>
        )}

        {/* Category Badge - Always present on top of visual */}
        <div className="absolute top-4 right-4 z-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md text-white border border-white/10 shadow-lg">
            {project.projectType}
          </span>
        </div>
      </div>

      {/* Content area */}
      <div className="p-8 flex flex-col flex-1 relative z-20">
        <h3 className="text-xl font-bold text-foreground mb-4 group-hover/card:text-primary transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3 opacity-90 group-hover/card:opacity-100 transition-opacity">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-auto mb-8">
          {project.technologies?.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground group-hover/card:bg-primary/5 transition-colors"
            >
              {t}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground/60">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action area */}
        <div className="flex items-center justify-between pt-6 border-t border-border/40">
          <Link
            to={detailPath}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover/card:gap-3 transition-all duration-300"
          >
            VIEW CASE STUDY <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="h-9 w-9 rounded-xl bg-primary/5 flex items-center justify-center group-hover/card:bg-primary group-hover/card:text-white transition-all duration-500">
            <ArrowRight className="h-4.5 w-4.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
