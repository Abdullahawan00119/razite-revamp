// API Service for backend communication - Mocked
const getAPIBaseURL = (): string => {
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }
  
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.error('ERROR: VITE_API_URL not set.');
    return '/api';
  }
  
  return apiUrl;
};

export const safeJson = async (response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type') || '';
  
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Non-JSON response:', response.status, response.statusText, text.substring(0, 200));
    throw new Error(`Expected JSON but got ${contentType || 'no content-type'} (Status: ${response.status}). Response preview: ${text.substring(0, 100)}`);
  }
  
  try {
    return await response.json();
  } catch (parseError) {
    console.error('JSON parse error:', parseError);
    throw new Error(`Invalid JSON response from server (Status: ${response.status})`);
  }
};

// Static data imports
import { PROJECTS, type ProjectData } from '../data/projects';
import { BLOGS, type BlogPostData } from '../data/blogs';
import { JOBS, type JobData } from '../data/jobs';
import { APPLICATIONS, type ApplicantData } from '../data/applications';

const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[\\\/:*?"<>|]/g, '')  // Remove invalid filename chars
    .replace(/[^\w\s-]/g, '')       // Remove other special chars
    .replace(/\s+/g, '_')           // Replace spaces with _
    .replace(/-+/g, '_')            // Collapse multiple _/-
    .replace(/^_+|_+$/g, '')        // Trim leading/trailing _
    .slice(0, 80)                   // Limit length
    .toLowerCase() + '.pdf';        // Ensure .pdf extension
};

// Mock Auth
const MOCK_ADMIN = {
  id: "1",
  email: "admin@razite.com",
  name: "Admin User",
  role: "admin"
};

const MOCK_TOKEN = "mock-admin-jwt-token-razite";

export const authAPI = {
  login: async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 1000));
    if (email === "admin@razite.com" && password === "admin123") {
      return {
        success: true,
        token: MOCK_TOKEN,
        admin: MOCK_ADMIN
      };
    }
    throw new Error("Invalid credentials. Use admin@razite.com / admin123");
  },
  verifyToken: async (token: string) => {
    await new Promise(r => setTimeout(r, 500));
    return token === MOCK_TOKEN ? {
      success: true,
      admin: MOCK_ADMIN
    } : { success: false };
  }
};

// Projects API
export const projectsAPI = {
  getAll: async (filters?: { status?: string; type?: string; featured?: boolean }): Promise<{ data: ProjectData[] }> => {
    let filtered = [...PROJECTS];
    
    if (filters?.status) {
      filtered = filtered.filter(p => p.solution);
    }
    if (filters?.type) {
      filtered = filtered.filter(p => p.projectType.toLowerCase().includes(filters.type!.toLowerCase()));
    }
    if (filters?.featured !== undefined) {
      filtered = filtered.filter(p => p.liveUrl !== undefined);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: filtered };
  },

  getBySlug: async (slug: string): Promise<{ data: ProjectData | null }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const project = PROJECTS.find(p => p.slug === slug);
    return { data: project || null };
  }
};

// Blogs API
export const blogsAPI = {
  getAll: async (filters?: { status?: string; category?: string; featured?: boolean }): Promise<{ data: BlogPostData[] }> => {
    let filtered = [...BLOGS];
    
    if (filters?.status === 'published') {
      filtered = filtered.filter(b => b.status === 'published');
    }
    if (filters?.category) {
      filtered = filtered.filter(b => b.category.toLowerCase().includes(filters.category!.toLowerCase()));
    }
    if (filters?.featured) {
      filtered = filtered.filter(b => b.featured);
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: filtered };
  },

  getBySlug: async (slug: string): Promise<{ data: BlogPostData | null }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const blog = BLOGS.find(b => b.slug === slug);
    return { data: blog || null };
  }
};

// Jobs API
export const jobsAPI = {
  getAll: async (filters?: { status?: string; type?: string; department?: string; city?: string }): Promise<{ data: JobData[]; success: true }> => {
    let filtered = [...JOBS];
    
    if (filters?.status) filtered = filtered.filter(j => j.status === filters.status);
    if (filters?.type) filtered = filtered.filter(j => j.type.toLowerCase().includes(filters.type!.toLowerCase()));
    if (filters?.department) filtered = filtered.filter(j => j.department.toLowerCase().includes(filters.department!.toLowerCase()));
    if (filters?.city) filtered = filtered.filter(j => j.city.toLowerCase().includes(filters.city!.toLowerCase()));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: filtered, success: true };
  },

  getById: async (id: string): Promise<{ data: JobData | null; success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const job = JOBS.find(j => j._id === id);
    return { data: job || null, success: !!job };
  },

  create: async (): Promise<{ success: true; data: { _id: string; message: string } }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, data: { _id: 'new-' + Date.now(), message: 'Job created' } };
  },

  update: async (id: string): Promise<{ success: true; data: { message: string } }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data: { message: 'Job updated' } };
  },

  delete: async (id: string): Promise<{ success: true; data: { message: string } }> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { success: true, data: { message: 'Job deleted' } };
  },

  apply: async (jobId: string): Promise<{ success: true; data: { message: string } }> => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { success: true, data: { message: 'Application submitted' } };
  }
};

