import { motion } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Save, Download } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  regNumber: string;
  assignment1: number | null;
  assignment2: number | null;
  midterm: number | null;
  final: number | null;
  total: number;
  grade: string;
}

const initialStudents: Student[] = [
  { id: '1', name: 'Alice Mwangi', regNumber: 'CS/001/22', assignment1: 85, assignment2: 90, midterm: 78, final: 82, total: 83.75, grade: 'A' },
  { id: '2', name: 'Brian Omondi', regNumber: 'CS/002/22', assignment1: 75, assignment2: null, midterm: 70, final: null, total: 72.5, grade: 'B' },
  { id: '3', name: 'Catherine Njeri', regNumber: 'CS/003/22', assignment1: 92, assignment2: 88, midterm: 85, final: 90, total: 88.75, grade: 'A' },
  { id: '4', name: 'David Kamau', regNumber: 'CS/004/22', assignment1: 68, assignment2: 72, midterm: 65, final: 70, total: 68.75, grade: 'C' },
  { id: '5', name: 'Emma Wanjiru', regNumber: 'CS/005/22', assignment1: 95, assignment2: 93, midterm: null, final: null, total: 94, grade: 'A' },
];

export const DigitalGradebook = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [hasChanges, setHasChanges] = useState(false);

  const handleGradeChange = (studentId: string, field: keyof Student, value: string) => {
    const numValue = value === '' ? null : Number(value);

    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const updated = { ...student, [field]: numValue };

        // Recalculate total and grade
        const scores = [
          updated.assignment1,
          updated.assignment2,
          updated.midterm,
          updated.final,
        ].filter(s => s !== null) as number[];

        const total = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
        const grade = total >= 90 ? 'A' : total >= 80 ? 'A-' : total >= 70 ? 'B' : total >= 60 ? 'C' : 'D';

        return { ...updated, total, grade };
      }
      return student;
    }));

    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate save
    setTimeout(() => {
      setHasChanges(false);
      alert('Grades saved successfully!');
    }, 500);
  };

  const handleExport = () => {
    alert('Exporting gradebook as Excel...');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <BookOpen className="text-kenya-pink" size={24} />
          Digital Gradebook - Data Structures CS301
        </h2>
        <div className="flex gap-2">
          {hasChanges && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-kenya-green to-emerald-600 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2"
            >
              <Save size={16} />
              Save Changes
            </motion.button>
          )}
          <button
            onClick={handleExport}
            className="px-4 py-2 glass-card text-gray-900 dark:text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-3d transition-all"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Excel-style Gradebook Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-3 text-sm font-bold text-gray-700 dark:text-gray-300 sticky left-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                Student Name
              </th>
              <th className="text-left p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Reg. Number</th>
              <th className="text-center p-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                Assignment 1<br />
                <span className="text-xs text-gray-500">(20%)</span>
              </th>
              <th className="text-center p-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                Assignment 2<br />
                <span className="text-xs text-gray-500">(20%)</span>
              </th>
              <th className="text-center p-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                Midterm<br />
                <span className="text-xs text-gray-500">(30%)</span>
              </th>
              <th className="text-center p-3 text-sm font-bold text-gray-700 dark:text-gray-300">
                Final<br />
                <span className="text-xs text-gray-500">(30%)</span>
              </th>
              <th className="text-center p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Total</th>
              <th className="text-center p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="p-3 text-sm font-semibold text-gray-900 dark:text-white sticky left-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                  {student.name}
                </td>
                <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{student.regNumber}</td>
                {['assignment1', 'assignment2', 'midterm', 'final'].map(field => (
                  <td key={field} className="p-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={student[field as keyof Student] ?? ''}
                      onChange={(e) => handleGradeChange(student.id, field as keyof Student, e.target.value)}
                      className="w-20 px-2 py-1 text-center bg-white/50 dark:bg-white/10 border border-white/30 rounded-lg focus:ring-2 focus:ring-kenya-pink outline-none text-gray-900 dark:text-white"
                      placeholder="-"
                    />
                  </td>
                ))}
                <td className="p-3 text-center">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full text-sm font-bold">
                    {student.total.toFixed(1)}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    student.grade.startsWith('A') ? 'bg-gradient-to-r from-kenya-green to-emerald-600 text-white' :
                    student.grade.startsWith('B') ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                    student.grade.startsWith('C') ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                    'bg-gradient-to-r from-kenya-red to-red-700 text-white'
                  }`}>
                    {student.grade}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Class Average</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {(students.reduce((sum, s) => sum + s.total, 0) / students.length).toFixed(1)}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">A Grades</p>
          <p className="text-2xl font-bold text-kenya-green">
            {students.filter(s => s.grade.startsWith('A')).length}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Entries</p>
          <p className="text-2xl font-bold text-kenya-red">
            {students.filter(s => s.assignment2 === null || s.midterm === null || s.final === null).length}
          </p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completion</p>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round((students.filter(s => s.assignment2 !== null && s.midterm !== null && s.final !== null).length / students.length) * 100)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
};
