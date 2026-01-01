import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, Sparkles, Volume2 } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'soma';
  timestamp: Date;
}

const contextualSuggestions = {
  dashboard: ['Show my GPA', 'What are my upcoming deadlines?', 'Check my attendance'],
  courses: ['Help me with this course', 'Show syllabus', 'Find study materials'],
  grades: ['Calculate my final grade', 'What if I score X on the exam?', 'Show grade distribution'],
  assignments: ['When is my next assignment due?', 'Help me prioritize tasks', 'Show completed work'],
  finance: ['How do I pay fees?', 'Check payment history', 'M-Pesa help'],
  schedule: ['When is my next class?', 'Show exam schedule', 'Find free time'],
};

const mockResponses: Record<string, string> = {
  'show my gpa': '📊 Your current GPA is 3.65. You\'re doing great! Keep up the excellent work.',
  'what are my upcoming deadlines': '📅 You have 3 upcoming deadlines:\n1. Database Project - 2 days\n2. Algorithm Assignment - 4 days\n3. Mobile App Prototype - 1 week',
  'check my attendance': '✅ Your overall attendance is 87%. You\'ve missed 3 classes this semester.',
  'help me with m-pesa': '💰 To pay via M-Pesa:\n1. Select fees to pay\n2. Enter your phone number (+254...)\n3. Wait for STK push\n4. Enter your M-Pesa PIN\n5. Confirm payment',
  'when is my next class': '🕐 Your next class is Data Structures & Algorithms at 10:00 AM tomorrow (Monday).',
  'calculate my final grade': '🎯 Based on your current scores, you need 75% on the final exam to maintain an A grade.',
  'default': '🤖 I\'m Soma, your AI learning assistant! I can help you with:\n\n• Course information\n• Grade predictions\n• Schedule management\n• Fee payments\n• Study tips\n\nWhat would you like to know?',
};

export const SomaAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Habari! I\'m Soma, your intelligent learning companion. How can I help you today? 🎓',
      sender: 'soma',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentRole } = useRole();

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect current section (mock implementation)
  useEffect(() => {
    const detectSection = () => {
      const sections = ['dashboard', 'courses', 'grades', 'assignments', 'finance', 'schedule'];
      const visibleSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        }
        return false;
      });
      if (visibleSection) setCurrentSection(visibleSection);
    };

    window.addEventListener('scroll', detectSection);
    return () => window.removeEventListener('scroll', detectSection);
  }, []);

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getAIResponse(messageText.toLowerCase());
      const somaMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'soma',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, somaMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    // Check for exact matches
    for (const [key, response] of Object.entries(mockResponses)) {
      if (query.includes(key)) {
        return response;
      }
    }

    // Context-aware responses
    if (currentSection === 'finance' && (query.includes('pay') || query.includes('fee'))) {
      return mockResponses['help me with m-pesa'];
    }

    return mockResponses['default'];
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Simulate voice recognition
    if (!isListening) {
      setTimeout(() => {
        setInputValue('What are my upcoming deadlines?');
        setIsListening(false);
      }, 2000);
    }
  };

  const getSuggestions = () => {
    return contextualSuggestions[currentSection as keyof typeof contextualSuggestions] || contextualSuggestions.dashboard;
  };

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
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-kenya-pink shadow-3d-strong flex items-center justify-center group"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Sparkles size={28} className="text-white" />
            </motion.div>

            {/* Pulse Ring */}
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-purple-500"
            />

            {/* Badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-kenya-red rounded-full flex items-center justify-center text-white text-xs font-bold">
              AI
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] glass-card-strong rounded-2xl shadow-3d-strong flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-kenya-pink p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <Sparkles size={20} className="text-white" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold">Soma AI</h3>
                  <p className="text-white/80 text-xs">Your Learning Companion</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Context Badge */}
            <div className="px-4 py-2 bg-purple-500/10 border-b border-white/10">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                📍 Currently viewing: <span className="font-semibold capitalize">{currentSection}</span>
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-kenya-pink to-kenya-red text-white'
                        : 'glass-card text-gray-900 dark:text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-[10px] mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass-card rounded-2xl px-4 py-3">
                    <motion.div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                          className="w-2 h-2 bg-purple-600 rounded-full"
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 border-t border-white/10">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick actions:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {getSuggestions().map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-3 py-1 glass-card rounded-full text-xs whitespace-nowrap hover:bg-purple-500/20 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-xl transition-colors ${
                    isListening
                      ? 'bg-kenya-red text-white'
                      : 'glass-card text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {isListening ? <Volume2 size={20} /> : <Mic size={20} />}
                </motion.button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Soma anything..."
                  className="flex-1 px-4 py-3 glass-card rounded-xl text-sm focus:ring-2 focus:ring-purple-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-500"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
