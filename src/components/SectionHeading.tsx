import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

const SectionHeading = ({ label, title, description, center = true, className = "" }: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`max-w-2xl mb-12 md:mb-16 ${center ? "mx-auto text-center" : ""} ${className}`}
  >
    {label && (
      <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">
        {label}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h2>
    {description && (
      <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
    )}
  </motion.div>
);

export default SectionHeading;
