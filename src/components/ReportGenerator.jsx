import { useState } from 'react';
import { downloadComplianceReport, downloadFunderReport } from '../utils/pdfGenerator';
import { exportToCSV } from '../utils/csvParser';
import { format } from 'date-fns';

const ReportGenerator = ({ indicators, filters }) => {
  const [selectedFunder, setSelectedFunder] = useState('general');
  const [isGenerating, setIsGenerating] = useState(false);

  const funders = [
    { value: 'general', label: 'General Compliance Report' },
    { value: 'WGED', label: 'WGED Specific Report' },
    { value: 'NAP Bilateral', label: 'NAP Bilateral Report' }
  ];

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    
    try {
      if (selectedFunder === 'general') {
        await downloadComplianceReport(indicators, filters);
      } else {
        await downloadFunderReport(indicators, selectedFunder);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportCSV = () => {
    const filename = `ywc_indicators_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    exportToCSV(indicators, filename);
  };

  const handlePrintView = () => {
    window.print();
  };

  return (
    <div className="card no-print">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Generate Reports</h2>

      <div className="space-y-6">
        {/* Report Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Report Type
          </label>
          <select
            value={selectedFunder}
            onChange={(e) => setSelectedFunder(e.target.value)}
            className="input"
          >
            {funders.map(funder => (
              <option key={funder.value} value={funder.value}>
                {funder.label}
              </option>
            ))}
          </select>
        </div>

        {/* Report Info */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Report Details</h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Indicators included: {indicators.length}</li>
            <li>• Active filters: {Object.values(filters).filter(v => v && v !== 'all' && v !== '').length}</li>
            <li>• Format: Professional PDF with charts and tables</li>
          </ul>
        </div>

        {/* Export Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating || indicators.length === 0}
            className="btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Generate PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportCSV}
            disabled={indicators.length === 0}
            className="btn btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Export CSV</span>
          </button>

          <button
            onClick={handlePrintView}
            disabled={indicators.length === 0}
            className="btn btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print View</span>
          </button>
        </div>

        {/* Tips */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Report Tips</h3>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Use filters to customize which indicators appear in your report</li>
            <li>• PDF reports include executive summaries and detailed breakdowns</li>
            <li>• CSV exports preserve all indicator data for further analysis</li>
            <li>• Print view provides a clean, professional layout for hard copies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
