import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle2,
  Circle,
  FileText,
  Video,
  BookOpen,
  Code,
  FlaskConical,
  Lock,
  ArrowRight,
} from 'lucide-react';

interface Material {
  type: 'reading' | 'video' | 'lab' | 'code';
  title: string;
  duration?: string;
  completed: boolean;
}

interface Week {
  id: number;
  title: string;
  topics: string[];
  materials: Material[];
  completed: boolean;
  locked: boolean;
  current: boolean;
  dependencies?: number[];
}

const syllabusData: Week[] = [
  {
    id: 1,
    title: 'Introduction to Data Structures',
    topics: ['Arrays', 'Linked Lists', 'Basic Complexity'],
    materials: [
      { type: 'reading', title: 'Chapter 1: Arrays & Lists', completed: true },
      { type: 'video', title: 'Introduction Lecture', duration: '45 min', completed: true },
      { type: 'lab', title: 'Lab 1: Array Operations', completed: true },
    ],
    completed: true,
    locked: false,
    current: false,
  },
  {
    id: 2,
    title: 'Stacks and Queues',
    topics: ['Stack Implementation', 'Queue Operations', 'Priority Queues'],
    materials: [
      { type: 'reading', title: 'Chapter 2: Stack & Queue', completed: true },
      { type: 'video', title: 'Stack Applications', duration: '38 min', completed: true },
      { type: 'code', title: 'Code Examples', completed: true },
      { type: 'lab', title: 'Lab 2: Queue Simulator', completed: true },
    ],
    completed: true,
    locked: false,
    current: false,
    dependencies: [1],
  },
  {
    id: 3,
    title: 'Trees and Binary Search Trees',
    topics: ['Tree Terminology', 'BST Operations', 'Tree Traversals'],
    materials: [
      { type: 'reading', title: 'Chapter 3: Trees', completed: true },
      { type: 'video', title: 'BST Deep Dive', duration: '52 min', completed: true },
      { type: 'code', title: 'Traversal Algorithms', completed: false },
      { type: 'lab', title: 'Lab 3: BST Implementation', completed: false },
    ],
    completed: false,
    locked: false,
    current: true,
    dependencies: [2],
  },
  {
    id: 4,
    title: 'Graph Algorithms',
    topics: ['Graph Representations', 'BFS & DFS', 'Shortest Paths'],
    materials: [
      { type: 'reading', title: 'Chapter 4: Graphs', completed: false },
      { type: 'video', title: 'Graph Theory Basics', duration: '48 min', completed: false },
      { type: 'code', title: 'Dijkstra Algorithm', completed: false },
      { type: 'lab', title: 'Lab 4: Path Finding', completed: false },
    ],
    completed: false,
    locked: false,
    current: false,
    dependencies: [3],
  },
  {
    id: 5,
    title: 'Advanced Trees: AVL & Red-Black',
    topics: ['Self-Balancing Trees', 'AVL Rotations', 'Red-Black Properties'],
    materials: [
      { type: 'reading', title: 'Chapter 5: Balanced Trees', completed: false },
      { type: 'video', title: 'AVL Tree Operations', duration: '55 min', completed: false },
      { type: 'lab', title: 'Lab 5: AVL Implementation', completed: false },
    ],
    completed: false,
    locked: true,
    current: false,
    dependencies: [3, 4],
  },
];

const materialIcons = {
  reading: BookOpen,
  video: Video,
  lab: FlaskConical,
  code: Code,
};

const materialColors = {
  reading: 'text-blue-500',
  video: 'text-purple-500',
  lab: 'text-green-500',
  code: 'text-orange-500',
};

