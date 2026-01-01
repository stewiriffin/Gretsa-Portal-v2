import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  BookOpen,
  Calendar,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  GraduationCap,
  Trophy,
  Bell,
  ClipboardCheck,
  BarChart3,
  DollarSign,
  Shield,
  Activity,
  Sparkles,
} from 'lucide-react';
import { useRole } from '../contexts/RoleContext';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, to, isCollapsed, onClick }: NavItemProps) => {
  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => `
          w-full flex items-center gap-4 px-4 py-3 rounded-lg
          transition-all duration-300 relative group
          ${isActive
            ? 'bg-gradient-to-r from-kenya-red to-kenya-pink text-white shadow-lg'
            : 'text-gray-300 hover:bg-white/10'
          }
        `}
      >
        {({ isActive }) => (
          <>
            <div className="flex-shrink-0">
              {icon}
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap font-medium"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 w-1 h-full bg-white rounded-r-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </>
        )}
      </NavLink>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 relative group text-gray-300 hover:bg-white/10"
    >
      <div className="flex-shrink-0">
        {icon}
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap font-medium"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentRole } = useRole();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Implement logout logic here
      alert('Logout functionality would be implemented here');
    }
  };

  const handleSettings = () => {
    alert('Settings panel would open here');
  };

  // Role-specific menu items
  const getMenuItems = () => {
    switch (currentRole) {
      case 'student':
        return [
          { icon: <Home size={24} />, label: 'Dashboard', to: '/student/dashboard' },
          { icon: <BookOpen size={24} />, label: 'Courses', to: '/student/courses' },
          { icon: <Trophy size={24} />, label: 'Grades', to: '/student/grades' },
          { icon: <DollarSign size={24} />, label: 'Financials', to: '/student/financials' },
          { icon: <Calendar size={24} />, label: 'Schedule', to: '/student/schedule' },
          { icon: <Sparkles size={24} />, label: 'AI Tutor', to: '/ai-tutor' },
        ];
      case 'teacher':
        return [
          { icon: <Home size={24} />, label: 'Dashboard', to: '/teacher/dashboard' },
          { icon: <BookOpen size={24} />, label: 'My Classes', to: '/teacher/classes' },
          { icon: <ClipboardCheck size={24} />, label: 'Gradebook', to: '/teacher/gradebook' },
          { icon: <Users size={24} />, label: 'Attendance', to: '/teacher/attendance' },
          { icon: <BarChart3 size={24} />, label: 'Analytics', to: '/teacher/analytics' },
          { icon: <Sparkles size={24} />, label: 'AI Tutor', to: '/ai-tutor' },
        ];
      case 'admin':
        return [
          { icon: <Home size={24} />, label: 'Dashboard', to: '/admin/dashboard' },
          { icon: <Users size={24} />, label: 'User Management', to: '/admin/users' },
          { icon: <DollarSign size={24} />, label: 'Finance', to: '/admin/finance' },
          { icon: <Shield size={24} />, label: 'Audit Logs', to: '/admin/audit' },
          { icon: <Activity size={24} />, label: 'Reports', to: '/admin/reports' },
          { icon: <Settings size={24} />, label: 'System Settings', to: '/admin/settings' },
        ];
    }
  };

  const menuItems = getMenuItems();

  const bottomItems = [
    { icon: <Settings size={24} />, label: 'Settings', action: handleSettings },
    { icon: <LogOut size={24} />, label: 'Logout', action: handleLogout },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{
        x: 0,
        width: isCollapsed ? '80px' : '280px'
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="relative h-screen bg-navy-900 overflow-hidden shadow-2xl hidden md:block"
    >
      {/* Aurora Effect Background */}
      <div className="aurora-effect" />

      {/* Floating Blur Circles - Simplified */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-kenya-red/20 rounded-full blur-3xl animate-float"
           style={{ animationDelay: '0s' }} />
      <div className="absolute bottom-40 right-5 w-32 h-32 bg-kenya-green/20 rounded-full blur-3xl animate-float"
           style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-between mb-8">
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-kenya-red via-kenya-pink to-kenya-green rounded-lg flex items-center justify-center shadow-lg">
              <GraduationCap className="text-white" size={24} />
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <h1 className="text-xl font-bold text-white">GRETSA</h1>
                  <p className="text-xs text-gray-400">University Portal</p>
                </motion.div>
              )}
            </AnimatePresence>
          </NavLink>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft size={20} />
            </motion.div>
          </motion.button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavItem
                icon={item.icon}
                label={item.label}
                to={item.to}
                isCollapsed={isCollapsed}
              />
            </motion.div>
          ))}
        </nav>

        {/* Bottom Items */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          {bottomItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (menuItems.length + index) * 0.05 }}
            >
              <NavItem
                icon={item.icon}
                label={item.label}
                isCollapsed={isCollapsed}
                onClick={item.action}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dot Pattern Overlay */}
      <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
    </motion.aside>
  );
};
