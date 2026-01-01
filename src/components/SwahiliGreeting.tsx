import { motion } from 'framer-motion';
import { useRole } from '../contexts/RoleContext';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';

export const SwahiliGreeting = () => {
  const { userName } = useRole();

  // Get current time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return {
        swahili: 'Habari ya Asubuhi',
        english: 'Good Morning',
        icon: Sunrise,
        gradient: 'from-orange-400 to-yellow-500',
        bg: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20',
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        swahili: 'Habari ya Mchana',
        english: 'Good Afternoon',
        icon: Sun,
        gradient: 'from-yellow-500 to-orange-500',
        bg: 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        swahili: 'Habari ya Jioni',
        english: 'Good Evening',
        icon: Sunset,
        gradient: 'from-purple-500 to-pink-500',
        bg: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
      };
    } else {
      return {
        swahili: 'Habari ya Usiku',
        english: 'Good Night',
        icon: Moon,
        gradient: 'from-indigo-600 to-purple-600',
        bg: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      };
    }
  };

  const greeting = getTimeOfDay();
  const Icon = greeting.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r ${greeting.bg} border border-white/20 backdrop-blur-sm`}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className={`p-2 rounded-lg bg-gradient-to-br ${greeting.gradient}`}
      >
        <Icon size={20} className="text-white" />
      </motion.div>
      <div>
        <p className={`text-sm font-bold bg-gradient-to-r ${greeting.gradient} bg-clip-text text-transparent`}>
          {greeting.swahili}, {userName.split(' ')[0]}!
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {greeting.english}
        </p>
      </div>
    </motion.div>
  );
};
