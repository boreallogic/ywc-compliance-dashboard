/**
 * Calculate tier-based metrics
 */
export const calculateTierMetrics = (indicators) => {
  const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
  
  return tiers.map(tier => {
    const tierIndicators = indicators.filter(ind => ind.tier === tier);
    const total = tierIndicators.length;
    
    // For now, we'll consider all loaded indicators as "in progress"
    // In a real app, you'd track completion status per indicator
    const completed = 0; // This would come from user input
    const inProgress = total;
    const notStarted = 0;
    
    return {
      tier,
      total,
      completed,
      inProgress,
      notStarted,
      completionRate: total > 0 ? (completed / total) * 100 : 0
    };
  });
};

/**
 * Calculate type-based metrics
 */
export const calculateTypeMetrics = (indicators) => {
  const types = ['Universal', 'Strategic Compliance', 'Collective Impact'];
  
  return types.map(type => {
    const typeIndicators = indicators.filter(ind => ind.type === type);
    const total = typeIndicators.length;
    
    return {
      type,
      total,
      percentage: (total / indicators.length) * 100
    };
  });
};

/**
 * Calculate pillar distribution
 */
export const calculatePillarDistribution = (indicators) => {
  const pillarCounts = {};
  
  indicators.forEach(ind => {
    if (ind.pillar) {
      pillarCounts[ind.pillar] = (pillarCounts[ind.pillar] || 0) + 1;
    }
  });
  
  return Object.entries(pillarCounts)
    .map(([pillar, count]) => ({
      pillar,
      count,
      percentage: (count / indicators.length) * 100
    }))
    .sort((a, b) => {
      // Sort by pillar number
      const aNum = parseInt(a.pillar.match(/\d+/)?.[0] || 0);
      const bNum = parseInt(b.pillar.match(/\d+/)?.[0] || 0);
      return aNum - bNum;
    });
};

/**
 * Calculate source distribution
 */
export const calculateSourceDistribution = (indicators) => {
  const sourceCounts = {};
  
  indicators.forEach(ind => {
    if (ind.source) {
      sourceCounts[ind.source] = (sourceCounts[ind.source] || 0) + 1;
    }
  });
  
  return Object.entries(sourceCounts)
    .map(([source, count]) => ({
      source,
      count,
      percentage: (count / indicators.length) * 100
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Calculate category distribution
 */
export const calculateCategoryDistribution = (indicators) => {
  const categoryCounts = {};
  
  indicators.forEach(ind => {
    if (ind.category) {
      categoryCounts[ind.category] = (categoryCounts[ind.category] || 0) + 1;
    }
  });
  
  return Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: (count / indicators.length) * 100
    }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Generate trend data from quarterly history
 */
export const generateTrendData = (quarters) => {
  return quarters.map(q => {
    const tierMetrics = calculateTierMetrics(q.data);
    
    return {
      quarter: q.key,
      date: new Date(q.timestamp),
      tier1Count: tierMetrics.find(t => t.tier === 'Tier 1')?.total || 0,
      tier2Count: tierMetrics.find(t => t.tier === 'Tier 2')?.total || 0,
      tier3Count: tierMetrics.find(t => t.tier === 'Tier 3')?.total || 0,
      totalIndicators: q.indicatorCount,
      universalCount: q.data.filter(d => d.type === 'Universal').length,
      strategicCount: q.data.filter(d => d.type === 'Strategic Compliance').length,
      collectiveCount: q.data.filter(d => d.type === 'Collective Impact').length
    };
  }).reverse(); // Chronological order for charts
};

/**
 * Filter indicators based on criteria
 */
export const filterIndicators = (indicators, filters) => {
  let filtered = [...indicators];
  
  // Filter by type
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(ind => ind.type === filters.type);
  }
  
  // Filter by tier
  if (filters.tier && filters.tier !== 'all') {
    filtered = filtered.filter(ind => ind.tier === filters.tier);
  }
  
  // Filter by pillar
  if (filters.pillar && filters.pillar !== 'all') {
    filtered = filtered.filter(ind => ind.pillar === filters.pillar);
  }
  
  // Filter by source
  if (filters.source && filters.source !== 'all') {
    filtered = filtered.filter(ind => ind.source === filters.source);
  }
  
  // Filter by priority
  if (filters.priority && filters.priority !== 'all') {
    filtered = filtered.filter(ind => ind.priority === filters.priority);
  }
  
  // Search by text
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(ind =>
      ind.name.toLowerCase().includes(searchLower) ||
      ind.description.toLowerCase().includes(searchLower) ||
      ind.id.toLowerCase().includes(searchLower) ||
      ind.category.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
};

/**
 * Get unique values for filter options
 */
export const getFilterOptions = (indicators) => {
  return {
    types: [...new Set(indicators.map(ind => ind.type))].filter(Boolean).sort(),
    tiers: [...new Set(indicators.map(ind => ind.tier))].filter(Boolean).sort(),
    pillars: [...new Set(indicators.map(ind => ind.pillar))].filter(Boolean).sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/)?.[0] || 0);
      const bNum = parseInt(b.match(/\d+/)?.[0] || 0);
      return aNum - bNum;
    }),
    sources: [...new Set(indicators.map(ind => ind.source))].filter(Boolean).sort(),
    priorities: [...new Set(indicators.map(ind => ind.priority))].filter(Boolean).sort(),
    categories: [...new Set(indicators.map(ind => ind.category))].filter(Boolean).sort()
  };
};

/**
 * Calculate summary statistics
 */
export const calculateSummaryStats = (indicators) => {
  return {
    total: indicators.length,
    universal: indicators.filter(ind => ind.type === 'Universal').length,
    strategic: indicators.filter(ind => ind.type === 'Strategic Compliance').length,
    collective: indicators.filter(ind => ind.type === 'Collective Impact').length,
    tier1: indicators.filter(ind => ind.tier === 'Tier 1').length,
    tier2: indicators.filter(ind => ind.tier === 'Tier 2').length,
    tier3: indicators.filter(ind => ind.tier === 'Tier 3').length
  };
};
