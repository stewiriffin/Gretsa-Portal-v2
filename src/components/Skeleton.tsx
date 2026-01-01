import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'wave',
}: SkeletonProps) => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const baseClasses = 'bg-gray-200 dark:bg-gray-700';

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'text' ? '1em' : variant === 'circular' ? '40px' : '100px'),
  };

  if (animation === 'wave') {
    return (
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${className} overflow-hidden relative`}
        style={style}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  if (animation === 'pulse') {
    return (
      <motion.div
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        style={style}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// Card Skeleton
export const CardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="40%" className="mb-2" />
          <Skeleton variant="text" width="60%" height={12} />
        </div>
      </div>
      <Skeleton variant="rectangular" height={100} className="mb-3" />
      <Skeleton variant="text" width="80%" className="mb-2" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
};

// List Item Skeleton
export const ListItemSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton variant="text" width="60%" className="mb-2" />
        <Skeleton variant="text" width="40%" height={12} />
      </div>
      <Skeleton variant="rectangular" width={80} height={32} />
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="text" width="15%" />
      <Skeleton variant="text" width="15%" />
      <Skeleton variant="rectangular" width={60} height={24} />
    </div>
  );
};

// Dashboard Widget Skeleton
export const DashboardWidgetSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width={40} height={40} />
          <div>
            <Skeleton variant="text" width={120} className="mb-2" />
            <Skeleton variant="text" width={80} height={12} />
          </div>
        </div>
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>

      <div className="space-y-3">
        <ListItemSkeleton />
        <ListItemSkeleton />
        <ListItemSkeleton />
      </div>
    </div>
  );
};

// Grade Card Skeleton
export const GradeCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4 flex-1">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="flex-1">
          <Skeleton variant="text" width="40%" className="mb-2" />
          <Skeleton variant="text" width="60%" height={12} />
        </div>
      </div>
      <div className="text-right">
        <Skeleton variant="rectangular" width={60} height={32} className="mb-1" />
        <Skeleton variant="text" width={50} height={12} />
      </div>
    </div>
  );
};

// Bus Tracker Skeleton
export const BusTrackerSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton variant="circular" width={40} height={40} />
        <div>
          <Skeleton variant="text" width={150} className="mb-2" />
          <Skeleton variant="text" width={200} height={12} />
        </div>
      </div>

      <Skeleton variant="rectangular" height={80} className="mb-3 rounded-lg" />

      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Skeleton variant="circular" width={32} height={32} />
                <div>
                  <Skeleton variant="text" width={100} className="mb-1" />
                  <Skeleton variant="text" width={60} height={12} />
                </div>
              </div>
              <Skeleton variant="rectangular" width={80} height={24} />
            </div>
            <Skeleton variant="text" width="80%" height={12} className="mb-2" />
            <Skeleton variant="rectangular" height={8} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Campus Map Skeleton
export const CampusMapSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton variant="circular" width={40} height={40} />
        <div>
          <Skeleton variant="text" width={150} className="mb-2" />
          <Skeleton variant="text" width={200} height={12} />
        </div>
      </div>

      <div className="mb-4 flex gap-2">
        <Skeleton variant="rectangular" className="flex-1" height={40} />
        <Skeleton variant="circular" width={20} height={20} className="mt-2" />
        <Skeleton variant="rectangular" className="flex-1" height={40} />
      </div>

      <Skeleton variant="rectangular" height={400} className="rounded-xl" />
    </div>
  );
};

// Book Locker Skeleton
export const BookLockerSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton variant="circular" width={40} height={40} />
        <div>
          <Skeleton variant="text" width={150} className="mb-2" />
          <Skeleton variant="text" width={200} height={12} />
        </div>
      </div>

      <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <div className="flex gap-2 mb-4">
          <Skeleton variant="rectangular" className="flex-1" height={40} />
          <Skeleton variant="rectangular" className="flex-1" height={40} />
        </div>
        <Skeleton variant="rectangular" height={48} className="mb-4" />
        <Skeleton variant="rectangular" height={48} />
      </div>

      <Skeleton variant="text" width={120} className="mb-3" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <Skeleton variant="text" width="60%" className="mb-1" />
                <Skeleton variant="text" width="40%" height={12} />
              </div>
              <Skeleton variant="circular" width={20} height={20} />
            </div>
            <Skeleton variant="text" width="50%" height={12} />
          </div>
        ))}
      </div>
    </div>
  );
};
