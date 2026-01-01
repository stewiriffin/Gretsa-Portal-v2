import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BookOpen, Users, Calendar, Star, Trophy, TrendingUp, FileText, MessageSquare, CheckCircle2, Clock, Download, Video, FileCode } from 'lucide-react';

interface Ultimate3DCardProps {
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
    glow: 'glow-red',
    gradient: 'from-kenya-red/20 via-kenya-pink/10 to-transparent',
  },
  green: {
    border: 'border-kenya-green dark:border-green-500',
    bg: 'bg-kenya-green dark:bg-green-500',
    glow: 'glow-green',
    gradient: 'from-kenya-green/20 via-emerald-500/10 to-transparent',
  },
  pink: {
    border: 'border-kenya-pink dark:border-pink-500',
    bg: 'bg-kenya-pink dark:bg-pink-500',
    glow: 'glow-pink',
    gradient: 'from-kenya-pink/20 via-rose-500/10 to-transparent',
  },
};

export const Ultimate3DCard = ({
  title,
  instructor,
  students,
  progress,
  nextClass,
  color,
  delay,
  xp = 0,
  grade = 'A'
}: Ultimate3DCardProps) => {
  const styles = colorStyles[color];
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-15deg', '15deg']);

  // Magnetic hover effect
  const magneticX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const magneticY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
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
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
      style={{
        perspective: 1000,
        x: magneticX,
        y: magneticY,
      }}
      className="group relative"
    >
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 180 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          y: -20,
          scale: 1.05,
          transition: { type: 'spring', stiffness: 400, damping: 15 }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative transform-3d cursor-pointer"
      >
        {/* Front Side */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className={`glass-card-strong rounded-2xl p-6 shadow-3d-strong ${styles.glow} relative overflow-hidden backface-hidden`}
        >
          {/* Mesh Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

          {/* Tribal Pattern Overlay */}
          <div className="absolute inset-0 tribal-basket opacity-10" />

          {/* Animated Gradient Border */}
          <div className="absolute inset-0 gradient-border-animated rounded-2xl" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.3 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 300, damping: 25 }}
                className={`p-3 ${styles.bg} rounded-xl shadow-3d ${styles.glow} backdrop-blur-sm`}
              >
                <BookOpen className="text-white" size={24} />
              </motion.div>

              <div className="flex items-center gap-2">
                {grade && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.2, type: 'spring' }}
                    className={`px-3 py-1 ${styles.bg} text-white rounded-full text-sm font-bold shadow-lg ${styles.glow}`}
                  >
                    {grade}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Title with Glassmorphism */}
            <div className="glass-card rounded-xl p-4 mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{instructor}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="glass-card px-3 py-2 rounded-lg flex items-center gap-2">
                <Users size={16} className="text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{students}</span>
              </div>

              <div className="glass-card px-3 py-2 rounded-lg flex items-center gap-2">
                <Calendar size={16} className="text-gray-600 dark:text-gray-300" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{nextClass}</span>
              </div>

              {xp > 0 && (
                <div className="glass-card px-3 py-2 rounded-lg flex items-center gap-2">
                  <Star size={16} fill="currentColor" className="text-yellow-500" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{xp} XP</span>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="glass-card rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{progress}%</span>
              </div>

              <div className="h-3 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ delay: delay + 0.5, duration: 1, ease: 'easeOut' }}
                  className={`h-full ${styles.bg} rounded-full relative overflow-hidden ${styles.glow}`}
                >
                  {/* Shimmer */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: 'linear',
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                </motion.div>
              </div>
            </div>

            {/* Click to flip hint */}
            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to flip
            </p>
          </div>
        </motion.div>

        {/* Back Side - Ultra Premium Detailed View */}
        <motion.div
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
          className={`glass-card-strong rounded-2xl p-6 shadow-3d-strong ${styles.glow} absolute inset-0 backface-hidden overflow-y-auto`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* Mesh Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient}`} />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            {/* Header with Classmate Avatars */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Course Details</h3>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: isFlipped ? i * 0.05 : 0 }}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-kenya-pink to-kenya-red border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: isFlipped ? 0.2 : 0 }}
                  className="w-8 h-8 rounded-full glass-card border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300"
                >
                  +{students - 4}
                </motion.div>
              </div>
            </div>

            {/* Upcoming Assignments Tracker */}
            <div className="glass-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={16} className="text-gray-600 dark:text-gray-300" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">Upcoming Assignments</p>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Chapter 5 Quiz', due: '3 days', status: 'pending' },
                  { name: 'Group Project', due: '1 week', status: 'in-progress' },
                  { name: 'Final Paper', due: '2 weeks', status: 'pending' },
                ].map((assignment, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isFlipped ? 0.3 + i * 0.1 : 0 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${assignment.status === 'in-progress' ? 'bg-kenya-green' : 'bg-gray-400'} ${assignment.status === 'in-progress' ? 'animate-pulse' : ''}`} />
                      <span className="text-gray-700 dark:text-gray-300">{assignment.name}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {assignment.due}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Course Materials Preview */}
            <div className="glass-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={16} className="text-gray-600 dark:text-gray-300" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">Recent Materials</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { type: 'pdf', name: 'Lecture 7.pdf', icon: FileText },
                  { type: 'video', name: 'Tutorial.mp4', icon: Video },
                  { type: 'code', name: 'Lab Code', icon: FileCode },
                ].map((material, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: isFlipped ? 0.5 + i * 0.1 : 0, type: 'spring' }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="glass-card-strong rounded-lg p-2 flex flex-col items-center gap-1 cursor-pointer hover:shadow-3d transition-all"
                  >
                    <material.icon size={20} className={`${styles.glow}`} />
                    <span className="text-[10px] text-gray-700 dark:text-gray-300 text-center leading-tight">{material.name}</span>
                    <Download size={10} className="text-gray-500 dark:text-gray-400" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Syllabus Timeline (Mini) */}
            <div className="glass-card rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-gray-600 dark:text-gray-300" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">Syllabus Progress</p>
              </div>
              <div className="space-y-2">
                {[
                  { week: 'Week 7', topic: 'Advanced Algorithms', complete: true },
                  { week: 'Week 8', topic: 'Data Structures', complete: true },
                  { week: 'Week 9', topic: 'Graph Theory', complete: false },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: isFlipped ? 0.7 + i * 0.1 : 0 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <div className={`w-3 h-3 rounded-full ${item.complete ? styles.bg : 'bg-gray-300 dark:bg-gray-600'} flex items-center justify-center`}>
                      {item.complete && <CheckCircle2 size={10} className="text-white" />}
                    </div>
                    <span className={`font-medium ${item.complete ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.week}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 flex-1 truncate">{item.topic}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Discussion Forum Preview */}
            <div className="glass-card rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-gray-600 dark:text-gray-300" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Discussions</p>
                </div>
                <span className="text-xs bg-kenya-red text-white px-2 py-0.5 rounded-full">3 new</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { text: 'Help with assignment?', replies: 12 },
                  { text: 'Study group tonight', replies: 8 },
                ].map((discussion, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: isFlipped ? 0.9 + i * 0.1 : 0 }}
                    className="text-xs text-gray-700 dark:text-gray-300 flex items-center justify-between"
                  >
                    <span className="truncate">{discussion.text}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">{discussion.replies}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`${styles.bg} text-white py-2 rounded-lg font-semibold text-sm shadow-lg ${styles.glow}`}
              >
                Enter Course
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="glass-card-strong text-gray-900 dark:text-white py-2 rounded-lg font-semibold text-sm border border-white/30"
              >
                View All
              </motion.button>
            </div>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
              Click to flip back
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating glow orb */}
      <div className={`absolute -inset-4 bg-gradient-to-r ${styles.bg} rounded-2xl blur-2xl opacity-0 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-500 -z-10`} />
    </motion.div>
  );
};
