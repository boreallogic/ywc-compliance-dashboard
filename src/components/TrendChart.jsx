import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateTrendData } from '../utils/analytics';
import { loadQuarters } from '../utils/storage';
import { format } from 'date-fns';

const TrendChart = ({ chartType = 'line' }) => {
  const quarters = loadQuarters();
  const trendData = generateTrendData(quarters);
  
  if (trendData.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Trend Analysis</h2>
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p className="text-center">No historical data available yet</p>
          <p className="text-sm text-center mt-2">Upload data for multiple quarters to see trends</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Trend Analysis</h2>
        <span className="text-sm text-gray-600">
          {trendData.length} quarter{trendData.length !== 1 ? 's' : ''} of data
        </span>
      </div>
      
      {/* Total Indicators Trend */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Indicators Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          {chartType === 'line' ? (
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="quarter" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line 
                type="monotone" 
                dataKey="totalIndicators" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                name="Total Indicators"
                dot={{ fill: '#0ea5e9', r: 5 }}
              />
            </LineChart>
          ) : (
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="quarter" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="totalIndicators" fill="#0ea5e9" name="Total Indicators" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      
      {/* Tier Distribution Trend */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tier Distribution Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          {chartType === 'line' ? (
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="quarter" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line 
                type="monotone" 
                dataKey="tier1Count" 
                stroke="#2563eb" 
                strokeWidth={2}
                name="Tier 1"
                dot={{ fill: '#2563eb', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="tier2Count" 
                stroke="#9333ea" 
                strokeWidth={2}
                name="Tier 2"
                dot={{ fill: '#9333ea', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="tier3Count" 
                stroke="#16a34a" 
                strokeWidth={2}
                name="Tier 3"
                dot={{ fill: '#16a34a', r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="quarter" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="tier1Count" fill="#2563eb" name="Tier 1" />
              <Bar dataKey="tier2Count" fill="#9333ea" name="Tier 2" />
              <Bar dataKey="tier3Count" fill="#16a34a" name="Tier 3" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      
      {/* Type Distribution Trend */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Indicator Type Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          {chartType === 'line' ? (
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="quarter" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Line 
                type="monotone" 
                dataKey="universalCount" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                name="Universal"
                dot={{ fill: '#0ea5e9', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="strategicCount" 
                stroke="#d946ef" 
                strokeWidth={2}
                name="Strategic"
                dot={{ fill: '#d946ef', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="collectiveCount" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Collective"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="quarter" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '14px' }} />
              <Bar dataKey="universalCount" fill="#0ea5e9" name="Universal" />
              <Bar dataKey="strategicCount" fill="#d946ef" name="Strategic" />
              <Bar dataKey="collectiveCount" fill="#10b981" name="Collective" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
