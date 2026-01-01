import { motion } from 'framer-motion';
import { EnhancedParticleHero } from '../EnhancedParticleHero';
import { StatCards } from '../StatCards';
import { Ultimate3DCard } from '../Ultimate3DCard';
import { GamificationPanel } from '../GamificationPanel';
import { GradeCalculator } from '../GradeCalculator';
import { ExamTimeline } from '../ExamTimeline';
import { ParallaxContainer } from '../ParallaxContainer';
import { AssignmentKanban } from '../AssignmentKanban';
import { InteractiveSyllabusTimeline } from '../InteractiveSyllabusTimeline';
import { LiveClassIndicators } from '../LiveClassIndicators';
import { EnhancedCharts } from '../EnhancedCharts';
import { StreakTracker } from '../StreakTracker';
import { MPesaPayment } from '../MPesaPayment';
import { ResourceGallery } from '../ResourceGallery';
import { EventsCalendar } from '../EventsCalendar';
import { CampusNewsFeed } from '../CampusNewsFeed';
import { AchievementCards } from '../AchievementCards';

export const StudentDashboard = () => {
  const courses = [
    {
      title: 'Data Structures & Algorithms',
      instructor: 'Dr. Sarah Wanjiku',
      students: 45,
      progress: 75,
      nextClass: 'Mon 10:00 AM',
      color: 'red' as const,
      xp: 250,
      grade: 'A',
    },
    {
      title: 'Web Development',
      instructor: 'Prof. James Ochieng',
      students: 38,
      progress: 62,
      nextClass: 'Tue 2:00 PM',
      color: 'green' as const,
      xp: 180,
      grade: 'B+',
    },
    {
      title: 'Database Management',
      instructor: 'Dr. Mary Njeri',
      students: 52,
      progress: 88,
      nextClass: 'Wed 11:30 AM',
      color: 'pink' as const,
      xp: 320,
      grade: 'A',
    },
    {
      title: 'Mobile App Development',
      instructor: 'Prof. David Kamau',
      students: 41,
      progress: 45,
      nextClass: 'Thu 9:00 AM',
      color: 'red' as const,
      xp: 150,
      grade: 'B',
    },
    {
      title: 'Computer Networks',
      instructor: 'Dr. Grace Akinyi',
      students: 36,
      progress: 70,
      nextClass: 'Fri 1:00 PM',
      color: 'green' as const,
      xp: 200,
      grade: 'A-',
    },
    {
      title: 'Software Engineering',
      instructor: 'Prof. Peter Mwangi',
      students: 48,
      progress: 55,
      nextClass: 'Mon 3:30 PM',
      color: 'pink' as const,
      xp: 175,
      grade: 'B+',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Section */}
      <div id="dashboard">
        {/* Enhanced Particle Hero Banner - Parallax Layer 1 */}
        <ParallaxContainer speed={0.2}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <EnhancedParticleHero />
          </motion.div>
        </ParallaxContainer>

        {/* Stats Cards - Parallax Layer 2 */}
        <ParallaxContainer speed={0.3}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <StatCards />
          </motion.div>
        </ParallaxContainer>
      </div>

      {/* Courses Section */}
      <div id="courses">
        {/* Two Column Layout: Ultimate 3D Courses + Gamification - Parallax Layer 3 */}
        <ParallaxContainer speed={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ultimate 3D Course Cards - 2 columns */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  My Courses
                </h2>
                <div className="glass-card px-4 py-2 rounded-full">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {courses.length} Active
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course, index) => (
                  <Ultimate3DCard
                    key={course.title}
                    {...course}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right Sidebar: Gamification + Achievements + Live Classes + Streaks */}
            <div className="space-y-6">
              {/* Gamification Panel */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <GamificationPanel />
              </motion.div>

              {/* Achievement Cards */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.82 }}
              >
                <AchievementCards />
              </motion.div>

              {/* Streak Tracker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85 }}
              >
                <StreakTracker />
              </motion.div>

              {/* Live Class Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <LiveClassIndicators />
              </motion.div>
            </div>
          </div>
        </ParallaxContainer>
      </div>

      {/* Grades Section */}
      <div id="grades">
        {/* Grade Calculator - Parallax Layer 4 */}
        <ParallaxContainer speed={0.5}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <GradeCalculator />
          </motion.div>
        </ParallaxContainer>
      </div>

      {/* Interactive Syllabus Timeline - Parallax Layer 4.5 */}
      <ParallaxContainer speed={0.55}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <InteractiveSyllabusTimeline />
        </motion.div>
      </ParallaxContainer>

      {/* Schedule Section */}
      <div id="schedule">
        {/* Exam Timeline - Parallax Layer 5 */}
        <ParallaxContainer speed={0.6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <ExamTimeline />
          </motion.div>
        </ParallaxContainer>
      </div>

      {/* Assignments Section */}
      <div id="assignments">
        {/* Assignment Kanban Board - Parallax Layer 5.5 */}
        <ParallaxContainer speed={0.65}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <AssignmentKanban />
          </motion.div>
        </ParallaxContainer>
      </div>

      {/* Events Calendar Section */}
      <div id="events">
        <ParallaxContainer speed={0.68}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35 }}
          >
            <EventsCalendar />
          </motion.div>
        </ParallaxContainer>
      </div>

      {/* Campus News Feed Section */}
      <div id="social">
        <ParallaxContainer speed={0.69}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.38 }}
          >
            <CampusNewsFeed />
          </motion.div>
        </ParallaxContainer>
      </div>

      {/* Notifications Section */}
      <div id="notifications">
        {/* Quick Actions Section with Glassmorphism - Parallax Layer 6 */}
        <ParallaxContainer speed={0.7}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8"
          >
            {/* Upcoming Deadlines - Glass Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-panel rounded-2xl p-6 shadow-3d border-l-4 border-kenya-red dark:border-red-500 glow-red transition-all"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                📅 Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {[
                  { task: 'Database Project', course: 'Database Management', due: '2 days' },
                  { task: 'Algorithm Assignment', course: 'Data Structures', due: '4 days' },
                  { task: 'Mobile App Prototype', course: 'Mobile Dev', due: '1 week' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    className="glass-card rounded-lg p-3 hover:shadow-3d transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{item.task}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.course}</p>
                      </div>
                      <div className="glass-card px-3 py-1 rounded-full">
                        <span className="text-kenya-red dark:text-red-400 font-bold text-sm">
                          {item.due}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity - Glass Card */}
            <motion.div
              id="community"
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-panel rounded-2xl p-6 shadow-3d border-l-4 border-kenya-green dark:border-green-500 glow-green transition-all"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                ⚡ Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Submitted Assignment', course: 'Web Development', time: '2 hours ago' },
                  { action: 'Joined Discussion', course: 'Software Engineering', time: '5 hours ago' },
                  { action: 'Completed Quiz', course: 'Computer Networks', time: '1 day ago' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                    whileHover={{ scale: 1.03, x: 5 }}
                    className="glass-card rounded-lg p-3 hover:shadow-3d transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{item.action}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.course}</p>
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {item.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </ParallaxContainer>
      </div>

      {/* Enhanced Analytics Charts - Parallax Layer 6.5 */}
      <ParallaxContainer speed={0.75}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <EnhancedCharts />
        </motion.div>
      </ParallaxContainer>

      {/* M-Pesa Payment Simulation - Parallax Layer 6.7 */}
      <ParallaxContainer speed={0.77}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55 }}
        >
          <MPesaPayment />
        </motion.div>
      </ParallaxContainer>

      {/* Resource Gallery with Masonry - Parallax Layer 6.8 */}
      <ParallaxContainer speed={0.78}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <ResourceGallery />
        </motion.div>
      </ParallaxContainer>
    </div>
  );
};
