// Organization profiles for smart pre-filling and automation
export const organizationProfiles = {
  'WAWC': {
    name: 'Whitehorse Aboriginal Women\'s Circle',
    type: 'Indigenous-led',
    capacity: 'Low',
    pillars: [4, 2, 1, 5],
    scope: 'Whitehorse',
    targetPopulations: ['Indigenous women', 'Girls and youth'],
    serviceTypes: ['Cultural programs and peer support', 'Leadership development'],
    suggestedData: ['D025', 'D026', 'D027'] // Cultural ceremonies, Elder involvement, Youth programs
  },
  'VFWC': {
    name: 'Victoria Faulkner Women\'s Centre',
    type: 'Crisis support center',
    capacity: 'High',
    pillars: [1, 2, 5],
    scope: 'Whitehorse',
    targetPopulations: ['Low-income women', 'Gender-diverse people'],
    serviceTypes: ['Drop-in and crisis supports', 'Community kitchen'],
    suggestedData: ['D004', 'D005', 'D030', 'D044'] // Drop-in users, Crisis interventions
  },
  'YSWC': {
    name: 'Yukon Status of Women Council',
    type: 'Feminist policy organization',
    capacity: 'High',
    pillars: [5, 2, 3],
    scope: 'Territorial',
    targetPopulations: ['All women and gender-diverse people'],
    serviceTypes: ['Feminist policy research', 'Strategic governance'],
    suggestedData: ['D020', 'D034', 'D018'] // Policy submissions, Policy changes
  }
};

// Templates for common response patterns
export const responseTemplates = {
  // For workforce indicators
  staffRetention: {
    template: "Our organization had [X] staff departures out of [Y] total positions during the reporting period, resulting in a [Z]% turnover rate.",
    examples: ["2 staff departures out of 8 total positions, resulting in a 25% turnover rate."]
  },
  
  // For collaboration indicators
  coalitionParticipation: {
    template: "We participated in [X] YWC meetings/events and collaborated through [activities]. Our key contributions included [specific examples].",
    examples: ["We participated in 4 YWC meetings and collaborated through joint funding proposals and shared advocacy. Our key contributions included leading the financial standards working group."]
  },
  
  // For financial indicators  
  fundingRatio: {
    template: "Core funding: $[X]. Project funding: $[Y]. This gives us a core-to-total ratio of [Z]% and funding leverage ratio of [ratio].",
    examples: ["Core funding: $150,000. Project funding: $75,000. This gives us a core-to-total ratio of 67% and funding leverage ratio of 0.5."]
  },
  
  // For service delivery
  programParticipation: {
    template: "During this period, [X] participants engaged in our [program name] with [frequency]. Key outcomes included [specific achievements].",
    examples: ["During this period, 45 participants engaged in our drop-in services weekly. Key outcomes included 12 successful housing placements and 30 referrals to other services."]
  }
};

// Smart field type detection
export const getFieldType = (measurementMethod) => {
  const text = measurementMethod.toLowerCase();
  
  if (text.includes('yes/no') || text.includes('(yes / no)')) {
    return 'yesNo';
  }
  if (text.includes('check all that apply') || text.includes('☐')) {
    return 'checkbox';
  }
  if (text.includes('select one') || text.includes('options:')) {
    return 'radio';
  }
  if (text.includes('how many') || text.includes('what was your') || text.includes('percentage')) {
    return 'number';
  }
  if (text.includes('calculate:') || text.includes('÷') || text.includes('×')) {
    return 'calculation';
  }
  return 'textarea';
};

// Extract options for radio/checkbox fields
export const extractOptions = (measurementMethod) => {
  const options = [];
  const lines = measurementMethod.split('\n');
  
  for (const line of lines) {
    // Look for checkbox options
    if (line.trim().startsWith('☐')) {
      options.push(line.trim().substring(2).trim());
    }
    // Look for "Options:" section
    if (line.includes('Options:')) {
      const optionsText = line.split('Options:')[1];
      if (optionsText) {
        const optionsList = optionsText.split('/').map(opt => opt.trim());
        options.push(...optionsList);
      }
    }
  }
  
  return options;
};

// Get suggested response based on organization profile and indicator
export const getSuggestedResponse = (orgCode, indicatorId, indicatorName) => {
  const org = organizationProfiles[orgCode];
  if (!org) return '';
  
  // Match response templates to indicator patterns
  if (indicatorName.toLowerCase().includes('turnover') || indicatorName.toLowerCase().includes('retention')) {
    return responseTemplates.staffRetention.template;
  }
  
  if (indicatorName.toLowerCase().includes('coalition') || indicatorName.toLowerCase().includes('collaboration')) {
    return responseTemplates.coalitionParticipation.template;
  }
  
  if (indicatorName.toLowerCase().includes('funding') && indicatorName.toLowerCase().includes('ratio')) {
    return responseTemplates.fundingRatio.template;
  }
  
  if (indicatorName.toLowerCase().includes('program') || indicatorName.toLowerCase().includes('service')) {
    return responseTemplates.programParticipation.template;
  }
  
  return '';
};

// Auto-calculate common formulas
export const calculateValue = (formula, inputs) => {
  try {
    if (formula.includes('turnover') || formula.includes('÷')) {
      const { staffLeft, averageStaff } = inputs;
      if (staffLeft && averageStaff && averageStaff > 0) {
        return Math.round((staffLeft / averageStaff) * 100);
      }
    }
    
    if (formula.includes('ratio')) {
      const { nonCore, core } = inputs;
      if (nonCore && core && core > 0) {
        return Math.round((nonCore / core) * 100) / 100;
      }
    }
  } catch (error) {
    console.warn('Calculation error:', error);
  }
  
  return null;
};