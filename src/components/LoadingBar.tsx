import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingBar = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (navigation.state === 'loading') {
      // Start loading animation
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // Cap at 90% until actually loaded
          return prev + Math.random() * 10;
        });
      }, 200);

      return () => clearInterval(interval);
    } else if (navigation.state === 'idle') {
      // Complete the loading bar
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [navigation.state]);

  return (
    <AnimatePresence>
      {progress > 0 && progress < 100 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500"
          style={{ width: `${progress}%` }}
        />
      )}
    </AnimatePresence>
  );
};
