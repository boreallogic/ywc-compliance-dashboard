# YWC Compliance Dashboard

A comprehensive web application for the Yukon Women's Coalition to transform CSV indicator data into executive-friendly compliance reports for gender-based violence prevention organizations.

## Features

✅ **CSV Upload & Processing**
- Drag-and-drop CSV file upload
- Real-time data validation
- Quarterly data storage with historical tracking

✅ **Interactive Dashboard**
- Tier-based progress visualization
- Summary statistics cards
- Real-time filtering and search

✅ **Trend Analysis**
- Multi-quarter trend charts
- Tier distribution tracking
- Indicator type analysis over time

✅ **Advanced Filtering**
- Filter by indicator type (Universal/Strategic/Collective)
- Filter by tier, pillar, source, and priority
- Full-text search across all indicators

✅ **Professional Reports**
- PDF report generation with charts and tables
- Funder-specific reports (WGED, NAP Bilateral)
- CSV export for further analysis
- Print-friendly views

✅ **Responsive Design**
- Optimized for tablets and desktop computers
- Clean, executive-friendly interface
- Accessible for non-technical users

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **CSV Parsing**: PapaParse
- **PDF Generation**: jsPDF + jsPDF-AutoTable
- **Date Handling**: date-fns
- **Storage**: localStorage (client-side persistence)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

Build the application for deployment:
```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment to Netlify or any static hosting service.

## Deployment to Netlify

### Option 1: Drag and Drop (Easiest)

1. Build the project: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `dist` folder onto the page
4. Your site is live!

### Option 2: Git-based Deployment

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

### Option 3: Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## Usage Guide

### 1. Upload CSV Data

- Click "Browse Files" or drag and drop your CSV file
- The CSV must include these columns:
  - Organization, Indicator Type, Tier, Indicator ID, Indicator Name
  - Description, Category, Pillar, Source, Priority

### 2. Navigate the Dashboard

**Dashboard View**
- See summary statistics at a glance
- View tier progress bars
- Monitor trends over time

**Indicators View**
- Browse all indicators with detailed information
- Use filters to find specific indicators
- Click any indicator to expand full details

**Trends View**
- Analyze changes across quarters
- Compare tier and type distributions
- Identify patterns in your data

**Reports View**
- Generate professional PDF reports
- Create funder-specific compliance reports
- Export data to CSV
- Print executive-ready documents

### 3. Filter Indicators

- **Primary Filter**: Universal vs Strategic Compliance vs Collective Impact
- **Advanced Filters**: Tier, Pillar, Source, Priority
- **Search**: Find indicators by name, description, or ID

### 4. Generate Reports

1. Select report type (General, WGED, or NAP Bilateral)
2. Apply filters to customize indicator selection
3. Click "Generate PDF" for a comprehensive report
4. Or use "Export CSV" for raw data export

## Data Management

### Quarterly Data
- Each CSV upload is automatically saved with a quarter/year timestamp
- Historical data enables trend analysis across time periods
- Access trend charts to visualize progress

### Data Persistence
- All data is stored locally in your browser
- Data persists between sessions
- Use "Clear Data" to start fresh

### Data Privacy
- All data processing happens in your browser
- No data is sent to external servers
- You control your data completely

## CSV File Format

Your CSV file should follow this structure:

```csv
Organization,Indicator Type,Tier,Indicator ID,Indicator Name,Description,...
"Victoria Faulkner Women's Centre","Universal","Tier 1","u1","Workforce Capacity","Measures workforce stability...",...
```

**Required Columns:**
- Organization
- Indicator Type (Universal | Strategic Compliance | Collective Impact)
- Tier (Tier 1 | Tier 2 | Tier 3)
- Indicator ID
- Indicator Name
- Description
- Category
- Pillar
- Source
- Priority

## Browser Compatibility

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Troubleshooting

### CSV Upload Fails
- Ensure your CSV has all required columns
- Check that indicator types match exactly (Universal, Strategic Compliance, Collective Impact)
- Verify tiers are formatted as "Tier 1", "Tier 2", or "Tier 3"

### No Trend Data Showing
- Trend charts require data from multiple quarters
- Upload CSV files for different quarters to see trends

### Report Generation Issues
- Ensure you have indicators loaded
- Try refreshing the page and regenerating
- Check browser console for errors

### Data Not Persisting
- Check that your browser allows localStorage
- Ensure you're not in private/incognito mode
- Some browsers may have storage limits

## Support

For technical issues or questions:
- Check the browser console for error messages
- Ensure you're using a modern browser
- Clear browser cache and try again

## License

This project is proprietary to Yukon Women's Coalition.

## Version

v1.0.0 - September 2025
