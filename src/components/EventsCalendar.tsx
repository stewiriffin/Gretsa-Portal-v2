import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Plus, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: 'academic' | 'sports' | 'cultural' | 'social' | 'workshop';
  attendees: number;
  maxAttendees?: number;
  isRSVP: boolean;
  organizer: string;
}

const eventCategories = {
  academic: { color: 'from-blue-500 to-cyan-500', emoji: '📚', label: 'Academic' },
  sports: { color: 'from-kenya-green to-emerald-600', emoji: '⚽', label: 'Sports' },
  cultural: { color: 'from-purple-500 to-pink-500', emoji: '🎭', label: 'Cultural' },
  social: { color: 'from-kenya-pink to-kenya-red', emoji: '🎉', label: 'Social' },
  workshop: { color: 'from-orange-500 to-red-500', emoji: '🔧', label: 'Workshop' },
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Career Fair 2024',
    description: '50+ companies recruiting! Meet industry leaders, attend workshops, and secure internships.',
    date: new Date(2024, 11, 15, 9, 0),
    time: '9:00 AM - 5:00 PM',
    location: 'Main Auditorium',
    category: 'academic',
    attendees: 245,
    maxAttendees: 500,
    isRSVP: false,
    organizer: 'Career Center',
  },
  {
    id: '2',
    title: 'Basketball Finals',
    description: 'GRETSA vs. Kenyatta University. Championship game!',
    date: new Date(2024, 11, 16, 16, 0),
    time: '4:00 PM - 6:00 PM',
    location: 'Sports Complex',
    category: 'sports',
    attendees: 189,
    isRSVP: true,
    organizer: 'Sports Club',
  },
  {
    id: '3',
    title: 'Cultural Week Opening Ceremony',
    description: 'Experience Kenya\'s diverse cultures through music, food, and traditional performances!',
    date: new Date(2024, 11, 18, 18, 0),
    time: '6:00 PM - 9:00 PM',
    location: 'Student Center Plaza',
    category: 'cultural',
    attendees: 312,
    isRSVP: true,
    organizer: 'Student Council',
  },
  {
    id: '4',
    title: 'React Masterclass Workshop',
    description: 'Learn advanced React patterns with industry experts. Bring your laptop!',
    date: new Date(2024, 11, 20, 14, 0),
    time: '2:00 PM - 5:00 PM',
    location: 'Computer Lab 3',
    category: 'workshop',
    attendees: 28,
    maxAttendees: 30,
    isRSVP: false,
    organizer: 'Coding Club',
  },
  {
    id: '5',
    title: 'End of Semester Party',
    description: 'Celebrate the end of the semester with food, music, and fun activities!',
    date: new Date(2024, 11, 22, 19, 0),
    time: '7:00 PM - 11:00 PM',
    location: 'Student Lounge',
    category: 'social',
    attendees: 156,
    isRSVP: false,
    organizer: 'Student Council',
  },
  {
    id: '6',
    title: 'AI & Machine Learning Seminar',
    description: 'Guest lecture from Google AI researcher on the future of ML.',
    date: new Date(2024, 11, 19, 10, 0),
    time: '10:00 AM - 12:00 PM',
    location: 'Lecture Hall A',
    category: 'academic',
    attendees: 98,
    maxAttendees: 150,
    isRSVP: false,
    organizer: 'CS Department',
  },
];

