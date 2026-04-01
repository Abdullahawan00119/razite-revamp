import { useEffect, useState } from 'react';
import { applicationsAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AlertCircle, Download, Trash2, Eye, Check, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Applicant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  city: string;
  district: string;
  status: string;
  appliedAt: string;
  resume?: { filename: string; mimetype: string; size: number };
  coverLetter?: string;
}

interface FilterOptions {
  department: string;
  status: string;
  jobTitle: string;
}

interface CVViewerData {
  applicantId: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  location: string;
  status: string;
  appliedAt: string;
  coverLetter?: string;
  resume?: { filename: string; mimetype: string; size: number };
}

const ApplicantsDashboard = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    department: 'All',
    status: 'All',
    jobTitle: 'All'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  });
  const [cvViewerOpen, setCVViewerOpen] = useState(false);
  const [cvViewerData, setCVViewerData] = useState<CVViewerData | null>(null);

  useEffect(() => {
    fetchApplicants();
    fetchStats();
  }, []);

  useEffect(() => {
    let filtered = applicants;

    if (filters.department !== 'All') {
      filtered = filtered.filter(a => a.department === filters.department);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(a => a.status === filters.status);
    }

    if (filters.jobTitle !== 'All') {
      filtered = filtered.filter(a => a.jobTitle === filters.jobTitle);
    }

    setFilteredApplicants(filtered);
  }, [applicants, filters]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getAll();
      const applicantsData = (response.data as unknown as Applicant[]) || [];
      
      setApplicants(applicantsData);
      
      // Extract unique departments
      const depts = ['All', ...new Set(applicantsData.map(a => a.department))];
      setDepartments(depts);

      // Extract unique job titles
      const jobTitles = ['All', ...new Set(applicantsData.map(a => a.jobTitle))];
      setJobTitles(jobTitles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applicants');
      console.error('Applicants error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await applicationsAPI.getDashboardStats();
      const data = response.data as unknown as Record<string, unknown>;
      
      if (data?.totalApplicants !== undefined) {
        const byStatus: { [key: string]: number } = {};
        const statusArray = data.byStatus as Array<{ _id: string; count: number }>;
        if (Array.isArray(statusArray)) {
          statusArray.forEach((item) => {
            byStatus[item._id] = item.count;
          });
        }

        setStats({
          total: (data.totalApplicants as number) || 0,
          pending: byStatus['pending'] || 0,
          reviewed: byStatus['reviewed'] || 0,
          shortlisted: byStatus['shortlisted'] || 0,
          rejected: byStatus['rejected'] || 0,
          hired: byStatus['hired'] || 0
        });
      }
    } catch (err) {
      console.error('Stats error:', err);
    }
  };

  const applyFilters = () => {
    let filtered = applicants;

    if (filters.department !== 'All') {
      filtered = filtered.filter(a => a.department === filters.department);
    }

    if (filters.status !== 'All') {
      filtered = filtered.filter(a => a.status === filters.status);
    }

    if (filters.jobTitle !== 'All') {
      filtered = filtered.filter(a => a.jobTitle === filters.jobTitle);
    }

    setFilteredApplicants(filtered);
  };

  const handleStatusChange = async (applicantId: string, newStatus: string) => {
    try {
      await applicationsAPI.updateStatus(applicantId, newStatus);
      fetchApplicants();
      fetchStats();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (applicantId: string) => {
    if (confirm('Are you sure you want to delete this applicant?')) {
      try {
        await applicationsAPI.delete(applicantId);
        fetchApplicants();
        fetchStats();
      } catch (err) {
        console.error('Error deleting applicant:', err);
      }
    }
  };

  const handleDownloadCV = async (applicantId: string) => {
    try {
      await applicationsAPI.downloadCV(applicantId);
    } catch (err) {
      console.error('Error downloading CV:', err);
    }
  };

  const handleViewCV = async (applicant: Applicant) => {
    setCVViewerData({
      applicantId: applicant._id,
      name: applicant.name,
      email: applicant.email,
      phone: applicant.phone,
      jobTitle: applicant.jobTitle,
      location: `${applicant.city}, ${applicant.district}`,
      status: applicant.status,
      appliedAt: applicant.appliedAt,
      coverLetter: applicant.coverLetter,
      resume: applicant.resume
    });
    setCVViewerOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'reviewed': return <Eye className="w-4 h-4" />;
      case 'shortlisted': return <Check className="w-4 h-4" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applicants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Job Applicants</h1>
        <p className="text-gray-600 mt-2">Manage and review job applications</p>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-900">{stats.reviewed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Shortlisted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-900">{stats.shortlisted}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-600">Hired</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-900">{stats.hired}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Position</label>
              <select
                value={filters.jobTitle}
                onChange={(e) => setFilters({ ...filters, jobTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {jobTitles.map(job => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applicants ({filteredApplicants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Job</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Applied</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                      No applicants found
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map(applicant => (
                    <tr key={applicant._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{applicant.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{applicant.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{applicant.jobTitle}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{applicant.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{applicant.city}, {applicant.district}</td>
                      <td className="px-4 py-3">
                        <select
                          value={applicant.status}
                          onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(applicant.status)} border-0 cursor-pointer`}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="rejected">Rejected</option>
                          <option value="hired">Hired</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(applicant.appliedAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {applicant.resume && (
                            <>
                              <button
                                onClick={() => handleViewCV(applicant)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded"
                                title="View CV"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDownloadCV(applicant._id)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                title="Download CV"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(applicant._id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* CV Viewer Modal */}
      {cvViewerOpen && cvViewerData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{cvViewerData.name}</h2>
                <p className="text-blue-100 mt-1">{cvViewerData.jobTitle}</p>
              </div>
              <button
                onClick={() => setCVViewerOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Applicant Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="text-gray-900">{cvViewerData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="text-gray-900">{cvViewerData.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-gray-900">{cvViewerData.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <p className={`font-semibold ${getStatusColor(cvViewerData.status)}`}>
                    {cvViewerData.status.charAt(0).toUpperCase() + cvViewerData.status.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Applied On</p>
                  <p className="text-gray-900">{new Date(cvViewerData.appliedAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* CV Preview */}
              {cvViewerData.resume && (
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                  <h3 className="font-semibold text-gray-900 mb-3">Resume Preview</h3>
                  <div className="bg-white rounded border border-gray-200 overflow-hidden">
                    <iframe
                      src={applicationsAPI.getPreviewCVUrl(cvViewerData.applicantId)}
                      className="w-full h-96 border-0"
                      title="CV Preview"
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    📄 {cvViewerData.resume.filename} • {(cvViewerData.resume.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              )}

              {/* Cover Letter */}
              {cvViewerData.coverLetter && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Cover Letter</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{cvViewerData.coverLetter}</p>
                </div>
              )}

              {/* Resume Info */}
              {cvViewerData.resume && (
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Resume Details</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><span className="font-medium">File Name:</span> {cvViewerData.resume.filename}</p>
                    <p><span className="font-medium">File Type:</span> {cvViewerData.resume.mimetype}</p>
                    <p><span className="font-medium">File Size:</span> {(cvViewerData.resume.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                {cvViewerData.resume && (
                  <button
                    onClick={() => handleDownloadCV(cvViewerData.applicantId)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </button>
                )}
                <button
                  onClick={() => setCVViewerOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition"
                >
                  <X className="w-4 h-4" />
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ApplicantsDashboard;
