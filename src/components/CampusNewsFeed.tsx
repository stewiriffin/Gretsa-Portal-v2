import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Calendar, Trophy, Users, Newspaper } from 'lucide-react';
import { useState } from 'react';

interface NewsItem {
  id: string;
  type: 'news' | 'event' | 'sports' | 'club';
  title: string;
  description: string;
  image?: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  height: number; // For masonry layout
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    type: 'news',
    title: 'GRETSA Wins National Hackathon',
    description: 'Our Computer Science team secured 1st place at the Kenya Universities Tech Challenge!',
    author: 'Dr. Kamau',
    timestamp: '2 hours ago',
    likes: 124,
    comments: 18,
    category: 'Achievement',
    height: 280,
  },
  {
    id: '2',
    type: 'event',
    title: 'Career Fair 2024',
    description: '50+ companies recruiting! Meet industry leaders, attend workshops, and secure internships.',
    author: 'Career Center',
    timestamp: '5 hours ago',
    likes: 89,
    comments: 12,
    category: 'Events',
    height: 320,
  },
  {
    id: '3',
    type: 'sports',
    title: 'Basketball Finals Tomorrow!',
    description: 'GRETSA vs. Kenyatta University. Come support our team at 4 PM!',
    author: 'Sports Club',
    timestamp: '1 day ago',
    likes: 156,
    comments: 24,
    category: 'Sports',
    height: 250,
  },
  {
    id: '4',
    type: 'club',
    title: 'Coding Club Workshop: React Masterclass',
    description: 'Learn advanced React patterns with industry experts. Limited seats available!',
    author: 'Coding Club',
    timestamp: '1 day ago',
    likes: 92,
    comments: 15,
    category: 'Workshop',
    height: 300,
  },
  {
    id: '5',
    type: 'news',
    title: 'New Library Wing Opening',
    description: 'State-of-the-art study spaces with 24/7 access and high-speed WiFi.',
    author: 'University Admin',
    timestamp: '2 days ago',
    likes: 201,
    comments: 34,
    category: 'Facilities',
    height: 270,
  },
  {
    id: '6',
    type: 'event',
    title: 'Cultural Week Celebration',
    description: 'Experience Kenya\'s diverse cultures through music, food, and traditional performances!',
    author: 'Student Council',
    timestamp: '3 days ago',
    likes: 178,
    comments: 29,
    category: 'Culture',
    height: 340,
  },
];

const typeConfig = {
  news: { icon: Newspaper, color: 'from-blue-500 to-cyan-500', emoji: '📰' },
  event: { icon: Calendar, color: 'from-purple-500 to-pink-500', emoji: '📅' },
  sports: { icon: Trophy, color: 'from-kenya-green to-emerald-600', emoji: '⚽' },
  club: { icon: Users, color: 'from-kenya-pink to-kenya-red', emoji: '🎯' },
};

export const CampusNewsFeed = () => {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Newspaper className="text-kenya-pink" size={24} />
          Campus News Feed
        </h2>
        <div className="flex gap-2">
          {Object.entries(typeConfig).map(([key, config]) => (
            <button
              key={key}
              className="px-3 py-1 glass-card rounded-full text-xs font-semibold hover:shadow-lg transition-all"
            >
              {config.emoji} {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {newsItems.map((item, index) => {
          const config = typeConfig[item.type];
          const isLiked = likedItems.has(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="break-inside-avoid mb-4"
              style={{ height: `${item.height}px` }}
            >
              <div className="glass-card rounded-xl p-4 h-full flex flex-col cursor-pointer hover:shadow-3d transition-all">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${config.color} shadow-lg`}>
                    {config.emoji} {item.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">{item.author}</span>
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleLike(item.id)}
                        className="flex items-center gap-1"
                      >
                        <Heart
                          size={16}
                          className={isLiked ? 'fill-kenya-red text-kenya-red' : ''}
                        />
                        <span>{item.likes + (isLiked ? 1 : 0)}</span>
                      </motion.button>
                      <button className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span>{item.comments}</span>
                      </button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Share2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-xl font-semibold shadow-lg"
        >
          Load More News
        </motion.button>
      </div>
    </motion.div>
  );
};