export const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const toggleRSVP = (eventId: string) => {
    setEvents(prev =>
      prev.map(event => {
        if (event.id === eventId) {
          const newRSVP = !event.isRSVP;
          const newAttendees = newRSVP ? event.attendees + 1 : event.attendees - 1;

          toast.success(newRSVP ? '✅ RSVP Confirmed!' : '❌ RSVP Cancelled', {
            description: newRSVP
              ? `You're registered for ${event.title}`
              : `You've cancelled your registration for ${event.title}`,
          });

          return { ...event, isRSVP: newRSVP, attendees: newAttendees };
        }
        return event;
      })
    );
  };

  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  const upcomingEvents = filteredEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5);

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const calendarDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array(daysInMonth)
      .fill(0)
      .map((_, i) => i + 1),
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Calendar className="text-kenya-pink" size={24} />
          Events Calendar
        </h2>

        {/* Category Filters */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white shadow-lg'
                : 'glass-card hover:shadow-md'
            }`}
          >
            All
          </motion.button>
          {Object.entries(eventCategories).map(([key, config]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === key
                  ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                  : 'glass-card hover:shadow-md'
              }`}
            >
              {config.emoji}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={previousMonth}
                className="p-2 glass-card rounded-lg hover:bg-white/10"
              >
                <ChevronLeft size={20} className="text-gray-700 dark:text-gray-300" />
              </motion.button>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextMonth}
                className="p-2 glass-card rounded-lg hover:bg-white/10"
              >
                <ChevronRight size={20} className="text-gray-700 dark:text-gray-300" />
              </motion.button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                const dateEvents = getEventsForDate(date);
                const isToday = isSameDay(date, new Date());
                const isSelected = selectedDate && isSameDay(date, selectedDate);

                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square p-2 rounded-lg text-sm font-semibold transition-all relative ${
                      isToday
                        ? 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white shadow-lg'
                        : isSelected
                        ? 'glass-card-strong ring-2 ring-kenya-pink'
                        : 'glass-card hover:shadow-md'
                    } ${dateEvents.length > 0 ? 'ring-2 ring-blue-400/30' : ''}`}
                  >
                    <span className={isToday ? 'text-white' : 'text-gray-900 dark:text-white'}>{day}</span>

                    {/* Event Indicator Dots */}
                    {dateEvents.length > 0 && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                        {dateEvents.slice(0, 3).map((event, i) => {
                          const config = eventCategories[event.category];
                          return (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full bg-gradient-to-r ${config.color}`}
                            />
                          );
                        })}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {selectedDate
              ? `Events on ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
              : 'Upcoming Events'}
          </h3>

          {(selectedDate ? getEventsForDate(selectedDate) : upcomingEvents).map((event, index) => {
            const config = eventCategories[event.category];

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventModal(true);
                }}
                className="glass-card rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all"
              >
                {/* Event Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r ${config.color}`}>
                        {config.emoji} {config.label}
                      </span>
                      {event.isRSVP && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500 text-white">
                          ✓ Registered
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{event.title}</h4>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Clock size={12} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <Users size={12} />
                    <span>
                      {event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} attending
                    </span>
                  </div>
                </div>

                {/* Quick RSVP */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRSVP(event.id);
                  }}
                  className={`w-full mt-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    event.isRSVP
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      : 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white shadow-md'
                  }`}
                >
                  {event.isRSVP ? (
                    <span className="flex items-center justify-center gap-1">
                      <X size={14} /> Cancel RSVP
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <Plus size={14} /> RSVP
                    </span>
                  )}
                </motion.button>
              </motion.div>
            );
          })}

          {selectedDate && getEventsForDate(selectedDate).length === 0 && (
            <div className="glass-card rounded-xl p-6 text-center">
              <Calendar className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-sm text-gray-600 dark:text-gray-400">No events on this day</p>
            </div>
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {showEventModal && selectedEvent && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEventModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md glass-card-strong rounded-2xl p-6 shadow-3d-strong z-50"
            >
              {(() => {
                const config = eventCategories[selectedEvent.category];
                return (
                  <>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${config.color} inline-block mb-2`}>
                          {config.emoji} {config.label}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedEvent.title}</h3>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowEventModal(false)}
                        className="p-2 glass-card rounded-lg hover:bg-kenya-red/20"
                      >
                        <X size={20} className="text-gray-700 dark:text-gray-300" />
                      </motion.button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{selectedEvent.description}</p>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 glass-card rounded-lg p-3">
                        <Calendar className="text-kenya-pink" size={20} />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {selectedEvent.date.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 glass-card rounded-lg p-3">
                        <Clock className="text-kenya-pink" size={20} />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Time</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedEvent.time}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 glass-card rounded-lg p-3">
                        <MapPin className="text-kenya-pink" size={20} />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedEvent.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 glass-card rounded-lg p-3">
                        <Users className="text-kenya-pink" size={20} />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Attendance</p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {selectedEvent.attendees} {selectedEvent.maxAttendees ? `/ ${selectedEvent.maxAttendees}` : ''} people
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* RSVP Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        toggleRSVP(selectedEvent.id);
                        setShowEventModal(false);
                      }}
                      className={`w-full px-4 py-3 rounded-xl font-semibold transition-all ${
                        selectedEvent.isRSVP
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          : 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white shadow-lg'
                      }`}
                    >
                      {selectedEvent.isRSVP ? (
                        <span className="flex items-center justify-center gap-2">
                          <X size={18} /> Cancel Registration
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Check size={18} /> Register for Event
                        </span>
                      )}
                    </motion.button>
                  </>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
