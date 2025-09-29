import Papa from 'papaparse';

/**
 * Required CSV columns
 */
const REQUIRED_COLUMNS = [
  'Organization',
  'Indicator Type',
  'Tier',
  'Indicator ID',
  'Indicator Name',
  'Description',
  'Category',
  'Pillar',
  'Source',
  'Priority'
];

/**
 * Valid values for categorical fields
 */
const VALID_VALUES = {
  indicatorType: ['Universal', 'Strategic Compliance', 'Collective Impact'],
  tier: ['Tier 1', 'Tier 2', 'Tier 3']
};

/**
 * Parse CSV file
 */
export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const validation = validateCSV(results);
        
        if (validation.isValid) {
          const processed = processIndicators(results.data);
          resolve({
            success: true,
            data: processed,
            meta: {
              fileName: file.name,
              rowCount: processed.length,
              uploadDate: new Date().toISOString()
            }
          });
        } else {
          reject({
            success: false,
            errors: validation.errors
          });
        }
      },
      error: (error) => {
        reject({
          success: false,
          errors: [`CSV parsing error: ${error.message}`]
        });
      }
    });
  });
};

/**
 * Validate CSV structure and content
 */
const validateCSV = (results) => {
  const errors = [];
  
  // Check if there's data
  if (!results.data || results.data.length === 0) {
    errors.push('CSV file is empty');
    return { isValid: false, errors };
  }
  
  // Check for required columns
  const headers = Object.keys(results.data[0]);
  const missingColumns = REQUIRED_COLUMNS.filter(
    col => !headers.includes(col)
  );
  
  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }
  
  // Validate data types and values
  results.data.forEach((row, index) => {
    const rowNum = index + 2; // +2 for header and 0-based index
    
    // Check indicator type
    if (row['Indicator Type'] && 
        !VALID_VALUES.indicatorType.includes(row['Indicator Type'])) {
      errors.push(
        `Row ${rowNum}: Invalid Indicator Type "${row['Indicator Type']}". ` +
        `Must be one of: ${VALID_VALUES.indicatorType.join(', ')}`
      );
    }
    
    // Check tier
    if (row['Tier'] && !VALID_VALUES.tier.includes(row['Tier'])) {
      errors.push(
        `Row ${rowNum}: Invalid Tier "${row['Tier']}". ` +
        `Must be one of: ${VALID_VALUES.tier.join(', ')}`
      );
    }
    
    // Check for required fields
    if (!row['Indicator ID']) {
      errors.push(`Row ${rowNum}: Missing Indicator ID`);
    }
    if (!row['Indicator Name']) {
      errors.push(`Row ${rowNum}: Missing Indicator Name`);
    }
  });
  
  // Limit errors to first 10 to avoid overwhelming output
  if (errors.length > 10) {
    errors.splice(10);
    errors.push(`...and ${errors.length - 10} more errors`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Process and normalize indicator data
 */
const processIndicators = (data) => {
  return data.map((row, index) => ({
    id: row['Indicator ID'] || `indicator-${index}`,
    organization: row['Organization'] || '',
    type: row['Indicator Type'] || '',
    tier: row['Tier'] || '',
    name: row['Indicator Name'] || '',
    description: row['Description'] || '',
    measurementMethods: row['Measurement Methods'] || '',
    category: row['Category'] || '',
    pillar: row['Pillar'] || '',
    source: row['Source'] || '',
    priority: row['Priority'] || 'N/A',
    collectiveImpact: row['Collective Impact'] || '',
    workplanExample: row['Workplan Integration Example'] || '',
    reportingGuidance: row['Reporting Guidance'] || '',
    feedback: row['Tier Feedback'] || '',
    // Add computed fields
    tierNumber: extractTierNumber(row['Tier']),
    pillarNumber: extractPillarNumber(row['Pillar'])
  }));
};

/**
 * Extract numeric tier value
 */
const extractTierNumber = (tier) => {
  if (!tier) return 0;
  const match = tier.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

/**
 * Extract numeric pillar value
 */
const extractPillarNumber = (pillar) => {
  if (!pillar) return 0;
  const match = pillar.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
};

/**
 * Export indicators to CSV
 */
export const exportToCSV = (indicators, filename = 'indicators_export.csv') => {
  const csv = Papa.unparse(indicators.map(ind => ({
    'Organization': ind.organization,
    'Indicator Type': ind.type,
    'Tier': ind.tier,
    'Indicator ID': ind.id,
    'Indicator Name': ind.name,
    'Description': ind.description,
    'Measurement Methods': ind.measurementMethods,
    'Category': ind.category,
    'Pillar': ind.pillar,
    'Source': ind.source,
    'Priority': ind.priority,
    'Collective Impact': ind.collectiveImpact,
    'Workplan Integration Example': ind.workplanExample,
    'Reporting Guidance': ind.reportingGuidance,
    'Tier Feedback': ind.feedback
  })));
  
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
