import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useState, useEffect } from 'react';

export const OfflineBanner = () => {
  const isOnline = useOnlineStatus();
  const [showBanner, setShowBanner] = useState(!isOnline);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowBanner(true);
      setWasOffline(true);
    } else if (wasOffline) {
      // Show "Back online" message briefly
      setTimeout(() => {
        setShowBanner(false);
      }, 3000);
    }
  }, [isOnline, wasOffline]);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4"
        >
          <div
            className={`glass-card-strong rounded-xl p-4 shadow-3d-strong border-2 ${
              isOnline
                ? 'border-green-500 bg-green-500/20'
                : 'border-orange-500 bg-orange-500/20'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <motion.div
                animate={
                  isOnline
                    ? { scale: [1, 1.2, 1], rotate: 0 }
                    : { rotate: [0, -10, 10, -10, 0] }
                }
                transition={{ repeat: isOnline ? 0 : Infinity, duration: 2 }}
                className={`p-3 rounded-full ${
                  isOnline ? 'bg-green-500/30' : 'bg-orange-500/30'
                }`}
              >
                {isOnline ? (
                  <RefreshCw className="text-green-600 dark:text-green-400" size={20} />
                ) : (
                  <WifiOff className="text-orange-600 dark:text-orange-400" size={20} />
                )}
              </motion.div>

              {/* Message */}
              <div className="flex-1">
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  {isOnline ? '✓ Back Online' : 'Offline Mode'}
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-300">
                  {isOnline
                    ? 'Connection restored successfully'
                    : 'Viewing cached data • Some features unavailable'}
                </p>
              </div>

              {/* Loading Indicator (when offline) */}
              {!isOnline && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="text-orange-600 dark:text-orange-400"
                >
                  <RefreshCw size={16} />
                </motion.div>
              )}
            </div>

            {/* Progress Bar (when offline) */}
            {!isOnline && (
              <div className="mt-3 h-1 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="h-full w-1/3 bg-linear-to-r from-orange-400 to-orange-600 rounded-full"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
