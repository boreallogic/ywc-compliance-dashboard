import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { 
  calculateTierMetrics, 
  calculateTypeMetrics,
  calculateSummaryStats 
} from './analytics';

/**
 * Generate comprehensive compliance report
 */
export const generateComplianceReport = (indicators, filters, organization = 'Yukon Women\'s Coalition') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;
  
  // Helper to check if we need a new page
  const checkPageBreak = (neededSpace = 20) => {
    if (yPosition + neededSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };
  
  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('GBV Compliance Report', pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;
  
  // Organization and date
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(organization, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 7;
  doc.text(`Report Generated: ${format(new Date(), 'MMMM d, yyyy')}`, pageWidth / 2, yPosition, { align: 'center' });
  yPosition += 15;
  
  // Executive Summary
  checkPageBreak(40);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', 14, yPosition);
  yPosition += 10;
  
  const stats = calculateSummaryStats(indicators);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const summaryData = [
    ['Total Indicators', stats.total],
    ['Universal Indicators', stats.universal],
    ['Strategic Compliance Indicators', stats.strategic],
    ['Collective Impact Indicators', stats.collective],
    ['', ''],
    ['Tier 1 Indicators', stats.tier1],
    ['Tier 2 Indicators', stats.tier2],
    ['Tier 3 Indicators', stats.tier3]
  ];
  
  doc.autoTable({
    startY: yPosition,
    head: [['Metric', 'Count']],
    body: summaryData,
    theme: 'grid',
    headStyles: { fillColor: [3, 105, 161], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 120 },
      1: { halign: 'center', cellWidth: 30 }
    }
  });
  
  yPosition = doc.lastAutoTable.finalY + 15;
  
  // Tier Analysis
  checkPageBreak(60);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Tier Analysis', 14, yPosition);
  yPosition += 10;
  
  const tierMetrics = calculateTierMetrics(indicators);
  const tierData = tierMetrics.map(tier => [
    tier.tier,
    tier.total,
    tier.completed,
    tier.inProgress,
    `${tier.completionRate.toFixed(1)}%`
  ]);
  
  doc.autoTable({
    startY: yPosition,
    head: [['Tier', 'Total', 'Completed', 'In Progress', 'Completion Rate']],
    body: tierData,
    theme: 'striped',
    headStyles: { fillColor: [3, 105, 161], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 3 }
  });
  
  yPosition = doc.lastAutoTable.finalY + 15;
  
  // Type Distribution
  checkPageBreak(60);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Indicator Type Distribution', 14, yPosition);
  yPosition += 10;
  
  const typeMetrics = calculateTypeMetrics(indicators);
  const typeData = typeMetrics.map(type => [
    type.type,
    type.total,
    `${type.percentage.toFixed(1)}%`
  ]);
  
  doc.autoTable({
    startY: yPosition,
    head: [['Type', 'Count', 'Percentage']],
    body: typeData,
    theme: 'striped',
    headStyles: { fillColor: [3, 105, 161], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 3 }
  });
  
  yPosition = doc.lastAutoTable.finalY + 15;
  
  // Detailed Indicator List
  doc.addPage();
  yPosition = 20;
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Detailed Indicator List', 14, yPosition);
  yPosition += 5;
  
  // Apply filters if specified
  let filteredIndicators = [...indicators];
  if (filters.type && filters.type !== 'all') {
    filteredIndicators = filteredIndicators.filter(ind => ind.type === filters.type);
  }
  
  // Group by type
  const groupedByType = {
    'Universal': filteredIndicators.filter(ind => ind.type === 'Universal'),
    'Strategic Compliance': filteredIndicators.filter(ind => ind.type === 'Strategic Compliance'),
    'Collective Impact': filteredIndicators.filter(ind => ind.type === 'Collective Impact')
  };
  
  Object.entries(groupedByType).forEach(([type, indicators]) => {
    if (indicators.length === 0) return;
    
    checkPageBreak(30);
    yPosition += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(type, 14, yPosition);
    yPosition += 5;
    
    const tableData = indicators.map(ind => [
      ind.id,
      ind.name,
      ind.tier,
      ind.pillar,
      ind.source
    ]);
    
    doc.autoTable({
      startY: yPosition,
      head: [['ID', 'Indicator Name', 'Tier', 'Pillar', 'Source']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [3, 105, 161], fontStyle: 'bold', fontSize: 9 },
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 80 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 40 }
      }
    });
    
    yPosition = doc.lastAutoTable.finalY + 5;
  });
  
  // Footer on each page
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
    doc.text(
      `YWC Compliance Report - ${format(new Date(), 'yyyy-MM-dd')}`,
      14,
      pageHeight - 10
    );
  }
  
  return doc;
};

/**
 * Generate funder-specific report
 */
export const generateFunderReport = (indicators, funderName, organization = 'Yukon Women\'s Coalition') => {
  // Map funders to sources
  const funderSourceMap = {
    'WGED': 'WGED-Specific Indicators (from NAP Prev/VicServices TPAs)',
    'NAP Bilateral': 'YG-Federal NAP GBV Bilateral (July 2025)',
    'General': 'Internal'
  };
  
  const source = funderSourceMap[funderName];
  const filtered = source 
    ? indicators.filter(ind => ind.source === source)
    : indicators;
  
  const doc = generateComplianceReport(filtered, { type: 'all' }, organization);
  
  // Update title on first page
  doc.setPage(1);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.text(`${funderName} Compliance Report`, pageWidth / 2, 20, { align: 'center' });
  
  return doc;
};

/**
 * Save PDF report
 */
export const savePDFReport = (doc, filename = 'ywc_compliance_report.pdf') => {
  doc.save(filename);
};

/**
 * Generate and download compliance report
 */
export const downloadComplianceReport = (indicators, filters, filename) => {
  const doc = generateComplianceReport(indicators, filters);
  savePDFReport(doc, filename || `ywc_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

/**
 * Generate and download funder-specific report
 */
export const downloadFunderReport = (indicators, funderName, filename) => {
  const doc = generateFunderReport(indicators, funderName);
  savePDFReport(doc, filename || `${funderName.toLowerCase()}_report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};
