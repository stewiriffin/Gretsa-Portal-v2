import { motion } from 'framer-motion';
import { BookOpen, Clock, Target, Award } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  trend?: string;
}

const StatCard = ({ title, value, icon, gradient, delay, trend }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
      }}
      className={`relative overflow-hidden rounded-2xl p-6 shadow-xl cursor-pointer group ${gradient}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* Dot Pattern */}
      <div className="dot-pattern absolute inset-0 opacity-20" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="p-3 bg-white/20 backdrop-blur-sm rounded-xl"
          >
            {icon}
          </motion.div>

          {trend && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.3 }}
              className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold"
            >
              {trend}
            </motion.div>
          )}
        </div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.1 }}
          className="text-white/80 text-sm font-medium mb-2"
        >
          {title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="text-4xl font-bold text-white mb-2"
        >
          {value}
        </motion.p>

        {/* Shimmer Effect */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'linear',
            delay: delay,
            repeatDelay: 3,
          }}
          className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />
      </div>

      {/* Bottom Accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-white/30"
      />
    </motion.div>
  );
};

export const StatCards = () => {
  const stats = [
    {
      title: 'Active Courses',
      value: '6',
      icon: <BookOpen size={28} className="text-white" />,
      gradient: 'bg-gradient-to-br from-kenya-red to-kenya-pink',
      trend: '+2 new',
    },
    {
      title: 'Study Hours',
      value: '24.5',
      icon: <Clock size={28} className="text-white" />,
      gradient: 'bg-gradient-to-br from-kenya-green to-emerald-600',
      trend: '↑ 12%',
    },
    {
      title: 'Assignments Due',
      value: '3',
      icon: <Target size={28} className="text-white" />,
      gradient: 'bg-gradient-to-br from-kenya-pink to-pink-600',
      trend: 'This week',
    },
    {
      title: 'Achievements',
      value: '28',
      icon: <Award size={28} className="text-white" />,
      gradient: 'bg-gradient-to-br from-orange-500 to-kenya-red',
      trend: '↑ 3 new',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          {...stat}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};
