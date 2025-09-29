import React, { useState, useEffect } from 'react';

const IndicatorReporting = ({ indicators, onUpdateProgress }) => {
  const [reportingData, setReportingData] = useState({});
  const [currentIndicator, setCurrentIndicator] = useState(0);
  
  // Detect organization from first indicator
  const getOrganizationCode = (orgName) => {
    if (!orgName) return 'UNKNOWN';
    
    // Handle known organizations
    if (orgName.includes('Victoria Faulkner')) return 'VFWC';
    if (orgName.includes('Whitehorse Aboriginal')) return 'WAWC';
    if (orgName.includes('Yukon Status of Women')) return 'YSWC';
    if (orgName.includes('Yukon Aboriginal Women')) return 'YAWC';
    if (orgName.includes('Liard Aboriginal')) return 'LAWS';
    if (orgName.includes('Yukon Women in Trades')) return 'YWITT';
    if (orgName.includes('Les EssentiElles')) return 'Les EssentiElles';
    
    // Fallback: create acronym from first letters
    return orgName.split(' ').map(word => word[0]).join('').toUpperCase();
  };
  
  const organizationCode = indicators.length > 0 ? 
    getOrganizationCode(indicators[0].organization) : 
    'UNKNOWN';

  // Group indicators by tier for organized display
  const groupedIndicators = indicators.reduce((acc, indicator) => {
    const tier = indicator.tier || 'Unknown';
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push(indicator);
    return acc;
  }, {});

  // Handle form data updates
  const handleFieldUpdate = (indicatorId, field, value) => {
    setReportingData(prev => ({
      ...prev,
      [indicatorId]: {
        ...prev[indicatorId],
        [field]: value,
        lastUpdated: new Date().toISOString(),
        isCompleted: checkIfCompleted({ ...prev[indicatorId], [field]: value })
      }
    }));
  };

  // Check if an indicator is completed (basic logic - can be enhanced)
  const checkIfCompleted = (data) => {
    if (!data) return false;
    // Consider completed if has response data and notes
    return data.responseData && data.notes;
  };

  // Get completion status
  const getCompletionStatus = () => {
    const total = indicators.length;
    const completed = indicators.filter(ind => 
      reportingData[ind.id]?.isCompleted
    ).length;
    return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 };
  };

  const status = getCompletionStatus();

  return (
    <div className="space-y-6">
      {/* Organization Header */}
      {indicators.length > 0 && (
        <div className="card border-l-4 border-l-purple-500 bg-purple-50">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded">
              {organizationCode}
            </span>
            <h3 className="text-lg font-semibold text-gray-900">
              {indicators[0].organization}
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            Reporting on {indicators.length} assigned indicators from your workplan
          </p>
        </div>
      )}

      {/* Progress Overview */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Indicator Reporting Progress</h2>
          <div className="text-sm text-gray-600">
            {status.completed} of {status.total} completed ({Math.round(status.percentage)}%)
          </div>
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill bg-blue-600"
            style={{ width: `${status.percentage}%` }}
          >
            {status.percentage > 10 && `${Math.round(status.percentage)}%`}
          </div>
        </div>
      </div>

      {/* Indicator Cards by Tier */}
      {Object.entries(groupedIndicators).map(([tier, tierIndicators]) => (
        <div key={tier} className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className={`badge ${getTierBadgeClass(tier)}`}>
              {tier}
            </span>
            {tierIndicators.length} indicators
          </h3>

          <div className="grid gap-4">
            {tierIndicators.map((indicator) => (
              <IndicatorReportingCard
                key={indicator.id}
                indicator={indicator}
                data={reportingData[indicator.id] || {}}
                onUpdate={(field, value) => handleFieldUpdate(indicator.id, field, value)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const IndicatorReportingCard = ({ indicator, data, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isCompleted = data.isCompleted || false;

  return (
    <div className={`card border-l-4 ${isCompleted ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {indicator.id}
            </span>
            {isCompleted && (
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded flex items-center gap-1">
                ✓ Completed
              </span>
            )}
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {indicator.name}
          </h4>
          <p className="text-gray-600 text-sm mb-3">
            {indicator.description}
          </p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-secondary text-sm"
        >
          {isExpanded ? 'Collapse' : 'Report'}
        </button>
      </div>

      {/* Expanded Reporting Form */}
      {isExpanded && (
        <div className="border-t pt-4 space-y-4">
          {/* Measurement Methods */}
          {indicator.measurementMethods && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Measurement Instructions:</h5>
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-line">
                {indicator.measurementMethods}
              </div>
            </div>
          )}

          {/* Response Data - Simplified for debugging */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response Data *
            </label>
            <textarea
              value={data.responseData || ''}
              onChange={(e) => onUpdate('responseData', e.target.value)}
              placeholder="Enter your data, measurements, and responses for this indicator..."
              className="input h-32"
            />
          </div>

          {/* Supporting Evidence */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supporting Evidence & Documentation
            </label>
            <textarea
              value={data.evidence || ''}
              onChange={(e) => onUpdate('evidence', e.target.value)}
              placeholder="List any supporting documents, data sources, or evidence..."
              className="input h-20"
            />
          </div>

          {/* Challenges & Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Implementation Notes & Challenges *
            </label>
            <textarea
              value={data.notes || ''}
              onChange={(e) => onUpdate('notes', e.target.value)}
              placeholder="Describe any challenges, lessons learned, or additional context..."
              className="input h-20"
            />
          </div>

          {/* Action Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Steps & Action Items
            </label>
            <textarea
              value={data.actionItems || ''}
              onChange={(e) => onUpdate('actionItems', e.target.value)}
              placeholder="What are the next steps or action items for this indicator?"
              className="input h-20"
            />
          </div>

          {/* Metadata */}
          {data.lastUpdated && (
            <div className="text-xs text-gray-500 pt-2 border-t">
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper function for tier badge styling
const getTierBadgeClass = (tier) => {
  switch (tier.toLowerCase()) {
    case 'tier 1':
      return 'badge-universal';
    case 'tier 2':
      return 'badge-strategic';
    case 'tier 3':
      return 'badge-collective';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default IndicatorReporting;