// Applications API
export const applicationsAPI = {
  getAll: async (filters?: any): Promise<{ data: ApplicantData[]; success: true }> => {
    let filtered = [...APPLICATIONS];
    
    if (filters?.status && filters.status !== 'All') filtered = filtered.filter(a => a.status === filters.status);
    if (filters?.department && filters.department !== 'All') filtered = filtered.filter(a => a.department === filters.department);
    
    await new Promise(resolve => setTimeout(resolve, 600));
    return { data: filtered, success: true };
  },

  getDashboardStats: async (): Promise<{ success: true; data: any }> => {
    const total = APPLICATIONS.length;
    const byStatus = APPLICATIONS.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: {
        totalApplicants: total,
        byStatus: Object.entries(byStatus).map(([status, count]) => ({ _id: status, count }))
      }
    };
  },

  updateStatus: async (applicantId: string, status: string): Promise<{ success: true; data: { message: string } }> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return { success: true, data: { message: `Status updated to ${status}` } };
  },

  delete: async (applicantId: string): Promise<{ success: true; data: { message: string } }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, data: { message: 'Applicant deleted' } };
  },

  downloadCV: async (applicantId: string): Promise<void> => {
    const applicant = APPLICATIONS.find(a => a._id === applicantId);
    if (!applicant?.resume) throw new Error('CV not found');
    
'JVBERi0xLjQNJeLjz9MCKshY2F0YWxvZw0KMSAwIG9iag08PC9UeXBlIC9QYWdlcyAvS2lkcyBbMlAgMCBSXS9Db3VudCAxPj4NZW5kb2JqDTIgMCBvYmoNPDwvVHlwZSAvUGFnZSAvUGFyZW50IDEgMCBSL01lZGlhQm94IFswIDAgNjEyIDc5Ml0vUmVzb3VyY2VzPDwvRm9udHMgPDwvRjEgMyAwIFIgPj4vUHJvY1NldFsgL1BERiAvVGV4dCBdID4+IC9Db250ZW50cyA0IDAgUi9Hcm91cCA8PC9UeXBlIC9Hcm91cCAvUyAvRGV2aWNlUkdCIC9DUyAvRGV2aWNlUkdCPl46L0ZpbHRlciAvRmxhdGVEZWNvZGU+Pj4NZW5kb2JqDTMgMCBvYmoNPDwvVHlwZSAvRm9udCAvQmFzZUZvbnQgL0JDVURFK0RlamFWdVNhbnMNL1N1YnQvdHlwZSAvVHlwZTEgL0VuY29kaW5nIC9XQU5FbnRDb2RpbmcgL0ZvbnREZXNjcmlwdCA1IDAgUi9GaXJzdENociAwIC9MYXN0Q2hyIDI1NQ0KPj4NZW5kb2JqDTQgMCBvYmoNPDwvTGVuZ3RoIDQ0Pj5zdHJlYW0NCkJUCi9GMSAxMiB0ZiAwIDAgNjEyIDc5MiBSVCENCmh0DQooaGVsbG8gd29ybGQpIFRqDQpFVA0KZW5kc2V0cw0KZW5kb2JqDQolJUVPZApd'
    const pdfBytes = Uint8Array.from(atob('JVBERi0xLjQNJeLjz9MCKshY2F0YWxvZw0KMSAwIG9iag08PC9UeXBlIC9QYWdlcyAvS2lkcyBbMlAgMCBSXS9Db3VudCAxPj4NZW5kb2JqDTIgMCBvYmoNPDwvVHlwZSAvUGFnZSAvUGFyZW50IDEgMCBSL01lZGlhQm94IFswIDAgNjEyIDc5Ml0vUmVzb3VyY2VzPDwvRm9udHMgPDwvRjEgMyAwIFIgPj4vUHJvY1NldFsgL1BERiAvVGV4dCBdID4+IC9Db250ZW50cyA0IDAgUi9Hcm91cCA8PC9UeXBlIC9Hcm91cCAvUyAvRGV2aWNlUkdCIC9DUyAvRGV2aWNlUkdCPl46L0ZpbHRlciAvRmxhdGVEZWNvZGU+Pj4NZW5kb2JqDTMgMCBvYmoNPDwvVHlwZSAvRm9udCAvQmFzZUZvbnQgL0JDVURFK0RlamFWdVNhbnMNL1N1YnQvdHlwZSAvVHlwZTEgL0VuY29kaW5nIC9XQU5FbnRDb2RpbmcgL0ZvbnREZXNjcmlwdCA1IDAgUi9GaXJzdENociAwIC9MYXN0Q2hyIDI1NQ0KPj4NZW5kb2JqDTQgMCBvYmoNPDwvTGVuZ3RoIDQ0Pj5zdHJlYW0NCkJUCi9GMSAxMiB0ZiAwIDAgNjEyIDc5MiBSVCENCmh0DQooaGVsbG8gd29ybGQpIFRqDQpFVA0KZW5kc2V0cw0KZW5kb2JqDQolJUVPZApd'), (c) => c.charCodeAt(0));
    const samplePdf = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(samplePdf);
    const a = document.createElement('a');
    a.href = url;
    a.download = sanitizeFilename(applicant.resume.filename);
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
};

export default {
  authAPI,
  projectsAPI,
  blogsAPI,
  jobsAPI,
  applicationsAPI
};
