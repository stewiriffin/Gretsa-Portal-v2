import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Video, Clock, PlayCircle, Users, Calendar } from 'lucide-react';

interface LiveClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  startTime: Date;
  duration: number; // in minutes
  attendees: number;
  status: 'live' | 'upcoming' | 'ended';
  recordingUrl?: string;
}

const mockClasses: LiveClass[] = [
  {
    id: '1',
    title: 'Advanced Sorting Algorithms',
    course: 'Data Structures',
    instructor: 'Dr. Sarah Wanjiku',
    startTime: new Date(Date.now() - 10 * 60 * 1000), // Started 10 mins ago
    duration: 60,
    attendees: 42,
    status: 'live',
  },
  {
    id: '2',
    title: 'React Hooks Deep Dive',
    course: 'Web Development',
    instructor: 'Prof. James Ochieng',
    startTime: new Date(Date.now() + 3 * 60 * 1000), // Starting in 3 mins
    duration: 90,
    attendees: 0,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Database Optimization',
    course: 'Database Management',
    instructor: 'Dr. Mary Njeri',
    startTime: new Date(Date.now() + 45 * 60 * 1000), // Starting in 45 mins
    duration: 75,
    attendees: 0,
    status: 'upcoming',
  },
  {
    id: '4',
    title: 'Introduction to TCP/IP',
    course: 'Computer Networks',
    instructor: 'Dr. Grace Akinyi',
    startTime: new Date(Date.now() - 90 * 60 * 1000), // Ended 30 mins ago (60 min class)
    duration: 60,
    attendees: 38,
    status: 'ended',
    recordingUrl: '#',
  },
];

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          minutes: Math.floor(difference / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};

const LiveClassCard = ({ liveClass }: { liveClass: LiveClass }) => {
  const countdown = useCountdown(liveClass.startTime);
  const showJoinButton = liveClass.status === 'upcoming' && countdown.minutes <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -3 }}
      className={`glass-card-strong rounded-xl p-4 shadow-3d hover:shadow-3d-strong transition-all ${
        liveClass.status === 'live' ? 'ring-2 ring-red-500 glow-red' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Status indicator */}
          <div className="pt-1">
            {liveClass.status === 'live' ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative"
              >
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping" />
              </motion.div>
            ) : liveClass.status === 'upcoming' ? (
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-gray-400" />
            )}
          </div>

          {/* Class info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {liveClass.title}
              </h3>
              {liveClass.status === 'live' && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-semibold flex-shrink-0">
                  LIVE
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{liveClass.course}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{liveClass.instructor}</p>
          </div>
        </div>
      </div>

      {/* Time & Duration */}
      <div className="flex items-center gap-4 mb-3 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>{liveClass.duration} min</span>
        </div>
        {liveClass.status === 'live' && liveClass.attendees > 0 && (
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{liveClass.attendees} watching</span>
          </div>
        )}
        {liveClass.status === 'upcoming' && (
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>
              {liveClass.startTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
      </div>

      {/* Countdown for upcoming classes */}
      {liveClass.status === 'upcoming' && countdown.minutes <= 10 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-3 glass-card rounded-lg p-2"
        >
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            <Clock size={14} className={showJoinButton ? 'text-green-500' : 'text-orange-500'} />
            <span className={showJoinButton ? 'text-green-500' : 'text-orange-500'}>
              Starts in {countdown.minutes}:{countdown.seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        {liveClass.status === 'live' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-semibold text-sm shadow-lg glow-red flex items-center justify-center gap-2"
          >
            <Video size={16} />
            Join Live Class
          </motion.button>
        )}

        {showJoinButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold text-sm shadow-lg glow-green flex items-center justify-center gap-2"
          >
            <Video size={16} />
            Join Now
          </motion.button>
        )}

        {liveClass.status === 'upcoming' && !showJoinButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 glass-card-strong text-gray-900 dark:text-white py-2 rounded-lg font-semibold text-sm border border-white/30"
          >
            Set Reminder
          </motion.button>
        )}

        {liveClass.status === 'ended' && liveClass.recordingUrl && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
          >
            <PlayCircle size={16} />
            Watch Recording
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export const LiveClassIndicators = () => {
  const liveClasses = mockClasses.filter((c) => c.status === 'live');
  const upcomingClasses = mockClasses.filter((c) => c.status === 'upcoming');
  const recentRecordings = mockClasses.filter((c) => c.status === 'ended' && c.recordingUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Video size={24} className="text-kenya-pink" />
          Live Classes
        </h2>
        <div className="flex items-center gap-2">
          {liveClasses.length > 0 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded-full font-semibold"
            >
              {liveClasses.length} Live Now
            </motion.div>
          )}
        </div>
      </div>

      {/* Live Classes */}
      {liveClasses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Happening Now
          </h3>
          <div className="space-y-3">
            {liveClasses.map((liveClass) => (
              <LiveClassCard key={liveClass.id} liveClass={liveClass} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Classes */}
      {upcomingClasses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Clock size={16} />
            Upcoming
          </h3>
          <div className="space-y-3">
            {upcomingClasses.map((liveClass) => (
              <LiveClassCard key={liveClass.id} liveClass={liveClass} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Recordings */}
      {recentRecordings.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <PlayCircle size={16} />
            Recent Recordings
          </h3>
          <div className="space-y-3">
            {recentRecordings.map((liveClass) => (
              <LiveClassCard key={liveClass.id} liveClass={liveClass} />
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {liveClasses.length === 0 && upcomingClasses.length === 0 && recentRecordings.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <Video size={48} className="mx-auto mb-4 opacity-50" />
          <p className="font-medium">No live classes scheduled</p>
          <p className="text-sm mt-2">Check back later for upcoming sessions</p>
        </div>
      )}
    </motion.div>
  );
};
