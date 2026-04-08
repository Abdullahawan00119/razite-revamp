// API Service for backend communication
const getAPIBaseURL = (): string => {
  // In development, default to localhost
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }
  
  // In production, require VITE_API_URL to be set
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!apiUrl) {
    console.error('ERROR: VITE_API_URL environment variable is not set. Please set it in your Vercel environment variables.');
    return '/api'; // Fallback won't work but prevents undefined
  }
  
  return apiUrl;
};

const API_BASE_URL = getAPIBaseURL();

interface ApiError {
  field?: string;
  message: string;
}

interface ApiResponse<T = Record<string, unknown>> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ApiError[];
}

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

// Helper function to build headers with auth token
const getHeaders = (includeContentType = true): HeadersInit => {
  const headers: HeadersInit = {};
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function to handle API responses
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

const handleResponse = async (response: Response): Promise<ApiResponse<Record<string, unknown>>> => {
  if (!response.ok) {
    try {
      const errorData = await safeJson(response);
      throw new Error(errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    } catch (jsonError) {
      throw new Error(`HTTP ${response.status}: ${response.statusText} (non-JSON response)`);
    }
  }
  return safeJson(response) as Promise<ApiResponse<Record<string, unknown>>>;
};

// Static data APIs for projects and blogs (hardcoded)

// Import static data
import { PROJECTS, ProjectData } from '../data/projects';
import { BLOGS, BlogPostData } from '../data/blogs';

// Static projects API (replaces backend)
export const projectsAPI = {
  getAll: async (filters?: { status?: string; type?: string; featured?: boolean }): Promise<{ data: ProjectData[] }> => {
    let filtered = [...PROJECTS];
    
    if (filters?.status) {
      // Simulate status filter (all hardcoded as 'completed')
      filtered = filtered.filter(p => p.solution); // Has outcome/completed
    }
    if (filters?.type) {
      filtered = filtered.filter(p => p.projectType.toLowerCase().includes(filters.type!.toLowerCase()));
    }
    if (filters?.featured !== undefined) {
      filtered = filtered.filter(p => p.liveUrl !== undefined);
    }
    
    // Simulate async
    await new Promise(resolve => setTimeout(resolve, 300));
    return { data: filtered };
  },

  getBySlug: async (slug: string): Promise<{ data: ProjectData | null }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const project = PROJECTS.find(p => p.slug === slug);
    return { data: project || null };
  }
};

// Static blogs API (replaces backend)
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
  getAll: async (filters?: { status?: string; type?: string; department?: string; city?: string }): Promise<ApiResponse<Record<string, unknown>[]>> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.city) params.append('city', filters.city);

    const response = await fetch(`${API_BASE_URL}/jobs${params.toString() ? '?' + params : ''}`);
    return handleResponse(response) as unknown as Promise<ApiResponse<Record<string, unknown>[]>>;
  },

  getById: async (id: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  create: async (data: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/jobs`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  update: async (id: string, data: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: JSON.stringify(data)
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  delete: async (id: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  apply: async (jobId: string, applicationData: Record<string, unknown>): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData)
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  applyGeneral: async (applicationData: FormData): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/jobs/apply/general`, {
      method: 'POST',
      body: applicationData
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  }
};

// Applications API
export const applicationsAPI = {
  getAll: async (filters?: { status?: string; department?: string; jobId?: string }): Promise<ApiResponse<Record<string, unknown>[]>> => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.jobId) params.append('jobId', filters.jobId);

    const response = await fetch(`${API_BASE_URL}/applications${params.toString() ? '?' + params : ''}`, {
      headers: getHeaders(false)
    });
    return handleResponse(response) as unknown as Promise<ApiResponse<Record<string, unknown>[]>>;
  },

  getByDepartment: async (department: string, status?: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);

    const response = await fetch(`${API_BASE_URL}/applications/department/${department}${params.toString() ? '?' + params : ''}`, {
      headers: getHeaders(false)
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  getByJob: async (jobId: string, status?: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);

    const response = await fetch(`${API_BASE_URL}/applications/job/${jobId}${params.toString() ? '?' + params : ''}`, {
      headers: getHeaders(false)
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  getDetails: async (applicantId: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/applications/applicant/${applicantId}`, {
      headers: getHeaders(false)
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  getCV: async (applicantId: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/applications/applicant/${applicantId}/cv`, {
      headers: getHeaders(false)
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  downloadCV: async (applicantId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/applications/applicant/${applicantId}/download-cv`, {
      headers: getHeaders(false)
    });
    if (!response.ok) {
      throw new Error('Failed to download CV');
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv_${applicantId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  getPreviewCVUrl: (applicantId: string): string => {
    const token = getAuthToken();
    return `${API_BASE_URL}/applications/applicant/${applicantId}/preview-cv${token ? `?token=${token}` : ''}`;
  },

  updateStatus: async (applicantId: string, status: string, notes?: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/applications/applicant/${applicantId}/status`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify({ status, notes })
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  delete: async (applicantId: string): Promise<ApiResponse<Record<string, unknown>>> => {
    const response = await fetch(`${API_BASE_URL}/applications/applicant/${applicantId}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response) as Promise<ApiResponse<Record<string, unknown>>>;
  },

  getDashboardStats: async (): Promise<ApiResponse<Record<string, unknown>>> => {
    // Mock data for dashboard stats
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: {
        totalApplicants: 150,
        byStatus: [
          { _id: 'pending', count: 45 },
          { _id: 'reviewed', count: 35 },
          { _id: 'shortlisted', count: 25 },
          { _id: 'rejected', count: 30 },
          { _id: 'hired', count: 15 }
        ]
      }
    };
  }
};

export default {
  blogsAPI,
  projectsAPI,
  jobsAPI,
  applicationsAPI
};
