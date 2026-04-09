import React, { useEffect, useState, useCallback } from 'react';
import { applicationsAPI } from '@/lib/api';
import type { ApplicantData } from '@/data/applications';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { 
  AlertCircle, 
  Download, 
  Trash2, 
  Eye, 
  Check, 
  Clock, 
  X, 
  User, 
  Briefcase,
  MapPin,
  Calendar,
  Filter,
  FileText
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

  const fetchApplicants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await applicationsAPI.getAll();
      const applicantsData: Applicant[] = response.data || [];
      setApplicants(applicantsData);
      const depts = ['All', ...Array.from(new Set(applicantsData.map(a => a.department)))];
      setDepartments(depts);
      const jobTitlesList = ['All', ...Array.from(new Set(applicantsData.map(a => a.jobTitle)))];
      setJobTitles(jobTitlesList);
    } catch (err: any) {
      const message = err.message || 'Failed to load applicants';
      setError(message);
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await applicationsAPI.getDashboardStats();
      const data = response.data as Record<string, unknown>;
      if (data.totalApplicants !== undefined) {
        const byStatus: Record<string, number> = {};
        const statusArray = data.byStatus as Array<{ _id: string; count: number }> || [];
        statusArray.forEach(item => {
          byStatus[item._id] = item.count;
        });
        setStats({
          total: Number(data.totalApplicants) || 0,
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
  }, []);

  const handleStatusChange = useCallback(async (applicantId: string, newStatus: string) => {
    setUpdatingStates(prev => ({ ...prev, [applicantId]: true }));
    try {
      // Optimistic UI updates
      setApplicants(prev => prev.map(a => a._id === applicantId ? { ...a, status: newStatus } : a));
      if (cvViewerData?.applicantId === applicantId) {
        setCVViewerData(prev => prev ? { ...prev, status: newStatus } : null);
      }

      await applicationsAPI.updateStatus(applicantId, { status: newStatus });
      
      toast({ title: "Status updated", description: `Status changed to ${newStatus}` });
      fetchStats();
      setTimeout(fetchStats, 800);
    } catch (err: any) {
      fetchApplicants();
      toast({ title: "Update failed", description: err.message || 'Failed to update status', variant: "destructive" });
    } finally {
      setUpdatingStates(prev => ({ ...prev, [applicantId]: false }));
    }
  }, [fetchApplicants, fetchStats, toast]);

  const handleDelete = useCallback(async (applicantId: string) => {
    if (!confirm('Are you sure? This deletes the applicant and CV permanently.')) return;
    const prevApplicants = applicants;
    setApplicants(prev => prev.filter(a => a._id !== applicantId));
    try {
      await applicationsAPI.delete(applicantId);
      fetchStats();
      toast({ title: "Deleted successfully" });
    } catch (err: any) {
      setApplicants(prevApplicants);
      toast({ title: "Delete failed", description: err.message || 'Failed to delete', variant: "destructive" });
      fetchApplicants();
    }
  }, [applicants, fetchApplicants, fetchStats, toast]);

  const handleDownloadCV = useCallback(async (applicantId: string) => {
    try {
      await applicationsAPI.downloadCV(applicantId);
      toast({ title: "Download started" });
    } catch (err: any) {
      toast({ title: "Download failed", description: err.message || 'Download failed', variant: "destructive" });
    }
  }, [toast]);

  const handleViewCV = useCallback((applicant: Applicant) => {
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
  }, []);

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { bg: 'bg-yellow-100 text-yellow-800', icon: Clock },
      reviewed: { bg: 'bg-blue-100 text-blue-800', icon: Eye },
      shortlisted: { bg: 'bg-green-100 text-green-800', icon: Check },
      rejected: { bg: 'bg-red-100 text-red-800', icon: X },
      hired: { bg: 'bg-emerald-100 text-emerald-800', icon: User },
      default: { bg: 'bg-gray-100 text-gray-800', icon: null as any }
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

  const statConfigs = [
    { label: 'Total', value: stats.total, gradient: 'from-blue-500 to-blue-600', icon: User },
    { label: 'Pending', value: stats.pending, gradient: 'from-yellow-500 to-yellow-600', icon: Clock },
    { label: 'Reviewed', value: stats.reviewed, gradient: 'from-indigo-500 to-indigo-600', icon: Eye },
    { label: 'Shortlisted', value: stats.shortlisted, gradient: 'from-green-500 to-green-600', icon: Check },
    { label: 'Rejected', value: stats.rejected, gradient: 'from-red-500 to-red-600', icon: X },
    { label: 'Hired', value: stats.hired, gradient: 'from-emerald-500 to-emerald-600', icon: Briefcase }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Job Applicants Dashboard
        </h1>
        <p className="text-gray-600 max-w-2xl">Manage, review, and track job applications with real-time status updates.</p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-50 border border-red-200 p-4 rounded-lg"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-1">Error loading data</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statConfigs.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-slate-50/50 to-white shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-gradient-to-br ${stat.gradient} text-white rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900">{stat.value}</CardTitle>
                    <CardDescription className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {stat.label}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-gray-700">Department</label>
              <Select onValueChange={(value) => setFilters(p => ({ ...p, department: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block text-gray-700">Status</label>
              <Select onValueChange={(value) => setFilters(p => ({ ...p, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {['All', 'pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map(s => (
                    <SelectItem key={s} value={s}>{s === 'All' ? s : s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block text-gray-700">Job Title</label>
              <Select onValueChange={(value) => setFilters(p => ({ ...p, jobTitle: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Jobs" />
                </SelectTrigger>
                <SelectContent>
                  {jobTitles.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Applicants ({filteredApplicants.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead className="hidden md:table-cell">Position</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplicants.map(applicant => (
                <TableRow key={applicant._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {applicant.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{applicant.name}</p>
                        <p className="text-sm text-gray-500">{applicant.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{applicant.jobTitle}</TableCell>
                  <TableCell className="capitalize">{applicant.city}, {applicant.district}</TableCell>
                  <TableCell>{applicant.department}</TableCell>
                  <TableCell>
                    <Badge className={cn(
                      'capitalize font-medium px-3 py-1',
                      getStatusConfig(applicant.status).bg
                    )}>
{getStatusConfig(applicant.status).icon ? React.createElement(getStatusConfig(applicant.status).icon as any, { className: "w-3 h-3 mr-1" }) : null}
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDownloadCV(applicant._id)} className="h-8 w-8 p-0">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleViewCV(applicant)} className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(applicant._id)} className="h-8">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredApplicants.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No applicants found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={cvViewerOpen} onOpenChange={setCVViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-0 shadow-2xl">
          {cvViewerData && (
            <div className="flex flex-col h-full">
              {/* Premium Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="relative flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl font-bold border border-white/30 shadow-xl">
                    {cvViewerData.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-extrabold tracking-tight mb-1">{cvViewerData.name}</h2>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-blue-100">
                      <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm font-medium">{cvViewerData.jobTitle}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm font-medium">{cvViewerData.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-3">
                    <Badge className={cn(
                      'px-4 py-1.5 text-sm font-bold shadow-lg uppercase tracking-wider',
                      getStatusConfig(cvViewerData.status).bg
                    )}>
                      {getStatusConfig(cvViewerData.status).icon && React.createElement(getStatusConfig(cvViewerData.status).icon as any, { className: "w-4 h-4 mr-2" })}
                      {cvViewerData.status}
                    </Badge>
                    <p className="text-blue-100 text-xs font-medium">Applied on {new Date(cvViewerData.appliedAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 flex-1 bg-slate-50">
                {/* Left Column: Details & Actions */}
                <div className="lg:col-span-2 p-8 border-r border-slate-200 space-y-8 bg-white/50 backdrop-blur-sm">
                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="group p-4 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Email Address</label>
                        <p className="font-semibold text-slate-700 flex items-center gap-2">
                          <span className="text-blue-500">@</span> {cvViewerData.email}
                        </p>
                      </div>
                      <div className="group p-4 bg-slate-50 rounded-xl border border-slate-100 transition-all hover:bg-white hover:shadow-md">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Phone Number</label>
                        <p className="font-semibold text-slate-700 flex items-center gap-2">
                          <span className="text-blue-500">#</span> {cvViewerData.phone}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                      Status Management
                    </h3>
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                      <label className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">Update Application Status</label>
                      <Select 
                        defaultValue={cvViewerData.status} 
                        onValueChange={(val) => handleStatusChange(cvViewerData.applicantId, val)}
                        disabled={updatingStates[cvViewerData.applicantId]}
                      >
                        <SelectTrigger className="bg-white border-blue-200">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map(s => (
                            <SelectItem key={s} value={s} className="capitalize">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {updatingStates[cvViewerData.applicantId] && (
                        <p className="text-[10px] text-blue-500 mt-2 animate-pulse font-medium">Updating status...</p>
                      )}
                    </div>
                  </section>

                  <section className="pt-4 border-t border-slate-200">
                    <Button 
                      onClick={() => handleDownloadCV(cvViewerData.applicantId)} 
                      className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-md font-bold shadow-lg shadow-blue-200 group transition-all"
                    >
                      <Download className="mr-2 h-5 w-5 group-hover:-translate-y-1 transition-transform" />
                      Download Resume
                    </Button>
                  </section>
                </div>

                {/* Right Column: Resume & Cover Letter */}
                <div className="lg:col-span-3 p-8 space-y-8 bg-white">
                  {cvViewerData.coverLetter && (
                    <section className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Cover Letter
                      </h3>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 italic leading-relaxed shadow-inner">
                        "{cvViewerData.coverLetter}"
                      </div>
                    </section>
                  )}

                  <section className="space-y-3 flex flex-col h-full min-h-[400px]">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-600" />
                      Resume Preview
                    </h3>
                    <div className="flex-1 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden relative group">
                      {(() => {
                        const previewUrl = applicationsAPI.getCVPreviewUrl(cvViewerData.applicantId);
                        return previewUrl ? (
                          <iframe
                            src={previewUrl}
                            className="w-full h-full bg-white transition-opacity"
                            title={`CV Preview - ${cvViewerData.name}`}
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-slate-400">
                            <AlertCircle className="w-16 h-16 mb-4 opacity-20" />
                            <p className="text-lg font-medium">CV preview unavailable</p>
                            <p className="text-sm">Try downloading the file instead</p>
                          </div>
                        );
                      })()}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicantsDashboard;
