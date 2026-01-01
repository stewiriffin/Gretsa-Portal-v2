import { type ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { MobileBottomTabBar } from '../components/MobileBottomTabBar';
import { OfflineBanner } from '../components/OfflineBanner';
import { MagneticCursor } from '../components/MagneticCursor';
import { BlobAnimations } from '../components/BlobAnimations';
import { TribalOverlays } from '../components/TribalOverlays';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useIsMobile } from '../hooks/useIsMobile';

export const MainLayout = () => {
  const isOnline = useOnlineStatus();
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Magnetic Cursor - Desktop only */}
      {!isMobile && <MagneticCursor />}

      {/* Offline Banner */}
      <OfflineBanner />

      {/* Background Animations - Disabled on mobile for performance */}
      {!isMobile && (
        <>
          <BlobAnimations />
          <TribalOverlays />
        </>
      )}

      {/* Mesh Gradient Background - Simplified on mobile */}
      <div className={`fixed inset-0 mesh-gradient pointer-events-none z-0 ${
        isMobile ? 'opacity-20' : 'opacity-30 dark:opacity-40'
      }`} />

      {/* Sidebar - Hidden on mobile (shown in hamburger menu) */}
      <Sidebar />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col relative z-10 transition-all duration-500 ${
        !isOnline ? 'grayscale opacity-80' : ''
      }`}>
        {/* Header */}
        <Header />

        {/* Page Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Breadcrumbs />
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <MobileBottomTabBar />
    </div>
  );
};
