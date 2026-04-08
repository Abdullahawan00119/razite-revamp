import { useEffect, useState } from 'react';
import { jobsAPI, applicationsAPI } from '@/lib/api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  AlertCircle, Briefcase, Users, Settings, User, Clock, Check, Eye, X
} from 'lucide-react';



const AdminDashboard = () => {
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    openJobs: 0
  });
  const [applicantStats, setApplicantStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    rejected: 0,
    hired: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const jobsRes = await jobsAPI.getAll();
        const applicantsRes = await applicationsAPI.getDashboardStats();

        const jobs = jobsRes.data as Array<{ status: string }> || [];
        setJobStats({
          totalJobs: jobs.length || 0,
          openJobs: jobs.filter((j: { status: string }) => j.status === 'open').length || 0
        });

        const applicantsData = applicantsRes.data as unknown as {
          totalApplicants: number;
          byStatus: Array<{ _id: string; count: number }>;
        };
        const byStatus: { [key: string]: number } = {};
        (applicantsData?.byStatus || []).forEach((item: { _id: string; count: number }) => {
          byStatus[item._id] = item.count;
        });
        setApplicantStats({
          total: applicantsData?.totalApplicants || 0,
          pending: byStatus['pending'] || 0,
          reviewed: byStatus['reviewed'] || 0,
          shortlisted: byStatus['shortlisted'] || 0,
          rejected: byStatus['rejected'] || 0,
          hired: byStatus['hired'] || 0
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);


const statCards = [
    {
      label: 'Total Applications',
      value: applicantStats.total,
      icon: User,
      description: 'All applications received',
      color: 'blue' as const
    },
    {
      label: 'Open Positions',
      value: jobStats.openJobs,
      icon: Users,
      description: 'Positions accepting applications',
      color: 'green' as const
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-800 font-semibold text-lg">Loading dashboard</p>
          <p className="text-slate-500 text-sm mt-2">Fetching job stats...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600 mt-1">Job statistics overview</p>
            </div>
            <Link
              to="/admin-settings"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
<Card key={stat.label} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-white shadow-lg">
                <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    stat.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' :
                    stat.color === 'green' ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white' :
                    'bg-slate-100'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-slate-600 font-medium text-sm mb-1 uppercase tracking-wide">{stat.label}</p>
                <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );

};

export default AdminDashboard;
