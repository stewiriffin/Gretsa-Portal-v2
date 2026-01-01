import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Users, Calendar, MoreVertical, ChevronRight, Star, Trophy } from 'lucide-react';

interface EnhancedCourseCardProps {
  title: string;
  instructor: string;
  students: number;
  progress: number;
  nextClass: string;
  color: 'red' | 'green' | 'pink';
  delay: number;
  xp?: number;
  grade?: string;
}

const colorStyles = {
  red: {
    border: 'border-kenya-red dark:border-red-500',
    bg: 'bg-kenya-red dark:bg-red-500',
    bgGradient: 'from-kenya-red/10 to-transparent dark:from-red-500/20',
    shadow: 'shadow-kenya-red/20 dark:shadow-red-500/30',
    neon: 'shadow-[0_0_20px_rgba(185,28,28,0.5)] dark:shadow-[0_0_30px_rgba(239,68,68,0.6)]',
  },
  green: {
    border: 'border-kenya-green dark:border-green-500',
    bg: 'bg-kenya-green dark:bg-green-500',
    bgGradient: 'from-kenya-green/10 to-transparent dark:from-green-500/20',
    shadow: 'shadow-kenya-green/20 dark:shadow-green-500/30',
    neon: 'shadow-[0_0_20px_rgba(21,128,61,0.5)] dark:shadow-[0_0_30px_rgba(34,197,94,0.6)]',
  },
  pink: {
    border: 'border-kenya-pink dark:border-pink-500',
    bg: 'bg-kenya-pink dark:bg-pink-500',
    bgGradient: 'from-kenya-pink/10 to-transparent dark:from-pink-500/20',
    shadow: 'shadow-kenya-pink/20 dark:shadow-pink-500/30',
    neon: 'shadow-[0_0_20px_rgba(233,30,99,0.5)] dark:shadow-[0_0_30px_rgba(236,72,153,0.6)]',
  },
};

export const EnhancedCourseCard = ({
  title,
  instructor,
  students,
  progress,
  nextClass,
  color,
  delay,
  xp = 0,
  grade = 'A'
}: EnhancedCourseCardProps) => {
  const styles = colorStyles[color];
  const [isFlipped, setIsFlipped] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      style={{
        perspective: 1000,
      }}
      className="group"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          y: -15,
          scale: 1.03,
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border-l-4 ${styles.border} shadow-lg hover:shadow-2xl ${styles.shadow} transition-all duration-300 cursor-pointer overflow-hidden`}
      >
        {/* Background Gradient */}
        <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${styles.bgGradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
             style={{
               background: `
                 radial-gradient(circle at 20% 50%, rgba(185,28,28,0.3) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(233,30,99,0.3) 0%, transparent 50%),
                 radial-gradient(circle at 40% 20%, rgba(21,128,61,0.3) 0%, transparent 50%)
               `
             }}
        />

        {/* Content - Front */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          className="relative z-10"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
              className={`p-3 ${styles.bg} rounded-xl shadow-lg group-hover:${styles.neon} transition-shadow duration-300`}
            >
              <BookOpen className="text-white" size={24} />
            </motion.div>

            <div className="flex items-center gap-2">
              {grade && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: delay + 0.2 }}
                  className={`px-3 py-1 ${styles.bg} text-white rounded-full text-sm font-bold shadow-lg`}
                >
                  {grade}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <MoreVertical size={20} className="text-gray-400" />
              </motion.button>
            </div>
          </div>

          {/* Title */}
          <motion.h3
            className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all"
          >
            {title}
          </motion.h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
            {instructor}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Users size={16} />
              <span className="text-sm font-medium">{students}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={16} />
              <span className="text-sm font-medium">{nextClass}</span>
            </div>

            {xp > 0 && (
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold">{xp} XP</span>
              </div>
            )}
          </div>

          {/* Progress Bar with Shimmer */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{progress}%</span>
            </div>

            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ delay: delay + 0.5, duration: 1, ease: 'easeOut' }}
                className={`h-full ${styles.bg} rounded-full relative overflow-hidden`}
              >
                {/* Shimmer */}
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
            className={`w-full flex items-center justify-between px-4 py-3 ${styles.bg} text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:${styles.neon} transition-all`}
          >
            <span>Continue Learning</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight size={20} />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Corner Decoration */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.6, type: 'spring' }}
          className={`absolute top-0 right-0 w-20 h-20 ${styles.bg} opacity-5 dark:opacity-10 rounded-bl-full`}
        />

        {/* Glow effect on hover */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r ${styles.bg} rounded-2xl blur opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 transition-opacity duration-500 -z-10`} />
      </motion.div>
    </motion.div>
  );
};
