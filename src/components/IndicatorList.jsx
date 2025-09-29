import { useState } from 'react';

const IndicatorList = ({ indicators }) => {
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(indicators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIndicators = indicators.slice(startIndex, endIndex);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'Universal':
        return 'badge-universal';
      case 'Strategic Compliance':
        return 'badge-strategic';
      case 'Collective Impact':
        return 'badge-collective';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (indicators.length === 0) {
    return (
      <div className="card">
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-center font-medium">No indicators match your filters</p>
          <p className="text-sm text-center mt-2">Try adjusting your filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Indicators ({indicators.length})
        </h2>
        <span className="text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, indicators.length)} of {indicators.length}
        </span>
      </div>

      <div className="space-y-4">
        {currentIndicators.map((indicator) => (
          <div
            key={indicator.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          >
            <div
              className="p-4 cursor-pointer bg-white hover:bg-gray-50"
              onClick={() => toggleExpand(indicator.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${getTypeBadgeClass(indicator.type)}`}>
                      {indicator.type}
                    </span>
                    <span className="text-xs text-gray-500">{indicator.tier}</span>
                    {indicator.pillar && (
                      <span className="text-xs text-gray-500">{indicator.pillar}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {indicator.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    ID: {indicator.id} | Category: {indicator.category}
                  </p>
                  {!expandedId || expandedId !== indicator.id ? (
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {indicator.description}
                    </p>
                  ) : null}
                </div>
                <button className="ml-4 text-gray-400 hover:text-gray-600">
                  <svg
                    className={`w-6 h-6 transition-transform ${
                      expandedId === indicator.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {expandedId === indicator.id && (
              <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                  <p className="text-sm text-gray-700">{indicator.description}</p>
                </div>

                {indicator.measurementMethods && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Measurement Methods</h4>
                    <p className="text-sm text-gray-700">{indicator.measurementMethods}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Source</h4>
                    <p className="text-sm text-gray-700">{indicator.source}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Priority</h4>
                    <p className="text-sm text-gray-700">{indicator.priority}</p>
                  </div>
                </div>

                {indicator.collectiveImpact && indicator.collectiveImpact !== 'N/A' && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Collective Impact</h4>
                    <p className="text-sm text-gray-700">{indicator.collectiveImpact}</p>
                  </div>
                )}

                {indicator.workplanExample && indicator.workplanExample !== 'N/A - Universal indicators' && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Workplan Integration Example</h4>
                    <p className="text-sm text-gray-700">{indicator.workplanExample}</p>
                  </div>
                )}

                {indicator.reportingGuidance && indicator.reportingGuidance !== 'N/A - Universal indicators' && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Reporting Guidance</h4>
                    <p className="text-sm text-gray-700">{indicator.reportingGuidance}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default IndicatorList;
