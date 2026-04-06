import { useEffect, useState } from 'react';
import { blogsAPI, projectsAPI, jobsAPI } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  AlertCircle, FileText, Code2, Briefcase, Zap,
  TrendingUp, BarChart3, Users, Settings, Inbox,
  ArrowUpRight, Plus, Eye, CheckCircle,
  Activity, Target, Sparkles
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
      gradient: 'from-blue-500 to-blue-600',
      lightGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      iconBgColor: 'bg-blue-100',
      trend: '+12%',
      trendPositive: true,
      description: 'Total blog posts published'
    },
    {
      label: 'Projects',
      value: stats.totalProjects,
      icon: Code2,
      gradient: 'from-violet-500 to-violet-600',
      lightGradient: 'from-violet-50 to-violet-100',
      borderColor: 'border-violet-200',
      textColor: 'text-violet-600',
      iconBgColor: 'bg-violet-100',
      trend: '+8%',
      trendPositive: true,
      description: 'Portfolio projects'
    },
    {
      label: 'Job Listings',
      value: stats.totalJobs,
      icon: Briefcase,
      gradient: 'from-cyan-500 to-cyan-600',
      lightGradient: 'from-cyan-50 to-cyan-100',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-600',
      iconBgColor: 'bg-cyan-100',
      trend: '+5%',
      trendPositive: true,
      description: 'Active job postings'
    },
    {
      label: 'Open Positions',
      value: stats.openJobs,
      icon: Target,
      gradient: 'from-emerald-500 to-emerald-600',
      lightGradient: 'from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-600',
      iconBgColor: 'bg-emerald-100',
      trend: stats.openJobs > 0 ? 'Active' : 'None',
      trendPositive: stats.openJobs > 0,
      description: 'Positions accepting applications'
    }
  ];

  const actionCards = [
    {
      title: 'Blog Posts',
      description: 'Create and manage your blog content',
      icon: FileText,
      link: '/admin/blogs',
      gradient: 'from-blue-600 to-blue-700',
      bgLight: 'from-blue-50 to-blue-100',
      count: stats.totalBlogs,
      ctaText: 'Manage Blogs',
      color: 'blue'
    },
    {
      title: 'Projects',
      description: 'Showcase your portfolio and projects',
      icon: Code2,
      link: '/admin/projects',
      gradient: 'from-violet-600 to-violet-700',
      bgLight: 'from-violet-50 to-violet-100',
      count: stats.totalProjects,
      ctaText: 'Manage Projects',
      color: 'violet'
    },
    {
      title: 'Job Postings',
      description: 'Post and manage career opportunities',
      icon: Briefcase,
      link: '/admin/jobs',
      gradient: 'from-cyan-600 to-cyan-700',
      bgLight: 'from-cyan-50 to-cyan-100',
      count: stats.openJobs,
      ctaText: 'Manage Jobs',
      color: 'cyan'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-r-blue-600"
            ></motion.div>
          </div>
          <p className="text-slate-800 font-semibold text-lg">Loading your dashboard</p>
          <p className="text-slate-500 text-sm mt-2">Fetching latest data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 left-1/2 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-0 z-20 border-b border-slate-200/50 backdrop-blur-md bg-white/50"
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                </div>
                <p className="text-slate-600">Welcome back! Here's your content overview and quick actions</p>
              </div>
              <Button
                asChild
                variant="outline"
                size="icon"
                className="border-slate-200 hover:bg-slate-50 w-10 h-10"
              >
                <Link to="/admin-settings" title="Settings">
                  <Settings className="w-5 h-5 text-slate-600" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-red-50 border border-red-200/50 rounded-2xl p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Error</h3>
                <p className="text-sm text-red-700/80">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {statCards.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className={`border-l-4 ${stat.borderColor} border-r border-t border-b border-slate-200/50 bg-gradient-to-br ${stat.lightGradient} shadow-sm hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 overflow-hidden group`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl ${stat.iconBgColor} group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                        </div>
                        {stat.trendPositive && (
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center gap-1 bg-emerald-100 px-2.5 py-1.5 rounded-full"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-xs font-bold text-emerald-600">{stat.trend}</span>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-slate-600 font-medium text-sm mb-1">{stat.label}</p>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-4xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <p className="text-xs text-slate-500">{stat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Quick Actions Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="border-0 shadow-md bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle>Quick Actions</CardTitle>
                      <p className="text-sm text-blue-100 mt-1">Manage your content directly</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {actionCards.map((action, index) => {
                      const IconComponent = action.icon;
                      return (
                        <motion.div
                          key={action.title}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.35 + index * 0.08 }}
                        >
                          <Link to={action.link} className="block">
                            <div className={`group relative bg-gradient-to-br ${action.bgLight} border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-200/50 cursor-pointer h-full flex flex-col`}>
                              {/* Hover Effect Background */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

                              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-200/50 relative z-10`}>
                                <IconComponent className="w-7 h-7 text-white" />
                              </div>

                              <h3 className="font-bold text-slate-900 mb-1 text-lg relative z-10">
                                {action.title}
                              </h3>
                              <p className="text-sm text-slate-600 mb-4 flex-grow relative z-10">
                                {action.description}
                              </p>

                              <div className="flex items-center justify-between pt-4 border-t border-slate-200 relative z-10">
                                <div>
                                  <p className="text-2xl font-bold text-slate-900">
                                    {action.count}
                                  </p>
                                  <p className="text-xs text-slate-500">items</p>
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
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

            {/* System Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-0 shadow-md bg-white overflow-hidden h-full flex flex-col">
                <CardHeader className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    <CardTitle>System Status</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4 mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl"
                    >
                      <span className="text-sm font-semibold text-slate-700">API Status</span>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-emerald-500"
                        ></motion.div>
                        <span className="text-xs font-bold text-emerald-600">Connected</span>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl"
                    >
                      <span className="text-sm font-semibold text-slate-700">Database</span>
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                          className="w-2 h-2 rounded-full bg-blue-500"
                        ></motion.div>
                        <span className="text-xs font-bold text-blue-600">Synced</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6">
                    <p className="text-xs text-slate-500 mb-2 font-bold uppercase tracking-wide">API Endpoint</p>
                    <code className="text-xs text-slate-700 break-words font-mono font-semibold">
                      {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
                    </code>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300" asChild>
                    <Link to="/admin/blogs" className="flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Content
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white shadow-lg overflow-hidden relative"
          >
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="400" height="200" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Ready to manage your content?
              </h2>
              <p className="text-blue-100 text-lg mb-6">
                All your content management tools are here. Create blog posts, showcase projects, and manage job postings in one place.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  <Link to="/admin/blogs" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Create Blog Post
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white/20 font-semibold">
                  <Link to="/admin/projects" className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    Add Project
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
