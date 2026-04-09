
export interface JobData {
  _id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  status: 'open' | 'closed' | 'paused';
  city: string;
  salaryRange?: string;
  description: string;
  requirements: string[];
  postedAt: string;
  applicantsCount: number;
}

export const JOBS: JobData[] = [];
