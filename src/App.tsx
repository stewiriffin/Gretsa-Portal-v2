import { motion } from 'framer-motion';
import { Toaster, toast } from 'sonner';
import { Moon, Sun, MessageCircle } from 'lucide-react';
import { useState } from 'react';

// Components
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SpotlightSearch, useSpotlightSearch } from './components/SpotlightSearch';
import { SomaAIAssistant } from './components/SomaAIAssistant';
import { ChatDrawer } from './components/ChatDrawer';
import { MagneticCursor } from './components/MagneticCursor';
import { MilestoneConfetti, useMilestone } from './components/MilestoneConfetti';
import { BlobAnimations } from './components/BlobAnimations';
import { TribalOverlays } from './components/TribalOverlays';

// Role-specific Dashboards
import { StudentDashboard } from './components/student/StudentDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Context
import { useDarkMode } from './contexts/DarkModeContext';
import { useRole } from './contexts/RoleContext';

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { currentRole } = useRole();
  const { isOpen: isSearchOpen, setIsOpen: setSearchOpen } = useSpotlightSearch();
  const { milestone, celebrate, close: closeMilestone } = useMilestone();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Trigger milestone celebration (demo)
  const handleMilestoneDemo = () => {
    celebrate('Level Up', 'You reached Level 16! Keep up the great work!');
    toast.success('🎉 New achievement unlocked!', {
      description: 'You\'ve earned the "Early Bird" badge!',
    });
  };

  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    switch (currentRole) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Magnetic Cursor */}
      <MagneticCursor />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        richColors
        theme={isDarkMode ? 'dark' : 'light'}
      />

      {/* Spotlight Search */}
      <SpotlightSearch isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />

      {/* Milestone Confetti */}
      <MilestoneConfetti
        show={milestone.show}
        onClose={closeMilestone}
        milestone={milestone.title}
        description={milestone.description}
      />

      {/* Main Container */}
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden w-full transition-colors duration-300">
        {/* Blob Animations - Background Layer */}
        <BlobAnimations />

        {/* Tribal Pattern Overlays */}
        <TribalOverlays />

        {/* Mesh Gradient Background */}
        <div className="fixed inset-0 mesh-gradient opacity-30 dark:opacity-40 pointer-events-none z-0" />

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Header */}
          <Header />

          {/* Dark Mode Toggle - Glassmorphism */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="fixed top-24 right-6 z-40 p-4 glass-card-strong rounded-full shadow-3d glow-pink transition-colors"
          >
            {isDarkMode ? (
              <Sun className="text-yellow-500" size={24} />
            ) : (
              <Moon className="text-gray-700 dark:text-gray-300" size={24} />
            )}
          </motion.button>

          {/* Chat Drawer Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed top-44 right-6 z-40 p-4 glass-card-strong rounded-full shadow-3d-strong glow-pink transition-colors"
          >
            <div className="relative">
              <MessageCircle className="text-kenya-pink" size={24} />
              {/* Unread Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-linear-to-r from-kenya-red to-kenya-pink rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                3
              </motion.div>
            </div>
          </motion.button>

          {/* Demo Milestone Button - Only for Student */}
          {currentRole === 'student' && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMilestoneDemo}
              className="fixed bottom-24 right-6 z-40 px-4 py-2 glass-card-strong bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-lg font-semibold shadow-3d glow-pink gradient-border-animated"
            >
              🎉 Demo Milestone
            </motion.button>
          )}

          {/* Content Area - Role-Based Rendering */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-8">
              {renderDashboard()}
            </div>
          </main>
        </div>

        {/* SOMA AI Assistant */}
        <SomaAIAssistant />

        {/* Chat Drawer */}
        <ChatDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}

export default App;
