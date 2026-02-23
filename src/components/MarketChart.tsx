import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { type Coin } from '../types/crypto';

interface MarketChartProps {
  data: Coin[];
}

export const MarketChart = ({ data }: MarketChartProps) => {
  // We only want to show the top 5 for a clean chart
  const chartData = data.slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
      <h3 className="text-lg font-bold mb-4 text-slate-800">Top Assets by Price (USD)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="symbol" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            className="uppercase"
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            cursor={{ fill: '#f8fafc' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar 
            dataKey="current_price" 
            fill="#3b82f6" 
            radius={[4, 4, 0, 0]} 
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};