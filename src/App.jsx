import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CSVUpload from './components/CSVUpload';
import SummaryStats from './components/SummaryStats';
import TierProgress from './components/TierProgress';
import TrendChart from './components/TrendChart';
import FilterPanel from './components/FilterPanel';
import IndicatorList from './components/IndicatorList';
import ReportGenerator from './components/ReportGenerator';
import { saveIndicators, loadIndicators, saveQuarterlyData, loadQuarters } from './utils/storage';
import { filterIndicators } from './utils/analytics';

function App() {
  const [indicators, setIndicators] = useState([]);
  const [filteredIndicators, setFilteredIndicators] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    tier: 'all',
    pillar: 'all',
    source: 'all',
    priority: 'all',
    search: ''
  });
  const [currentView, setCurrentView] = useState('dashboard');
  const [notification, setNotification] = useState(null);

  // Load data on mount
  useEffect(() => {
    const savedIndicators = loadIndicators();
    if (savedIndicators) {
      setIndicators(savedIndicators);
    }
  }, []);

  // Update filtered indicators when indicators or filters change
  useEffect(() => {
    const filtered = filterIndicators(indicators, filters);
    setFilteredIndicators(filtered);
  }, [indicators, filters]);

  const handleUploadSuccess = (result) => {
    setIndicators(result.data);
    saveIndicators(result.data);
    
    // Save as quarterly data
    const currentDate = new Date();
    const quarter = Math.floor(currentDate.getMonth() / 3) + 1;
    const year = currentDate.getFullYear();
    saveQuarterlyData(quarter, year, result.data);
    
    showNotification('success', `Successfully loaded ${result.data.length} indicators!`);
    setCurrentView('dashboard');
  };

  const handleUploadError = (errors) => {
    const errorMessage = Array.isArray(errors) ? errors.join(', ') : errors;
    showNotification('error', `Upload failed: ${errorMessage}`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      setIndicators([]);
      setFilteredIndicators([]);
      localStorage.clear();
      showNotification('success', 'All data cleared');
      setCurrentView('upload');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                YWC Compliance Dashboard
              </h1>
              <p className="text-sm text-gray-600">
                Gender-Based Violence Prevention Indicators
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {format(new Date(), 'MMMM d, yyyy')}
              </span>
              {indicators.length > 0 && (
                <button
                  onClick={handleClearData}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Data
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in no-print">
          <div
            className={`
              px-6 py-4 rounded-lg shadow-lg
              ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
              text-white
            `}
          >
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      {indicators.length > 0 && (
        <nav className="bg-white border-b border-gray-200 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'indicators', label: 'Indicators', icon: '📋' },
                { id: 'trends', label: 'Trends', icon: '📈' },
                { id: 'reports', label: 'Reports', icon: '📄' },
                { id: 'upload', label: 'Upload New Data', icon: '⬆️' }
              ].map(nav => (
                <button
                  key={nav.id}
                  onClick={() => setCurrentView(nav.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${currentView === nav.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-2">{nav.icon}</span>
                  {nav.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {indicators.length === 0 ? (
          // Upload View (Initial State)
          <div className="max-w-3xl mx-auto">
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to YWC Dashboard</h2>
              <p className="text-gray-600 mb-6">
                Upload your CSV file to get started. This dashboard will help you track, analyze,
                and report on your GBV prevention indicators across all tiers.
              </p>
            </div>
            <CSVUpload
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
          </div>
        ) : (
          // Main Dashboard Views
          <>
            {currentView === 'dashboard' && (
              <div className="space-y-6">
                <SummaryStats indicators={indicators} />
                <TierProgress indicators={indicators} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <TrendChart />
                  </div>
                  <div>
                    <FilterPanel
                      indicators={indicators}
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentView === 'indicators' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <FilterPanel
                    indicators={indicators}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
                <div className="lg:col-span-3">
                  <IndicatorList indicators={filteredIndicators} />
                </div>
              </div>
            )}

            {currentView === 'trends' && (
              <div className="space-y-6">
                <div className="card">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Trend Analysis</h2>
                  <p className="text-gray-600">
                    Track indicator changes across quarters to identify patterns and progress.
                  </p>
                </div>
                <TrendChart />
              </div>
            )}

            {currentView === 'reports' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ReportGenerator indicators={filteredIndicators} filters={filters} />
                </div>
                <div>
                  <FilterPanel
                    indicators={indicators}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              </div>
            )}

            {currentView === 'upload' && (
              <div className="max-w-3xl mx-auto">
                <div className="card mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload New Data</h2>
                  <p className="text-gray-600 mb-4">
                    Upload a new CSV file to replace your current data or add quarterly data.
                  </p>
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> Uploading new data will replace your current dataset.
                      Historical quarterly data will be preserved in the Trends view.
                    </p>
                  </div>
                </div>
                <CSVUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>© 2025 Yukon Women's Coalition. All rights reserved.</p>
            <p>
              {indicators.length > 0 && (
                <span>{indicators.length} indicators loaded</span>
              )}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
