import { Suspense, lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useDarkMode } from './contexts/DarkModeContext';
import { useRole } from './contexts/RoleContext';
import { useNotifications } from './contexts/NotificationContext';
import { mockWebSocket } from './services/mockWebSocket';
import { broadcastChannel } from './services/broadcastChannel';
import { useUniversityStore } from './store/useUniversityStore';
import { MainLayout } from './layouts/MainLayout';
import { LoadingBar } from './components/LoadingBar';
import { CardSkeleton } from './components/Skeleton';

// Code splitting: Lazy load pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard').then(m => ({ default: m.StudentDashboard })));
const StudentCourses = lazy(() => import('./pages/student/Courses').then(m => ({ default: m.StudentCourses })));
const StudentGrades = lazy(() => import('./pages/student/Grades').then(m => ({ default: m.StudentGrades })));
const StudentFinancials = lazy(() => import('./pages/student/Financials').then(m => ({ default: m.StudentFinancials })));
const StudentSchedule = lazy(() => import('./pages/student/Schedule').then(m => ({ default: m.StudentSchedule })));
const AITutor = lazy(() => import('./pages/AITutor').then(m => ({ default: m.AITutor })));

// Lazy load role-specific dashboards (only load when needed)
const TeacherDashboard = lazy(() => import('./components/teacher/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// Loading fallback component
const PageLoader = () => (
  <div className="space-y-6">
    <CardSkeleton />
    <CardSkeleton />
    <CardSkeleton />
  </div>
);

function App() {
  const { isDarkMode } = useDarkMode();
  const { currentRole, setCurrentRole } = useRole();
  const { addNotification, markAsRead, clearAll } = useNotifications();
  const { updateBusLocation, updateGrade, updateLocationOccupancy } = useUniversityStore();

  // Initialize WebSocket and Broadcast Channel on mount
  useEffect(() => {
    // Connect to mock WebSocket for real-time updates
    mockWebSocket.connect();

    // Listen for bus location updates
    const unsubBus = mockWebSocket.on('bus_update', (data) => {
      if (data.id) {
        updateBusLocation(data.id, data);
      }
    });

    // Listen for grade updates
    const unsubGrade = mockWebSocket.on('grade_update', (data) => {
      if (data.id && data.updates) {
        updateGrade(data.id, data.updates);
      }
    });

    // Listen for occupancy updates
    const unsubOccupancy = mockWebSocket.on('occupancy_update', (data) => {
      if (data.locationId !== undefined && data.occupancy !== undefined) {
        updateLocationOccupancy(data.locationId, data.occupancy);
      }
    });

    // Set up Broadcast Channel listeners for cross-tab sync
    const unsubRoleChange = broadcastChannel.on('ROLE_CHANGE', (message) => {
      if (message.type === 'ROLE_CHANGE') {
        setCurrentRole(message.payload.role);
      }
    });

    const unsubNotificationAdd = broadcastChannel.on('NOTIFICATION_ADD', (message) => {
      if (message.type === 'NOTIFICATION_ADD') {
        addNotification(message.payload);
      }
    });

    const unsubNotificationRead = broadcastChannel.on('NOTIFICATION_READ', (message) => {
      if (message.type === 'NOTIFICATION_READ') {
        markAsRead(message.payload.id);
      }
    });

    const unsubNotificationClearAll = broadcastChannel.on('NOTIFICATION_CLEAR_ALL', () => {
      clearAll();
    });

    // Cleanup on unmount
    return () => {
      mockWebSocket.disconnect();
      unsubBus();
      unsubGrade();
      unsubOccupancy();
      unsubRoleChange();
      unsubNotificationAdd();
      unsubNotificationRead();
      unsubNotificationClearAll();
    };
  }, [updateBusLocation, updateGrade, updateLocationOccupancy, setCurrentRole, addNotification, markAsRead, clearAll]);

  // Create router with role-based routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        // Student Routes
        {
          path: 'student',
          children: [
            {
              path: 'dashboard',
              element: (
                <Suspense fallback={<PageLoader />}>
                  <StudentDashboard />
                </Suspense>
              ),
            },
            {
              path: 'courses',
              element: (
                <Suspense fallback={<PageLoader />}>
                  <StudentCourses />
                </Suspense>
              ),
            },
            {
              path: 'grades',
              element: (
                <Suspense fallback={<PageLoader />}>
                  <StudentGrades />
                </Suspense>
              ),
            },
            {
              path: 'financials',
              element: (
                <Suspense fallback={<PageLoader />}>
                  <StudentFinancials />
                </Suspense>
              ),
            },
            {
              path: 'schedule',
              element: (
                <Suspense fallback={<PageLoader />}>
                  <StudentSchedule />
                </Suspense>
              ),
            },
          ],
        },
        // Teacher Routes
        {
          path: 'teacher/dashboard',
          element: (
            <Suspense fallback={<PageLoader />}>
              <TeacherDashboard />
            </Suspense>
          ),
        },
        // Admin Routes
        {
          path: 'admin/dashboard',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          ),
        },
        // AI Tutor (accessible to all roles)
        {
          path: 'ai-tutor',
          element: (
            <Suspense fallback={<PageLoader />}>
              <AITutor />
            </Suspense>
          ),
        },
        // Default redirect based on role
        {
          index: true,
          element: (
            <Suspense fallback={<PageLoader />}>
              {currentRole === 'student' && <StudentDashboard />}
              {currentRole === 'teacher' && <TeacherDashboard />}
              {currentRole === 'admin' && <AdminDashboard />}
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Toaster
        position="top-right"
        richColors
        theme={isDarkMode ? 'dark' : 'light'}
      />
      <LoadingBar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
