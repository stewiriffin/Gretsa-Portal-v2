import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { MapPin, Users, Navigation, X, Info } from 'lucide-react';
import { useUniversityStore } from '../store/useUniversityStore';

interface Building {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const campusBuildings: Building[] = [
  { id: 'library', name: 'Library', x: 100, y: 100, width: 120, height: 80, color: '#15803D' },
  { id: 'lecture_hall', name: 'Lecture Hall A', x: 250, y: 100, width: 140, height: 100, color: '#B91C1C' },
  { id: 'cafeteria', name: 'Cafeteria', x: 100, y: 220, width: 100, height: 70, color: '#E91E63' },
  { id: 'admin', name: 'Admin Block', x: 420, y: 100, width: 100, height: 80, color: '#1E40AF' },
  { id: 'lab', name: 'Computer Lab', x: 250, y: 240, width: 120, height: 80, color: '#9333EA' },
  { id: 'hostel', name: 'Student Hostel', x: 420, y: 220, width: 150, height: 120, color: '#0891B2' },
];

export const VirtualCampusMap = () => {
  const { campusLocations } = useUniversityStore();
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [pathFrom, setPathFrom] = useState<string | null>(null);
  const [pathTo, setPathTo] = useState<string | null>(null);

  const getBuildingOccupancy = (buildingId: string) => {
    const location = campusLocations.find((loc) => loc.id === buildingId);
    if (!location) return { percentage: 0, count: 0, capacity: 0 };

    const percentage = (location.occupancy / location.capacity) * 100;
    return {
      percentage,
      count: location.occupancy,
      capacity: location.capacity,
    };
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return '#DC2626'; // Red - Full
    if (percentage >= 70) return '#F59E0B'; // Amber - Nearly Full
    if (percentage >= 40) return '#FBBF24'; // Yellow - Moderate
    return '#10B981'; // Green - Available
  };

  const getOccupancyLabel = (percentage: number) => {
    if (percentage >= 90) return 'Full';
    if (percentage >= 70) return 'Nearly Full';
    if (percentage >= 40) return 'Moderate';
    return 'Available';
  };

  const selectedBuildingData = selectedBuilding
    ? campusBuildings.find((b) => b.id === selectedBuilding)
    : null;

  const selectedOccupancy = selectedBuilding
    ? getBuildingOccupancy(selectedBuilding)
    : null;

  // Simple pathfinding: Draw a line between two buildings
  const drawPath = () => {
    if (!pathFrom || !pathTo) return null;

    const fromBuilding = campusBuildings.find((b) => b.id === pathFrom);
    const toBuilding = campusBuildings.find((b) => b.id === pathTo);

    if (!fromBuilding || !toBuilding) return null;

    const fromX = fromBuilding.x + fromBuilding.width / 2;
    const fromY = fromBuilding.y + fromBuilding.height / 2;
    const toX = toBuilding.x + toBuilding.width / 2;
    const toY = toBuilding.y + toBuilding.height / 2;

    return (
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        d={`M ${fromX} ${fromY} L ${toX} ${toY}`}
        stroke="#E91E63"
        strokeWidth="3"
        strokeDasharray="10,5"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-kenya-green to-emerald-600 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Virtual Campus Map
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Live building occupancy & wayfinding
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setPathFrom(null);
            setPathTo(null);
            setSelectedBuilding(null);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Wayfinding Controls */}
      <div className="mb-4 flex gap-2">
        <select
          value={pathFrom || ''}
          onChange={(e) => setPathFrom(e.target.value || null)}
          className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
        >
          <option value="">From...</option>
          {campusBuildings.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>

        <Navigation className="w-5 h-5 text-kenya-pink mt-2" />

        <select
          value={pathTo || ''}
          onChange={(e) => setPathTo(e.target.value || null)}
          className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
        >
          <option value="">To...</option>
          {campusBuildings.map((building) => (
            <option key={building.id} value={building.id}>
              {building.name}
            </option>
          ))}
        </select>
      </div>

      {/* SVG Campus Map */}
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl p-4 overflow-hidden">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-auto"
          style={{ maxHeight: '400px' }}
        >
          {/* Arrow marker for path */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#E91E63" />
            </marker>
          </defs>

          {/* Campus Grounds */}
          <rect x="0" y="0" width="600" height="400" fill="#F0FDF4" />

          {/* Walking Paths */}
          <rect x="0" y="180" width="600" height="20" fill="#D1D5DB" opacity="0.5" />
          <rect x="230" y="0" width="20" height="400" fill="#D1D5DB" opacity="0.5" />

          {/* Buildings */}
          {campusBuildings.map((building) => {
            const occupancy = getBuildingOccupancy(building.id);
            const isSelected = selectedBuilding === building.id;
            const isInPath = building.id === pathFrom || building.id === pathTo;

            return (
              <g key={building.id}>
                {/* Building Rectangle */}
                <motion.rect
                  x={building.x}
                  y={building.y}
                  width={building.width}
                  height={building.height}
                  fill={building.color}
                  stroke={isSelected || isInPath ? '#E91E63' : '#374151'}
                  strokeWidth={isSelected || isInPath ? 3 : 1}
                  rx="8"
                  className="cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBuilding(building.id)}
                  opacity={0.8}
                />

                {/* Building Name */}
                <text
                  x={building.x + building.width / 2}
                  y={building.y + building.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white font-semibold text-xs pointer-events-none"
                  style={{ fontSize: '11px' }}
                >
                  {building.name}
                </text>

                {/* Occupancy Indicator */}
                <motion.circle
                  cx={building.x + building.width - 15}
                  cy={building.y + 15}
                  r="8"
                  fill={getOccupancyColor(occupancy.percentage)}
                  stroke="white"
                  strokeWidth="2"
                  className="pointer-events-none"
                  animate={{
                    scale: occupancy.percentage >= 90 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </g>
            );
          })}

          {/* Wayfinding Path */}
          {drawPath()}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Info className="w-3 h-3" />
            Occupancy
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Moderate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Nearly Full</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Full</span>
            </div>
          </div>
        </div>
      </div>

      {/* Building Details Panel */}
      <AnimatePresence>
        {selectedBuildingData && selectedOccupancy && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {selectedBuildingData.name}
              </h4>
              <button
                onClick={() => setSelectedBuilding(null)}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {selectedOccupancy.count} / {selectedOccupancy.capacity} people
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: getOccupancyColor(selectedOccupancy.percentage) }}
                  >
                    {getOccupancyLabel(selectedOccupancy.percentage)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedOccupancy.percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: getOccupancyColor(selectedOccupancy.percentage),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPathFrom(selectedBuildingData.id)}
                className="flex-1 px-3 py-2 bg-kenya-green text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Set as Start
              </button>
              <button
                onClick={() => setPathTo(selectedBuildingData.id)}
                className="flex-1 px-3 py-2 bg-kenya-pink text-white text-xs font-semibold rounded-lg hover:bg-pink-700 transition-colors"
              >
                Set as Destination
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
