import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { GraduationCap, Calendar, User, Clock, CheckCircle2, AlertCircle, PlayCircle } from 'lucide-react';
import { useUniversityStore } from '../store/useUniversityStore';

type DefenseStatus = 'proposal' | 'review' | 'scheduled' | 'completed';

const statusConfig: Record<
  DefenseStatus,
  { label: string; color: string; icon: any; bgColor: string }
> = {
  proposal: {
    label: 'Proposal Submitted',
    color: 'text-blue-600 dark:text-blue-400',
    icon: PlayCircle,
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  review: {
    label: 'Under Review',
    color: 'text-orange-600 dark:text-orange-400',
    icon: AlertCircle,
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
  },
  scheduled: {
    label: 'Defense Scheduled',
    color: 'text-purple-600 dark:text-purple-400',
    icon: Calendar,
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  completed: {
    label: 'Completed',
    color: 'text-green-600 dark:text-green-400',
    icon: CheckCircle2,
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
};

export const ThesisDefenseKanban = () => {
  const { thesisDefenses, updateThesisStatus } = useUniversityStore();
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const getDefensesByStatus = (status: DefenseStatus) => {
    return thesisDefenses.filter((defense) => defense.status === status);
  };

  const handleDragStart = (defenseId: string) => {
    setDraggedItem(defenseId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: DefenseStatus) => {
    e.preventDefault();
    if (draggedItem) {
      updateThesisStatus(draggedItem, newStatus);
      setDraggedItem(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-KE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDaysUntil = (dateString: string | null) => {
    if (!dateString) return null;
    const days = Math.ceil(
      (new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-kenya-pink to-pink-600 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Thesis Defense Workflow
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Drag & drop to update status • Auto-scheduling enabled
          </p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(statusConfig) as DefenseStatus[]).map((status) => {
          const config = statusConfig[status];
          const Icon = config.icon;
          const defenses = getDefensesByStatus(status);

          return (
            <div
              key={status}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* Column Header */}
              <div className={`flex items-center gap-2 mb-4 ${config.bgColor} rounded-lg p-3`}>
                <Icon className={`w-4 h-4 ${config.color}`} />
                <div className="flex-1">
                  <h4 className={`text-sm font-semibold ${config.color}`}>
                    {config.label}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {defenses.length} {defenses.length === 1 ? 'student' : 'students'}
                  </p>
                </div>
              </div>

              {/* Defense Cards */}
              <div className="space-y-3 min-h-[200px]">
                <AnimatePresence>
                  {defenses.map((defense) => {
                    const daysUntil = getDaysUntil(defense.scheduledDate);

                    return (
                      <motion.div
                        key={defense.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        draggable
                        onDragStart={() => handleDragStart(defense.id)}
                        className={`bg-white dark:bg-gray-800 rounded-lg p-3 border-2 cursor-move hover:shadow-lg transition-all ${
                          draggedItem === defense.id
                            ? 'border-kenya-pink shadow-xl opacity-50'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        {/* Student Info */}
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-kenya-green to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                              {defense.studentName}
                            </h5>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {defense.title}
                            </p>
                          </div>
                        </div>

                        {/* Panel Members */}
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                            Panel:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {defense.panelMembers.map((member, index) => (
                              <span
                                key={index}
                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 rounded"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Schedule Info */}
                        {defense.scheduledDate && (
                          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(defense.scheduledDate)}</span>
                          </div>
                        )}

                        {/* Days Until Badge */}
                        {daysUntil && status === 'scheduled' && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-purple-500" />
                            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                              {daysUntil}
                            </span>
                          </div>
                        )}

                        {/* Completion Badge */}
                        {status === 'completed' && (
                          <div className="flex items-center gap-2 mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded">
                            <CheckCircle2 className="w-3 h-3 text-green-600 dark:text-green-400" />
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                              Passed
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Empty State */}
                {defenses.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-xs text-gray-400 dark:text-gray-600">
                    Drop cards here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Auto-Schedule Notice */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-1">
              Auto-Scheduling Active
            </h4>
            <p className="text-xs text-purple-700 dark:text-purple-400">
              Thesis defenses are automatically scheduled based on panel availability and
              submission date. Conflicts are detected and alternative slots are suggested.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
