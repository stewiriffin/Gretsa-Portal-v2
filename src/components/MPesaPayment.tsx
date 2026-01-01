import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, CreditCard, CheckCircle2, XCircle, Download, Loader2, Clock } from 'lucide-react';
import Confetti from 'react-confetti';

interface PaymentItem {
  id: string;
  description: string;
  amount: number;
}

type PaymentStatus = 'idle' | 'processing' | 'pending' | 'success' | 'failed';

const paymentItems: PaymentItem[] = [
  { id: '1', description: 'Semester Tuition Fee', amount: 45000 },
  { id: '2', description: 'Library Fee', amount: 2500 },
  { id: '3', description: 'Lab Fee', amount: 5000 },
  { id: '4', description: 'Exam Fee', amount: 3500 },
];

export const MPesaPayment = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['1']);
  const [phoneNumber, setPhoneNumber] = useState('0712345678');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [transactionId, setTransactionId] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [showConfetti, setShowConfetti] = useState(false);

  const totalAmount = paymentItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.amount, 0);

  // Window size for confetti
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate STK push countdown
  useEffect(() => {
    if (paymentStatus === 'pending' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (paymentStatus === 'pending' && countdown === 0) {
      // Simulate timeout
      setPaymentStatus('failed');
    }
  }, [paymentStatus, countdown]);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const initiatePayment = () => {
    setPaymentStatus('processing');

    // Simulate API call delay
    setTimeout(() => {
      setPaymentStatus('pending');
      setCountdown(60);
      const txId = 'MPX' + Math.random().toString(36).substring(2, 12).toUpperCase();
      setTransactionId(txId);
    }, 1500);
  };

  const simulateSuccess = () => {
    setPaymentStatus('success');
    setShowConfetti(true);
    // Hide confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const simulateFailed = () => {
    setPaymentStatus('failed');
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setTransactionId('');
    setCountdown(60);
  };

  const downloadReceipt = () => {
    // Simulate receipt download
    alert('Receipt downloaded! Transaction ID: ' + transactionId);
  };

  return (
    <>
      {/* Confetti Explosion on Success */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#B91C1C', '#15803D', '#E91E63', '#FFD700', '#FF6B6B']}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card-strong rounded-2xl p-6 shadow-3d-strong max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Smartphone className="text-green-600" size={24} />
            M-Pesa Payment
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
          </div>
        </div>

      <AnimatePresence mode="wait">
        {paymentStatus === 'idle' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Payment Items Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Select Items to Pay
              </h3>
              <div className="space-y-2">
                {paymentItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01, x: 3 }}
                    onClick={() => toggleItem(item.id)}
                    className={`glass-card rounded-lg p-4 cursor-pointer transition-all ${
                      selectedItems.includes(item.id)
                        ? 'ring-2 ring-green-600 bg-green-50/20 dark:bg-green-900/20'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            selectedItems.includes(item.id)
                              ? 'bg-green-600'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          {selectedItems.includes(item.id) && (
                            <CheckCircle2 size={14} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        KES {item.amount.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">
                M-Pesa Phone Number
              </label>
              <div className="flex items-center gap-2 glass-card rounded-lg p-3">
                <Smartphone size={18} className="text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">+254</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="712345678"
                  className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white font-medium"
                  maxLength={10}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                You will receive an STK push to this number
              </p>
            </div>

            {/* Total Amount */}
            <div className="glass-card-strong rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-green-600">
                  KES {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={initiatePayment}
              disabled={selectedItems.length === 0 || !phoneNumber}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              Pay with M-Pesa
            </motion.button>
          </motion.div>
        )}

        {paymentStatus === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="inline-block mb-4"
            >
              <Loader2 size={48} className="text-green-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Initiating Payment...
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please wait while we connect to M-Pesa
            </p>
          </motion.div>
        )}

        {paymentStatus === 'pending' && (
          <motion.div
            key="pending"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-block mb-4"
            >
              <Smartphone size={64} className="text-green-600" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              STK Push Sent!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Check your phone and enter your M-Pesa PIN
            </p>

            {/* Countdown Timer */}
            <div className="glass-card-strong rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={18} className="text-orange-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Time Remaining
                </span>
              </div>
              <motion.p
                animate={{ scale: countdown <= 10 ? [1, 1.1, 1] : 1 }}
                transition={{ repeat: countdown <= 10 ? Infinity : 0, duration: 1 }}
                className={`text-4xl font-bold ${
                  countdown <= 10 ? 'text-orange-500' : 'text-green-600'
                }`}
              >
                {countdown}s
              </motion.p>
            </div>

            {/* Transaction ID */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Transaction ID: <span className="font-mono font-semibold">{transactionId}</span>
            </p>

            {/* Simulation Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateSuccess}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                ✓ Simulate Success
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateFailed}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold shadow-lg"
              >
                ✗ Simulate Failure
              </motion.button>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <CheckCircle2 size={64} className="text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Your payment has been processed successfully
            </p>

            {/* Receipt Details */}
            <div className="glass-card-strong rounded-xl p-6 mb-6 text-left">
              <h4 className="font-bold text-gray-800 dark:text-white mb-4">Payment Receipt</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Transaction ID</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">
                    {transactionId}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Phone Number</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    +254{phoneNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Amount Paid</span>
                  <span className="font-bold text-green-600">KES {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Date & Time</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={downloadReceipt}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Receipt
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetPayment}
                className="glass-card-strong text-gray-900 dark:text-white py-3 rounded-lg font-semibold border border-white/30"
              >
                New Payment
              </motion.button>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'failed' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-block mb-4"
            >
              <XCircle size={64} className="text-red-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {countdown === 0
                ? 'Payment request timed out. Please try again.'
                : 'Payment was cancelled or declined. Please try again.'}
            </p>

            {/* Retry Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetPayment}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg px-8"
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Footer */}
      <div className="mt-6 pt-6 border-t border-white/20 dark:border-gray-700">
        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
          🔒 Secure M-Pesa Payment Gateway • Powered by Safaricom
        </p>
      </div>
      </motion.div>
    </>
  );
};
