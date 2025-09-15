"use client";

import { useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  Download,
  Play,
  Database,
  BarChart3,
  FileText,
  User,
  Home,
  Code,
  Eye,
  Copy,
  CheckCircle,
  Calendar,
  MapPin,
  TrendingUp,
  Activity,
  Key,
  ExternalLink,
  Settings,
  Clock,
  Globe,
  Layers
} from 'lucide-react';
import styles from '@/app/dashboard/researchdash/ResearcherDashboard.module.scss';

const ResearcherDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [apiKey, setApiKey] = useState('fpi_research_sk_1234567890abcdef');
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  // Mock data
  const researcherData = {
    name: "Dr. Priya Sharma",
    institution: "Indian Agricultural Research Institute",
    role: "Senior Research Scientist",
    email: "priya.sharma@iari.res.in",
    joinDate: "2023-01-15"
  };

  const dashboardStats = {
    datasetsAvailable: 147,
    apiRequestsToday: 2847,
    activeProjects: 8,
    recentUploads: "2 hours ago"
  };

  const datasets = [
    {
      id: 1,
      title: "Soil Health Maharashtra 2024",
      description: "Comprehensive soil analysis data from Maharashtra districts including NPK levels, pH, and organic matter content.",
      size: "2.3 GB",
      records: "1.2M",
      lastUpdated: "2024-03-15",
      region: "Maharashtra",
      category: "Soil",
      format: ["CSV", "JSON", "Excel"]
    },
    {
      id: 2,
      title: "Crop Yield Analysis Punjab 2020-2024",
      description: "Multi-year crop yield data including wheat, rice, and cotton production metrics across Punjab districts.",
      size: "890 MB",
      records: "850K",
      lastUpdated: "2024-03-12",
      region: "Punjab",
      category: "Crop",
      format: ["CSV", "JSON"]
    },
    {
      id: 3,
      title: "Weather Patterns Karnataka 2023",
      description: "Detailed weather data including rainfall, temperature, humidity from Karnataka meteorological stations.",
      size: "1.1 GB",
      records: "960K",
      lastUpdated: "2024-03-10",
      region: "Karnataka",
      category: "Weather",
      format: ["CSV", "JSON", "Excel"]
    }
  ];

  const apiExamples = [
    {
      id: 1,
      title: "Get Soil Health Data",
      method: "GET",
      endpoint: "/api/v1/soil-health",
      description: "Retrieve soil health metrics for specific regions",
      query: `{
  "region": "Maharashtra",
  "district": "Pune",
  "date_range": "2024-01-01 to 2024-03-15",
  "metrics": ["pH", "NPK", "organic_matter"]
}`
    },
    {
      id: 2,
      title: "Crop Yield Predictions",
      method: "POST",
      endpoint: "/api/v1/crop-yield/predict",
      description: "Get AI-powered crop yield predictions",
      query: `{
  "crop": "wheat",
  "region": "Punjab",
  "season": "rabi",
  "soil_data": {...},
  "weather_forecast": {...}
}`
    }
  ];

  const navigationTabs = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'api', label: 'API Playground', icon: Code },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleCopyApiKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopiedApiKey(true);
      setTimeout(() => setCopiedApiKey(false), 2000);
    } catch (err) {
      console.error('Failed to copy API key:', err);
    }
  };

  const renderHomeContent = () => (
    <div className={styles.homeContent}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1 className={styles.welcomeTitle}>Welcome back, {researcherData.name}</h1>
          <p className={styles.welcomeSubtitle}>
            Access agricultural datasets, test APIs, and generate research insights
          </p>
        </div>
        <div className={styles.welcomeActions}>
          <button 
            className={styles.actionBtn}
            onClick={() => setActiveTab('datasets')}
          >
            <Database />
            Browse Datasets
          </button>
          <button 
            className={styles.actionBtn}
            onClick={() => setActiveTab('api')}
          >
            <Code />
            API Playground
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Database className={styles.statIcon} />
            <span className={styles.statLabel}>Datasets Available</span>
          </div>
          <div className={styles.statValue}>{dashboardStats.datasetsAvailable}</div>
          <div className={styles.statChange}>+12 this month</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Activity className={styles.statIcon} />
            <span className={styles.statLabel}>API Requests Today</span>
          </div>
          <div className={styles.statValue}>{dashboardStats.apiRequestsToday.toLocaleString()}</div>
          <div className={styles.statChange}>+15% from yesterday</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <FileText className={styles.statIcon} />
            <span className={styles.statLabel}>Active Projects</span>
          </div>
          <div className={styles.statValue}>{dashboardStats.activeProjects}</div>
          <div className={styles.statChange}>2 updated recently</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <Clock className={styles.statIcon} />
            <span className={styles.statLabel}>Recent Uploads</span>
          </div>
          <div className={styles.statValue}>{dashboardStats.recentUploads}</div>
          <div className={styles.statChange}>From Maharashtra region</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <div className={styles.actionCard} onClick={() => setActiveTab('datasets')}>
            <Database className={styles.actionIcon} />
            <h3>Browse Datasets</h3>
            <p>Access soil, crop, and weather data from across India</p>
          </div>
          <div className={styles.actionCard} onClick={() => setActiveTab('api')}>
            <Code className={styles.actionIcon} />
            <h3>API Playground</h3>
            <p>Test and explore our agricultural data APIs</p>
          </div>
          <div className={styles.actionCard} onClick={() => setActiveTab('reports')}>
            <FileText className={styles.actionIcon} />
            <h3>Generate Report</h3>
            <p>Create custom research reports and analysis</p>
          </div>
          <div className={styles.actionCard}>
            <ExternalLink className={styles.actionIcon} />
            <h3>API Documentation</h3>
            <p>Complete guide to FieldSense Research APIs</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>
              <Download />
            </div>
            <div className={styles.activityContent}>
              <span className={styles.activityTitle}>Downloaded Maharashtra Soil Dataset</span>
              <span className={styles.activityTime}>2 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>
              <Code />
            </div>
            <div className={styles.activityContent}>
              <span className={styles.activityTitle}>API Query: Crop Yield Analysis</span>
              <span className={styles.activityTime}>4 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>
              <FileText />
            </div>
            <div className={styles.activityContent}>
              <span className={styles.activityTitle}>Generated Research Report</span>
              <span className={styles.activityTime}>1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDatasetsContent = () => (
    <div className={styles.datasetsContent}>
      <div className={styles.datasetsHeader}>
        <h2 className={styles.pageTitle}>Research Datasets</h2>
        <div className={styles.searchFilters}>
          <div className={styles.searchBar}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.filterBtn}>
            <Filter />
            Filters
          </button>
        </div>
      </div>

      <div className={styles.datasetsList}>
        {datasets.map((dataset) => (
          <div key={dataset.id} className={styles.datasetCard}>
            <div className={styles.datasetHeader}>
              <div className={styles.datasetInfo}>
                <h3 className={styles.datasetTitle}>{dataset.title}</h3>
                <p className={styles.datasetDescription}>{dataset.description}</p>
              </div>
              <div className={styles.datasetMeta}>
                <span className={styles.categoryBadge} data-category={dataset.category.toLowerCase()}>
                  {dataset.category}
                </span>
              </div>
            </div>
            
            <div className={styles.datasetStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Size:</span>
                <span className={styles.statValue}>{dataset.size}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Records:</span>
                <span className={styles.statValue}>{dataset.records}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Updated:</span>
                <span className={styles.statValue}>{dataset.lastUpdated}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Region:</span>
                <span className={styles.statValue}>{dataset.region}</span>
              </div>
            </div>

            <div className={styles.datasetActions}>
              <button className={styles.previewBtn}>
                <Eye />
                Preview
              </button>
              <div className={styles.downloadOptions}>
                {dataset.format.map((format) => (
                  <button key={format} className={styles.downloadBtn}>
                    <Download />
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderApiContent = () => (
    <div className={styles.apiContent}>
      <div className={styles.apiHeader}>
        <h2 className={styles.pageTitle}>API Playground</h2>
        <div className={styles.apiKeySection}>
          <label className={styles.apiKeyLabel}>Your API Key:</label>
          <div className={styles.apiKeyInput}>
            <input
              type="text"
              value={apiKey}
              readOnly
              className={styles.keyField}
            />
            <button
              onClick={handleCopyApiKey}
              className={styles.copyKeyBtn}
              title="Copy API Key"
            >
              {copiedApiKey ? <CheckCircle /> : <Copy />}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.apiPlayground}>
        <div className={styles.apiExamples}>
          <h3 className={styles.sectionTitle}>Example Queries</h3>
          {apiExamples.map((example) => (
            <div key={example.id} className={styles.exampleCard}>
              <div className={styles.exampleHeader}>
                <span className={`${styles.methodBadge} ${styles[example.method.toLowerCase()]}`}>
                  {example.method}
                </span>
                <span className={styles.endpoint}>{example.endpoint}</span>
              </div>
              <h4 className={styles.exampleTitle}>{example.title}</h4>
              <p className={styles.exampleDescription}>{example.description}</p>
              <div className={styles.queryCode}>
                <pre>{example.query}</pre>
              </div>
              <button className={styles.tryBtn}>
                <Play />
                Try Query
              </button>
            </div>
          ))}
        </div>

        <div className={styles.responseViewer}>
          <h3 className={styles.sectionTitle}>Response</h3>
          <div className={styles.responseArea}>
            <div className={styles.responsePlaceholder}>
              <Code className={styles.placeholderIcon} />
              <p>Select a query to see the response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsContent = () => (
    <div className={styles.analyticsContent}>
      <h2 className={styles.pageTitle}>Analytics Dashboard</h2>
      
      <div className={styles.analyticsGrid}>
        <div className={styles.analyticsCard}>
          <h3 className={styles.cardTitle}>Regional Data Overview</h3>
          <div className={styles.mapPlaceholder}>
            <Globe className={styles.mapIcon} />
            <p>Interactive map visualization of agricultural data across India</p>
            <button className={styles.viewMapBtn}>View Full Map</button>
          </div>
        </div>

        <div className={styles.analyticsCard}>
          <h3 className={styles.cardTitle}>Crop Yield Trends</h3>
          <div className={styles.chartPlaceholder}>
            <TrendingUp className={styles.chartIcon} />
            <p>Multi-year crop yield analysis with trend predictions</p>
          </div>
        </div>

        <div className={styles.analyticsCard}>
          <h3 className={styles.cardTitle}>Soil Health Heatmap</h3>
          <div className={styles.chartPlaceholder}>
            <Layers className={styles.chartIcon} />
            <p>Soil nutrient distribution across different regions</p>
          </div>
        </div>

        <div className={styles.analyticsCard}>
          <h3 className={styles.cardTitle}>Comparative Analysis</h3>
          <div className={styles.chartPlaceholder}>
            <BarChart3 className={styles.chartIcon} />
            <p>Compare different crops, regions, and time periods</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportsContent = () => (
    <div className={styles.reportsContent}>
      <div className={styles.reportsHeader}>
        <h2 className={styles.pageTitle}>Research Reports</h2>
        <button className={styles.newReportBtn}>
          <FileText />
          Generate New Report
        </button>
      </div>

      <div className={styles.reportGenerator}>
        <div className={styles.generatorCard}>
          <h3 className={styles.cardTitle}>Create Custom Report</h3>
          <div className={styles.reportForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Select Dataset(s):</label>
              <select className={styles.formSelect}>
                <option>Maharashtra Soil Health 2024</option>
                <option>Punjab Crop Yield 2020-2024</option>
                <option>Karnataka Weather 2023</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Report Format:</label>
              <div className={styles.formatOptions}>
                <label className={styles.radioOption}>
                  <input type="radio" name="format" value="pdf" defaultChecked />
                  PDF Report
                </label>
                <label className={styles.radioOption}>
                  <input type="radio" name="format" value="excel" />
                  Excel Analysis
                </label>
                <label className={styles.radioOption}>
                  <input type="radio" name="format" value="json" />
                  JSON Data
                </label>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date Range:</label>
              <div className={styles.dateRange}>
                <input type="date" className={styles.dateInput} />
                <span>to</span>
                <input type="date" className={styles.dateInput} />
              </div>
            </div>

            <button className={styles.generateBtn}>
              <FileText />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className={styles.reportHistory}>
        <h3 className={styles.sectionTitle}>Report History</h3>
        <div className={styles.historyList}>
          <div className={styles.historyItem}>
            <div className={styles.historyIcon}>
              <FileText />
            </div>
            <div className={styles.historyContent}>
              <span className={styles.historyTitle}>Soil Analysis Report - Maharashtra</span>
              <span className={styles.historyDate}>Generated on March 15, 2024</span>
            </div>
            <div className={styles.historyActions}>
              <button className={styles.downloadHistoryBtn}>
                <Download />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className={styles.profileContent}>
      <h2 className={styles.pageTitle}>Profile & Settings</h2>
      
      <div className={styles.profileGrid}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              <User />
            </div>
            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>{researcherData.name}</h3>
              <p className={styles.profileRole}>{researcherData.role}</p>
              <p className={styles.profileInstitution}>{researcherData.institution}</p>
            </div>
          </div>
          
          <div className={styles.profileDetails}>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Email:</span>
              <span className={styles.profileValue}>{researcherData.email}</span>
            </div>
            <div className={styles.profileRow}>
              <span className={styles.profileLabel}>Member since:</span>
              <span className={styles.profileValue}>{researcherData.joinDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.apiManagement}>
          <h3 className={styles.cardTitle}>API Key Management</h3>
          <div className={styles.apiKeysList}>
            <div className={styles.keyItem}>
              <div className={styles.keyInfo}>
                <span className={styles.keyName}>Research API Key</span>
                <span className={styles.keyValue}>{apiKey}</span>
              </div>
              <div className={styles.keyActions}>
                <button className={styles.keyBtn} onClick={handleCopyApiKey}>
                  <Copy />
                </button>
                <button className={styles.keyBtn}>
                  <Settings />
                </button>
              </div>
            </div>
          </div>
          <button className={styles.generateKeyBtn}>
            <Key />
            Generate New Key
          </button>
        </div>

        <div className={styles.accessLogs}>
          <h3 className={styles.cardTitle}>Recent API Activity</h3>
          <div className={styles.logsList}>
            <div className={styles.logItem}>
              <span className={styles.logEndpoint}>GET /api/v1/soil-health</span>
              <span className={styles.logTime}>2 hours ago</span>
            </div>
            <div className={styles.logItem}>
              <span className={styles.logEndpoint}>POST /api/v1/crop-yield/predict</span>
              <span className={styles.logTime}>4 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return renderHomeContent();
      case 'datasets': return renderDatasetsContent();
      case 'api': return renderApiContent();
      case 'analytics': return renderAnalyticsContent();
      case 'reports': return renderReportsContent();
      case 'profile': return renderProfileContent();
      default: return renderHomeContent();
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🌱</span>
            <div className={styles.logoText}>
              <span className={styles.logoName}>FieldSense</span>
              <span className={styles.logoSubtext}>Research</span>
            </div>
          </div>
          
          <div className={styles.headerActions}>
            <button className={styles.docsBtn}>
              <ExternalLink />
              API Docs
            </button>
            <button className={styles.profileBtn}>
              <User />
            </button>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        {/* Sidebar Navigation */}
        <nav className={styles.sidebar}>
          <div className={styles.navList}>
            {navigationTabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className={styles.navIcon} />
                <span className={styles.navLabel}>{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className={styles.main}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
