import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';

interface Exam {
  id: string;
  course: string;
  date: Date;
  duration: string;
  location: string;
  status: 'upcoming' | 'today' | 'completed';
  color: 'red' | 'green' | 'pink';
}

const exams: Exam[] = [
  {
    id: '1',
    course: 'Data Structures & Algorithms',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    duration: '2 hours',
    location: 'Room 201',
    status: 'upcoming',
    color: 'red',
  },
  {
    id: '2',
    course: 'Database Management',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    duration: '3 hours',
    location: 'Hall A',
    status: 'upcoming',
    color: 'green',
  },
  {
    id: '3',
    course: 'Web Development',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    duration: '2.5 hours',
    location: 'Lab 3',
    status: 'upcoming',
    color: 'pink',
  },
];

const colorStyles = {
  red: {
    bg: 'bg-kenya-red',
    border: 'border-kenya-red',
    text: 'text-kenya-red',
    gradient: 'from-kenya-red/20 to-transparent',
  },
  green: {
    bg: 'bg-kenya-green',
    border: 'border-kenya-green',
    text: 'text-kenya-green',
    gradient: 'from-kenya-green/20 to-transparent',
  },
  pink: {
    bg: 'bg-kenya-pink',
    border: 'border-kenya-pink',
    text: 'text-kenya-pink',
    gradient: 'from-kenya-pink/20 to-transparent',
  },
};

const useCountdown = (targetDate: Date) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};

const ExamCard = ({ exam, index }: { exam: Exam; index: number }) => {
  const countdown = useCountdown(exam.date);
  const styles = colorStyles[exam.color];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.02, x: 10 }}
      className="relative"
    >
      {/* Timeline Line */}
      {index !== exams.length - 1 && (
        <div className={`absolute left-6 top-20 w-0.5 h-full ${styles.bg} opacity-30`} />
      )}

      <div className="flex gap-4">
        {/* Timeline Dot */}
        <div className="relative flex-shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
            className={`w-12 h-12 ${styles.bg} rounded-full flex items-center justify-center shadow-lg z-10 relative`}
          >
            <Calendar className="text-white" size={24} />
          </motion.div>

          {/* Pulse Effect */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
            className={`absolute inset-0 ${styles.bg} rounded-full`}
          />
        </div>

        {/* Card */}
        <motion.div
          className={`flex-1 bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border-l-4 ${styles.border} mb-6 overflow-hidden`}
        >
          {/* Background Gradient */}
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${styles.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  {exam.course}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {exam.date.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className={`px-3 py-1 ${styles.bg} text-white rounded-full text-sm font-semibold`}>
                {exam.status}
              </div>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Mins', value: countdown.minutes },
                { label: 'Secs', value: countdown.seconds },
              ].map((unit, idx) => (
                <motion.div
                  key={unit.label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + idx * 0.05 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ scale: unit.value !== countdown.seconds ? 1 : [1, 1.1, 1] }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3"
                  >
                    <p className={`text-2xl font-bold ${styles.text}`}>
                      {unit.value.toString().padStart(2, '0')}
                    </p>
                  </motion.div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {unit.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Details */}
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{exam.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>{exam.location}</span>
              </div>
            </div>

            {/* Urgency Indicator */}
            {countdown.days <= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 px-3 py-2 bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700 rounded-lg"
              >
                <AlertCircle className="text-orange-600 dark:text-orange-400" size={18} />
                <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                  Exam coming up soon! Start preparing.
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ExamTimeline = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            Exam Timeline
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Live countdown to your upcoming exams
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="px-4 py-2 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-lg font-semibold shadow-lg"
        >
          {exams.length} Exams
        </motion.div>
      </div>

      <div className="space-y-0">
        {exams.map((exam, index) => (
          <ExamCard key={exam.id} exam={exam} index={index} />
        ))}
      </div>
    </motion.div>
  );
};
