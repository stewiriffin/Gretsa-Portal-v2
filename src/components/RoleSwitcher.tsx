import { motion, AnimatePresence } from 'framer-motion';
import type { UserRole } from '../contexts/RoleContext';
import { useRole } from '../contexts/RoleContext';
import { GraduationCap, BookOpen, Shield, Check } from 'lucide-react';
import { useState } from 'react';

const roleConfig = {
  student: {
    label: 'Student',
    icon: GraduationCap,
    color: 'from-kenya-pink to-kenya-red',
    description: 'Learner Experience',
  },
  teacher: {
    label: 'Teacher',
    icon: BookOpen,
    color: 'from-kenya-green to-emerald-600',
    description: 'Instructor Hub',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    color: 'from-purple-600 to-pink-600',
    description: 'Control Center',
  },
};

export const RoleSwitcher = () => {
  const { currentRole, setCurrentRole, userName } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentRole(role);
    setIsOpen(false);
  };

  const CurrentIcon = roleConfig[currentRole].icon;

  return (
    <div className="relative">
      {/* Current Role Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`glass-card-strong rounded-xl p-3 shadow-3d transition-all flex items-center gap-3 min-w-[200px]`}
      >
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${roleConfig[currentRole].color} flex items-center justify-center shadow-lg`}>
          <CurrentIcon size={20} className="text-white" />
        </div>
        <div className="text-left flex-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">Viewing as</p>
          <p className="text-sm font-bold text-gray-900 dark:text-white">{roleConfig[currentRole].label}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-600 dark:text-gray-400"
        >
          ▼
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute top-full mt-2 left-0 right-0 glass-card-strong rounded-xl shadow-3d-strong overflow-hidden z-50"
            >
              <div className="p-2">
                <div className="px-3 py-2 border-b border-white/10 mb-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Switch Portal View</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{userName}</p>
                </div>

                {(Object.keys(roleConfig) as UserRole[]).map((role) => {
                  const Icon = roleConfig[role].icon;
                  const isActive = currentRole === role;

                  return (
                    <motion.button
                      key={role}
                      whileHover={{ scale: 1.02, x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRoleSwitch(role)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${roleConfig[role].color} text-white shadow-lg`
                          : 'text-gray-700 dark:text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive
                            ? 'bg-white/20 backdrop-blur-sm'
                            : `bg-gradient-to-br ${roleConfig[role].color}`
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-white' : 'text-white'} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-bold">{roleConfig[role].label}</p>
                        <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                          {roleConfig[role].description}
                        </p>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Check size={18} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="px-3 py-2 bg-white/5 border-t border-white/10">
                <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                  🔒 Demo Mode - Switch between roles to preview different portals
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
