
export interface ApplicantData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  city: string;
  district: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  coverLetter?: string;
  resume?: {
    filename: string;
    mimetype: string;
    size: number;
  };
}

export const APPLICATIONS: ApplicantData[] = [];
