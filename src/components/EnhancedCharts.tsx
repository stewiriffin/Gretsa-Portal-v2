import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Award, Calendar, BookOpen } from 'lucide-react';

// GPA Trend Data
const gpaData = [
  { semester: 'Sem 1', gpa: 3.2, credits: 18 },
  { semester: 'Sem 2', gpa: 3.4, credits: 20 },
  { semester: 'Sem 3', gpa: 3.6, credits: 19 },
  { semester: 'Sem 4', gpa: 3.7, credits: 21 },
  { semester: 'Sem 5', gpa: 3.85, credits: 20 },
  { semester: 'Current', gpa: 3.85, credits: 22 },
];

// Performance Radar Data
const performanceData = [
  { subject: 'Algorithms', score: 95 },
  { subject: 'Web Dev', score: 88 },
  { subject: 'Databases', score: 92 },
  { subject: 'Networks', score: 85 },
  { subject: 'Mobile', score: 80 },
  { subject: 'Software Eng', score: 90 },
];

// Study Time Distribution (Pie)
const studyTimeData = [
  { name: 'Lectures', value: 25, color: '#B91C1C' },
  { name: 'Assignments', value: 35, color: '#E91E63' },
  { name: 'Self Study', value: 20, color: '#15803D' },
  { name: 'Group Work', value: 15, color: '#3B82F6' },
  { name: 'Review', value: 5, color: '#8B5CF6' },
];

// Weekly Activity
const weeklyActivityData = [
  { day: 'Mon', hours: 8, assignments: 3 },
  { day: 'Tue', hours: 6, assignments: 2 },
  { day: 'Wed', hours: 9, assignments: 4 },
  { day: 'Thu', hours: 7, assignments: 2 },
  { day: 'Fri', hours: 5, assignments: 1 },
  { day: 'Sat', hours: 4, assignments: 1 },
  { day: 'Sun', hours: 3, assignments: 0 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card-strong p-3 rounded-lg shadow-3d border border-white/30">
        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-gray-700 dark:text-gray-300">
            <span style={{ color: entry.color }}>{entry.name}: </span>
            <span className="font-semibold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const EnhancedCharts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <TrendingUp size={24} className="text-kenya-pink" />
          Academic Analytics
        </h2>
      </div>

      {/* Top Row: GPA Trend + Performance Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GPA Trend Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} className="text-kenya-green" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">GPA Progression</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={gpaData}>
              <defs>
                <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E91E63" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#E91E63" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803D" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#15803D" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="semester"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                yAxisId="left"
                domain={[0, 4.0]}
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[0, 25]}
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="gpa"
                stroke="#E91E63"
                strokeWidth={3}
                fill="url(#colorGpa)"
                name="GPA"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="credits"
                stroke="#15803D"
                strokeWidth={2}
                dot={{ fill: '#15803D', r: 4 }}
                name="Credits"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="glass-card rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Current GPA</p>
              <p className="text-2xl font-bold text-kenya-pink">3.85</p>
            </div>
            <div className="glass-card rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Trend</p>
              <p className="text-2xl font-bold text-kenya-green flex items-center justify-center gap-1">
                <TrendingUp size={20} />
                +0.65
              </p>
            </div>
          </div>
        </motion.div>

        {/* Performance Radar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-kenya-pink" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Subject Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis
                dataKey="subject"
                stroke="#9CA3AF"
                style={{ fontSize: '11px' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                stroke="#9CA3AF"
                style={{ fontSize: '10px' }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#E91E63"
                fill="#E91E63"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="glass-card rounded-lg p-2 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Highest</p>
              <p className="text-lg font-bold text-kenya-green">95%</p>
            </div>
            <div className="glass-card rounded-lg p-2 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Average</p>
              <p className="text-lg font-bold text-kenya-pink">88%</p>
            </div>
            <div className="glass-card rounded-lg p-2 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Lowest</p>
              <p className="text-lg font-bold text-kenya-red">80%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row: Weekly Activity Bar + Study Time Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={20} className="text-kenya-green" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Weekly Activity</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar
                dataKey="hours"
                fill="#E91E63"
                radius={[8, 8, 0, 0]}
                name="Study Hours"
              />
              <Bar
                dataKey="assignments"
                fill="#15803D"
                radius={[8, 8, 0, 0]}
                name="Assignments"
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="glass-card rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Hours</p>
              <p className="text-2xl font-bold text-kenya-pink">42h</p>
            </div>
            <div className="glass-card rounded-lg p-3 text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-2xl font-bold text-kenya-green">13</p>
            </div>
          </div>
        </motion.div>

        {/* Study Time Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-kenya-red" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Time Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={studyTimeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {studyTimeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {studyTimeData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between glass-card rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
