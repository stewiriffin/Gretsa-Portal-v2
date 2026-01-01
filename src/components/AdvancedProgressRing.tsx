import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

interface Module {
  name: string;
  progress: number;
  color: string;
}

interface AdvancedProgressRingProps {
  overallProgress: number;
  modules: Module[];
  size?: number;
  strokeWidth?: number;
  showModuleLabels?: boolean;
}

export const AdvancedProgressRing = ({
  overallProgress,
  modules,
  size = 200,
  strokeWidth = 12,
  showModuleLabels = true,
}: AdvancedProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Calculate segment angles for modules
  const moduleAngleSize = 360 / modules.length;

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* SVG Progress Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-gray-200 dark:text-gray-700"
          />

          {/* Module segments */}
          {modules.map((module, index) => {
            const startAngle = (moduleAngleSize * index - 90) * (Math.PI / 180);
            const endAngle = (moduleAngleSize * (index + 1) - 90) * (Math.PI / 180);
            const segmentCircumference = circumference / modules.length;
            const progressOffset = segmentCircumference * (1 - module.progress / 100);

            // Calculate path for segment
            const startX = center + radius * Math.cos(startAngle);
            const startY = center + radius * Math.sin(startAngle);

            return (
              <motion.circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={module.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${segmentCircumference} ${circumference - segmentCircumference}`}
                strokeDashoffset={-index * segmentCircumference + progressOffset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: -index * segmentCircumference + segmentCircumference }}
                animate={{ strokeDashoffset: -index * segmentCircumference + progressOffset }}
                transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                className="drop-shadow-lg"
                style={{
                  filter: `drop-shadow(0 0 8px ${module.color}40)`,
                }}
              />
            );
          })}

          {/* Segment dividers */}
          {modules.map((_, index) => {
            const angle = (moduleAngleSize * index - 90) * (Math.PI / 180);
            const innerRadius = radius - strokeWidth / 2;
            const outerRadius = radius + strokeWidth / 2;
            const innerX = center + innerRadius * Math.cos(angle);
            const innerY = center + innerRadius * Math.sin(angle);
            const outerX = center + outerRadius * Math.cos(angle);
            const outerY = center + outerRadius * Math.sin(angle);

            return (
              <line
                key={`divider-${index}`}
                x1={innerX}
                y1={innerY}
                x2={outerX}
                y2={outerY}
                stroke="currentColor"
                strokeWidth={2}
                className="text-white dark:text-gray-800"
              />
            );
          })}
        </svg>

        {/* Center content with overall progress */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            className="text-center"
          >
            <motion.p
              className="text-4xl font-bold bg-gradient-to-r from-kenya-red via-kenya-pink to-kenya-green bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              {overallProgress}%
            </motion.p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Complete</p>
          </motion.div>
        </div>

        {/* Module milestone markers */}
        {modules.map((module, index) => {
          const angle = (moduleAngleSize * (index + 0.5) - 90) * (Math.PI / 180);
          const markerRadius = radius + strokeWidth / 2 + 8;
          const markerX = center + markerRadius * Math.cos(angle);
          const markerY = center + markerRadius * Math.sin(angle);

          return (
            <motion.div
              key={`marker-${index}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
              className="absolute"
              style={{
                left: markerX,
                top: markerY,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {module.progress === 100 ? (
                <motion.div
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckCircle2
                    size={16}
                    className="text-white"
                    fill={module.color}
                  />
                </motion.div>
              ) : (
                <Circle
                  size={12}
                  className="text-gray-400 dark:text-gray-600"
                  fill="currentColor"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Module Labels */}
      {showModuleLabels && (
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {modules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              className="glass-card rounded-lg p-2 flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: module.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                  {module.name}
                </p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400">
                  {module.progress}%
                </p>
              </div>
              {module.progress === 100 && (
                <CheckCircle2 size={14} className="text-kenya-green flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Animated shimmer effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        style={{ width: size, height: size, borderRadius: '50%' }}
      />
    </div>
  );
};
