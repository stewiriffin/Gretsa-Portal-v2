import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 3.8, expenses: 2.1 },
  { month: 'Feb', revenue: 4.2, expenses: 2.3 },
  { month: 'Mar', revenue: 3.9, expenses: 2.0 },
  { month: 'Apr', revenue: 4.5, expenses: 2.4 },
  { month: 'May', revenue: 5.1, expenses: 2.6 },
  { month: 'Jun', revenue: 4.8, expenses: 2.5 },
];

export const FinancialOverview = () => {
  const totalRevenue = 45.2;
  const totalExpenses = 28.7;
  const netIncome = totalRevenue - totalExpenses;
  const profitMargin = ((netIncome / totalRevenue) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-strong rounded-2xl p-6 shadow-3d-strong"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <DollarSign className="text-kenya-green" size={24} />
          Financial Overview (2024)
        </h2>
        <button className="px-4 py-2 glass-card rounded-lg text-sm font-semibold text-gray-900 dark:text-white hover:shadow-3d transition-all">
          Download Report
        </button>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} className="text-kenya-green" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-kenya-green">KES {totalRevenue}M</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            +8.3% from last year
          </p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={18} className="text-kenya-red" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
          </div>
          <p className="text-2xl font-bold text-kenya-red">KES {totalExpenses}M</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            +5.1% from last year
          </p>
        </div>

        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={18} className="text-purple-600" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Net Income</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">KES {netIncome.toFixed(1)}M</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {profitMargin}% profit margin
          </p>
        </div>
      </div>

      {/* Revenue vs Expenses Chart */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">
          Revenue vs Expenses (Monthly, KES Millions)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#15803D" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#15803D" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B91C1C" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#B91C1C" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <YAxis
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                label={{ value: 'KES (M)', angle: -90, position: 'insideLeft', fill: '#9CA3AF', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#15803D"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#B91C1C"
                strokeWidth={2}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Fee Collection Status */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-lg p-4">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Fee Collection Status</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Collected</span>
              <span className="font-bold text-kenya-green">KES 38.5M (85%)</span>
            </div>
            <div className="h-2 bg-white/20 dark:bg-black/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-kenya-green to-emerald-600 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600 dark:text-gray-400">Pending</span>
              <span className="font-bold text-kenya-red">KES 6.7M (15%)</span>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-lg p-4">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Payment Methods</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">M-Pesa</span>
              <span className="font-bold text-gray-900 dark:text-white">62%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Bank Transfer</span>
              <span className="font-bold text-gray-900 dark:text-white">28%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Cash</span>
              <span className="font-bold text-gray-900 dark:text-white">10%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
