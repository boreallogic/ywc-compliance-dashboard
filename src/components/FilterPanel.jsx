import { useState } from 'react';
import { getFilterOptions } from '../utils/analytics';

const FilterPanel = ({ indicators, filters, onFilterChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const filterOptions = getFilterOptions(indicators);

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...filters,
      [filterType]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      type: 'all',
      tier: 'all',
      pillar: 'all',
      source: 'all',
      priority: 'all',
      search: ''
    });
  };

  const activeFilterCount = Object.values(filters).filter(
    v => v && v !== 'all' && v !== ''
  ).length;

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          placeholder="Search indicators..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="input"
        />
      </div>

      {/* Primary Filter: Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Indicator Type
        </label>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="type"
              value="all"
              checked={filters.type === 'all'}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="mr-3 w-4 h-4 text-primary-600"
            />
            <span className="text-sm">All Types ({indicators.length})</span>
          </label>
          {filterOptions.types.map(type => {
            const count = indicators.filter(ind => ind.type === type).length;
            const badgeClass = 
              type === 'Universal' ? 'badge-universal' :
              type === 'Strategic Compliance' ? 'badge-strategic' :
              'badge-collective';
            
            return (
              <label key={type} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={filters.type === type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="mr-3 w-4 h-4 text-primary-600"
                />
                <span className="text-sm flex-1">{type}</span>
                <span className={`badge ${badgeClass} ml-2`}>{count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center justify-between w-full mb-4 text-sm font-medium text-primary-600 hover:text-primary-700"
      >
        <span>Advanced Filters</span>
        <svg
          className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="space-y-6 pt-4 border-t border-gray-200">
          {/* Tier Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tier
            </label>
            <select
              value={filters.tier || 'all'}
              onChange={(e) => handleFilterChange('tier', e.target.value)}
              className="input"
            >
              <option value="all">All Tiers</option>
              {filterOptions.tiers.map(tier => {
                const count = indicators.filter(ind => ind.tier === tier).length;
                return (
                  <option key={tier} value={tier}>
                    {tier} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Pillar Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pillar
            </label>
            <select
              value={filters.pillar || 'all'}
              onChange={(e) => handleFilterChange('pillar', e.target.value)}
              className="input"
            >
              <option value="all">All Pillars</option>
              {filterOptions.pillars.map(pillar => {
                const count = indicators.filter(ind => ind.pillar === pillar).length;
                return (
                  <option key={pillar} value={pillar}>
                    {pillar} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source
            </label>
            <select
              value={filters.source || 'all'}
              onChange={(e) => handleFilterChange('source', e.target.value)}
              className="input"
            >
              <option value="all">All Sources</option>
              {filterOptions.sources.map(source => {
                const count = indicators.filter(ind => ind.source === source).length;
                return (
                  <option key={source} value={source}>
                    {source} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={filters.priority || 'all'}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="input"
            >
              <option value="all">All Priorities</option>
              {filterOptions.priorities.map(priority => {
                const count = indicators.filter(ind => ind.priority === priority).length;
                return (
                  <option key={priority} value={priority}>
                    {priority} ({count})
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
