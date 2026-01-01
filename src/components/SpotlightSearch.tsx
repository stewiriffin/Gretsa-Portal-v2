import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Calendar, FileText, Users, Trophy, X, Command } from 'lucide-react';
import Fuse from 'fuse.js';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'course' | 'assignment' | 'event' | 'person' | 'achievement';
  icon: React.ReactNode;
}

const searchData: SearchItem[] = [
  { id: '1', title: 'Data Structures & Algorithms', description: 'Dr. Sarah Wanjiku', category: 'course', icon: <BookOpen size={20} /> },
  { id: '2', title: 'Web Development', description: 'Prof. James Ochieng', category: 'course', icon: <BookOpen size={20} /> },
  { id: '3', title: 'Database Assignment', description: 'Due in 2 days', category: 'assignment', icon: <FileText size={20} /> },
  { id: '4', title: 'Mid-term Exams', description: 'Starting next week', category: 'event', icon: <Calendar size={20} /> },
  { id: '5', title: 'Study Group Meeting', description: 'Tomorrow 3 PM', category: 'event', icon: <Users size={20} /> },
  { id: '6', title: 'Dean\'s List', description: 'Achievement unlocked', category: 'achievement', icon: <Trophy size={20} /> },
];

const fuse = new Fuse(searchData, {
  keys: ['title', 'description'],
  threshold: 0.3,
  includeScore: true,
});

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpotlightSearch = ({ isOpen, onClose }: SpotlightSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>(searchData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchData);
    } else {
      const searchResults = fuse.search(query);
      setResults(searchResults.map(result => result.item));
    }
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (item: SearchItem) => {
    console.log('Selected:', item);
    onClose();
    setQuery('');
  };

  const categoryColors = {
    course: 'text-kenya-red dark:text-red-400',
    assignment: 'text-kenya-pink dark:text-pink-400',
    event: 'text-kenya-green dark:text-green-400',
    person: 'text-blue-600 dark:text-blue-400',
    achievement: 'text-yellow-600 dark:text-yellow-400',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Search Modal */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-gray-200 dark:border-gray-700"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
                <Search className="text-gray-400" size={24} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses, assignments, events..."
                  className="flex-1 bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder:text-gray-400"
                />
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                    ESC
                  </kbd>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </motion.button>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto">
                {results.length > 0 ? (
                  <div className="p-2">
                    {results.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                          selectedIndex === index
                            ? 'bg-gray-100 dark:bg-gray-800 scale-[1.02]'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${categoryColors[item.category]} bg-current/10`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 capitalize">
                          {item.category}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No results found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">↑</kbd>
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">↵</kbd>
                    <span>Select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                  <Command size={12} />
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-900 rounded border border-gray-300 dark:border-gray-600">K</kbd>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export const useSpotlightSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
};
