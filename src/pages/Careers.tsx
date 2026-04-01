import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Upload, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/SectionHeading";
import { jobsAPI } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  description: string;
  type: string;
  location?: string;
  city: string;
  district: string;
}

const Careers = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [fileName, setFileName] = useState("");
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [openings, setOpenings] = useState<Job[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    city: "",
    district: "",
    coverLetter: "",
    jobId: ""
  });

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        const response = await jobsAPI.getAll({ status: 'open' });
        const jobsData = (response.data as unknown as Job[]) || [];
        setOpenings(jobsData);
      } catch (error) {
        console.error('Failed to load jobs:', error);
        setOpenings([]);
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload a file under 5MB.", variant: "destructive" });
        e.target.value = "";
        return;
      }
      setFileName(file.name);
      setCVFile(file);
    }
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const jobId = e.target.value;
    setSelectedRole(jobId);
    const job = openings.find(j => j._id === jobId);
    setFormData(prev => ({ 
      ...prev, 
      position: job?.title || "",
      jobId: job?._id || "",
      city: job?.city || "",
      district: job?.district || ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.position || !formData.city || !formData.district) {
      toast({ title: "Validation Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    if (!cvFile) {
      toast({ title: "Validation Error", description: "Please upload your CV.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone || 'Not provided');
      formDataToSend.append('city', formData.city);
      formDataToSend.append('district', formData.district);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('coverLetter', formData.coverLetter);
      formDataToSend.append('resume', cvFile);

      await jobsAPI.applyGeneral(formDataToSend);

      toast({ 
        title: "Application submitted!", 
        description: "We'll review your application and get back to you soon." 
      });
      
      (e.target as HTMLFormElement).reset();
      setFileName("");
      setCVFile(null);
      setSelectedRole("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        city: "",
        district: "",
        coverLetter: "",
        jobId: ""
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to submit application";
      toast({ 
        title: "Error", 
        description: errorMsg, 
        variant: "destructive" 
      });
      console.error("Application error:", error);
    } finally {
      setLoading(false);
    }
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
          {jobsLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading positions...</p>
              </div>
            </div>
          ) : openings.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">No open positions at the moment. Check back soon!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {openings.map((job, i) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{job.description}</p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {job.type}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {job.city}, {job.district}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setSelectedRole(job._id);
                      handlePositionChange({ target: { value: job._id } } as React.ChangeEvent<HTMLSelectElement>);
                      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Apply
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
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
                <Input 
                  required 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                <Input 
                  required 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com" 
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <Input 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+92 300 1234567" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Position *</label>
                <select
                  required
                  name="position"
                  value={selectedRole}
                  onChange={handlePositionChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a position</option>
                  {openings.map((j) => (
                    <option key={j._id} value={j._id}>{j.title}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">City *</label>
                <Input 
                  required 
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="e.g., Quetta, Karachi" 
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">District *</label>
                <Input 
                  required 
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="e.g., Quetta, Central" 
                />
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
              <Textarea 
                rows={4} 
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Tell us why you'd be a great fit..." 
              />
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
