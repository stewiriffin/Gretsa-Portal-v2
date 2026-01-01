import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, UserPlus, Search, Edit2, Trash2, Shield, GraduationCap, BookOpen } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'inactive';
  registrationDate: string;
}

const initialUsers: User[] = [
  { id: '1', name: 'Sarah Wanjiku', email: 'swanjiku@student.gretsa.ac.ke', role: 'student', status: 'active', registrationDate: '2022-09-01' },
  { id: '2', name: 'Dr. James Ochieng', email: 'jochieng@staff.gretsa.ac.ke', role: 'teacher', status: 'active', registrationDate: '2020-01-15' },
  { id: '3', name: 'Alice Mwangi', email: 'amwangi@student.gretsa.ac.ke', role: 'student', status: 'active', registrationDate: '2022-09-01' },
  { id: '4', name: 'Mary Njeri', email: 'mnjeri@admin.gretsa.ac.ke', role: 'admin', status: 'active', registrationDate: '2019-05-10' },
  { id: '5', name: 'Prof. David Kamau', email: 'dkamau@staff.gretsa.ac.ke', role: 'teacher', status: 'active', registrationDate: '2018-08-20' },
  { id: '6', name: 'Brian Omondi', email: 'bomondi@student.gretsa.ac.ke', role: 'student', status: 'inactive', registrationDate: '2021-09-01' },
];

const roleConfig = {
  student: { icon: GraduationCap, color: 'from-kenya-pink to-kenya-red', label: 'Student' },
  teacher: { icon: BookOpen, color: 'from-kenya-green to-emerald-600', label: 'Teacher' },
  admin: { icon: Shield, color: 'from-purple-600 to-pink-600', label: 'Admin' },
};

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Users className="text-kenya-pink" size={24} />
          User Management
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-lg font-semibold shadow-lg flex items-center gap-2"
        >
          <UserPlus size={16} />
          Add User
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 glass-card rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-kenya-pink outline-none"
          />
        </div>

        <div className="flex gap-2">
          {(['all', 'student', 'teacher', 'admin'] as const).map(role => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                filterRole === role
                  ? 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white shadow-lg'
                  : 'glass-card text-gray-700 dark:text-gray-300 hover:shadow-lg'
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-3 text-sm font-bold text-gray-700 dark:text-gray-300">User</th>
              <th className="text-left p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Email</th>
              <th className="text-left p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Role</th>
              <th className="text-left p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Status</th>
              <th className="text-left p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Registered</th>
              <th className="text-center p-3 text-sm font-bold text-gray-700 dark:text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              const RoleIcon = roleConfig[user.role].icon;
              return (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleConfig[user.role].color} flex items-center justify-center`}>
                        <RoleIcon size={18} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${roleConfig[user.role].color} text-white`}>
                      {roleConfig[user.role].label}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        user.status === 'active'
                          ? 'bg-kenya-green/20 text-kenya-green hover:bg-kenya-green/30'
                          : 'bg-gray-500/20 text-gray-600 dark:text-gray-400 hover:bg-gray-500/30'
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 glass-card rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Edit2 size={16} className="text-blue-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 glass-card rounded-lg hover:bg-kenya-red/20 transition-colors"
                      >
                        <Trash2 size={16} className="text-kenya-red" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex gap-4 text-sm">
          <span className="text-gray-700 dark:text-gray-300">
            <strong>{users.filter(u => u.role === 'student').length}</strong> Students
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            <strong>{users.filter(u => u.role === 'teacher').length}</strong> Teachers
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            <strong>{users.filter(u => u.role === 'admin').length}</strong> Admins
          </span>
        </div>
      </div>
    </motion.div>
  );
};
