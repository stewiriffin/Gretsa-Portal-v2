import { motion } from 'framer-motion';
import { Trophy, Star, Award, Zap, Target, Crown, Medal, Flame } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AdvancedProgressRing } from './AdvancedProgressRing';

interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  progress?: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
}

const badges: Badge[] = [
  { id: '1', name: 'Early Bird', icon: <Star size={24} />, color: 'from-yellow-400 to-orange-500', unlocked: true },
  { id: '2', name: 'Streak Master', icon: <Flame size={24} />, color: 'from-orange-500 to-red-600', unlocked: true, progress: 7 },
  { id: '3', name: 'Perfect Score', icon: <Trophy size={24} />, color: 'from-purple-500 to-pink-600', unlocked: true },
  { id: '4', name: 'Team Player', icon: <Award size={24} />, color: 'from-blue-500 to-cyan-500', unlocked: false },
  { id: '5', name: 'Speed Runner', icon: <Zap size={24} />, color: 'from-green-500 to-emerald-600', unlocked: false },
  { id: '6', name: 'Achievement Hunter', icon: <Target size={24} />, color: 'from-pink-500 to-rose-600', unlocked: false },
];

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Wanjiku', xp: 12850, avatar: '👩' },
  { rank: 2, name: 'James Kamau', xp: 11240, avatar: '👨' },
  { rank: 3, name: 'John Kimani', xp: 10520, avatar: '🧑', isCurrentUser: true },
  { rank: 4, name: 'Mary Njeri', xp: 9880, avatar: '👩' },
  { rank: 5, name: 'Peter Ochieng', xp: 9450, avatar: '👨' },
];

export const GamificationPanel = () => {
  const currentXP = 10520;
  const nextLevelXP = 12000;
  const currentLevel = 15;
  const levelProgress = ((currentXP % 1000) / 1000) * 100;

  return (
    <div className="space-y-6">
      {/* XP & Level Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              Level {currentLevel}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
            </p>
          </div>

          <div className="w-24 h-24">
            <CircularProgressbar
              value={levelProgress}
              text={`${currentLevel}`}
              styles={buildStyles({
                pathColor: '#E91E63',
                textColor: '#E91E63',
                trailColor: '#e5e7eb',
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${levelProgress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-kenya-pink via-kenya-red to-orange-500 rounded-full relative"
          >
            <motion.div
              animate={{ x: ['0%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>

        {/* Recent XP Gains */}
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {[
            { label: '+50 XP', reason: 'Assignment' },
            { label: '+100 XP', reason: 'Quiz' },
            { label: '+25 XP', reason: 'Attendance' },
          ].map((gain, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="px-3 py-1 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-full text-sm font-semibold shadow-lg"
            >
              {gain.label} • {gain.reason}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Advanced Progress Ring - Course Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="glass-card-strong rounded-2xl p-6 shadow-3d-strong glow-pink"
      >
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          Course Module Progress
        </h3>
        <div className="flex justify-center">
          <AdvancedProgressRing
            overallProgress={72}
            modules={[
              { name: 'Algorithms', progress: 100, color: '#B91C1C' },
              { name: 'Data Structures', progress: 85, color: '#E91E63' },
              { name: 'Databases', progress: 70, color: '#15803D' },
              { name: 'Web Dev', progress: 45, color: '#3B82F6' },
            ]}
            size={220}
            strokeWidth={14}
          />
        </div>
      </motion.div>

      {/* Badges Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Badges</h3>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {badges.filter(b => b.unlocked).length} / {badges.length}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="relative"
            >
              <div
                className={`relative p-4 rounded-xl ${
                  badge.unlocked
                    ? `bg-gradient-to-br ${badge.color} shadow-lg`
                    : 'bg-gray-200 dark:bg-gray-800 grayscale'
                } flex flex-col items-center justify-center aspect-square cursor-pointer group`}
              >
                <div className="text-white mb-2">{badge.icon}</div>
                <p className="text-xs text-white text-center font-semibold">
                  {badge.name}
                </p>

                {badge.progress && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900">
                    <span className="text-xs font-bold text-kenya-pink">{badge.progress}d</span>
                  </div>
                )}

                {!badge.unlocked && (
                  <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🔒</span>
                    </div>
                  </div>
                )}

                {/* Glow effect */}
                {badge.unlocked && (
                  <motion.div
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`absolute inset-0 bg-gradient-to-br ${badge.color} rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity -z-10`}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-2 mb-4">
          <Crown className="text-yellow-500" size={24} />
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Leaderboard</h3>
        </div>

        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                entry.isCurrentUser
                  ? 'bg-gradient-to-r from-kenya-pink/20 to-kenya-red/20 border-2 border-kenya-pink dark:border-kenya-red'
                  : 'bg-gray-50 dark:bg-gray-800/50'
              }`}
            >
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                entry.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                entry.rank === 2 ? 'bg-gray-300 text-gray-700' :
                entry.rank === 3 ? 'bg-orange-400 text-orange-900' :
                'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
              </div>

              {/* Avatar */}
              <div className="text-2xl">{entry.avatar}</div>

              {/* Name */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-white">
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="ml-2 text-xs text-kenya-pink dark:text-pink-400">(You)</span>
                  )}
                </p>
              </div>

              {/* XP */}
              <div className="flex items-center gap-2">
                <Zap className="text-yellow-500" size={18} fill="currentColor" />
                <span className="font-bold text-gray-900 dark:text-white">
                  {entry.xp.toLocaleString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Leaderboard */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          View Full Leaderboard
        </motion.button>
      </motion.div>
    </div>
  );
};
