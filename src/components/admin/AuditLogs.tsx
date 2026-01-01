import { motion } from 'framer-motion';
import { FileText, User, Database, Settings, Shield } from 'lucide-react';

const auditLogs = [
  {
    id: '1',
    user: 'Mary Njeri (Admin)',
    action: 'Updated fee structure for 2024 semester',
    type: 'settings',
    timestamp: '2024-01-02 14:23:45',
    status: 'success',
  },
  {
    id: '2',
    user: 'Dr. James Ochieng (Teacher)',
    action: 'Updated grades for CS301 class',
    type: 'data',
    timestamp: '2024-01-02 13:15:22',
    status: 'success',
  },
  {
    id: '3',
    user: 'System',
    action: 'Automated database backup completed',
    type: 'system',
    timestamp: '2024-01-02 12:00:00',
    status: 'success',
  },
  {
    id: '4',
    user: 'Mary Njeri (Admin)',
    action: 'Created new user account for Sarah Wanjiku',
    type: 'user',
    timestamp: '2024-01-02 11:45:18',
    status: 'success',
  },
  {
    id: '5',
    user: 'System',
    action: 'Failed login attempt detected',
    type: 'security',
    timestamp: '2024-01-02 10:32:09',
    status: 'warning',
  },
  {
    id: '6',
    user: 'Dr. Peter Mwangi (Teacher)',
    action: 'Uploaded course materials for CS403',
    type: 'data',
    timestamp: '2024-01-02 09:18:55',
    status: 'success',
  },
];

const typeConfig = {
  user: { icon: User, color: 'text-blue-600' },
  data: { icon: Database, color: 'text-kenya-green' },
  settings: { icon: Settings, color: 'text-purple-600' },
  system: { icon: FileText, color: 'text-gray-600 dark:text-gray-400' },
  security: { icon: Shield, color: 'text-kenya-red' },
};

export const AuditLogs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FileText className="text-kenya-pink" size={24} />
          Audit Logs
        </h2>
        <button className="text-sm text-kenya-pink hover:text-kenya-red font-semibold">
          View All
        </button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {auditLogs.map((log, index) => {
          const Icon = typeConfig[log.type as keyof typeof typeConfig].icon;
          const iconColor = typeConfig[log.type as keyof typeof typeConfig].color;

          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, x: 3 }}
              className={`glass-card rounded-lg p-4 cursor-pointer transition-all ${
                log.status === 'warning' ? 'ring-2 ring-yellow-500/50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg glass-card flex items-center justify-center flex-shrink-0 ${iconColor}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {log.action}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                    <span>{log.user}</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                  log.status === 'success' ? 'bg-kenya-green/20 text-kenya-green' :
                  log.status === 'warning' ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' :
                  'bg-kenya-red/20 text-kenya-red'
                }`}>
                  {log.status}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Showing latest 6 activities • Last updated 2 minutes ago
        </p>
      </div>
    </motion.div>
  );
};
