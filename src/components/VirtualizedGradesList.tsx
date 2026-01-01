import { List } from 'react-window';
import { memo } from 'react';
import { TrendingUp, TrendingDown, Award } from 'lucide-react';
import { useGrades } from '../hooks/useGrades';
import { type Grade } from '../store/useUniversityStore';

// Memoized row component for performance
const GradeRow = memo(({ index, style, data }: any) => {
  const grade: Grade = data[index];

  const getGradeColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeBg = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (score >= 70) return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
    if (score >= 60) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  const getTrendIcon = (score: number) => {
    if (score >= 75) return <TrendingUp className="w-4 h-4" />;
    if (score >= 60) return <Award className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  return (
    <div style={style} className="px-4">
      <div
        className={`flex items-center justify-between p-4 rounded-xl border-2 ${getGradeBg(
          grade.score
        )}`}
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Trend Icon */}
          <div className={`flex-shrink-0 ${getGradeColor(grade.score)}`}>
            {getTrendIcon(grade.score)}
          </div>

          {/* Course Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
              {grade.courseCode}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {grade.courseName}
            </p>
          </div>

          {/* Semester */}
          <div className="hidden sm:block text-xs text-gray-600 dark:text-gray-400">
            {grade.semester}
          </div>

          {/* Credits */}
          <div className="hidden md:block text-xs font-semibold text-gray-700 dark:text-gray-300">
            {grade.credits} Credits
          </div>
        </div>

        {/* Score & Grade */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
          <div className="text-right">
            <div className={`text-2xl font-bold ${getGradeColor(grade.score)}`}>
              {grade.score}%
            </div>
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              Grade {grade.grade}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

GradeRow.displayName = 'GradeRow';

export const VirtualizedGradesList = () => {
  const { grades, isLoading, calculateGPA } = useGrades();

  const gpa = calculateGPA();

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            All Grades
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Viewing {grades.length} courses • Virtual scrolling enabled
          </p>
        </div>

        {/* GPA Badge */}
        <div className="px-4 py-2 bg-gradient-to-r from-kenya-green to-green-600 text-white rounded-xl">
          <div className="text-xs font-semibold">Cumulative GPA</div>
          <div className="text-2xl font-bold">{gpa.toFixed(2)}</div>
        </div>
      </div>

      {/* Virtualized List */}
      {grades.length === 0 ? (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No grades available
        </div>
      ) : (
        <List
          defaultHeight={600}
          rowCount={grades.length}
          rowHeight={90}
          style={{ width: '100%' }}
          rowProps={grades}
          rowComponent={GradeRow}
          className="scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
        />
      )}

      {/* Performance Note */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-700 dark:text-blue-400">
          <span className="font-semibold">Performance Optimized:</span> Using virtual
          scrolling to render only visible items. Can handle 10,000+ grades smoothly.
        </p>
      </div>
    </div>
  );
};
