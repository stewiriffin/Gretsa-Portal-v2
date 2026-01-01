import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const breadcrumbNameMap: Record<string, string> = {
    student: 'Student',
    teacher: 'Teacher',
    admin: 'Admin',
    dashboard: 'Dashboard',
    courses: 'Courses',
    grades: 'Grades',
    financials: 'Financials',
    schedule: 'Schedule',
    'ai-tutor': 'AI Tutor',
  };

  return (
    <nav className="flex items-center gap-2 text-sm mb-4">
      <Link
        to="/"
        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = breadcrumbNameMap[value] || value;

        return (
          <div key={to} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-semibold">
                {label}
              </span>
            ) : (
              <Link
                to={to}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
