import { motion } from 'framer-motion';
import { Search, Bell, Mail, User, AlertTriangle, Clock } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useExamCountdown } from '../hooks/useExamCountdown';
import { RoleSwitcher } from './RoleSwitcher';
import { SwahiliGreeting } from './SwahiliGreeting';

export const Header = () => {
  const { currentRole, userName } = useRole();
  const { unreadCount } = useNotifications();
  const { isExamWeek, upcomingExam, countdown } = useExamCountdown();

  // Role-specific search placeholders
  const searchPlaceholders = {
    student: 'Search courses, assignments, resources...',
    teacher: 'Search students, classes, assignments...',
    admin: 'Search users, reports, system settings...',
  };

  // Role-specific department/title
  const getRoleInfo = () => {
    switch (currentRole) {
      case 'student':
        return 'Computer Science';
      case 'teacher':
        return 'Senior Lecturer';
      case 'admin':
        return 'System Administrator';
    }
  };

  // Format countdown numbers with leading zero
  const formatCountdown = (num: number) => num.toString().padStart(2, '0');

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 px-8 py-4 transition-all duration-500 ${
        isExamWeek && currentRole === 'student'
          ? 'bg-linear-to-r from-purple-900 via-indigo-900 to-blue-900 backdrop-blur-xl border-b-2 border-yellow-400'
          : 'glassmorphism'
      }`}
    >
      {/* Exam Week Banner */}
      {isExamWeek && currentRole === 'student' && upcomingExam && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-3 px-4 py-2 bg-yellow-400/20 border border-yellow-400/50 rounded-xl"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <AlertTriangle className="text-yellow-400" size={20} />
            </motion.div>
            <div>
              <p className="text-sm font-bold text-white flex items-center gap-2">
                🎯 Focus Mode: {upcomingExam.course} {upcomingExam.type.toUpperCase()}
              </p>
              <p className="text-xs text-yellow-200">
                {upcomingExam.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })} • {upcomingExam.time} • {upcomingExam.location}
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2">
            <Clock className="text-yellow-400" size={18} />
            <div className="flex items-center gap-1 font-mono font-bold text-white">
              <div className="flex flex-col items-center">
                <span className="text-2xl text-yellow-400">{formatCountdown(countdown.days)}</span>
                <span className="text-[10px] text-yellow-200">DAYS</span>
              </div>
              <span className="text-xl text-yellow-400 mx-1">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-yellow-400">{formatCountdown(countdown.hours)}</span>
                <span className="text-[10px] text-yellow-200">HRS</span>
              </div>
              <span className="text-xl text-yellow-400 mx-1">:</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-yellow-400">{formatCountdown(countdown.minutes)}</span>
                <span className="text-[10px] text-yellow-200">MIN</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        {/* Role Switcher */}
        <div className="mr-6">
          <RoleSwitcher />
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex-1 max-w-xl"
        >
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-kenya-pink transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder={searchPlaceholders[currentRole]}
              className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-gray-700 rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-kenya-pink focus:border-transparent
                       transition-all duration-300 placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-kenya-red/10 via-kenya-pink/10 to-kenya-green/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Swahili Greeting */}
        <SwahiliGreeting />

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-8">
          {/* Notification Icons */}
          {[
            { icon: <Mail size={20} />, count: 3, color: 'kenya-green' },
            { icon: <Bell size={20} />, count: unreadCount, color: 'kenya-red' },
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all shadow-md group"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>

              {item.count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 -right-1 w-5 h-5 bg-${item.color} text-white text-xs
                           rounded-full flex items-center justify-center font-bold shadow-lg`}
                  style={{
                    backgroundColor: item.color === 'kenya-green' ? '#15803D' : '#B91C1C'
                  }}
                >
                  {item.count}
                </motion.span>
              )}

              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-kenya-pink/20 to-kenya-red/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              />
            </motion.button>
          ))}

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 pl-4 border-l border-gray-300 dark:border-gray-700"
          >
            <div className="text-right hidden md:block">
              <p className="font-semibold text-gray-800 dark:text-white">{userName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{getRoleInfo()}</p>
            </div>

            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kenya-red via-kenya-pink to-kenya-green p-[2px]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="text-gray-600" size={24} />
                </div>
              </div>

              {/* Online Status Indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-0 right-0 w-3 h-3 bg-kenya-green border-2 border-white rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
