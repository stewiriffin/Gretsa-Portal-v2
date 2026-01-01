import { motion } from 'framer-motion';
import { Download, TrendingUp } from 'lucide-react';
import { VirtualizedGradesList } from '../../components/VirtualizedGradesList';
import { useGrades } from '../../hooks/useGrades';

export const StudentGrades = () => {
  const { calculateGPA } = useGrades();
  const gpa = calculateGPA();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Academic Performance
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View your grades and transcript
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Transcript
        </button>
      </div>

      {/* GPA Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Cumulative GPA</h3>
            </div>
            <div className="text-5xl font-bold">{gpa.toFixed(2)}</div>
            <p className="text-sm opacity-90 mt-2">
              Based on {6} completed courses
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">85.5%</div>
            <p className="text-sm opacity-90">Average Score</p>
          </div>
        </div>
      </motion.div>

      {/* Semester Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All Semesters', 'Semester 1', 'Semester 2', 'Semester 3'].map((semester, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
              index === 0
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {semester}
          </button>
        ))}
      </div>

      {/* Virtualized Grades List */}
      <VirtualizedGradesList />
    </div>
  );
};