export const InteractiveSyllabusTimeline = () => {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([3]); // Current week expanded by default

  const toggleWeek = (weekId: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(weekId) ? prev.filter((id) => id !== weekId) : [...prev, weekId]
    );
  };

  const getCompletionPercentage = (week: Week) => {
    const totalMaterials = week.materials.length;
    const completedMaterials = week.materials.filter((m) => m.completed).length;
    return Math.round((completedMaterials / totalMaterials) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Course Syllabus Timeline</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {syllabusData.filter((w) => w.completed).length} / {syllabusData.length} weeks complete
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-kenya-red via-kenya-pink to-kenya-green" />

        {/* Weeks */}
        <div className="space-y-6">
          {syllabusData.map((week, index) => {
            const isExpanded = expandedWeeks.includes(week.id);
            const completionPct = getCompletionPercentage(week);

            return (
              <div key={week.id} className="relative">
                {/* Dependency arrows */}
                {week.dependencies && week.dependencies.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    className="absolute -top-6 left-6 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                  >
                    <ArrowRight size={12} />
                    <span>Requires: Week {week.dependencies.join(', ')}</span>
                  </motion.div>
                )}

                {/* Week card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="ml-14 relative"
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[3.25rem] top-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        week.completed
                          ? 'bg-kenya-green'
                          : week.current
                          ? 'bg-kenya-pink'
                          : week.locked
                          ? 'bg-gray-400'
                          : 'bg-white dark:bg-gray-700 border-2 border-kenya-pink'
                      }`}
                    >
                      {week.locked ? (
                        <Lock size={16} className="text-white" />
                      ) : week.completed ? (
                        <CheckCircle2 size={16} className="text-white" />
                      ) : week.current ? (
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-3 h-3 rounded-full bg-white"
                        />
                      ) : (
                        <Circle size={16} className="text-gray-400" />
                      )}
                    </motion.div>
                  </div>

                  {/* Week content */}
                  <motion.div
                    whileHover={{ scale: week.locked ? 1 : 1.01, y: week.locked ? 0 : -2 }}
                    className={`glass-card rounded-xl overflow-hidden ${
                      week.current ? 'ring-2 ring-kenya-pink glow-pink' : ''
                    } ${week.locked ? 'opacity-60 grayscale' : 'cursor-pointer'} transition-all`}
                    onClick={() => !week.locked && toggleWeek(week.id)}
                  >
                    {/* Header */}
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Week {week.id}: {week.title}
                            </h3>
                            {week.current && (
                              <span className="px-2 py-0.5 bg-kenya-pink text-white text-xs rounded-full font-semibold">
                                Current
                              </span>
                            )}
                          </div>

                          {/* Topics */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {week.topics.map((topic, i) => (
                              <span
                                key={i}
                                className="text-xs glass-card px-2 py-1 rounded-md text-gray-700 dark:text-gray-300"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>

                          {/* Progress bar */}
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${completionPct}%` }}
                                transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                className={`h-full rounded-full ${
                                  week.completed
                                    ? 'bg-kenya-green'
                                    : week.current
                                    ? 'bg-kenya-pink'
                                    : 'bg-gray-400'
                                }`}
                              />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                              {completionPct}%
                            </span>
                          </div>
                        </div>

                        {/* Expand icon */}
                        {!week.locked && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown size={20} className="text-gray-500 dark:text-gray-400" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Expanded content - Materials */}
                    <AnimatePresence>
                      {isExpanded && !week.locked && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-white/20 dark:border-gray-700 overflow-hidden"
                        >
                          <div className="p-4 space-y-3">
                            <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3">
                              Course Materials
                            </h4>
                            {week.materials.map((material, i) => {
                              const Icon = materialIcons[material.type];
                              const colorClass = materialColors[material.type];

                              return (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  whileHover={{ scale: 1.02, x: 5 }}
                                  className={`flex items-center gap-3 glass-card-strong rounded-lg p-3 cursor-pointer hover:shadow-3d transition-all ${
                                    material.completed ? 'opacity-100' : 'opacity-80'
                                  }`}
                                >
                                  <div className={`p-2 glass-card rounded-lg ${colorClass}`}>
                                    <Icon size={16} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                      {material.title}
                                    </p>
                                    {material.duration && (
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {material.duration}
                                      </p>
                                    )}
                                  </div>
                                  {material.completed ? (
                                    <CheckCircle2 size={18} className="text-kenya-green flex-shrink-0" />
                                  ) : (
                                    <Circle size={18} className="text-gray-400 flex-shrink-0" />
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-white/20 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="w-4 h-4 rounded-full bg-kenya-green flex items-center justify-center">
            <CheckCircle2 size={10} className="text-white" />
          </div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="w-4 h-4 rounded-full bg-kenya-pink flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
          <span>Current Week</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-700 border-2 border-kenya-pink" />
          <span>Upcoming</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center">
            <Lock size={10} className="text-white" />
          </div>
          <span>Locked</span>
        </div>
      </div>
    </motion.div>
  );
};
