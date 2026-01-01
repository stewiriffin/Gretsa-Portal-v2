import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Award, Target, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  gradient: string;
  earned: boolean;
  progress?: number;
}

const badges: Badge[] = [
  {
    id: '1',
    name: 'Early Bird',
    description: 'Attend 5 classes before 8 AM',
    icon: Clock,
    color: '#FF6B6B',
    gradient: 'from-orange-500 to-red-500',
    earned: true,
    progress: 100,
  },
  {
    id: '2',
    name: 'Top 1%',
    description: 'Maintain GPA above 3.8',
    icon: Trophy,
    color: '#FFD700',
    gradient: 'from-yellow-500 to-orange-500',
    earned: true,
    progress: 100,
  },
  {
    id: '3',
    name: 'Streak Master',
    description: '30-day login streak',
    icon: Zap,
    color: '#15803D',
    gradient: 'from-green-500 to-emerald-600',
    earned: false,
    progress: 73,
  },
  {
    id: '4',
    name: 'Perfect Score',
    description: 'Score 100% on any exam',
    icon: Star,
    color: '#E91E63',
    gradient: 'from-pink-500 to-purple-500',
    earned: false,
    progress: 85,
  },
];

export const AchievementCards = () => {
  const semesterCompletion = 65; // Percentage

  return (
    <div className="space-y-6">
      {/* Semester Completion Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -3 }}
        className="glass-card-strong rounded-2xl p-6 shadow-3d-strong relative overflow-hidden"
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-kenya-pink/10 via-kenya-red/10 to-purple-500/10 animate-pulse" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                Semester Progress
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Spring 2024 • Week 11 of 17
              </p>
            </div>
            <Target className="text-kenya-pink" size={32} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Circular Progress */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-3">
                <CircularProgressbar
                  value={semesterCompletion}
                  text={`${semesterCompletion}%`}
                  styles={buildStyles({
                    textSize: '20px',
                    pathColor: '#E91E63',
                    textColor: '#E91E63',
                    trailColor: 'rgba(233, 30, 99, 0.1)',
                    pathTransitionDuration: 1.5,
                  })}
                />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                Overall Completion
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="glass-card rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={16} className="text-kenya-green" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Courses</span>
                </div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">6/6</p>
              </div>

              <div className="glass-card rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp size={16} className="text-blue-600" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Avg Grade</span>
                </div>
                <p className="text-lg font-bold bg-gradient-to-r from-kenya-green to-emerald-600 bg-clip-text text-transparent">
                  A-
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-3 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${semesterCompletion}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-kenya-pink via-kenya-red to-purple-600 rounded-full shadow-lg"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              {100 - semesterCompletion}% remaining until finals
            </p>
          </div>
        </div>
      </motion.div>

      {/* Achievements & Badges Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Award className="text-yellow-500" size={24} />
            Achievements
          </h3>
          <span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-xs font-bold">
            {badges.filter(b => b.earned).length}/{badges.length}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge, index) => {
            const Icon = badge.icon;

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className={`glass-card rounded-xl p-4 cursor-pointer transition-all ${
                  badge.earned
                    ? 'ring-2 ring-yellow-500/50 shadow-lg'
                    : 'opacity-60 grayscale hover:grayscale-0'
                }`}
              >
                {/* Badge Icon */}
                <div className="relative mb-3">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${badge.gradient} flex items-center justify-center shadow-2xl`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>

                  {/* Earned Checkmark */}
                  {badge.earned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </div>

                {/* Badge Info */}
                <h4 className="text-sm font-bold text-gray-900 dark:text-white text-center mb-1">
                  {badge.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center mb-3">
                  {badge.description}
                </p>

                {/* Progress Bar for Unearned Badges */}
                {!badge.earned && badge.progress && (
                  <div>
                    <div className="h-1.5 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${badge.progress}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                        className={`h-full bg-gradient-to-r ${badge.gradient} rounded-full`}
                      />
                    </div>
                    <p className="text-[10px] text-center text-gray-500 dark:text-gray-400 mt-1">
                      {badge.progress}% complete
                    </p>
                  </div>
                )}

                {badge.earned && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-center font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"
                  >
                    Unlocked! 🎉
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Achievement Points */}
        <div className="mt-6 pt-6 border-t border-white/20 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Total XP Earned</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-kenya-pink to-kenya-red bg-clip-text text-transparent">
              1,425 XP
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
