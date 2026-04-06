import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Lightbulb, Database, Monitor, BarChart3, HardDrive, Globe, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import ContactForm from "@/components/ContactForm";
import { projectsAPI, blogsAPI } from "@/lib/api";


interface Project {
  _id: string;
  title: string;
  description: string;
  projectType: string;
  technologies: string[];
  slug?: string;
}

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

const mockProjects: Project[] = [
  {
    _id: "mock1",
    title: "AI-Powered Analytics Platform",
    description: "End-to-end data processing and visualization dashboard for enterprise insights.",
    projectType: "Web App",
    technologies: ["React", "Node.js", "PostgreSQL", "AI/ML"],
    slug: "ai-analytics-platform"
  },
  {
    _id: "mock2",
    title: "Cloud Migration Accelerator",
    description: "Automated multi-cloud migration tool reducing deployment time by 70%.",
    projectType: "DevOps Tool",
    technologies: ["AWS", "Terraform", "Kubernetes", "Python"],
    slug: "cloud-migration"
  },
  {
    _id: "mock3",
    title: "Real-time Geo-Spatial Dashboard",
    description: "Interactive GIS platform for satellite imagery and terrain analysis.",
    projectType: "Data Visualization",
    technologies: ["React", "Mapbox", "PostGIS", "FastAPI"],
    slug: "geo-spatial-dashboard"
  }
];

const mockBlogs: BlogPost[] = [
  {
    _id: "mock-blog1",
    slug: "future-of-cloud-native-development",
    title: "The Future of Cloud Native Development",
    excerpt: "Exploring Kubernetes operators, service meshes, and the next wave of container orchestration.",
    category: "DevOps",
    date: "2024-10-15"
  },
  {
    _id: "mock-blog2",
    slug: "building-ai-first-applications",
    title: "Building AI-First Applications",
    excerpt: "Architectural patterns for integrating LLMs and embedding models into production systems.",
    category: "AI/ML",
    date: "2024-10-10"
  },
  {
    _id: "mock-blog3",
    slug: "data-warehousing-best-practices-2024",
    title: "Data Warehousing Best Practices in 2024",
    excerpt: "Modern ETL pipelines, columnar storage, and cost-optimized analytics architectures.",
    category: "Data Engineering",
    date: "2024-10-05"
  }
];

const services = [
  { icon: Shield, title: "IT Consultancy", desc: "Cloud strategy, cybersecurity, and digital transformation guidance." },
  { icon: Lightbulb, title: "Smart App Development", desc: "Intelligent, user-focused AI web and application solutions." },
  { icon: Database, title: "Data Processing", desc: "End-to-end data cleaning, transformation, and integration." },
  { icon: Monitor, title: "Hardware & Accessories", desc: "Desktops, laptops, servers, peripherals, and components." },
  { icon: BarChart3, title: "Analytics & BI", desc: "Interactive dashboards, predictive analytics, and reporting." },
  { icon: HardDrive, title: "Data Warehousing", desc: "Scalable data warehousing, ETL, and governance frameworks." },
  { icon: Globe, title: "Geo-Spatial Data", desc: "GIS analysis, satellite imagery, and digital terrain modeling." },
];

const testimonials = [
  { quote: "Technology is not just about innovation — it's about solving real problems at scale.", name: "Syed Raza Abbas Kazmi", role: "Founder & CEO" },
  { quote: "Behind every great product is a team that knows how to build and adapt.", name: "Malik Muzzammil", role: "Co-Founder & CTO" },
  { quote: "R&D is not just a process; it's the heart of who we are as a company.", name: "Kamran Aziz", role: "Chief Strategy Officer" },
];

const awardsAndCertifications = [
  { logo: "/certifications/clutch-badge.svg", title: "Top Web Developers", year: "2024", issuer: "Clutch" },
  { logo: "/certifications/iso-9001.svg", title: "ISO 9001:2015 Certified", year: "2023", issuer: "International Standards Organization" },
  { logo: "/certifications/aws-partner.svg", title: "AWS Partner Network", year: "2023", issuer: "Amazon Web Services" },
  { logo: "/certifications/iso-27001.svg", title: "ISO 27001 Certified", year: "2023", issuer: "Information Security Management" },
  { logo: "/certifications/cloud-innovation.svg", title: "Cloud Innovation Award", year: "2024", issuer: "Digital Leaders Forum" },
  { logo: "/certifications/great-place-to-work.svg", title: "Great Place to Work", year: "2024", issuer: "GPTW Institute" }
];

const partners = [
  { logo: "/certifications/clutch-badge.svg", title: "Clutch Top Developers", issuer: "Clutch.co", year: "2024" },
  { logo: "/certifications/aws-partner.svg", title: "AWS Partner Network", issuer: "Amazon Web Services", year: "2023" },
  { logo: "/certifications/iso-9001.svg", title: "ISO 9001 Certified Partner", issuer: "International Standards Organization", year: "2023" },
  { logo: "/certifications/iso-27001.svg", title: "ISO 27001 Security Partner", issuer: "Information Security Management", year: "2023" },
  { logo: "/certifications/cloud-innovation.svg", title: "Cloud Innovation Partner", issuer: "Digital Leaders Forum", year: "2024" },
  { logo: "/certifications/great-place-to-work.svg", title: "Great Place to Work Certified", issuer: "GPTW Institute", year: "2024" }
];

