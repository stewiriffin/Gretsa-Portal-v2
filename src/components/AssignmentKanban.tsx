import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Clock, AlertCircle, CheckCircle2, Star, FileText } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  points: number;
  grade?: number;
  status: 'todo' | 'in-progress' | 'submitted' | 'graded';
}

const initialAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Binary Search Tree Implementation',
    course: 'Data Structures',
    dueDate: '2026-01-05',
    priority: 'high',
    points: 100,
    status: 'todo',
  },
  {
    id: '2',
    title: 'Database Normalization Project',
    course: 'Database Management',
    dueDate: '2026-01-08',
    priority: 'high',
    points: 150,
    status: 'todo',
  },
  {
    id: '3',
    title: 'React Component Library',
    course: 'Web Development',
    dueDate: '2026-01-10',
    priority: 'medium',
    points: 120,
    status: 'in-progress',
  },
  {
    id: '4',
    title: 'Network Protocol Analysis',
    course: 'Computer Networks',
    dueDate: '2026-01-04',
    priority: 'high',
    points: 100,
    status: 'in-progress',
  },
  {
    id: '5',
    title: 'Mobile App Wireframes',
    course: 'Mobile Dev',
    dueDate: '2025-12-30',
    priority: 'low',
    points: 80,
    status: 'submitted',
  },
  {
    id: '6',
    title: 'Software Architecture Design',
    course: 'Software Engineering',
    dueDate: '2025-12-28',
    priority: 'medium',
    points: 130,
    grade: 92,
    status: 'graded',
  },
];

const columns = [
  { id: 'todo', title: 'To Do', color: 'from-red-500 to-orange-500', icon: FileText },
  { id: 'in-progress', title: 'In Progress', color: 'from-blue-500 to-cyan-500', icon: Clock },
  { id: 'submitted', title: 'Submitted', color: 'from-purple-500 to-pink-500', icon: CheckCircle2 },
  { id: 'graded', title: 'Graded', color: 'from-green-500 to-emerald-500', icon: Star },
];

const priorityColors = {
  low: 'bg-gray-400',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

interface SortableAssignmentCardProps {
  assignment: Assignment;
}

const SortableAssignmentCard = ({ assignment }: SortableAssignmentCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: assignment.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // Calculate days until due
  const daysUntilDue = Math.ceil(
    (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const isOverdue = daysUntilDue < 0;
  const isUrgent = daysUntilDue <= 2 && daysUntilDue >= 0;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-card-strong rounded-xl p-4 cursor-grab active:cursor-grabbing shadow-3d hover:shadow-3d-strong transition-all touch-none"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight flex-1">
          {assignment.title}
        </h4>
        <div className={`w-2 h-2 rounded-full ${priorityColors[assignment.priority]} ml-2 flex-shrink-0`} />
      </div>

      {/* Course */}
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{assignment.course}</p>

      {/* Due Date */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} className={`${isOverdue ? 'text-red-500' : isUrgent ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400'}`} />
          <span className={`text-xs ${isOverdue ? 'text-red-500 font-bold' : isUrgent ? 'text-orange-500 font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
            {isOverdue ? `Overdue by ${Math.abs(daysUntilDue)}d` : daysUntilDue === 0 ? 'Due today' : `${daysUntilDue}d left`}
          </span>
        </div>
        {isUrgent && !isOverdue && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <AlertCircle size={14} className="text-orange-500" />
          </motion.div>
        )}
      </div>

      {/* Points & Grade */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star size={12} fill="currentColor" className="text-yellow-500" />
          <span className="text-xs font-semibold text-gray-900 dark:text-white">{assignment.points} pts</span>
        </div>
        {assignment.grade !== undefined && (
          <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${assignment.grade >= 90 ? 'bg-green-500' : assignment.grade >= 80 ? 'bg-blue-500' : assignment.grade >= 70 ? 'bg-yellow-500' : 'bg-orange-500'} text-white`}>
            {assignment.grade}%
          </div>
        )}
      </div>

      {/* Quick Actions on Hover */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        whileHover={{ opacity: 1, height: 'auto' }}
        className="mt-3 pt-3 border-t border-white/20 dark:border-gray-700 flex gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 text-xs py-1.5 bg-kenya-pink/20 dark:bg-kenya-pink/10 text-kenya-pink dark:text-pink-400 rounded-lg font-medium hover:bg-kenya-pink/30 transition-colors"
        >
          View
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 text-xs py-1.5 bg-kenya-green/20 dark:bg-kenya-green/10 text-kenya-green dark:text-green-400 rounded-lg font-medium hover:bg-kenya-green/30 transition-colors"
        >
          Edit
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export const AssignmentKanban = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeAssignment = assignments.find((a) => a.id === active.id);
    const overId = over.id as string;

    if (!activeAssignment) return;

    // Check if dropped on a column
    const targetColumn = columns.find((col) => col.id === overId);
    if (targetColumn) {
      setAssignments((items) =>
        items.map((item) =>
          item.id === active.id ? { ...item, status: targetColumn.id as Assignment['status'] } : item
        )
      );
    }

    setActiveId(null);
  };

  const getAssignmentsByStatus = (status: Assignment['status']) => {
    return assignments.filter((a) => a.status === status);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Assignment Board</h2>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {assignments.length} total
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => {
            const columnAssignments = getAssignmentsByStatus(column.id as Assignment['status']);
            const Icon = column.icon;

            return (
              <div key={column.id} className="flex flex-col">
                {/* Column Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`glass-card-strong rounded-xl p-4 mb-3 bg-gradient-to-r ${column.color} text-white shadow-3d`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon size={18} />
                      <h3 className="font-bold text-sm">{column.title}</h3>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-bold">
                      {columnAssignments.length}
                    </div>
                  </div>
                </motion.div>

                {/* Droppable Column */}
                <SortableContext
                  items={columnAssignments.map((a) => a.id)}
                  strategy={verticalListSortingStrategy}
                  id={column.id}
                >
                  <div className="flex-1 space-y-3 min-h-[200px] rounded-xl glass-card p-3">
                    {columnAssignments.map((assignment) => (
                      <SortableAssignmentCard key={assignment.id} assignment={assignment} />
                    ))}
                    {columnAssignments.length === 0 && (
                      <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-600 text-sm italic">
                        No assignments
                      </div>
                    )}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="glass-card-strong rounded-xl p-4 shadow-3d-strong rotate-3 scale-105">
              {assignments.find((a) => a.id === activeId)?.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span>High Priority</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span>Medium Priority</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <span>Low Priority</span>
        </div>
      </div>
    </motion.div>
  );
};
