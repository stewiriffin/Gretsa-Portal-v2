import { motion } from 'framer-motion';
import { DollarSign, Download, CreditCard, Clock } from 'lucide-react';
import { MPesaPayment } from '../../components/MPesaPayment';

export const StudentFinancials = () => {
  const feeBreakdown = [
    { item: 'Tuition Fee', amount: 45000, status: 'paid' },
    { item: 'Library Fee', amount: 2000, status: 'paid' },
    { item: 'Lab Fee', amount: 3000, status: 'pending' },
    { item: 'Sports & Recreation', amount: 1500, status: 'pending' },
  ];

  const paymentHistory = [
    { date: '2025-12-15', amount: 30000, method: 'M-Pesa', status: 'completed' },
    { date: '2025-11-20', amount: 17000, method: 'Bank Transfer', status: 'completed' },
    { date: '2025-10-10', amount: 15000, method: 'M-Pesa', status: 'completed' },
  ];

  const totalPaid = feeBreakdown.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  const totalPending = feeBreakdown.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Fee Management
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your fees and payment history
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Receipt
        </button>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5" />
            <h3 className="text-sm font-semibold opacity-90">Paid</h3>
          </div>
          <div className="text-3xl font-bold">KES {totalPaid.toLocaleString()}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="text-sm font-semibold opacity-90">Pending</h3>
          </div>
          <div className="text-3xl font-bold">KES {totalPending.toLocaleString()}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-5 h-5" />
            <h3 className="text-sm font-semibold opacity-90">Total</h3>
          </div>
          <div className="text-3xl font-bold">KES {(totalPaid + totalPending).toLocaleString()}</div>
        </motion.div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Fee Breakdown
        </h3>
        <div className="space-y-3">
          {feeBreakdown.map((fee, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{fee.item}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  KES {fee.amount.toLocaleString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                fee.status === 'paid'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
              }`}>
                {fee.status === 'paid' ? 'Paid' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* M-Pesa Payment */}
      <MPesaPayment />

      {/* Payment History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Payment History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Method</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{payment.date}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
                    KES {payment.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{payment.method}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
