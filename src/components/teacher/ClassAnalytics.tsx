import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const gradeDistribution = [
  { grade: 'A', count: 8, percentage: 18 },
  { grade: 'A-', count: 12, percentage: 27 },
  { grade: 'B+', count: 10, percentage: 22 },
  { grade: 'B', count: 7, percentage: 16 },
  { grade: 'C+', count: 5, percentage: 11 },
  { grade: 'C', count: 2, percentage: 4 },
  { grade: 'D', count: 1, percentage: 2 },
];

const performanceTrends = [
  { assignment: 'Assignment 1', average: 72 },
  { assignment: 'Assignment 2', average: 78 },
  { assignment: 'Midterm', average: 75 },
  { assignment: 'Assignment 3', average: 82 },
];

const COLORS = ['#15803D', '#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0', '#DCFCE7'];

export const ClassAnalytics = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
        <BarChart3 className="text-kenya-pink" size={24} />
        Class Analytics - CS301
      </h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award size={18} className="text-kenya-green" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Class Average</p>
          </div>
          <p className="text-3xl font-bold text-kenya-green">78.5</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            <TrendingUp size={12} className="inline mr-1" />
            +5.2% from last semester
          </p>
        </div>

        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={18} className="text-kenya-red" />
            <p className="text-sm text-gray-600 dark:text-gray-400">At Risk</p>
          </div>
          <p className="text-3xl font-bold text-kenya-red">3</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Students below 60%
          </p>
        </div>
      </div>

      {/* Grade Distribution Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
          Grade Distribution (Bell Curve)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeDistribution}>
              <XAxis
                dataKey="grade"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                label={{ value: 'Students', angle: -90, position: 'insideLeft', fill: '#9CA3AF', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number, name: string, props: any) => [
                  `${value} students (${props.payload.percentage}%)`,
                  'Count',
                ]}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Trends */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
          Performance Trends
        </h3>
        <div className="space-y-3">
          {performanceTrends.map((trend, index) => {
            const progress = (trend.average / 100) * 100;
            const isImproving = index > 0 && trend.average > performanceTrends[index - 1].average;

            return (
              <motion.div
                key={trend.assignment}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {trend.assignment}
                  </span>
                  <div className="flex items-center gap-2">
                    {isImproving && (
                      <TrendingUp size={14} className="text-kenya-green" />
                    )}
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {trend.average}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      trend.average >= 80 ? 'bg-gradient-to-r from-kenya-green to-emerald-600' :
                      trend.average >= 70 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                      trend.average >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-kenya-red to-red-700'
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 glass-card rounded-lg p-4 bg-blue-50/50 dark:bg-blue-900/20">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Class Insights
        </h4>
        <ul className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
          <li>• Overall class performance is trending upward (+5.2%)</li>
          <li>• 45% of students achieved A-range grades</li>
          <li>• 3 students need additional support (below 60%)</li>
          <li>• Highest performance: Assignment 3 (82% avg)</li>
        </ul>
      </div>
    </motion.div>
  );
};
