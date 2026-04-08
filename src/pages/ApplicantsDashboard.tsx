import { useEffect, useState, useCallback } from 'react';
import { applicationsAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  AlertCircle, 
  Download, 
  Trash2, 
  Eye, 
  Check, 
  Clock, 
  X, 
  User, 
  Mail, 
  Phone,
  Briefcase,
  MapPin,
  Calendar 
} from 'lucide-react';

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
  const [updatingStates, setUpdatingStates] = useState<Record<string, boolean>>({});
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
  const { toast } = useToast();

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
      setError(null);
      const response = await applicationsAPI.getAll();
      const applicantsData = (response.data as unknown as Applicant[]) || [];
      
      setApplicants(applicantsData);
      
      // Extract unique departments
      const depts = ['All', ...new Set(applicantsData.map(a => a.department))];
      setDepartments(depts);

      // Extract unique job titles
      const jobTitlesList = ['All', ...new Set(applicantsData.map(a => a.jobTitle))];
      setJobTitles(jobTitlesList);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load applicants';
      setError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
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
        const statusArray = data.byStatus as Array<{ _id: string; count: number }> || [];
        statusArray.forEach((item) => {
          byStatus[item._id] = item.count;
        });

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

  const handleStatusChange = async (applicantId: string, newStatus: string) => {
    setUpdatingStates(prev => ({ ...prev, [applicantId]: true }));
    
    try {
      // Optimistic update
      setApplicants(prev => 
        prev.map(a => 
          a._id === applicantId ? { ...a, status: newStatus } : a
        )
      );
      
      await applicationsAPI.updateStatus(applicantId, newStatus);
      
      toast({
        title: "Status updated",
        description: `Applicant status changed to ${newStatus}`,
      });
      
      await fetchStats();
    } catch (err) {
      // Revert optimistic update
      await fetchApplicants();
      const message = err instanceof Error ? err.message : 'Failed to update status';
      toast({
        title: "Update failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setUpdatingStates(prev => ({ ...prev, [applicantId]: false }));
    }
  };

  const handleDelete = async (applicantId: string) => {
    if (confirm('Are you sure you want to delete this applicant?')) {
      try {
        await applicationsAPI.delete(applicantId);
        await fetchApplicants();
        await fetchStats();
        toast({ title: "Applicant deleted" });
      } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete';
      toast({
        title: "Delete failed",
        description: message,
        variant: "destructive",
      });
      }
    }
  };

  const handleDownloadCV = async (applicantId: string) => {
    try {
      await applicationsAPI.downloadCV(applicantId);
      toast({ title: "Download started" });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Download failed';
      toast({
        title: "Download failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleViewCV = (applicant: Applicant) => {
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

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { color: 'yellow', bg: 'bg-yellow-100 text-yellow-800', icon: Clock },
      reviewed: { color: 'blue', bg: 'bg-blue-100 text-blue-800', icon: Eye },
      shortlisted: { color: 'green', bg: 'bg-green-100 text-green-800', icon: Check },
      rejected: { color: 'red', bg: 'bg-red-100 text-red-800', icon: X },
      hired: { color: 'emerald', bg: 'bg-emerald-100 text-emerald-800', icon: User },
      default: { color: 'gray', bg: 'bg-gray-100 text-gray-800', icon: null }
    };
    return configs[status as keyof typeof configs] || configs.default;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading applicants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Job Applicants Dashboard
        </h1>
        <p className="text-gray-600 max-w-2xl">Manage, review, and track job applications with real-time status updates</p>
      </motion.div>

      {/* Error Alert */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900">Error loading data</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Stats Cards - Improved */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stats.total}</CardTitle>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Applications</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-yellow-50 to-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stats.pending}</CardTitle>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pending Review</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stats.shortlisted}</CardTitle>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Shortlisted</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stats.reviewed}</CardTitle>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Reviewed</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-red-50 to-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <X className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stats.rejected}</CardTitle>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Rejected</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-white shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold text-gray-900">{stats.hired}</CardTitle>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Hired</p>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Department</label>
              <Select value={filters.department} onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Job Title</label>
              <Select value={filters.jobTitle} onValueChange={(value) => setFilters(prev => ({ ...prev, jobTitle: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All positions" />
                </SelectTrigger>
                <SelectContent>
                  {jobTitles.map(job => (
                    <SelectItem key={job} value={job}>{job}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Applicants Table */}
      <Card className="shadow-sm border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Applicants List ({filteredApplicants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Applied</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApplicants.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-2">
                        <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No applicants found</h3>
                        <p className="text-sm">Try adjusting your filters or create job postings</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredApplicants.map((applicant) => {
                    const statusConfig = getStatusConfig(applicant.status);
                    const IconComponent = statusConfig.icon ? statusConfig.icon : null;
                    const isUpdating = updatingStates[applicant._id];

                    return (
                      <tr key={applicant._id} className="hover:bg-slate-50/50 group transition-colors">
                        <td className="px-6 py-5">
                          <div className="font-semibold text-slate-900">{applicant.name}</div>
                          <div className="text-sm text-slate-600">{applicant.department}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-slate-400" />
                              <span className="font-medium">{applicant.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Phone className="w-4 h-4 text-slate-400" />
                              {applicant.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <Badge variant="secondary" className="font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            {applicant.jobTitle}
                          </Badge>
                        </td>
                        <td className="px-6 py-5 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span>{applicant.city}, {applicant.district}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="w-32">
                            <Select 
                              value={applicant.status} 
                              onValueChange={(value) => handleStatusChange(applicant._id, value)}
                              disabled={isUpdating}
                            >
                              <SelectTrigger className={`group/item font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm border hover:border-transparent transition-all font-medium ${statusConfig.bg}`}>
                                <div className="flex items-center gap-1.5 min-w-0">
                                  {IconComponent && <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />}
                                  <span className="truncate capitalize">{applicant.status}</span>
                                  {isUpdating && (
                                    <div className="ml-1.5 w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                  )}
                                </div>
                              </SelectTrigger>
                              <SelectContent className="w-[180px] p-1">
                                <SelectItem value="pending" className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" /> Pending
                                </SelectItem>
                                <SelectItem value="reviewed" className="flex items-center gap-2">
                                  <Eye className="w-4 h-4" /> Reviewed
                                </SelectItem>
                                <SelectItem value="shortlisted" className="flex items-center gap-2">
                                  <Check className="w-4 h-4" /> Shortlisted
                                </SelectItem>
                                <SelectItem value="rejected" className="flex items-center gap-2">
                                  <X className="w-4 h-4" /> Rejected
                                </SelectItem>
                                <SelectItem value="hired" className="flex items-center gap-2">
                                  <User className="w-4 h-4" /> Hired
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {new Date(applicant.appliedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex gap-1">
                            {applicant.resume && (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewCV(applicant)}
                                  className="h-9 w-9 p-0 hover:bg-green-50 border border-green-200"
                                  title="View CV"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDownloadCV(applicant._id)}
                                  className="h-9 w-9 p-0 hover:bg-blue-50 border border-blue-200"
                                  title="Download CV"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(applicant._id)}
                              className="h-9 w-9 p-0 hover:bg-red-50 border border-red-200"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* CV Viewer Modal - Unchanged for brevity */}
      {cvViewerOpen && cvViewerData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{cvViewerData.name}</h2>
                <div className="flex items-center gap-4 mt-1 text-slate-300">
                  <Badge variant="secondary" className="bg-white/20 text-white">{cvViewerData.jobTitle}</Badge>
                  <span className="text-sm">{cvViewerData.location}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCVViewerOpen(false)}
                className="text-white hover:bg-white/20 h-10 w-10 p-0 rounded-xl"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-2xl">
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Email</label>
                  <div className="flex items-center gap-2 text-slate-900 font-medium">
                    <Mail className="w-4 h-4" />
                    {cvViewerData.email}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-600" />
                    <span className="text-slate-900">{cvViewerData.phone}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Status</label>
                  <Badge className={`font-semibold capitalize ${getStatusConfig(cvViewerData.status).bg}`}>
                    {cvViewerData.status}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-600 mb-1 block">Applied</label>
                  <span className="text-slate-900">{new Date(cvViewerData.appliedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Resume Preview */}
              {cvViewerData.resume && (
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Resume - {cvViewerData.resume.filename}
                    </CardTitle>
                    <p className="text-sm text-slate-600">Size: {Math.round((cvViewerData.resume.size / 1024) * 10) / 10} KB</p>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 p-4 rounded-xl border-2 border-dashed border-slate-200">
                      <iframe
                        src={applicationsAPI.getPreviewCVUrl(cvViewerData.applicantId)}
                        className="w-full h-96 rounded-xl border-0 bg-white shadow-sm"
                        title="CV Preview"
                      />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button onClick={() => handleDownloadCV(cvViewerData.applicantId)} className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={() => setCVViewerOpen(false)} className="flex-1">
                        Close
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cover Letter */}
              {cvViewerData.coverLetter && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Cover Letter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {cvViewerData.coverLetter}
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ApplicantsDashboard;

