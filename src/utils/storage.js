// Local storage utilities for data persistence

const STORAGE_KEYS = {
  INDICATORS: 'ywc_indicators',
  QUARTERS: 'ywc_quarters',
  SETTINGS: 'ywc_settings'
};

/**
 * Save indicators data to localStorage
 */
export const saveIndicators = (data) => {
  try {
    localStorage.setItem(STORAGE_KEYS.INDICATORS, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving indicators:', error);
    return false;
  }
};

/**
 * Load indicators data from localStorage
 */
export const loadIndicators = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.INDICATORS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading indicators:', error);
    return null;
  }
};

/**
 * Save quarterly data with timestamp
 */
export const saveQuarterlyData = (quarter, year, data) => {
  try {
    const quarters = loadQuarters() || [];
    const quarterKey = `${year}-Q${quarter}`;
    
    // Remove existing entry for this quarter if it exists
    const filtered = quarters.filter(q => q.key !== quarterKey);
    
    // Add new entry
    filtered.push({
      key: quarterKey,
      quarter,
      year,
      timestamp: new Date().toISOString(),
      data: data,
      indicatorCount: data.length
    });
    
    // Sort by year and quarter (most recent first)
    filtered.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.quarter - a.quarter;
    });
    
    localStorage.setItem(STORAGE_KEYS.QUARTERS, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error saving quarterly data:', error);
    return false;
  }
};

/**
 * Load all quarterly data
 */
export const loadQuarters = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.QUARTERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading quarters:', error);
    return [];
  }
};

/**
 * Load specific quarter data
 */
export const loadQuarterData = (quarterKey) => {
  const quarters = loadQuarters();
  const quarter = quarters.find(q => q.key === quarterKey);
  return quarter ? quarter.data : null;
};

/**
 * Delete specific quarter
 */
export const deleteQuarter = (quarterKey) => {
  try {
    const quarters = loadQuarters();
    const filtered = quarters.filter(q => q.key !== quarterKey);
    localStorage.setItem(STORAGE_KEYS.QUARTERS, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting quarter:', error);
    return false;
  }
};

/**
 * Save user settings
 */
export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
};

/**
 * Load user settings
 */
export const loadSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      theme: 'light',
      defaultView: 'dashboard'
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      theme: 'light',
      defaultView: 'dashboard'
    };
  }
};

/**
 * Clear all data (use with caution)
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};
