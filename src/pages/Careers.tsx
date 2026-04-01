import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Upload, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/SectionHeading";

const openings = [
  { title: "Full Stack Developer", type: "Full-time", location: "Remote", desc: "Build scalable web applications using React, Node.js, and cloud technologies." },
  { title: "Data Engineer", type: "Full-time", location: "Quetta / Remote", desc: "Design and maintain ETL pipelines, data warehouses, and analytics infrastructure." },
  { title: "GIS Analyst", type: "Full-time", location: "Quetta", desc: "Process satellite imagery, perform spatial analysis, and build geospatial solutions." },
  { title: "UI/UX Designer", type: "Contract", location: "Remote", desc: "Create intuitive, user-centered designs for web and mobile applications." },
  { title: "Business Development Executive", type: "Full-time", location: "Quetta", desc: "Drive growth by identifying new opportunities and building client relationships." },
];

const Careers = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload a file under 5MB.", variant: "destructive" });
        e.target.value = "";
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Application submitted!", description: "We'll review your application and get back to you soon." });
      (e.target as HTMLFormElement).reset();
      setFileName("");
      setSelectedRole("");
    }, 1200);
  };

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-hero-gradient text-primary-foreground">
        <div className="container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3">Careers</span>
            <h1 className="text-3xl md:text-5xl font-bold">Join the Razite Team</h1>
            <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
              We're looking for passionate people who want to build impactful technology. Explore open positions and apply below.
            </p>
            <Button variant="secondary" size="lg" className="mt-6" onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}>
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading label="Open Positions" title="Current Openings" description="Find a role that matches your skills and passion." />
          <div className="space-y-4 max-w-3xl mx-auto">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{job.desc}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {job.location}
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedRole(job.title);
                    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Apply
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="section-padding bg-muted/30">
        <div className="container">
          <SectionHeading label="Apply Now" title="Submit Your Application" description="Fill out the form below and upload your CV. We'll get back to you shortly." />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                <Input required placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                <Input required type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <Input placeholder="+92 300 1234567" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Position *</label>
                <select
                  required
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a position</option>
                  {openings.map((j) => (
                    <option key={j.title} value={j.title}>{j.title}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Upload CV / Resume *</label>
              <div className="relative">
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="flex items-center gap-3 px-4 py-3 rounded-md border border-input bg-background text-sm text-muted-foreground hover:border-primary/50 transition-colors">
                  <Upload className="h-4 w-4 shrink-0 text-primary" />
                  {fileName ? (
                    <span className="text-foreground truncate">{fileName}</span>
                  ) : (
                    <span>Click to upload PDF, DOC, or DOCX (max 5MB)</span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Cover Letter / Message</label>
              <Textarea rows={4} placeholder="Tell us why you'd be a great fit..." />
            </div>

            <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto">
              {loading ? "Submitting..." : "Submit Application"} <Send className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Why Join */}
      <section className="section-padding">
        <div className="container">
          <SectionHeading label="Why Razite?" title="Why Work With Us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🚀", title: "Innovation First", desc: "Work on cutting-edge projects using the latest technologies." },
              { icon: "🌍", title: "Remote Friendly", desc: "Flexible work arrangements for a healthy work-life balance." },
              { icon: "📈", title: "Growth Path", desc: "Continuous learning opportunities and career advancement." },
              { icon: "🤝", title: "Team Culture", desc: "Collaborative environment where every voice matters." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-5 rounded-xl border border-border bg-card"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
