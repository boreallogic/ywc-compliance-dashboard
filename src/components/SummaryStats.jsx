import { calculateSummaryStats } from '../utils/analytics';

const SummaryStats = ({ indicators }) => {
  const stats = calculateSummaryStats(indicators);

  const statCards = [
    {
      label: 'Total Indicators',
      value: stats.total,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      label: 'Universal',
      value: stats.universal,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      color: 'bg-cyan-500',
      textColor: 'text-cyan-600'
    },
    {
      label: 'Strategic Compliance',
      value: stats.strategic,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      label: 'Collective Impact',
      value: stats.collective,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  const tierCards = [
    {
      label: 'Tier 1',
      value: stats.tier1,
      description: 'Universal indicators',
      color: 'border-blue-300 bg-blue-50'
    },
    {
      label: 'Tier 2',
      value: stats.tier2,
      description: 'Strategic compliance',
      color: 'border-purple-300 bg-purple-50'
    },
    {
      label: 'Tier 3',
      value: stats.tier3,
      description: 'Collective impact',
      color: 'border-green-300 bg-green-50'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tier Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tierCards.map((tier, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${tier.color}`}
            >
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 mb-1">{tier.label}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{tier.value}</p>
                <p className="text-xs text-gray-600">{tier.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
