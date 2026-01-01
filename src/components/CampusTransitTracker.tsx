import { motion } from 'framer-motion';
import { Bus, MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import { useTransitSystem } from '../hooks/useTransitSystem';

export const CampusTransitTracker = () => {
  const {
    buses,
    isLoading,
    formatETA,
    getOccupancyStatus,
    getBusesSortedByETA,
  } = useTransitSystem();

  const sortedBuses = getBusesSortedByETA();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-kenya-red to-red-600 rounded-xl flex items-center justify-center">
          <Bus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Campus Transit Tracker
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Real-time bus locations & ETA
          </p>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-500 rounded-full"
        />
        <span className="text-xs font-medium text-green-700 dark:text-green-400">
          Live Tracking • Updates every 5 seconds
        </span>
      </div>

      {/* Bus List */}
      <div className="space-y-3">
        {sortedBuses.map((bus, index) => {
          const occupancyStatus = getOccupancyStatus(bus);
          const occupancyPercentage = (bus.occupancy / bus.capacity) * 100;

          const statusColors = {
            red: 'from-red-500 to-red-600',
            orange: 'from-orange-500 to-orange-600',
            yellow: 'from-yellow-500 to-yellow-600',
            green: 'from-green-500 to-green-600',
          };

          return (
            <motion.div
              key={bus.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent 0%, rgba(185, 28, 28, 0.2) 100%)',
                    'linear-gradient(90deg, transparent 0%, rgba(185, 28, 28, 0.2) 100%)',
                    'linear-gradient(135deg, transparent 0%, rgba(185, 28, 28, 0.2) 100%)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Route Name & Speed */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-kenya-red rounded-lg flex items-center justify-center">
                      <Bus className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {bus.routeName}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <TrendingUp className="w-3 h-3" />
                        <span>{bus.speed} km/h</span>
                      </div>
                    </div>
                  </div>

                  {/* ETA Badge */}
                  <div className="px-3 py-1.5 bg-kenya-pink text-white rounded-lg text-xs font-semibold">
                    {formatETA(bus.eta)}
                  </div>
                </div>

                {/* Next Stop */}
                <div className="flex items-center gap-2 mb-3 text-sm">
                  <MapPin className="w-4 h-4 text-kenya-green" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Next: <span className="font-semibold">{bus.nextStop}</span>
                  </span>
                </div>

                {/* Occupancy Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>
                        {bus.occupancy} / {bus.capacity} passengers
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        occupancyStatus.color === 'red'
                          ? 'text-red-600 dark:text-red-400'
                          : occupancyStatus.color === 'orange'
                          ? 'text-orange-600 dark:text-orange-400'
                          : occupancyStatus.color === 'yellow'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}
                    >
                      {occupancyStatus.label}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${occupancyPercentage}%` }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${
                        statusColors[occupancyStatus.color as keyof typeof statusColors]
                      }`}
                    />
                  </div>
                </div>

                {/* Location Coordinates (for development/debugging) */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span>Lat: {bus.latitude.toFixed(5)}</span>
                    <span>Lng: {bus.longitude.toFixed(5)}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(bus.lastUpdated).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No Buses Message */}
      {buses.length === 0 && (
        <div className="text-center py-8">
          <Bus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No buses currently in service
          </p>
        </div>
      )}
    </div>
  );
};
