import { Suspense, lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useDarkMode } from './contexts/DarkModeContext';
import { useNotifications } from './contexts/NotificationContext';
import { mockWebSocket } from './services/mockWebSocket';
import { broadcastChannel } from './services/broadcastChannel';
import { useUniversityStore } from './store/useUniversityStore';
import { MainLayout } from './layouts/MainLayout';
import { LoadingBar } from './components/LoadingBar';
import { CardSkeleton } from './components/Skeleton';
import { ProtectedRoute } from './components/ProtectedRoute';

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));

// Student Pages
const StudentDashboard = lazy(() => import('./pages/student/Dashboard').then(m => ({ default: m.StudentDashboard })));
const StudentCourses = lazy(() => import('./pages/student/Courses').then(m => ({ default: m.StudentCourses })));
const StudentGrades = lazy(() => import('./pages/student/Grades').then(m => ({ default: m.StudentGrades })));
const StudentFinancials = lazy(() => import('./pages/student/Financials').then(m => ({ default: m.StudentFinancials })));
const StudentSchedule = lazy(() => import('./pages/student/Schedule').then(m => ({ default: m.StudentSchedule })));
const AITutor = lazy(() => import('./pages/AITutor').then(m => ({ default: m.AITutor })));

// Staff & Admin Pages
const TeacherDashboard = lazy(() => import('./components/teacher/TeacherDashboard').then(m => ({ default: m.TeacherDashboard })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="space-y-4 w-full max-w-3xl px-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  </div>
);

// Auth Loading fallback
const AuthLoader = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-navy-950 flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-gold-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Root layout with LoadingBar (must be inside router context)
const RootLayout = () => {
  return (
    <>
      <LoadingBar />
      <Outlet />
    </>
  );
};

// Home redirect component
const HomeRedirect = () => {
  const { profile } = useAuth();

  if (!profile) {
    return <Navigate to="/auth/login" replace />;
  }

  switch (profile.role) {
    case 'student':
      return <Navigate to="/student/dashboard" replace />;
    case 'staff':
      return <Navigate to="/teacher/dashboard" replace />;
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/auth/login" replace />;
  }
};

function AppContent() {
  const { addNotification, markAsRead, clearAll } = useNotifications();
  const { updateBusLocation, updateGrade, updateLocationOccupancy } = useUniversityStore();

  // Initialize WebSocket and Broadcast Channel on mount
  useEffect(() => {
    mockWebSocket.connect();

    const unsubBus = mockWebSocket.on('bus_update', (data) => {
      if (data.id) {
        updateBusLocation(data.id, data);
      }
    });

    const unsubGrade = mockWebSocket.on('grade_update', (data) => {
      if (data.id && data.updates) {
        updateGrade(data.id, data.updates);
      }
    });

    const unsubOccupancy = mockWebSocket.on('occupancy_update', (data) => {
      if (data.locationId !== undefined && data.occupancy !== undefined) {
        updateLocationOccupancy(data.locationId, data.occupancy);
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

    return () => {
      mockWebSocket.disconnect();
      unsubBus();
      unsubGrade();
      unsubOccupancy();
      unsubNotificationAdd();
      unsubNotificationRead();
      unsubNotificationClearAll();
    };
  }, [updateBusLocation, updateGrade, updateLocationOccupancy, addNotification, markAsRead, clearAll]);

  // Create router with authentication
  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        // Auth Routes (Public)
        {
          path: '/auth',
          children: [
            {
              path: 'login',
              element: (
                <Suspense fallback={<AuthLoader />}>
                  <Login />
                </Suspense>
              ),
            },
            {
              path: 'register',
              element: (
                <Suspense fallback={<AuthLoader />}>
                  <Register />
                </Suspense>
              ),
            },
            {
              path: 'forgot-password',
              element: (
                <Suspense fallback={<AuthLoader />}>
                  <ForgotPassword />
                </Suspense>
              ),
            },
          ],
        },

        // Protected Routes
        {
          path: '/',
          element: <ProtectedRoute />,
          children: [
            {
              path: '',
              element: <MainLayout />,
              children: [
            // Home Redirect
            {
              index: true,
              element: <HomeRedirect />,
            },

            // Student Routes
            {
              path: 'student',
              element: <ProtectedRoute allowedRoles={['student']} />,
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
              path: 'teacher',
              element: <ProtectedRoute allowedRoles={['staff']} />,
              children: [
                {
                  path: 'dashboard',
                  element: (
                    <Suspense fallback={<PageLoader />}>
                      <TeacherDashboard />
                    </Suspense>
                  ),
                },
              ],
            },

            // Admin Routes
            {
              path: 'admin',
              element: <ProtectedRoute allowedRoles={['admin']} />,
              children: [
                {
                  path: 'dashboard',
                  element: (
                    <Suspense fallback={<PageLoader />}>
                      <AdminDashboard />
                    </Suspense>
                  ),
                },
              ],
            },

            // AI Tutor (All authenticated users)
            {
              path: 'ai-tutor',
              element: (
                <Suspense fallback={<PageLoader />}>
                  <AITutor />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },

        // 404 Redirect
        {
          path: '*',
          element: <Navigate to="/auth/login" replace />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  const { isDarkMode } = useDarkMode();

  return (
    <AuthProvider>
      <div className={isDarkMode ? 'dark' : ''}>
        <Toaster
          position="top-right"
          richColors
          theme={isDarkMode ? 'dark' : 'light'}
        />
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
