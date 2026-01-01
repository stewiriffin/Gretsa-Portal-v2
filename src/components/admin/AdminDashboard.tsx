import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Activity, AlertTriangle, Settings } from 'lucide-react';
import { UserManagement } from './UserManagement';
import { FinancialOverview } from './FinancialOverview';
import { AuditLogs } from './AuditLogs';
import { SystemSettings } from './SystemSettings';
import { ParallaxContainer } from '../ParallaxContainer';

export const AdminDashboard = () => {
  const stats = [
    {
      label: 'Total Students',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-kenya-pink to-kenya-red',
    },
    {
      label: 'Total Revenue',
      value: 'KES 45.2M',
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-kenya-green to-emerald-600',
    },
    {
      label: 'Active Staff',
      value: '187',
      change: '+3',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'System Load',
      value: '67%',
      change: 'Normal',
      trend: 'neutral',
      icon: Activity,
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const alerts = [
    { id: '1', type: 'warning', message: 'Server maintenance scheduled for tonight at 11 PM', time: '2 hours ago' },
    { id: '2', type: 'info', message: 'New semester enrollment opens in 3 days', time: '5 hours ago' },
    { id: '3', type: 'critical', message: '15 fee payment confirmations pending review', time: '1 day ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <ParallaxContainer speed={0.2}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-strong rounded-2xl p-8 shadow-3d-strong"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            System Overview 🛡️
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            GRETSA University Administration Control Center
          </p>
        </motion.div>
      </ParallaxContainer>

      {/* Stats Grid */}
      <ParallaxContainer speed={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass-card-strong rounded-xl p-6 shadow-3d hover:shadow-3d-strong transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'bg-kenya-green/20 text-kenya-green' :
                    stat.trend === 'down' ? 'bg-kenya-red/20 text-kenya-red' :
                    'bg-blue-500/20 text-blue-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </ParallaxContainer>

      {/* System Alerts */}
      <ParallaxContainer speed={0.35}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <AlertTriangle className="text-kenya-red" size={24} />
              System Alerts
            </h2>
            <button className="text-sm text-kenya-pink hover:text-kenya-red font-semibold">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01, x: 3 }}
                className={`glass-card rounded-lg p-4 cursor-pointer transition-all ${
                  alert.type === 'critical' ? 'ring-2 ring-kenya-red/50' :
                  alert.type === 'warning' ? 'ring-2 ring-yellow-500/50' :
                  'ring-2 ring-blue-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-kenya-red' :
                    alert.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ParallaxContainer>

      {/* Financial Overview */}
      <ParallaxContainer speed={0.4}>
        <FinancialOverview />
      </ParallaxContainer>

      {/* User Management */}
      <ParallaxContainer speed={0.5}>
        <UserManagement />
      </ParallaxContainer>

      {/* Two Column: Audit Logs + System Settings */}
      <ParallaxContainer speed={0.6}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AuditLogs />
          <SystemSettings />
        </div>
      </ParallaxContainer>

      {/* Quick Actions */}
      <ParallaxContainer speed={0.7}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
            <Settings className="text-purple-600" size={24} />
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Generate Report', desc: 'Ministry compliance reports', color: 'from-kenya-pink to-kenya-red' },
              { label: 'Backup System', desc: 'Create full system backup', color: 'from-kenya-green to-emerald-600' },
              { label: 'Send Broadcast', desc: 'University-wide announcement', color: 'from-blue-500 to-cyan-500' },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card rounded-xl p-5 text-left hover:shadow-3d transition-all group`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} mb-3 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 group-hover:text-kenya-pink transition-colors">
                  {action.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.desc}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </ParallaxContainer>
    </div>
  );
};
