# YWC Reporting Portal - Project Requirements

## 🎯 **Project Overview**

Build a user-friendly web application that transforms messy Word document reporting into clean, guided forms for nonprofit executive directors to report on their workplan indicators.

## 📋 **Core User Flow**

1. **Upload Workplan** → Executive director uploads CSV from YWC Workplan Builder
2. **Guided Reporting** → App creates organized forms for each assigned indicator
3. **Progress Tracking** → Visual progress bar shows completion status
4. **Export Reports** → Generate professional PDF/Word reports for funders

---

## 🏗️ **Technical Architecture**

### **Frontend Framework**
- **React 18+ with Vite** for fast development and modern features
- **TailwindCSS** for responsive, professional styling
- **Component-based architecture** for reusability

### **Key Libraries**
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  "tailwindcss": "^3.3.0",
  "papaparse": "^5.4.1",
  "jspdf": "^3.0.3",
  "jspdf-autotable": "^5.0.2",
  "date-fns": "^2.30.0"
}
```

---

## 📊 **Data Structure & Processing**

### **CSV Input Format**
The app must handle workplan exports with these columns:
```
Organization, Indicator Type, Tier, Indicator ID, Indicator Name, 
Description, Measurement Methods, Category, Pillar, Source, 
Priority, Collective Impact, Workplan Integration Example, 
Reporting Guidance, Tier Feedback
```

### **Indicator Types**
- **Tier 1 (Universal)**: Same for all organizations
- **Tier 2 (Strategic Compliance)**: Based on funding/mandates
- **Tier 3 (Collective Impact)**: Sector-wide measurements

### **Organization Profiles**
```javascript
// Organizations with different contexts and needs
const profiles = {
  'VFWC': { type: 'Crisis support center', capacity: 'High', pillars: [1,2,5] },
  'WAWC': { type: 'Indigenous-led', capacity: 'Low', pillars: [4,2,1,5] },
  'YSWC': { type: 'Policy organization', capacity: 'High', pillars: [5,2,3] }
}
```

---

## 🎨 **User Interface Requirements**

### **Landing Page**
- Clean, welcoming interface
- Clear upload zone for CSV files
- Brief explanation of the process
- Progress indicator once data is loaded

### **Main Reporting Interface**
```
┌─────────────────────────────────────────────────┐
│ YWC Reporting Portal                            │
├─────────────────────────────────────────────────┤
│ [Org Header] Victoria Faulkner Women's Centre   │
│ Reporting on 26 indicators from your workplan   │
├─────────────────────────────────────────────────┤
│ Progress: ████████████░░░░░░░░ 12/26 (46%)      │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📊 Tier 1 - Universal Indicators (10)          │
│   ┌─────────────────────────────────────────┐   │
│   │ U1: Workforce Capacity ✓ [Completed]   │   │
│   │ U2: Staff Retention    [Report Button] │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│ 🎯 Tier 2 - Strategic Compliance (8)           │
│   ┌─────────────────────────────────────────┐   │
│   │ T2: Cultural Appropriateness [Report]  │   │
│   └─────────────────────────────────────────┘   │
│                                                 │
│ 🌐 Tier 3 - Collective Impact (8)              │
│   ┌─────────────────────────────────────────┐   │
│   │ SI040: Framework Measurement [Report]  │   │
│   └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### **Individual Indicator Reporting Form**
```
┌─────────────────────────────────────────────────┐
│ 📊 U1: Workforce Capacity - Filled Positions   │
├─────────────────────────────────────────────────┤
│ Description: Measures workforce stability...    │
├─────────────────────────────────────────────────┤
│ 📋 Measurement Instructions:                   │
│ • How many permanent staff positions (FTE, PTE)│
│   does your organization have budgeted?        │
│ • How many of these positions are currently     │
│   filled?                                      │
│ • Over the past year, how difficult has it     │
│   been to recruit or retain permanent staff?   │
├─────────────────────────────────────────────────┤
│ 📝 Your Response: *                            │
│ ┌─────────────────────────────────────────────┐ │
│ │ [Large text area for response]              │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ 📎 Supporting Evidence:                        │
│ ┌─────────────────────────────────────────────┐ │
│ │ [Text area for documentation references]   │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ 💭 Notes & Challenges:                         │
│ ┌─────────────────────────────────────────────┐ │
│ │ [Text area for implementation notes]       │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ 🎯 Next Steps:                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ [Text area for action items]               │ │
│ └─────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────┤
│ [Save Progress] [Mark Complete] [Cancel]        │
└─────────────────────────────────────────────────┘
```

---

## 🧠 **Smart Automation & Standardization (Phase 2)**

