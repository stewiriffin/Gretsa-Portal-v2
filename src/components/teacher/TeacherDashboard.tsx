import { motion } from 'framer-motion';
import { BookOpen, Users, ClipboardCheck, BarChart3, MessageSquare, Upload } from 'lucide-react';
import { DigitalGradebook } from './DigitalGradebook';
import { AttendanceTracker } from './AttendanceTracker';
import { ClassAnalytics } from './ClassAnalytics';
import { ParallaxContainer } from '../ParallaxContainer';

export const TeacherDashboard = () => {
  const activeClasses = [
    {
      id: '1',
      name: 'Data Structures & Algorithms',
      code: 'CS301',
      students: 45,
      schedule: 'Mon/Wed/Fri 10:00 AM',
      nextClass: 'Tomorrow',
      pendingGrades: 12,
    },
    {
      id: '2',
      name: 'Database Management Systems',
      code: 'CS402',
      students: 38,
      schedule: 'Tue/Thu 2:00 PM',
      nextClass: 'Today 2:00 PM',
      pendingGrades: 8,
    },
    {
      id: '3',
      name: 'Software Engineering',
      code: 'CS403',
      students: 52,
      schedule: 'Mon/Wed 1:00 PM',
      nextClass: 'Wed 1:00 PM',
      pendingGrades: 15,
    },
  ];

  const stats = [
    { label: 'Active Classes', value: '3', icon: BookOpen, color: 'from-kenya-pink to-kenya-red' },
    { label: 'Total Students', value: '135', icon: Users, color: 'from-kenya-green to-emerald-600' },
    { label: 'Pending Grades', value: '35', icon: ClipboardCheck, color: 'from-purple-500 to-pink-500' },
    { label: 'Avg Attendance', value: '87%', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
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
            Welcome back, Dr. Ochieng! 👨‍🏫
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You have 3 classes today and 35 assignments pending grading
          </p>
        </motion.div>
      </ParallaxContainer>

      {/* Stats Cards */}
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
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </ParallaxContainer>

      {/* Active Classes Grid */}
      <ParallaxContainer speed={0.4}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <BookOpen className="text-kenya-pink" size={24} />
              My Classes
            </h2>
            <button className="px-4 py-2 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <Upload size={16} className="inline mr-2" />
              Upload Resources
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
                className="glass-card rounded-xl p-5 cursor-pointer hover:shadow-3d transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                      {classItem.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{classItem.code}</p>
                  </div>
                  {classItem.pendingGrades > 0 && (
                    <span className="px-2 py-1 bg-kenya-red text-white text-xs rounded-full font-semibold">
                      {classItem.pendingGrades}
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users size={14} />
                    <span>{classItem.students} students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ClipboardCheck size={14} />
                    <span>{classItem.schedule}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold">
                    Gradebook
                  </button>
                  <button className="flex-1 py-2 glass-card text-gray-900 dark:text-white rounded-lg text-sm font-semibold">
                    Attendance
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </ParallaxContainer>

      {/* Digital Gradebook */}
      <ParallaxContainer speed={0.5}>
        <DigitalGradebook />
      </ParallaxContainer>

      {/* Two Column: Attendance + Analytics */}
      <ParallaxContainer speed={0.6}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceTracker />
          <ClassAnalytics />
        </div>
      </ParallaxContainer>

      {/* Quick Communication */}
      <ParallaxContainer speed={0.7}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6">
            <MessageSquare className="text-kenya-green" size={24} />
            Quick Communication
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="glass-card rounded-xl p-4 text-left hover:shadow-3d transition-all group">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-kenya-pink transition-colors">
                Send Class Announcement
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Broadcast message to all students in selected class
              </p>
            </button>

            <button className="glass-card rounded-xl p-4 text-left hover:shadow-3d transition-all group">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-kenya-pink transition-colors">
                Email Absent Students
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Send reminder to students who missed today's class
              </p>
            </button>
          </div>
        </motion.div>
      </ParallaxContainer>
    </div>
  );
};
