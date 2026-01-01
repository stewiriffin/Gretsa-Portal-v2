import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface Assignment {
  id: string;
  name: string;
  weight: number;
  currentGrade: number;
  whatIfGrade: number;
}

export const GradeCalculator = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Midterm Exam', weight: 30, currentGrade: 85, whatIfGrade: 85 },
    { id: '2', name: 'Final Project', weight: 40, currentGrade: 90, whatIfGrade: 90 },
    { id: '3', name: 'Assignments', weight: 20, currentGrade: 88, whatIfGrade: 88 },
    { id: '4', name: 'Participation', weight: 10, currentGrade: 95, whatIfGrade: 95 },
  ]);

  const calculateGrade = (useWhatIf: boolean = false) => {
    const totalWeight = assignments.reduce((sum, a) => sum + a.weight, 0);
    const weightedGrade = assignments.reduce((sum, a) => {
      const grade = useWhatIf ? a.whatIfGrade : a.currentGrade;
      return sum + (grade * a.weight / 100);
    }, 0);
    return (weightedGrade / totalWeight * 100).toFixed(2);
  };

  const currentGrade = parseFloat(calculateGrade(false));
  const whatIfGrade = parseFloat(calculateGrade(true));
  const gradeDifference = whatIfGrade - currentGrade;

  const updateWhatIfGrade = (id: string, grade: number) => {
    setAssignments(prev => prev.map(a =>
      a.id === id ? { ...a, whatIfGrade: grade } : a
    ));
  };

  const addAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      name: 'New Assignment',
      weight: 10,
      currentGrade: 0,
      whatIfGrade: 0,
    };
    setAssignments(prev => [...prev, newAssignment]);
  };

  const removeAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  const getLetterGrade = (grade: number) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-kenya-pink to-kenya-red rounded-xl">
            <Calculator className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Grade Calculator
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              What-if analysis for your grades
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addAssignment}
          className="flex items-center gap-2 px-4 py-2 bg-kenya-green text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus size={18} />
          Add
        </motion.button>
      </div>

      {/* Grade Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <p className="text-sm text-blue-700 dark:text-blue-400 mb-1">Current Grade</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">
              {currentGrade}%
            </p>
            <span className="text-xl font-semibold text-blue-700 dark:text-blue-400">
              {getLetterGrade(currentGrade)}
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-xl border ${
            gradeDifference > 0
              ? 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800'
              : gradeDifference < 0
              ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800'
              : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800'
          }`}
        >
          <p className={`text-sm mb-1 ${
            gradeDifference > 0 ? 'text-green-700 dark:text-green-400' :
            gradeDifference < 0 ? 'text-red-700 dark:text-red-400' :
            'text-gray-700 dark:text-gray-400'
          }`}>
            What-If Grade
          </p>
          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${
              gradeDifference > 0 ? 'text-green-900 dark:text-green-300' :
              gradeDifference < 0 ? 'text-red-900 dark:text-red-300' :
              'text-gray-900 dark:text-gray-300'
            }`}>
              {whatIfGrade}%
            </p>
            <span className={`text-xl font-semibold ${
              gradeDifference > 0 ? 'text-green-700 dark:text-green-400' :
              gradeDifference < 0 ? 'text-red-700 dark:text-red-400' :
              'text-gray-700 dark:text-gray-400'
            }`}>
              {getLetterGrade(whatIfGrade)}
            </span>
          </div>
          {gradeDifference !== 0 && (
            <div className="flex items-center gap-1 mt-2">
              {gradeDifference > 0 ? (
                <TrendingUp size={16} className="text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDown size={16} className="text-red-600 dark:text-red-400" />
              )}
              <span className={`text-sm font-semibold ${
                gradeDifference > 0 ? 'text-green-600 dark:text-green-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {gradeDifference > 0 ? '+' : ''}{gradeDifference.toFixed(2)}%
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Assignments Table */}
      <div className="space-y-3">
        {assignments.map((assignment, index) => (
          <motion.div
            key={assignment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={assignment.name}
                  onChange={(e) => setAssignments(prev => prev.map(a =>
                    a.id === assignment.id ? { ...a, name: e.target.value } : a
                  ))}
                  className="w-full bg-transparent font-semibold text-gray-800 dark:text-white outline-none"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Weight: {assignment.weight}%
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current</p>
                  <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <span className="text-sm font-bold text-blue-900 dark:text-blue-300">
                      {assignment.currentGrade}%
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">What-If</p>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={assignment.whatIfGrade}
                    onChange={(e) => updateWhatIfGrade(assignment.id, parseInt(e.target.value) || 0)}
                    className="w-16 px-2 py-1 bg-kenya-pink/10 dark:bg-kenya-pink/20 rounded-lg text-center font-bold text-kenya-pink dark:text-pink-400 outline-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeAssignment(assignment.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 size={18} className="text-red-500" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
