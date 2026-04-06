import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Error", description: "Please fill in required fields (name, email, message).", variant: "destructive" });
      return;
    }

    setLoading(true);
    // Mock submission (matching Contact.tsx behavior)
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent!", description: "We'll get back to you within one business day." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
          <Input
            required
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
          <Input
            required
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
          <Input
            placeholder="+92 300 1234567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Subject</label>
          <Input
            placeholder="Project Inquiry"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Message *</label>
        <Textarea
          required
          rows={5}
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>
      <Button type="submit" size="lg" disabled={loading} className="w-full sm:w-auto font-semibold shadow-lg shadow-primary/20">
        {loading ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
};

export default ContactForm;

