import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, User, Circle, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: 'classmate' | 'department' | 'teacher';
  online: boolean;
  lastMessage: string;
  unread: number;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Kamau',
    avatar: '👨‍🎓',
    role: 'classmate',
    online: true,
    lastMessage: 'Did you finish the assignment?',
    unread: 2,
  },
  {
    id: '2',
    name: 'Dr. Omondi',
    avatar: '👨‍🏫',
    role: 'department',
    online: true,
    lastMessage: 'Department meeting tomorrow at 10 AM',
    unread: 1,
  },
  {
    id: '3',
    name: 'Grace Wanjiru',
    avatar: '👩‍🎓',
    role: 'classmate',
    online: false,
    lastMessage: 'Thanks for the study notes!',
    unread: 0,
  },
  {
    id: '4',
    name: 'Prof. Mwangi',
    avatar: '👨‍🏫',
    role: 'teacher',
    online: true,
    lastMessage: 'Office hours this Friday',
    unread: 0,
  },
  {
    id: '5',
    name: 'Lucy Akinyi',
    avatar: '👩‍🎓',
    role: 'classmate',
    online: true,
    lastMessage: 'See you at the library!',
    unread: 0,
  },
];

const mockMessageThreads: Record<string, Message[]> = {
  '1': [
    { id: 'm1', senderId: '1', text: 'Hey! Are you going to the lecture today?', timestamp: new Date(Date.now() - 3600000), isOwn: false },
    { id: 'm2', senderId: 'me', text: 'Yes, I\'ll be there at 2 PM', timestamp: new Date(Date.now() - 3000000), isOwn: true },
    { id: 'm3', senderId: '1', text: 'Did you finish the assignment?', timestamp: new Date(Date.now() - 1800000), isOwn: false },
  ],
  '2': [
    { id: 'm4', senderId: '2', text: 'Good morning students. Department meeting tomorrow at 10 AM in room 204.', timestamp: new Date(Date.now() - 7200000), isOwn: false },
    { id: 'm5', senderId: '2', text: 'Please bring your project proposals.', timestamp: new Date(Date.now() - 7100000), isOwn: false },
  ],
  '3': [
    { id: 'm6', senderId: 'me', text: 'Here are the study notes from today\'s class', timestamp: new Date(Date.now() - 86400000), isOwn: true },
    { id: 'm7', senderId: '3', text: 'Thanks for the study notes!', timestamp: new Date(Date.now() - 82800000), isOwn: false },
  ],
  '4': [
    { id: 'm8', senderId: '4', text: 'Office hours this Friday from 2-4 PM. Feel free to drop by with questions.', timestamp: new Date(Date.now() - 172800000), isOwn: false },
  ],
  '5': [
    { id: 'm9', senderId: '5', text: 'Study group at the library tonight?', timestamp: new Date(Date.now() - 10800000), isOwn: false },
    { id: 'm10', senderId: 'me', text: 'Sounds good! What time?', timestamp: new Date(Date.now() - 9000000), isOwn: true },
    { id: 'm11', senderId: '5', text: 'See you at the library!', timestamp: new Date(Date.now() - 7200000), isOwn: false },
  ],
};

