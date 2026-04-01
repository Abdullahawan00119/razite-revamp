import { useEffect, useState } from 'react';
import { blogsAPI, projectsAPI, jobsAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalProjects: 0,
    totalJobs: 0,
    openJobs: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const [blogsRes, projectsRes, jobsRes] = await Promise.all([
          blogsAPI.getAll(),
          projectsAPI.getAll(),
          jobsAPI.getAll()
        ]);

        const jobs = jobsRes.data as Array<{ status: string }> || [];
        setStats({
          totalBlogs: blogsRes.data?.length || 0,
          totalProjects: projectsRes.data?.length || 0,
          totalJobs: jobs.length || 0,
          openJobs: jobs.filter((j: { status: string }) => j.status === 'open').length || 0
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
    { label: 'Total Blogs', value: stats.totalBlogs, color: 'from-blue-500 to-cyan-500' },
    { label: 'Total Projects', value: stats.totalProjects, color: 'from-purple-500 to-pink-500' },
    { label: 'Total Jobs', value: stats.totalJobs, color: 'from-emerald-500 to-teal-500' },
    { label: 'Open Jobs', value: stats.openJobs, color: 'from-orange-500 to-red-500'}
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
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
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Razite Admin Panel</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`bg-gradient-to-r ${stat.color} h-1`} />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <span className="text-4xl opacity-20">{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/blogs"
                className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors group"
              >
                <p className="text-2xl mb-2">📝</p>
                <p className="font-semibold text-gray-900 group-hover:text-blue-600">Manage Blogs</p>
                <p className="text-sm text-gray-600">Create, edit, or delete blog posts</p>
              </a>
              <a
                href="/admin/projects"
                className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 transition-colors group"
              >
                <p className="text-2xl mb-2">🚀</p>
                <p className="font-semibold text-gray-900 group-hover:text-purple-600">Manage Projects</p>
                <p className="text-sm text-gray-600">Create, edit, or delete projects</p>
              </a>
              <a
                href="/admin/jobs"
                className="p-4 border border-gray-200 rounded-lg hover:bg-emerald-50 transition-colors group"
              >
                <p className="text-2xl mb-2">💼</p>
                <p className="font-semibold text-gray-900 group-hover:text-emerald-600">Manage Jobs</p>
                <p className="text-sm text-gray-600">Create, edit, or delete job listings</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                Backend API connected at <code className="bg-gray-100 px-2 py-1 rounded text-xs">{import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
