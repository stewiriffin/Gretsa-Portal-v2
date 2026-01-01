import { motion } from 'framer-motion';
import { Settings, Calendar, DollarSign, Bell, Database, Shield } from 'lucide-react';

export const SystemSettings = () => {
  const settings = [
    {
      category: 'Academic',
      icon: Calendar,
      color: 'from-kenya-pink to-kenya-red',
      items: [
        { label: 'Current Semester', value: 'Spring 2024' },
        { label: 'Semester Start Date', value: 'Jan 15, 2024' },
        { label: 'Semester End Date', value: 'May 20, 2024' },
      ],
    },
    {
      category: 'Finance',
      icon: DollarSign,
      color: 'from-kenya-green to-emerald-600',
      items: [
        { label: 'Tuition Fee (Semester)', value: 'KES 85,000' },
        { label: 'Late Payment Fine', value: 'KES 5,000' },
        { label: 'Payment Deadline', value: 'Feb 1, 2024' },
      ],
    },
    {
      category: 'System',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      items: [
        { label: 'Auto Backup', value: 'Enabled (Daily 12 AM)' },
        { label: 'Server Status', value: 'Healthy' },
        { label: 'Last Backup', value: '2 hours ago' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Settings className="text-purple-600" size={24} />
          System Settings
        </h2>
        <button className="px-4 py-2 glass-card rounded-lg text-sm font-semibold text-gray-900 dark:text-white hover:shadow-3d transition-all">
          Edit Settings
        </button>
      </div>

      <div className="space-y-4">
        {settings.map((setting, index) => {
          const Icon = setting.icon;
          return (
            <motion.div
              key={setting.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${setting.color} flex items-center justify-center shadow-lg`}>
                  <Icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {setting.category}
                </h3>
              </div>

              <div className="space-y-2 ml-13">
                {setting.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm py-2 border-b border-white/10 last:border-0"
                  >
                    <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Toggle Settings */}
      <div className="mt-6 glass-card rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bell size={16} className="text-kenya-pink" />
          Notification Settings
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Email Notifications', enabled: true },
            { label: 'SMS Notifications', enabled: true },
            { label: 'Push Notifications', enabled: false },
            { label: 'Weekly Reports', enabled: true },
          ].map((toggle, index) => (
            <motion.div
              key={toggle.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">{toggle.label}</span>
              <button
                className={`w-12 h-6 rounded-full transition-all ${
                  toggle.enabled
                    ? 'bg-gradient-to-r from-kenya-green to-emerald-600'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <motion.div
                  animate={{ x: toggle.enabled ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="w-5 h-5 bg-white rounded-full shadow-lg"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Status */}
      <div className="mt-4 glass-card rounded-xl p-4 bg-green-50/50 dark:bg-green-900/20">
        <div className="flex items-center gap-2 text-kenya-green mb-2">
          <Shield size={18} />
          <h4 className="text-sm font-bold">Security Status</h4>
        </div>
        <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
          <li>• SSL Certificate: Valid until Dec 2024</li>
          <li>• Last Security Scan: 1 day ago (No threats)</li>
          <li>• Two-Factor Authentication: Enabled</li>
        </ul>
      </div>
    </motion.div>
  );
};
