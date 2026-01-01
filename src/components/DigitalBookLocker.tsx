import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookOpen, Scan, CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { useLibraryLoans } from '../hooks/useLibraryLoans';

export const DigitalBookLocker = () => {
  const {
    books,
    isLoading,
    checkoutBook,
    returnBook,
    isCheckingOut,
    isReturning,
    getCheckedOutBooks,
    getOverdueBooks,
    getTotalFines,
    calculateFine,
    isRenewable,
  } = useLibraryLoans();

  const [rfidInput, setRfidInput] = useState('');
  const [scanningMode, setScanningMode] = useState<'checkout' | 'return'>('checkout');
  const [isScanning, setIsScanning] = useState(false);

  const checkedOutBooks = getCheckedOutBooks();
  const overdueBooks = getOverdueBooks();
  const totalFines = getTotalFines();

  const simulateRFIDScan = () => {
    setIsScanning(true);
    // Simulate RFID scan delay
    setTimeout(() => {
      setIsScanning(false);
      // Generate random RFID tag
      const rfidTag = `RFID-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setRfidInput(rfidTag);
    }, 1500);
  };

  const handleCheckout = () => {
    if (!rfidInput.trim()) return;
    // For demo, check out the first available book
    const availableBook = books.find((b) => !b.checkedOut);
    if (availableBook) {
      checkoutBook({ bookId: availableBook.id, rfidTag: rfidInput });
      setRfidInput('');
    }
  };

  const handleReturn = () => {
    if (!rfidInput.trim()) return;
    // For demo, return the first checked out book
    const checkedOut = checkedOutBooks[0];
    if (checkedOut) {
      returnBook(checkedOut.id);
      setRfidInput('');
    }
  };

  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-KE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysOverdue = (dueDate: string | null) => {
    if (!dueDate) return 0;
    const days = Math.floor(
      (new Date().getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(0, days);
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
          <div className="space-y-3">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-kenya-green to-green-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Digital Book Locker
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            RFID-enabled self-service checkout
          </p>
        </div>
      </div>

      {/* Fines Alert */}
      {totalFines > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">
                Outstanding Fines
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400">
                You have <span className="font-bold">KES {totalFines}</span> in overdue fines.
                Please pay at the library desk.
              </p>
              <p className="text-xs text-red-600 dark:text-red-500 mt-1">
                {overdueBooks.length} overdue {overdueBooks.length === 1 ? 'book' : 'books'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* RFID Scanner */}
      <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setScanningMode('checkout')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              scanningMode === 'checkout'
                ? 'bg-kenya-green text-white shadow-lg'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Checkout
          </button>
          <button
            onClick={() => setScanningMode('return')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              scanningMode === 'return'
                ? 'bg-kenya-pink text-white shadow-lg'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Return
          </button>
        </div>

        {/* RFID Input */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
            RFID Tag
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={rfidInput}
              onChange={(e) => setRfidInput(e.target.value)}
              placeholder="Place book on scanner..."
              className="flex-1 px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-kenya-green"
              disabled={isScanning || isCheckingOut || isReturning}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={simulateRFIDScan}
              disabled={isScanning || isCheckingOut || isReturning}
              className="px-4 py-3 bg-gradient-to-r from-kenya-green to-green-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Scan className={`w-5 h-5 ${isScanning ? 'animate-pulse' : ''}`} />
            </motion.button>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={scanningMode === 'checkout' ? handleCheckout : handleReturn}
          disabled={!rfidInput || isCheckingOut || isReturning}
          className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
            scanningMode === 'checkout'
              ? 'bg-gradient-to-r from-kenya-green to-green-600 hover:from-green-700 hover:to-green-700'
              : 'bg-gradient-to-r from-kenya-pink to-pink-600 hover:from-pink-700 hover:to-pink-700'
          }`}
        >
          {isCheckingOut || isReturning
            ? 'Processing...'
            : scanningMode === 'checkout'
            ? 'Check Out Book'
            : 'Return Book'}
        </motion.button>

        {/* Scanning Animation */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-kenya-green font-semibold"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Scan className="w-5 h-5" />
              </motion.div>
              <span>Scanning RFID tag...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Checked Out Books */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          Your Books ({checkedOutBooks.length})
        </h4>

        {checkedOutBooks.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
            No books checked out
          </div>
        ) : (
          <div className="space-y-3">
            {checkedOutBooks.map((book) => {
              const fine = calculateFine(book.id);
              const isOverdue = fine > 0;
              const daysOverdue = getDaysOverdue(book.dueDate);

              return (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border-2 ${
                    isOverdue
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                      : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h5 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {book.title}
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {book.author}
                      </p>
                    </div>
                    {isOverdue ? (
                      <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Due: {formatDueDate(book.dueDate)}</span>
                    </div>
                    {isOverdue && (
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{daysOverdue} days overdue • KES {fine}</span>
                      </div>
                    )}
                  </div>

                  {isRenewable(book) && !isOverdue && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <button className="text-xs text-kenya-green font-semibold hover:underline">
                        Renew ({book.maxRenewals - book.renewalCount} renewals left)
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
