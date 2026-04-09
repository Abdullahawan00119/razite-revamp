
const getAPIBaseURL = (): string => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
};

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('admin_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${getAPIBaseURL()}${endpoint}`;
  const headers = {
    ...getAuthHeaders(),
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

// Static data imports for currently un-routed features
import { PROJECTS, type ProjectData } from '../data/projects';
import { BLOGS, type BlogPostData } from '../data/blogs';
import { type JobData } from '../data/jobs';
import { type ApplicantData } from '../data/applications';

const sanitizeFilename = (filename: string): string => {
  return filename
    .replace(/[\\\/:*?"<>|]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .replace(/-+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80)
    .toLowerCase() + '.pdf';
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  verifyToken: async (token: string) => {
    return apiRequest('/auth/verify-token', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
};

// Projects API (Static for now)
export const projectsAPI = {
  getAll: async (filters?: any): Promise<{ data: ProjectData[] }> => {
    await new Promise(r => setTimeout(r, 100));
    return { data: PROJECTS };
  },
  getBySlug: async (slug: string): Promise<{ data: ProjectData | null }> => {
    const project = PROJECTS.find(p => p.slug === slug);
    return { data: project || null };
  }
};

// Blogs API (Static for now)
export const blogsAPI = {
  getAll: async (filters?: any): Promise<{ data: BlogPostData[] }> => {
    await new Promise(r => setTimeout(r, 100));
    return { data: BLOGS };
  },
  getBySlug: async (slug: string): Promise<{ data: BlogPostData | null }> => {
    const blog = BLOGS.find(b => b.slug === slug);
    return { data: blog || null };
  }
};

// Jobs API
export const jobsAPI = {
  getAll: async (filters?: any): Promise<{ data: JobData[]; success: true }> => {
    const searchParams = new URLSearchParams(filters).toString();
    const endpoint = searchParams ? `/jobs?${searchParams}` : '/jobs';
    return apiRequest(endpoint);
  },
  getById: async (id: string): Promise<{ data: JobData | null; success: boolean }> => {
    return apiRequest(`/jobs/${id}`);
  },
  create: async (data: any): Promise<{ success: true; data: any }> => {
    return apiRequest('/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: any): Promise<{ success: true; data: any }> => {
    return apiRequest(`/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string): Promise<{ success: true; data: any }> => {
    return apiRequest(`/jobs/${id}`, {
      method: 'DELETE',
    });
  },
  apply: async (jobId: string, formData: FormData): Promise<{ success: true; data: any }> => {
    return apiRequest(`/jobs/${jobId}/apply`, {
      method: 'POST',
      body: formData,
    });
  },
  applyGeneral: async (formData: FormData): Promise<{ success: true; data: any }> => {
    return apiRequest('/jobs/apply/general', {
      method: 'POST',
      body: formData,
    });
  }
};

// Applications API
export const applicationsAPI = {
  getAll: async (filters?: { department?: string; status?: string; jobTitle?: string; startDate?: string; endDate?: string }): Promise<{ data: ApplicantData[]; success: true }> => {
    const searchParams = new URLSearchParams(filters as any).toString();
    const endpoint = searchParams ? `/applications?${searchParams}` : '/applications';
    return apiRequest(endpoint);
  },
  getDashboardStats: async (): Promise<{ success: true; data: any }> => {
    return apiRequest('/applications/dashboard/stats');
  },
  updateStatus: async (applicantId: string, data: { status: string; notes?: string }): Promise<{ success: true; data: any }> => {
    return apiRequest(`/applications/applicant/${applicantId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
  delete: async (applicantId: string): Promise<{ success: true; data: any }> => {
    return apiRequest(`/applications/applicant/${applicantId}`, {
      method: 'DELETE',
    });
  },
  getCVPreviewUrl: (applicantId: string) => {
    const token = localStorage.getItem('admin_token');
    // Using a direct backend URL for previewing CV with token
    return `${getAPIBaseURL()}/applications/applicant/${applicantId}/preview-cv${token ? `?token=${token}` : ''}`;
  },
  downloadCV: async (applicantId: string): Promise<void> => {
    const url = `${getAPIBaseURL()}/applications/applicant/${applicantId}/download-cv`;
    const response = await fetch(url, { headers: getAuthHeaders() });
    
    if (!response.ok) throw new Error('Failed to download CV');
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    
    // Try to get filename from header
    const disposition = response.headers.get('content-disposition');
    let filename = 'resume.pdf';
    if (disposition && disposition.indexOf('filename=') !== -1) {
      filename = disposition.split('filename=')[1].replace(/"/g, '');
    }
    
    a.download = sanitizeFilename(filename);
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    }, 100);
  }
};

export default {
  authAPI,
  projectsAPI,
  blogsAPI,
  jobsAPI,
  applicationsAPI
};
