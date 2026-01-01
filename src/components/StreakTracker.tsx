import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Calendar, Target, Award, TrendingUp, Zap } from 'lucide-react';

interface DayStatus {
  date: string;
  completed: boolean;
  value?: number;
}

interface Streak {
  id: string;
  name: string;
  icon: any;
  color: string;
  currentStreak: number;
  longestStreak: number;
  goal: number;
  description: string;
  weekData: DayStatus[];
}

const today = new Date();
const getLast7Days = (): DayStatus[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: i < 5 || i === 6, // Miss one day (yesterday)
    };
  });
};

const streaks: Streak[] = [
  {
    id: '1',
    name: 'Daily Login',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    currentStreak: 7,
    longestStreak: 21,
    goal: 30,
    description: 'Log in every day',
    weekData: getLast7Days(),
  },
  {
    id: '2',
    name: 'Study Session',
    icon: Target,
    color: 'from-purple-500 to-pink-500',
    currentStreak: 5,
    longestStreak: 12,
    goal: 14,
    description: 'Study for at least 1 hour',
    weekData: getLast7Days().map((d, i) => ({ ...d, completed: i < 5 })),
  },
  {
    id: '3',
    name: 'Assignment Submission',
    icon: Award,
    color: 'from-green-500 to-emerald-500',
    currentStreak: 3,
    longestStreak: 8,
    goal: 10,
    description: 'Submit assignments on time',
    weekData: getLast7Days().map((d, i) => ({ ...d, completed: i >= 4 })),
  },
  {
    id: '4',
    name: 'Class Attendance',
    icon: Calendar,
    color: 'from-blue-500 to-cyan-500',
    currentStreak: 12,
    longestStreak: 18,
    goal: 20,
    description: 'Attend all classes',
    weekData: getLast7Days(),
  },
];

export const StreakTracker = () => {
  const [selectedStreak, setSelectedStreak] = useState<Streak | null>(null);

  const getStreakMessage = (current: number) => {
    if (current >= 30) return '🔥 On fire! Legendary streak!';
    if (current >= 14) return '⚡ Amazing! Keep it up!';
    if (current >= 7) return '🌟 Great job! One week strong!';
    if (current >= 3) return '💪 Building momentum!';
    return '🚀 Start your journey!';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Flame className="text-orange-500" size={24} />
          Streak Tracker
        </h2>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full font-semibold"
          >
            🔥 {Math.max(...streaks.map((s) => s.currentStreak))} Day Max
          </motion.div>
        </div>
      </div>

      {/* Streak Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {streaks.map((streak, index) => {
          const Icon = streak.icon;
          const progress = (streak.currentStreak / streak.goal) * 100;

          return (
            <motion.div
              key={streak.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              onClick={() => setSelectedStreak(streak)}
              className="glass-card rounded-xl p-4 cursor-pointer hover:shadow-3d transition-all relative overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${streak.color} opacity-10`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${streak.color}`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                        {streak.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {streak.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Current Streak Display */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-center">
                    <motion.p
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                      className={`text-3xl font-bold bg-gradient-to-r ${streak.color} bg-clip-text text-transparent`}
                    >
                      {streak.currentStreak}
                    </motion.p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Current</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      {streak.longestStreak}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Best</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      {streak.goal}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Goal</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-2 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                      className={`h-full bg-gradient-to-r ${streak.color} rounded-full relative overflow-hidden`}
                    >
                      <motion.div
                        animate={{ x: ['0%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {Math.round(progress)}% to goal
                  </p>
                </div>

                {/* Week View */}
                <div className="flex justify-between gap-1">
                  {streak.weekData.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex flex-col items-center"
                    >
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold transition-all ${
                          day.completed
                            ? `bg-gradient-to-br ${streak.color} text-white shadow-lg`
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                        }`}
                      >
                        {day.completed ? '✓' : ''}
                      </div>
                      <span className="text-[9px] text-gray-500 dark:text-gray-400 mt-1">
                        {day.date.substring(0, 1)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Stats */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={18} className="text-kenya-pink" />
          <h3 className="text-sm font-bold text-gray-800 dark:text-white">Overall Progress</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-kenya-pink">
              {streaks.reduce((sum, s) => sum + s.currentStreak, 0)}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Total Days</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-kenya-green">
              {streaks.filter((s) => s.currentStreak >= 7).length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Week+ Streaks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-kenya-red">
              {Math.max(...streaks.map((s) => s.longestStreak))}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Longest Ever</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-500">
              {Math.round(
                (streaks.reduce((sum, s) => sum + s.currentStreak, 0) /
                  streaks.reduce((sum, s) => sum + s.goal, 0)) *
                  100
              )}
              %
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Avg Progress</p>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getStreakMessage(Math.max(...streaks.map((s) => s.currentStreak)))}
        </p>
      </motion.div>

      {/* Rewards Preview */}
      <div className="mt-4 glass-card rounded-xl p-4">
        <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-3">
          🏆 Upcoming Rewards
        </h3>
        <div className="space-y-2">
          {[
            { milestone: 10, reward: 'Bronze Streak Badge', days: 3 },
            { milestone: 20, reward: 'Silver Streak Badge', days: 13 },
            { milestone: 30, reward: 'Gold Streak Badge', days: 23 },
          ].map((reward, i) => (
            <div
              key={i}
              className="flex items-center justify-between text-xs text-gray-700 dark:text-gray-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-[10px]">
                  {reward.milestone}
                </div>
                <span>{reward.reward}</span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">{reward.days} days to go</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
