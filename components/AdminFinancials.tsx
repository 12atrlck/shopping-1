import React, { useMemo, useState, useEffect } from 'react';
import { Sale } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { generateBusinessInsight } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

interface AdminFinancialsProps {
  sales: Sale[];
}

const COLORS = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export const AdminFinancials: React.FC<AdminFinancialsProps> = ({ sales }) => {
  const [aiInsight, setAiInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(false);

  // 1. Total Revenue & Orders
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalOrders = sales.length;

  // 2. Sales per day (for BarChart)
  const salesData = useMemo(() => {
    const grouped: Record<string, number> = {};
    sales.forEach(sale => {
      // Use local date string for grouping
      const date = new Date(sale.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      grouped[date] = (grouped[date] || 0) + sale.totalAmount;
    });
    return Object.keys(grouped).map(key => ({ date: key, revenue: grouped[key] }));
  }, [sales]);

  // 3. Revenue by User (for PieChart)
  const userRevenueData = useMemo(() => {
    const grouped: Record<string, number> = {};
    sales.forEach(sale => {
      grouped[sale.userName] = (grouped[sale.userName] || 0) + sale.totalAmount;
    });
    return Object.keys(grouped).map(key => ({ name: key, value: grouped[key] }));
  }, [sales]);

  const handleGenerateInsight = async () => {
    setLoadingInsight(true);
    const text = await generateBusinessInsight(sales);
    setAiInsight(text);
    setLoadingInsight(false);
  };

  // Generate insight automatically on mount if data exists and haven't generated
  useEffect(() => {
      if(sales.length > 0 && !aiInsight) {
          // optional: could auto-generate, but let's make it a button to save tokens/calls
      }
  }, [sales, aiInsight]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Revenue</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-indigo-600">${totalRevenue.toFixed(2)}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{totalOrders}</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Order Value</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
            ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
          </dd>
        </div>
      </div>

      {/* AI Insight Section */}
      <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-6 border border-indigo-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-indigo-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-600" />
            AI Business Analyst
          </h3>
          <button 
            onClick={handleGenerateInsight}
            disabled={loadingInsight}
            className="text-sm bg-white text-indigo-600 px-3 py-1 rounded border border-indigo-200 hover:bg-indigo-50 transition-colors disabled:opacity-50"
          >
            {loadingInsight ? 'Analyzing...' : 'Update Analysis'}
          </button>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">
          {aiInsight || "Click 'Update Analysis' to get a Gemini-powered breakdown of your sales performance and actionable growth tips."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="mb-6 text-lg font-medium text-gray-900">Revenue Trends</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="mb-6 text-lg font-medium text-gray-900">Top Customers (by Revenue)</h3>
          <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};