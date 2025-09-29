import { calculateTierMetrics } from '../utils/analytics';

const TierProgress = ({ indicators }) => {
  const tierMetrics = calculateTierMetrics(indicators);
  
  const getTierColor = (tier) => {
    switch (tier) {
      case 'Tier 1':
        return 'bg-blue-600';
      case 'Tier 2':
        return 'bg-purple-600';
      case 'Tier 3':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };
  
  const getTierDescription = (tier) => {
    switch (tier) {
      case 'Tier 1':
        return 'Universal indicators - Organizational health metrics';
      case 'Tier 2':
        return 'Strategic Compliance - Funder-specific requirements';
      case 'Tier 3':
        return 'Collective Impact - Sector-wide metrics';
      default:
        return '';
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Tier Progress Overview</h2>
      
      <div className="space-y-6">
        {tierMetrics.map((tier) => (
          <div key={tier.tier} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{tier.tier}</h3>
                <p className="text-sm text-gray-600">{getTierDescription(tier.tier)}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">{tier.total}</span>
                <span className="text-sm text-gray-500 ml-1">indicators</span>
              </div>
            </div>
            
            <div className="progress-bar">
              <div
                className={`progress-fill ${getTierColor(tier.tier)}`}
                style={{ width: tier.total > 0 ? '100%' : '0%' }}
              >
                {tier.total > 0 && (
                  <span className="px-2">{tier.total} Loaded</span>
                )}
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress tracking coming in future updates</span>
              <span className="font-medium">{tier.total} of {tier.total}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">Total Indicators</span>
          <span className="text-2xl font-bold text-primary-600">
            {tierMetrics.reduce((sum, tier) => sum + tier.total, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TierProgress;
