import { motion } from 'framer-motion';
import { BookOpen, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SwahiliGreeting } from '../../components/SwahiliGreeting';
import { AchievementCards } from '../../components/AchievementCards';
import { DashboardWidgetErrorBoundary } from '../../components/ErrorBoundary';

export const StudentDashboard = () => {
  // Quick stats for overview
  const quickStats = [
    { label: 'Courses', value: '6', icon: BookOpen, link: '/student/courses', color: 'from-blue-500 to-cyan-500' },
    { label: 'GPA', value: '3.7', icon: TrendingUp, link: '/student/grades', color: 'from-green-500 to-emerald-500' },
    { label: 'Next Class', value: '2:00 PM', icon: Calendar, link: '/student/schedule', color: 'from-purple-500 to-pink-500' },
    { label: 'Fees Due', value: 'KES 15K', icon: DollarSign, link: '/student/financials', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <SwahiliGreeting />

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} to={stat.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Achievement Cards */}
      <DashboardWidgetErrorBoundary widgetName="Achievements">
        <AchievementCards />
      </DashboardWidgetErrorBoundary>

      {/* Next Class Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Next Class
        </h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Data Structures & Algorithms
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Room 204 • 2:00 PM - 4:00 PM
            </p>
          </div>
          <Link to="/student/schedule">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-semibold hover:bg-purple-600 transition-colors">
              View Schedule
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/student/courses">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg"
          >
            Browse Courses
          </motion.button>
        </Link>
        <Link to="/ai-tutor">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg"
          >
            Ask SOMA AI
          </motion.button>
        </Link>
        <Link to="/student/financials">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg"
          >
            Pay Fees
          </motion.button>
        </Link>
      </div>
    </div>
  );
};
