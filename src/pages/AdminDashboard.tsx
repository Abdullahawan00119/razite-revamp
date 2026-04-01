import { useEffect, useState } from 'react';
import { blogsAPI, projectsAPI, jobsAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  AlertCircle, FileText, Code2, Briefcase, Zap, 
  TrendingUp, BarChart3, Users, Settings,
  ArrowUpRight, Edit3, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    { 
      label: 'Total Blogs', 
      value: stats.totalBlogs, 
      icon: FileText,
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      trend: '+12%',
      trendPositive: true
    },
    { 
      label: 'Total Projects', 
      value: stats.totalProjects, 
      icon: Code2,
      bgGradient: 'from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-200',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      trend: '+8%',
      trendPositive: true
    },
    { 
      label: 'Total Jobs', 
      value: stats.totalJobs, 
      icon: Briefcase,
      bgGradient: 'from-cyan-50 to-cyan-100',
      borderColor: 'border-cyan-200',
      iconBg: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      trend: '+5%',
      trendPositive: true
    },
    { 
      label: 'Open Positions', 
      value: stats.openJobs, 
      icon: Zap,
      bgGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      trend: stats.openJobs > 0 ? 'Active' : 'None',
      trendPositive: stats.openJobs > 0
    }
  ];

  const actionCards = [
    {
      title: 'Manage Blogs',
      description: 'Create, edit, and manage blog posts',
      icon: FileText,
      link: '/admin/blogs',
      color: 'from-blue-600 to-blue-700',
      lightColor: 'from-blue-50 to-blue-100',
      stats: `${stats.totalBlogs}`,
      statsLabel: 'posts',
      action: 'Manage Blogs'
    },
    {
      title: 'Manage Projects',
      description: 'Manage portfolio and projects',
      icon: Code2,
      link: '/admin/projects',
      color: 'from-indigo-600 to-indigo-700',
      lightColor: 'from-indigo-50 to-indigo-100',
      stats: `${stats.totalProjects}`,
      statsLabel: 'projects',
      action: 'Manage Projects'
    },
    {
      title: 'Manage Jobs',
      description: 'Post and manage job listings',
      icon: Briefcase,
      link: '/admin/jobs',
      color: 'from-cyan-600 to-cyan-700',
      lightColor: 'from-cyan-50 to-cyan-100',
      stats: `${stats.openJobs}`,
      statsLabel: 'open',
      action: 'Manage Jobs'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600 animate-spin"></div>
          </div>
          <p className="text-slate-700 font-semibold text-lg">Loading dashboard</p>
          <p className="text-slate-500 text-sm mt-2">Please wait...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-slate-700/50 backdrop-blur-md bg-slate-900/50 sticky top-0 z-20"
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white">Dashboard</h1>
                <p className="text-slate-400 mt-2">Manage your content and monitor system performance</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-sm text-slate-300">System Online</span>
                </div>
                <Button asChild variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Link to="/admin-settings" title="Settings">
                    <Settings className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-red-500/10 border border-red-500/30 backdrop-blur-sm rounded-xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-400">System Alert</h3>
                <p className="text-sm text-red-300/80">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {statCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                >
                  <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-lg ${stat.iconBg}`}>
                          <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <ArrowUpRight className="w-4 h-4" />
                          <span className="text-xs font-semibold">{stat.trend}</span>
                        </div>
                      </div>
                      <p className="text-slate-400 font-medium text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                      <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${stat.iconBg}`}
                          style={{ width: `${(stat.value / 100) * 100}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-600/50">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 pb-6 px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {actionCards.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <motion.div
                          key={action.title}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.45 + index * 0.05 }}
                        >
                          <Link to={action.link}>
                            <div className={`group bg-gradient-to-br ${action.lightColor} border border-slate-600 hover:border-slate-500 rounded-xl p-6 transition-all duration-300 cursor-pointer transform hover:scale-105 h-full flex flex-col`}>
                              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="font-semibold text-slate-900 mb-1">
                                {action.title}
                              </h3>
                              <p className="text-xs text-slate-600 mb-4 flex-grow">{action.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold text-slate-900">
                                  {action.stats}
                                </span>
                                <span className="text-xs text-slate-600">{action.statsLabel}</span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* System Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 overflow-hidden h-full flex flex-col">
                <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-white" />
                    <CardTitle className="text-white">System Status</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <span className="text-sm font-medium text-slate-300">API Status</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-semibold text-emerald-400">Connected</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <span className="text-sm font-medium text-slate-300">Database</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-xs font-semibold text-blue-400">Synced</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg mb-4">
                    <p className="text-xs text-slate-500 mb-2 font-semibold">API ENDPOINT</p>
                    <code className="text-xs text-slate-300 break-words font-mono">
                      {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
                    </code>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold" asChild>
                    <Link to="/admin/blogs" className="flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" />
                      Start Managing
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