### **Priority: Eliminate Subjective Reporting**
- **Structured data collection** over free-text responses
- **Standardized metrics** that enable cross-organization comparison
- **Automated calculations** to reduce manual errors and inconsistency
- **Predefined options** instead of open-ended questions

### **Intelligent Form Fields**
- **Auto-detect field types** from measurement methods:
  - Yes/No questions → Radio buttons (consistent responses)
  - "Check all that apply" → Checkboxes (standardized categories)
  - Numerical questions → Number inputs with validation + units
  - Calculations → Auto-calculating fields (eliminates errors)
  - Scales/ratings → Dropdown menus (1-5, Not difficult/Somewhat/Very)
  - Counts → Numeric inputs with built-in validation

### **Data Standardization Features**
- **Auto-convert units** (FTE to headcount, percentages to ratios)
- **Validation rules** (staff turnover can't exceed 100%, etc.)
- **Consistent formatting** (dates, currency, percentages)
- **Dropdown standardization** for common responses
- **Auto-population** from previous periods where applicable

### **Comparative Analytics Built-In**
- **Benchmark indicators** showing sector averages
- **Trend tracking** across reporting periods
- **Peer comparison** (anonymized) for similar org types
- **Data quality scores** to encourage complete reporting

---

## 📊 **Standardized Data Collection Patterns**

### **Workforce Indicators (Quantitative Focus)**
```javascript
// Instead of: "Describe your staff turnover"
// Use structured inputs:
{
  staffAtStart: { type: 'number', label: 'Staff count at period start' },
  staffAtEnd: { type: 'number', label: 'Staff count at period end' },
  staffLeft: { type: 'number', label: 'Number who left during period' },
  // Auto-calculates: turnoverRate = (staffLeft / averageStaff) * 100
}
```

### **Financial Indicators (Automated Calculations)**
```javascript
// Instead of: "Describe your funding mix"
// Use precise financial inputs:
{
  coreFunding: { type: 'currency', label: 'Total core funding ($)' },
  projectFunding: { type: 'currency', label: 'Total project funding ($)' },
  // Auto-calculates: fundingRatio, corePercentage, diversificationIndex
}
```

### **Service Delivery (Countable Metrics)**
```javascript
// Instead of: "Describe your program reach"
// Use specific counts:
{
  newClients: { type: 'number', label: 'New clients this period' },
  totalClients: { type: 'number', label: 'Total clients served' },
  serviceHours: { type: 'number', label: 'Total service hours delivered' },
  workshopsHeld: { type: 'number', label: 'Number of workshops/events' }
}
```

### **Collaboration Metrics (Structured Tracking)**
```javascript
// Instead of: "Describe your collaborations"
// Use trackable activities:
{
  coalitionMeetings: { type: 'number', label: 'YWC meetings attended' },
  jointInitiatives: { type: 'checkboxes', options: [
    'Joint funding proposals', 'Shared programming', 'Policy advocacy',
    'Resource sharing', 'Training collaboration', 'Other'
  ]},
  partnerOrganizations: { type: 'multiselect', options: memberOrgList }
}
```

### **Quality & Satisfaction (Scaled Responses)**
```javascript
// Instead of: "How satisfied are clients?"
// Use consistent scales:
{
  clientSatisfaction: { 
    type: 'scale', 
    scale: [1,2,3,4,5], 
    labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
    showAverage: true
  },
  difficultyLevel: { 
    type: 'radio', 
    options: ['Not difficult', 'Somewhat difficult', 'Very difficult', 'N/A'] 
  }
}
```

### **Standardized Response Libraries**
```javascript
// Pre-defined responses for consistency
const standardizedOptions = {
  boardCompensationTypes: [
    'Per-meeting stipend', 'Monthly honorarium', 'Annual honorarium',
    'Travel reimbursement', 'Childcare reimbursement', 'Gift cards/tokens'
  ],
  collaborationTypes: [
    'Co-delivered programming', 'Joint funding proposals', 'Shared advocacy',
    'Resource sharing', 'Attended shared events', 'Regular coordination'
  ],
  disclosureChannels: [
    'Annual report', 'AGM documents', 'Audited financials', 'Website', 'Other'
  ]
}
```

---

## 📄 **Report Generation**

### **Export Options**
- **PDF Report** with professional formatting
- **Word Document** for further editing
- **CSV Data Export** for analysis
- **Progress Summary** for board meetings

### **Report Sections**
```
YWC Compliance Report - [Organization Name]
Reporting Period: [Date Range]

Executive Summary
├─ Overall Progress: X/Y indicators complete
├─ Key Achievements
└─ Areas for Improvement

Tier 1 - Universal Indicators
├─ [Each completed indicator with response]
└─ [Evidence and next steps]

Tier 2 - Strategic Compliance
├─ [Compliance-specific responses]
└─ [Strategic alignment notes]

Tier 3 - Collective Impact
├─ [Sector-wide contributions]
└─ [Collaborative outcomes]

Appendices
├─ Supporting Documentation
└─ Action Items for Next Period
```

---

## 🛠️ **Implementation Plan**

### **Phase 1: Core MVP (Week 1-2)**
1. **Project Setup**
   - React + Vite + TailwindCSS
   - CSV parser integration
   - Basic routing and state management

2. **Data Processing**
   - CSV upload and validation
   - Indicator parsing and organization
   - Basic data storage (localStorage)

3. **Basic UI**
   - Upload interface
   - Indicator list view
   - Simple reporting forms

### **Phase 2: Enhanced UX (Week 3-4)**
1. **Progress Tracking**
   - Visual progress indicators
   - Completion status management
   - Save/resume functionality

2. **Improved Forms**
   - Better form validation
   - Rich text editing
   - Auto-save functionality

3. **Export Features**
   - PDF generation
   - Professional report formatting

### **Phase 3: Intelligence (Week 5-6)**
1. **Smart Field Detection**
   - Auto-detect field types
   - Dynamic form generation

2. **Context Awareness**
   - Organization profile integration
   - Template suggestions
   - Auto-calculation features

---

## 🎯 **Success Criteria**

### **User Experience Goals**
- ✅ **Intuitive**: Executive directors can use without training
- ✅ **Efficient**: 50% time reduction vs. Word documents
- ✅ **Professional**: Generate funder-ready reports
- ✅ **Reliable**: Never lose data, always save progress
- ✅ **Guided**: Clear instructions eliminate guesswork

### **Data Quality Goals** 
- ✅ **Standardized**: Consistent metrics across all organizations
- ✅ **Comparable**: Enable cross-organization and temporal analysis
- ✅ **Automated**: Minimize manual calculations and subjective responses
- ✅ **Validated**: Built-in validation prevents data entry errors
- ✅ **Complete**: Higher completion rates through structured collection

### **Technical Goals**
- ✅ **Fast**: < 2 second load times
- ✅ **Mobile-friendly**: Works on tablets and phones
- ✅ **Accessible**: WCAG 2.1 AA compliance
- ✅ **Secure**: Client-side only, no data transmission
- ✅ **Scalable**: Handles growth in organizations and indicators

### **Analytical Goals**
- ✅ **Benchmarking**: Organizations can compare against sector averages
- ✅ **Trending**: Track progress over multiple reporting periods
- ✅ **Insights**: Identify patterns and improvement opportunities
- ✅ **Evidence-based**: Data supports funding requests and policy advocacy

### **Business Goals**
- ✅ **Adoption**: All 8 YWC organizations actively use it
- ✅ **Quality**: Improved report quality and completeness (quantifiable)
- ✅ **Efficiency**: Faster reporting cycle for all organizations
- ✅ **Compliance**: Better alignment with funder requirements
- ✅ **Impact**: Demonstrable sector-wide improvements through data

---

## 🚀 **Deployment Strategy**

### **Development Environment**
- **Local development** with Vite dev server
- **Git repository** with clear branching strategy
- **Automated builds** on push

### **Production Deployment**
- **Netlify hosting** with automatic deployments
- **Custom domain** (ywc-reporting.ca)
- **SSL certificates** for security
- **Analytics** for usage tracking

---

## 📱 **Future Enhancements**

### **Advanced Features**
- **Multi-year tracking** with historical data
- **Collaborative editing** for team-based organizations
- **Funder-specific exports** with custom formatting
- **API integration** with YWC Workplan Builder

### **Analytics & Insights**
- **Sector-wide dashboards** showing collective progress
- **Benchmarking** against similar organizations
- **Trend analysis** across reporting periods
- **Resource recommendations** based on gaps

---

## 💡 **Key Design Principles**

1. **User-Centric**: Every decision prioritizes the executive director's experience
2. **Progressive Enhancement**: Works with basic features, enhanced with smart features
3. **Fail-Safe**: Graceful degradation when advanced features fail
4. **Inclusive**: Accessible to users with varying technical skills
5. **Transparent**: Always show progress and what's happening
6. **Efficient**: Minimize clicks, maximize clarity
7. **Professional**: Outputs that organizations are proud to submit

---

This comprehensive spec ensures we build exactly what executive directors need while incorporating all the learnings from our prototype phase!