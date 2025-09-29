import React, { useState, useEffect } from 'react';
import { getFieldType, extractOptions, getSuggestedResponse, calculateValue } from '../utils/organizationProfiles';

const SmartFormField = ({ 
  indicator, 
  orgCode, 
  value = '', 
  onChange, 
  label, 
  placeholder 
}) => {
  const [fieldType, setFieldType] = useState('textarea');
  const [options, setOptions] = useState([]);
  const [calculationInputs, setCalculationInputs] = useState({});
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    if (indicator?.measurementMethods) {
      const type = getFieldType(indicator.measurementMethods);
      setFieldType(type);
      
      if (type === 'checkbox' || type === 'radio') {
        setOptions(extractOptions(indicator.measurementMethods));
      }
    }
  }, [indicator]);

  const handleSuggestionApply = () => {
    const suggestion = getSuggestedResponse(orgCode, indicator.id, indicator.name);
    onChange(suggestion);
    setShowSuggestion(false);
  };

  const handleCalculationInputChange = (key, inputValue) => {
    const newInputs = { ...calculationInputs, [key]: parseFloat(inputValue) || 0 };
    setCalculationInputs(newInputs);
    
    // Auto-calculate if we have the required inputs
    const calculated = calculateValue(indicator.measurementMethods, newInputs);
    if (calculated !== null) {
      onChange(`Calculated result: ${calculated}${indicator.measurementMethods.includes('percentage') ? '%' : ''}`);
    }
  };

  const renderField = () => {
    switch (fieldType) {
      case 'yesNo':
        return (
          <div className="space-y-2">
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`${indicator.id}-yesno`}
                  value="Yes"
                  checked={value === 'Yes'}
                  onChange={(e) => onChange(e.target.value)}
                  className="mr-2"
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`${indicator.id}-yesno`}
                  value="No"
                  checked={value === 'No'}
                  onChange={(e) => onChange(e.target.value)}
                  className="mr-2"
                />
                No
              </label>
            </div>
          </div>
        );

      case 'checkbox':
        const selectedOptions = value ? value.split(', ') : [];
        return (
          <div className="space-y-2">
            {options.map((option, index) => (
              <label key={index} className="flex items-start">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={(e) => {
                    let newSelected = [...selectedOptions];
                    if (e.target.checked) {
                      newSelected.push(option);
                    } else {
                      newSelected = newSelected.filter(opt => opt !== option);
                    }
                    onChange(newSelected.join(', '));
                  }}
                  className="mr-2 mt-1"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name={`${indicator.id}-radio`}
                  value={option}
                  checked={value === option}
                  onChange={(e) => onChange(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Enter number..."}
            className="input"
          />
        );

      case 'calculation':
        return (
          <div className="space-y-4">
            {/* Show calculation inputs based on the formula */}
            {indicator.measurementMethods.includes('turnover') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of staff who left during the period
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2"
                    onChange={(e) => handleCalculationInputChange('staffLeft', e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average number of staff during the period
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 8"
                    onChange={(e) => handleCalculationInputChange('averageStaff', e.target.value)}
                    className="input"
                  />
                </div>
              </>
            )}
            
            {indicator.measurementMethods.includes('funding') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total core funding ($)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 150000"
                    onChange={(e) => handleCalculationInputChange('core', e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total non-core/project funding ($)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 75000"
                    onChange={(e) => handleCalculationInputChange('nonCore', e.target.value)}
                    className="input"
                  />
                </div>
              </>
            )}
            
            {/* Show calculated result */}
            {value && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800">
                  {value}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            {/* Smart suggestion button */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {placeholder}
              </div>
              <button
                type="button"
                onClick={() => setShowSuggestion(!showSuggestion)}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                💡 Smart suggestion
              </button>
            </div>
            
            {/* Suggestion panel */}
            {showSuggestion && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm text-yellow-800 mb-2">
                  <strong>Suggested template:</strong>
                </div>
                <div className="text-sm text-gray-700 mb-3 italic">
                  {getSuggestedResponse(orgCode, indicator.id, indicator.name) || 
                   "No specific template available for this indicator type."}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSuggestionApply}
                    className="text-xs bg-yellow-600 text-white px-2 py-1 rounded hover:bg-yellow-700"
                  >
                    Use template
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSuggestion(false)}
                    className="text-xs text-gray-600 hover:text-gray-700"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
            
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={4}
              className="input"
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {fieldType === 'yesNo' && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderField()}
    </div>
  );
};

export default SmartFormField;