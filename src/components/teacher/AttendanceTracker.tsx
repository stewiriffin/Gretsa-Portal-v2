import { motion } from 'framer-motion';
import { useState } from 'react';
import { ClipboardCheck, QrCode, UserCheck, UserX, Check, X } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  name: string;
  regNumber: string;
  status: 'present' | 'absent' | 'late';
}

const initialRecords: AttendanceRecord[] = [
  { id: '1', name: 'Alice Mwangi', regNumber: 'CS/001/22', status: 'present' },
  { id: '2', name: 'Brian Omondi', regNumber: 'CS/002/22', status: 'absent' },
  { id: '3', name: 'Catherine Njeri', regNumber: 'CS/003/22', status: 'present' },
  { id: '4', name: 'David Kamau', regNumber: 'CS/004/22', status: 'late' },
  { id: '5', name: 'Emma Wanjiru', regNumber: 'CS/005/22', status: 'present' },
  { id: '6', name: 'Frank Otieno', regNumber: 'CS/006/22', status: 'present' },
  { id: '7', name: 'Grace Akinyi', regNumber: 'CS/007/22', status: 'absent' },
  { id: '8', name: 'Henry Maina', regNumber: 'CS/008/22', status: 'present' },
];

export const AttendanceTracker = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>(initialRecords);
  const [showQR, setShowQR] = useState(false);

  const markAllPresent = () => {
    setRecords(prev => prev.map(record => ({ ...record, status: 'present' })));
  };

  const toggleStatus = (id: string) => {
    setRecords(prev => prev.map(record => {
      if (record.id === id) {
        const nextStatus = record.status === 'present' ? 'absent' : record.status === 'absent' ? 'late' : 'present';
        return { ...record, status: nextStatus };
      }
      return record;
    }));
  };

  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount = records.filter(r => r.status === 'absent').length;
  const lateCount = records.filter(r => r.status === 'late').length;
  const attendanceRate = Math.round((presentCount / records.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <ClipboardCheck className="text-kenya-green" size={24} />
          Attendance Tracker
        </h2>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={markAllPresent}
            className="px-4 py-2 bg-gradient-to-r from-kenya-green to-emerald-600 text-white rounded-lg font-semibold shadow-lg flex items-center gap-2 text-sm"
          >
            <UserCheck size={16} />
            Mark All Present
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowQR(!showQR)}
            className="px-4 py-2 glass-card text-gray-900 dark:text-white rounded-lg font-semibold flex items-center gap-2 text-sm hover:shadow-3d transition-all"
          >
            <QrCode size={16} />
            QR Code
          </motion.button>
        </div>
      </div>

      {/* QR Code Display */}
      {showQR && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="mb-6 glass-card rounded-xl p-6 text-center"
        >
          <div className="w-48 h-48 mx-auto bg-white rounded-lg p-4 mb-4 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-kenya-red via-kenya-pink to-kenya-green opacity-20 rounded-lg flex items-center justify-center">
              <QrCode size={120} className="text-gray-800" />
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Students scan this QR code to mark attendance
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Session ID: CS301-2024-01-02-10:00
          </p>
        </motion.div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck size={18} className="text-kenya-green" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
          </div>
          <p className="text-2xl font-bold text-kenya-green">{presentCount}</p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <UserX size={18} className="text-kenya-red" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
          </div>
          <p className="text-2xl font-bold text-kenya-red">{absentCount}</p>
        </div>
        <div className="glass-card rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ClipboardCheck size={18} className="text-purple-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Rate</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">{attendanceRate}%</p>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {records.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => toggleStatus(record.id)}
            whileHover={{ scale: 1.01, x: 3 }}
            className={`glass-card rounded-lg p-3 cursor-pointer transition-all flex items-center justify-between ${
              record.status === 'present' ? 'ring-2 ring-kenya-green/50' :
              record.status === 'absent' ? 'ring-2 ring-kenya-red/50' :
              'ring-2 ring-yellow-500/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                record.status === 'present' ? 'bg-gradient-to-br from-kenya-green to-emerald-600' :
                record.status === 'absent' ? 'bg-gradient-to-br from-kenya-red to-red-700' :
                'bg-gradient-to-br from-yellow-500 to-orange-500'
              }`}>
                {record.status === 'present' && <Check size={20} className="text-white" />}
                {record.status === 'absent' && <X size={20} className="text-white" />}
                {record.status === 'late' && <span className="text-white text-xs font-bold">L</span>}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{record.name}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{record.regNumber}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              record.status === 'present' ? 'bg-kenya-green/20 text-kenya-green' :
              record.status === 'absent' ? 'bg-kenya-red/20 text-kenya-red' :
              'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
            }`}>
              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Click on any student to toggle their attendance status (Present → Absent → Late)
        </p>
      </div>
    </motion.div>
  );
};
