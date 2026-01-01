import { motion } from 'framer-motion';
import { Home, BookOpen, Calendar, MessageCircle, User, Award, Bell, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRole } from '../contexts/RoleContext';
import { useNotifications } from '../contexts/NotificationContext';

interface TabItem {
  id: string;
  icon: typeof Home;
  label: string;
  sectionId: string;
  badge?: number;
}

export const MobileBottomTabBar = () => {
  const { currentRole } = useRole();
  const { unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  // Detect keyboard open on mobile
  useEffect(() => {
    const checkKeyboard = () => {
      // On mobile, when keyboard opens, window.visualViewport.height changes
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        setIsKeyboardOpen(viewportHeight < windowHeight * 0.75);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', checkKeyboard);
      return () => window.visualViewport.removeEventListener('resize', checkKeyboard);
    }
  }, []);

  // Role-specific tabs
  const getTabItems = (): TabItem[] => {
    switch (currentRole) {
      case 'student':
        return [
          { id: 'dashboard', icon: Home, label: 'Home', sectionId: 'dashboard' },
          { id: 'courses', icon: BookOpen, label: 'Courses', sectionId: 'courses' },
          { id: 'events', icon: Calendar, label: 'Events', sectionId: 'events' },
          { id: 'social', icon: MessageCircle, label: 'Social', sectionId: 'social', badge: 3 },
          { id: 'profile', icon: User, label: 'Profile', sectionId: 'notifications' },
        ];
      case 'teacher':
        return [
          { id: 'dashboard', icon: Home, label: 'Home', sectionId: 'dashboard' },
          { id: 'classes', icon: BookOpen, label: 'Classes', sectionId: 'classes' },
          { id: 'grades', icon: Award, label: 'Grades', sectionId: 'gradebook' },
          { id: 'notifications', icon: Bell, label: 'Alerts', sectionId: 'notifications', badge: unreadCount },
          { id: 'profile', icon: User, label: 'Profile', sectionId: 'profile' },
        ];
      case 'admin':
        return [
          { id: 'dashboard', icon: Home, label: 'Home', sectionId: 'dashboard' },
          { id: 'users', icon: User, label: 'Users', sectionId: 'users' },
          { id: 'search', icon: Search, label: 'Search', sectionId: 'search' },
          { id: 'notifications', icon: Bell, label: 'Alerts', sectionId: 'notifications', badge: unreadCount },
          { id: 'settings', icon: Award, label: 'Settings', sectionId: 'settings' },
        ];
      default:
        return [];
    }
  };

  const tabItems = getTabItems();

  const handleTabClick = (tabId: string, sectionId: string) => {
    setActiveTab(tabId);

    // Scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Hide on desktop (>= 768px) and when keyboard is open
  if (isKeyboardOpen) {
    return null;
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      {/* Glassmorphic Tab Bar - iOS Style */}
      <div className="relative">
        {/* Blur Background */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-t border-white/20 dark:border-gray-800" />

        {/* Tab Items */}
        <div className="relative grid grid-cols-5 gap-1 px-4 pb-safe pt-2">
          {tabItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleTabClick(item.id, item.sectionId)}
                className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all"
              >
                {/* Active Indicator Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 bg-linear-to-r from-kenya-pink/20 to-kenya-red/20 rounded-xl"
                  />
                )}

                {/* Icon Container */}
                <div className="relative">
                  <motion.div
                    animate={isActive ? { y: -2 } : { y: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Icon
                      size={24}
                      className={`transition-colors ${
                        isActive
                          ? 'text-kenya-pink dark:text-kenya-red'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>

                  {/* Badge */}
                  {item.badge && item.badge > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-linear-to-r from-kenya-red to-kenya-pink rounded-full flex items-center justify-center"
                    >
                      <span className="text-[10px] font-bold text-white">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <motion.span
                  animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.95 }}
                  className={`text-[10px] font-semibold mt-1 transition-colors ${
                    isActive
                      ? 'text-kenya-pink dark:text-kenya-red'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </motion.span>

                {/* Ripple Effect on Tap */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-kenya-pink rounded-xl"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Safe Area Bottom Padding for iOS */}
        <div className="h-safe bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl" />
      </div>
    </motion.div>
  );
};
