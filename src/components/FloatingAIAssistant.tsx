import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Mic, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello John! 👋 I\'m your AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('grade') || lowerInput.includes('gpa')) {
      return 'Your current GPA is 3.85. You\'re doing great! Would you like to see a detailed breakdown of your grades?';
    } else if (lowerInput.includes('assignment') || lowerInput.includes('due')) {
      return 'You have 3 assignments due this week: Database Project (2 days), Algorithm Assignment (4 days), and Mobile App Prototype (1 week).';
    } else if (lowerInput.includes('schedule') || lowerInput.includes('class')) {
      return 'Your next class is Data Structures & Algorithms on Monday at 10:00 AM with Dr. Sarah Wanjiku.';
    } else {
      return 'I can help you with grades, assignments, schedules, and more. What would you like to know?';
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setPosition({
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    });
  };

  const quickActions = [
    'Show my grades',
    'What\'s due soon?',
    'My schedule',
    'Study tips',
  ];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-kenya-pink via-kenya-red to-orange-500 rounded-full shadow-2xl flex items-center justify-center text-white group"
            style={{
              boxShadow: '0 0 30px rgba(233, 30, 99, 0.6)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Sparkles size={28} />
            </motion.div>

            {/* Pulse ring */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-kenya-pink rounded-full"
            />

            {/* Notification badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center"
            >
              <span className="text-xs text-white font-bold">3</span>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={constraintsRef}
            initial={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 100, y: 100 }}
            drag
            dragMomentum={false}
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
            style={{
              boxShadow: '0 0 40px rgba(233, 30, 99, 0.3)',
            }}
          >
            {/* Header */}
            <motion.div
              className="bg-gradient-to-r from-kenya-pink via-kenya-red to-orange-500 p-4 cursor-move"
              drag
              dragMomentum={false}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">AI Assistant</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="text-white" size={20} />
                </motion.button>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-none shadow-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-md">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6,
                            delay: i * 0.1,
                          }}
                          className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInputValue(action)}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Paperclip size={20} className="text-gray-500 dark:text-gray-400" />
                </motion.button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl outline-none text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Mic size={20} className="text-gray-500 dark:text-gray-400" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gradient-to-r from-kenya-pink to-kenya-red rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
