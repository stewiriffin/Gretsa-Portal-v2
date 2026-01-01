import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';

interface MilestoneConfettiProps {
  show: boolean;
  onClose: () => void;
  milestone: string;
  description: string;
}

export const MilestoneConfetti = ({ show, onClose, milestone, description }: MilestoneConfettiProps) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            colors={['#B91C1C', '#E91E63', '#15803D', '#F59E0B', '#8B5CF6']}
          />

          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="pointer-events-auto"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-kenya-pink max-w-md relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-kenya-pink/10 via-kenya-red/10 to-kenya-green/10" />

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors z-10"
                >
                  <X size={20} className="text-gray-500" />
                </motion.button>

                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Trophy className="text-white" size={48} />
                  </motion.div>

                  {/* Text */}
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-gray-800 dark:text-white mb-3"
                  >
                    🎉 {milestone}!
                  </motion.h2>

                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600 dark:text-gray-400 text-lg mb-6"
                  >
                    {description}
                  </motion.p>

                  {/* XP Reward */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-full font-bold text-lg shadow-lg"
                  >
                    <span>+500 XP</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hook to trigger milestone celebrations
export const useMilestone = () => {
  const [milestone, setMilestone] = useState({
    show: false,
    title: '',
    description: '',
  });

  const celebrate = (title: string, description: string) => {
    setMilestone({ show: true, title, description });
  };

  const close = () => {
    setMilestone(prev => ({ ...prev, show: false }));
  };

  return { milestone, celebrate, close };
};