const simulatedMessages = [
  { contactId: '1', text: 'I just submitted it. Want to compare answers?' },
  { contactId: '2', text: 'Reminder: Tomorrow\'s meeting is mandatory for all CS students.' },
  { contactId: '5', text: 'Can you help me with question 3?' },
  { contactId: '4', text: 'Next week\'s exam will cover chapters 5-7.' },
];

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer = ({ isOpen, onClose }: ChatDrawerProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessageThreads);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const simulationIntervalRef = useRef<NodeJS.Timeout>();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  // Simulate incoming messages
  useEffect(() => {
    if (isOpen) {
      let messageIndex = 0;

      simulationIntervalRef.current = setInterval(() => {
        if (messageIndex < simulatedMessages.length) {
          const { contactId, text } = simulatedMessages[messageIndex];
          const contact = contacts.find(c => c.id === contactId);

          if (contact) {
            const newMessage: Message = {
              id: `sim-${Date.now()}`,
              senderId: contactId,
              text,
              timestamp: new Date(),
              isOwn: false,
            };

            // Add message to thread
            setMessages(prev => ({
              ...prev,
              [contactId]: [...(prev[contactId] || []), newMessage],
            }));

            // Update contact's last message and unread count
            setContacts(prev =>
              prev.map(c =>
                c.id === contactId
                  ? { ...c, lastMessage: text, unread: selectedContact?.id === contactId ? 0 : c.unread + 1 }
                  : c
              )
            );

            // Show toast notification if chat is not currently open with this contact
            if (selectedContact?.id !== contactId) {
              toast.info(`${contact.avatar} ${contact.name}`, {
                description: text,
                duration: 4000,
              });
            }
          }

          messageIndex++;
        }
      }, 15000); // Every 15 seconds

      return () => {
        if (simulationIntervalRef.current) {
          clearInterval(simulationIntervalRef.current);
        }
      };
    }
  }, [isOpen, selectedContact, contacts]);

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedContact) {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: 'me',
        text: inputValue.trim(),
        timestamp: new Date(),
        isOwn: true,
      };

      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
      }));

      // Update contact's last message
      setContacts(prev =>
        prev.map(c => (c.id === selectedContact.id ? { ...c, lastMessage: inputValue.trim() } : c))
      );

      setInputValue('');
    }
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    // Mark messages as read
    setContacts(prev => prev.map(c => (c.id === contact.id ? { ...c, unread: 0 } : c)));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Chat Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] glass-card-strong shadow-3d-strong z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-kenya-pink/20 to-kenya-red/20">
              <div className="flex items-center gap-3">
                <MessageCircle className="text-kenya-pink" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedContact ? selectedContact.name : 'Messages'}
                  </h2>
                  {selectedContact && (
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Circle
                        size={8}
                        className={selectedContact.online ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}
                      />
                      {selectedContact.online ? 'Online' : 'Offline'}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedContact && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 glass-card rounded-lg hover:bg-white/10"
                    >
                      <Phone size={18} className="text-gray-700 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 glass-card rounded-lg hover:bg-white/10"
                    >
                      <Video size={18} className="text-gray-700 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 glass-card rounded-lg hover:bg-white/10"
                    >
                      <MoreVertical size={18} className="text-gray-700 dark:text-gray-300" />
                    </motion.button>
                  </>
                )}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 glass-card rounded-lg hover:bg-kenya-red/20"
                >
                  <X size={20} className="text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            {!selectedContact ? (
              /* Contact List View */
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Search Bar */}
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 glass-card rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kenya-pink/50 text-gray-900 dark:text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Contact List */}
                <div className="flex-1 overflow-y-auto px-2">
                  {filteredContacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleContactClick(contact)}
                      className="p-3 mb-2 glass-card rounded-xl cursor-pointer hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-kenya-pink to-kenya-red flex items-center justify-center text-2xl">
                            {contact.avatar}
                          </div>
                          <Circle
                            size={12}
                            className={`absolute bottom-0 right-0 ${
                              contact.online ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'
                            }`}
                          />
                        </div>

                        {/* Contact Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                              {contact.name}
                            </h3>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              {formatTime(new Date(Date.now() - Math.random() * 86400000))}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {contact.lastMessage}
                            </p>
                            {contact.unread > 0 && (
                              <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-full text-[10px] font-bold">
                                {contact.unread}
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 ${
                            contact.role === 'classmate' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                            contact.role === 'department' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
                            'bg-green-500/20 text-green-600 dark:text-green-400'
                          }`}>
                            {contact.role === 'classmate' ? '👥 Classmate' :
                             contact.role === 'department' ? '🏛️ Department' :
                             '👨‍🏫 Teacher'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              /* Chat Thread View */
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Back Button */}
                <div className="p-2 border-b border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02, x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedContact(null)}
                    className="text-sm text-kenya-pink hover:text-kenya-red font-semibold"
                  >
                    ← Back to conversations
                  </motion.button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {(messages[selectedContact.id] || []).map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl ${
                          message.isOwn
                            ? 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-br-none'
                            : 'glass-card text-gray-900 dark:text-white rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-[10px] mt-1 ${
                          message.isOwn ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 px-4 py-2 glass-card rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kenya-pink/50 text-gray-900 dark:text-white placeholder-gray-500"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="p-3 bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