const team = [
  { name: "Syed Raza Abbas Kazmi", role: "Founder & CEO", bio: "Visionary leader driving innovation and strategic growth.", color: "from-blue-500 to-cyan-500" },
  { name: "Malik Muzzammil", role: "Co-Founder & CTO", bio: "Technical architect behind Razite's cutting-edge solutions.", color: "from-purple-500 to-pink-500" },
  { name: "Kamran Aziz", role: "Chief Strategy Officer", bio: "R&D champion shaping the future of our product offerings.", color: "from-emerald-500 to-teal-500" },
];

const heroSlides = [
  {
    bgClass: "bg-gradient-to-br from-primary/20 to-blue-900/80 relative before:absolute before:inset-0 before:bg-gradient-radial before:from-primary/30 before:to-transparent before:blur-xl before:opacity-70",
    title: "Team that moves",
    highlight: "ideas forward.",
    subtitle: "Visionary leadership driving innovation and strategic growth for startups to enterprises.",
    primaryBtn: "Get Started",
    secondaryBtn: "Our Services"
  },
  {
    bgClass: "bg-gradient-to-r from-primary/20 via-indigo-900/70 to-primary/10 relative before:absolute before:inset-0 before:bg-gradient-to-t before:from-primary/40 before:to-transparent before:blur-2xl",
    title: "Technical excellence",
    highlight: "at scale.",
    subtitle: "Cutting-edge solutions and technical architecture behind your digital transformation.",
    primaryBtn: "Get Started",
    secondaryBtn: "Our Services"
  },
  {
    bgClass: "bg-hero-gradient bg-gradient-to-b from-primary/20 to-slate-900/90 relative before:absolute before:inset-0 before:rounded-[50%] before:bg-primary/20 before:blur-xl before:opacity-60",
    title: "Innovation through",
    highlight: "R&D.",
    subtitle: "Shaping the future with research-driven product offerings and bold ideas.",
    primaryBtn: "Get Started",
    secondaryBtn: "Our Services"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>(mockProjects);
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>(mockBlogs);
  // Global loading deprecated, using specific loading states
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const carouselApiRef = useRef<CarouselApi | null>(null);

  const handleSelect = useCallback((api: CarouselApi) => {
    setCurrentSlide(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProjectsLoading(true);
        setBlogsLoading(true);
        const [projectsRes, blogsRes] = await Promise.all([
          projectsAPI.getAll({ featured: true }),
          blogsAPI.getAll({ status: 'published' })
        ]);

        const projData = ((projectsRes.data as unknown as Project[]) || []).slice(0, 3);
        const blogData = ((blogsRes.data as unknown as BlogPost[]) || []).slice(0, 3);

        setFeaturedProjects(projData.length > 0 ? projData : mockProjects);
        setLatestBlogs(blogData.length > 0 ? blogData : mockBlogs);
      } catch (error) {
        console.error("Failed to fetch home page data:", error);
        setFeaturedProjects(mockProjects);
        setLatestBlogs(mockBlogs);
      } finally {
        setProjectsLoading(false);
        setBlogsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (carouselApiRef.current) {
      const api = carouselApiRef.current;
      api.on("select", handleSelect);
      return () => {
        api.off("select", handleSelect);
      };
    }
  }, [handleSelect]);


  return (
    <>
      {/* Hero Carousel */}
      <section className="relative h-[70vh] md:h-screen">
        <Carousel opts={{ align: "start", loop: true }} setApi={(api) => { carouselApiRef.current = api; }}>
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="basis-full">
                <div
                  className={`h-[70vh] md:h-screen bg-cover bg-center bg-[url('/assets/hero-B9KM3qm4.svg')] bg-no-repeat bg-center relative ${slide.bgClass}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                  <div className="container relative z-10 h-full flex items-center">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="max-w-2xl"
                    >
                      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1] text-white">
                        {slide.title}{" "}
                        <span className="text-gradient bg-gradient-to-r from-primary via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                          {slide.highlight}
                        </span>
                      </h1>
                      <p className="mt-6 text-base sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-lg">
                        {slide.subtitle}
                      </p>
                      <div className="mt-10 flex flex-wrap gap-4">
                        <Button asChild size="lg" className="bg-white text-foreground shadow-2xl hover:shadow-3xl">
                          <Link to="/contact">
                            {slide.primaryBtn} <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button asChild size="lg" className="bg-bg-gray-900 text-white  border border-transparent shadow-lg hover:shadow-xl backdrop-blur-sm">
                          <Link to="/services">{slide.secondaryBtn}</Link>
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>



      {/* Services overview */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading label="What We Do" title="Our Services" description="We build the digital infrastructure that keeps you moving forward." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-muted/20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-center md:justify-between gap-6 mb-12">
            <SectionHeading
              label="Case Studies"
              title="Featured Projects"
              description="Selected work that demonstrates our technical excellence and creative problem solving."
              center={true}
              className="mb-0 flex-1 md:text-left max-w-md"
            />
            <Button asChild variant="outline" className="hidden md:flex">
              <Link to="/projects">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-xl" />
              ))
            ) : (
              featuredProjects.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))
            )}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/projects">View All Projects <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-hero-gradient text-primary-foreground">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold">"We Code." You Grow.</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
              We deliver high-impact digital solutions tailored to your unique workflows, customers, and growth goals.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <Link to="/contact">Start Your Project</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-24 lg:py-32 bg-muted/10">
        <div className="container">
          <SectionHeading label="Testimonials" title="Trusted by Startups and Scaleups" center={true} />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <Quote className="h-6 w-6 text-primary/40 mb-4" />
                <p className="text-muted-foreground leading-relaxed italic mb-6">{t.quote}</p>
                <div>
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Leadership Team */}
      <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
        <div className="container">
          <SectionHeading label="Leadership" title="Meet Our Leadership Team" description="Experienced leaders driving innovation and excellence." />
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent className="-ml-4 [&>div]:pl-4">
              {team.map((t, i) => (
                <CarouselItem key={t.name} className="basis-72 md:basis-80 lg:basis-96 pl-4 md:pl-0">
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-card to-background border border-border/50 hover:border-primary/30 transition-all duration-300 h-full"
                  >
                    <div className={`absolute -inset-4 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg -z-10 ${t.color.replace('500', '400/50')}`} />
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-t-2xl`} />
                    <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br ${t.color} mx-auto mb-6 flex items-center justify-center text-primary-foreground text-4xl md:text-5xl font-bold shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1`}>
                      <span>{t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-20 blur-xl`} />
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-xl md:text-2xl text-foreground mb-2">{t.name}</h3>
                      <p className="text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-4">{t.role}</p>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{t.bio}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Rewards & Achievements */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="container">
          <SectionHeading label="Awards & Certifications" title="Industry Recognition & Compliance" description="Trusted certifications and accolades from leading industry bodies worldwide." />
          <Carousel opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-4 [&>div]:pl-4">
              {awardsAndCertifications.map((a, i) => (
                <CarouselItem key={a.title} className="basis-56 md:basis-72 lg:basis-80 pl-4 md:pl-0">
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center h-full"
                  >
                    <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all overflow-hidden">
                      <img src={a.logo} alt={a.title} className="h-full w-full object-contain p-2" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{a.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{a.issuer}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">{a.year}</div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Our Partnerships */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="container">
          <SectionHeading
            label="Partnerships"
            title="Our Partnerships"
            description="Collaborating with industry leaders to deliver world-class technology solutions and innovation."
          />
          <Carousel opts={{ align: "start", loop: false }}>
            <CarouselContent className="-ml-4 [&>div]:pl-4">
              {partners.map((p, i) => (
                <CarouselItem key={p.title} className="basis-56 md:basis-72 lg:basis-80 pl-4 md:pl-0">
                  <motion.div
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 flex flex-col items-center text-center h-full"
                  >
                    <div className="h-20 w-20 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all overflow-hidden">
                      <img src={p.logo} alt={p.title} className="h-full w-full object-contain p-2" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{p.issuer}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">{p.year}</div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Latest News / Blog Section - Repositioned & Enhanced */}
      <section className="section-padding overflow-hidden relative bg-gradient-to-b from-transparent via-muted/40 to-transparent">
        {/* Decorative Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[20vw] font-black tracking-tighter text-foreground whitespace-nowrap leading-none z-0">
          INSIGHTS
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16 px-4">
            <SectionHeading
              label="Explore Our Thinking"
              title="Latest from the Blog"
              description="Expert perspectives on digital transformation, technology trends, and industry-leading innovation."
              center={true}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-[400px] w-full rounded-2xl" />
              ))
            ) : (
              latestBlogs.map((post, i) => (
                <BlogCard key={post._id} post={post} index={i} />
              ))
            )}
          </div>

          <div className="text-center group">
            <Button asChild variant="outline" size="lg" className="rounded-full px-10 hover:bg-primary hover:text-white transition-all duration-500 shadow-xl shadow-primary/5">
              <Link to="/blog" className="flex items-center gap-3">
                View All Insights
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <section className="section-padding bg-gradient-to-b from-muted/50 via-white to-background">
        <div className="container">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <SectionHeading 
              label="Let's Talk" 
              title="Ready to Build Something Great?" 
              description="Drop us a message directly here and get expert guidance on your next big idea. We'll respond within one business day." 
            />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <ContactForm />
          </motion.div>
          <p className="text-center mt-8 text-sm text-muted-foreground">
            Or{" "}
            <a href="/contact" className="font-medium hover:text-primary transition-colors">
              visit our full contact page
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default Index;
