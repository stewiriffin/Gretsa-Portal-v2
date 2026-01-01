import { motion } from 'framer-motion';
import { BookOpen, Users, Calendar, MoreVertical, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  instructor: string;
  students: number;
  progress: number;
  nextClass: string;
  color: 'red' | 'green' | 'pink';
  delay: number;
}

const colorStyles = {
  red: {
    border: 'border-kenya-red',
    bg: 'bg-kenya-red',
    gradient: 'from-kenya-red/10 to-transparent',
    shadow: 'shadow-kenya-red/20',
  },
  green: {
    border: 'border-kenya-green',
    bg: 'bg-kenya-green',
    gradient: 'from-kenya-green/10 to-transparent',
    shadow: 'shadow-kenya-green/20',
  },
  pink: {
    border: 'border-kenya-pink',
    bg: 'bg-kenya-pink',
    gradient: 'from-kenya-pink/10 to-transparent',
    shadow: 'shadow-kenya-pink/20',
  },
};

const CourseCard = ({ title, instructor, students, progress, nextClass, color, delay }: CourseCardProps) => {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 150,
        damping: 20,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
      }}
      className={`relative bg-white rounded-2xl p-6 border-l-4 ${styles.border} shadow-lg hover:shadow-2xl ${styles.shadow} transition-all duration-300 cursor-pointer group overflow-hidden`}
    >
      {/* Background Gradient */}
      <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${styles.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className={`p-3 ${styles.bg} rounded-xl shadow-lg`}
          >
            <BookOpen className="text-white" size={24} />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical size={20} className="text-gray-400" />
          </motion.button>
        </div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.1 }}
          className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 transition-all"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="text-gray-600 text-sm mb-6"
        >
          {instructor}
        </motion.p>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="flex items-center gap-2 text-gray-600"
          >
            <Users size={16} />
            <span className="text-sm font-medium">{students} students</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.4 }}
            className="flex items-center gap-2 text-gray-600"
          >
            <Calendar size={16} />
            <span className="text-sm font-medium">{nextClass}</span>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Course Progress</span>
            <span className="text-sm font-bold text-gray-900">{progress}%</span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: delay + 0.5, duration: 1, ease: 'easeOut' }}
              className={`h-full ${styles.bg} rounded-full relative overflow-hidden`}
            >
              {/* Shimmer on progress bar */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'linear',
                  delay: delay + 1,
                  repeatDelay: 2,
                }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full flex items-center justify-between px-4 py-3 ${styles.bg} text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all group/btn`}
        >
          <span>Continue Learning</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight size={20} />
          </motion.div>
        </motion.button>
      </div>

      {/* Corner Decoration */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.6, type: 'spring' }}
        className={`absolute top-0 right-0 w-20 h-20 ${styles.bg} opacity-5 rounded-bl-full`}
      />
    </motion.div>
  );
};

export const CourseCards = () => {
  const courses = [
    {
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Sarah Wanjiku',
      students: 45,
      progress: 75,
      nextClass: 'Mon 10:00 AM',
      color: 'red' as const,
    },
    {
      title: 'Web Development',
      instructor: 'Prof. James Ochieng',
      students: 38,
      progress: 62,
      nextClass: 'Tue 2:00 PM',
      color: 'green' as const,
    },
    {
      title: 'Database Management',
      instructor: 'Dr. Mary Njeri',
      students: 52,
      progress: 88,
      nextClass: 'Wed 11:30 AM',
      color: 'pink' as const,
    },
    {
      title: 'Mobile App Development',
      instructor: 'Prof. David Kamau',
      students: 41,
      progress: 45,
      nextClass: 'Thu 9:00 AM',
      color: 'red' as const,
    },
    {
      title: 'Computer Networks',
      instructor: 'Dr. Grace Akinyi',
      students: 36,
      progress: 70,
      nextClass: 'Fri 1:00 PM',
      color: 'green' as const,
    },
    {
      title: 'Software Engineering',
      instructor: 'Prof. Peter Mwangi',
      students: 48,
      progress: 55,
      nextClass: 'Mon 3:30 PM',
      color: 'pink' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 text-kenya-red font-semibold hover:bg-kenya-red/5 rounded-lg transition-colors"
        >
          View All
          <ChevronRight size={20} />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={course.title}
            {...course}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};
