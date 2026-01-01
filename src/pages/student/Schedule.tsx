import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { EventsCalendar } from '../../components/EventsCalendar';
import { ExamTimeline } from '../../components/ExamTimeline';

export const StudentSchedule = () => {
  const todayClasses = [
    { time: '8:00 AM', course: 'Mathematics', room: '201', status: 'completed' },
    { time: '10:00 AM', course: 'Physics', room: '305', status: 'completed' },
    { time: '2:00 PM', course: 'Data Structures', room: '204', status: 'upcoming' },
    { time: '4:00 PM', course: 'Web Development', room: '107', status: 'upcoming' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Schedule
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Classes, events, and exam timetable
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Export Calendar
        </button>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Today's Classes
          </h3>
        </div>
        <div className="space-y-3">
          {todayClasses.map((classItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-lg ${
                classItem.status === 'completed'
                  ? 'bg-gray-50 dark:bg-gray-900 opacity-60'
                  : 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                  {classItem.time.split(' ')[0]}
                  <br />
                  {classItem.time.split(' ')[1]}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {classItem.course}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Room {classItem.room}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                classItem.status === 'completed'
                  ? 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              }`}>
                {classItem.status === 'completed' ? 'Completed' : 'Upcoming'}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Events Calendar */}
      <EventsCalendar />

      {/* Exam Timeline */}
      <ExamTimeline />
    </div>
  );
};
