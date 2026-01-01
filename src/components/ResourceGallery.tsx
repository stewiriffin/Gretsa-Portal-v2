import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Video,
  FileCode,
  Image as ImageIcon,
  Download,
  Eye,
  Filter,
  Search,
  FolderOpen,
  Archive,
} from 'lucide-react';

type ResourceType = 'pdf' | 'video' | 'code' | 'image' | 'all';

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  course: string;
  size: string;
  date: string;
  thumbnail?: string;
  downloads: number;
  height: number; // For masonry layout
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Data Structures Lecture Notes.pdf',
    type: 'pdf',
    course: 'Data Structures',
    size: '2.4 MB',
    date: '2 days ago',
    downloads: 45,
    height: 280,
  },
  {
    id: '2',
    title: 'Introduction to React Hooks',
    type: 'video',
    course: 'Web Development',
    size: '145 MB',
    date: '1 week ago',
    downloads: 78,
    height: 320,
  },
  {
    id: '3',
    title: 'Binary Search Tree Implementation',
    type: 'code',
    course: 'Algorithms',
    size: '12 KB',
    date: '3 days ago',
    downloads: 56,
    height: 240,
  },
  {
    id: '4',
    title: 'Database Schema Diagram',
    type: 'image',
    course: 'Database Management',
    size: '856 KB',
    date: '5 days ago',
    downloads: 34,
    height: 360,
  },
  {
    id: '5',
    title: 'Network Protocol Stack.pdf',
    type: 'pdf',
    course: 'Computer Networks',
    size: '3.1 MB',
    date: '1 week ago',
    downloads: 62,
    height: 300,
  },
  {
    id: '6',
    title: 'Mobile UI Design Tutorial',
    type: 'video',
    course: 'Mobile Development',
    size: '98 MB',
    date: '4 days ago',
    downloads: 41,
    height: 280,
  },
  {
    id: '7',
    title: 'Quick Sort Algorithm',
    type: 'code',
    course: 'Algorithms',
    size: '8 KB',
    date: '2 weeks ago',
    downloads: 89,
    height: 220,
  },
  {
    id: '8',
    title: 'System Architecture Flowchart',
    type: 'image',
    course: 'Software Engineering',
    size: '1.2 MB',
    date: '6 days ago',
    downloads: 52,
    height: 340,
  },
  {
    id: '9',
    title: 'Advanced SQL Queries.pdf',
    type: 'pdf',
    course: 'Database Management',
    size: '1.8 MB',
    date: '1 day ago',
    downloads: 67,
    height: 260,
  },
  {
    id: '10',
    title: 'CSS Grid & Flexbox Demo',
    type: 'video',
    course: 'Web Development',
    size: '76 MB',
    date: '3 days ago',
    downloads: 73,
    height: 300,
  },
];

const typeIcons = {
  pdf: { icon: FileText, color: 'from-red-500 to-red-600' },
  video: { icon: Video, color: 'from-purple-500 to-purple-600' },
  code: { icon: FileCode, color: 'from-green-500 to-green-600' },
  image: { icon: ImageIcon, color: 'from-blue-500 to-blue-600' },
  all: { icon: FolderOpen, color: 'from-gray-500 to-gray-600' },
};

export const ResourceGallery = () => {
  const [selectedType, setSelectedType] = useState<ResourceType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = resources.filter((resource) => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const downloadAll = () => {
    alert(`Downloading ${filteredResources.length} files as ZIP...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <FolderOpen className="text-kenya-pink" size={24} />
          Resource Gallery
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {filteredResources.length} items
          </span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="flex items-center gap-2 glass-card rounded-lg p-3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Filter size={16} />
            <span>Filter:</span>
          </div>
          {(['all', 'pdf', 'video', 'code', 'image'] as ResourceType[]).map((type) => {
            const { icon: Icon, color } = typeIcons[type];
            return (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                  selectedType === type
                    ? `bg-gradient-to-r ${color} text-white shadow-lg`
                    : 'glass-card text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon size={16} />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </motion.button>
            );
          })}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadAll}
            className="ml-auto px-4 py-2 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2"
          >
            <Archive size={16} />
            Download All as ZIP
          </motion.button>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        <AnimatePresence>
          {filteredResources.map((resource, index) => {
            const { icon: Icon, color } = typeIcons[resource.type];

            return (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="break-inside-avoid mb-4"
              >
                <div
                  className="glass-card-strong rounded-xl overflow-hidden shadow-3d hover:shadow-3d-strong transition-all cursor-pointer group"
                  style={{ height: `${resource.height}px` }}
                  onClick={() => setSelectedResource(resource)}
                >
                  {/* Resource Type Header */}
                  <div className={`p-4 bg-gradient-to-r ${color} text-white flex items-center gap-3`}>
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{resource.title}</p>
                      <p className="text-xs opacity-90">{resource.course}</p>
                    </div>
                  </div>

                  {/* Resource Content Preview */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>{resource.size}</span>
                        <span>{resource.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <Download size={12} />
                        <span>{resource.downloads} downloads</span>
                      </div>
                    </div>

                    {/* Action Buttons - Shown on Hover */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <Eye size={14} />
                        Preview
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <Download size={14} />
                        Download
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">No resources found</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Try adjusting your filters or search query
          </p>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedResource(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-strong rounded-2xl p-6 max-w-md w-full shadow-3d-strong"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedResource.title}
                </h3>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Type</span>
                  <span className="font-semibold text-gray-900 dark:text-white capitalize">
                    {selectedResource.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Course</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedResource.course}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Size</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedResource.size}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Downloads</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedResource.downloads}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Eye size={18} />
                  Open Preview
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
