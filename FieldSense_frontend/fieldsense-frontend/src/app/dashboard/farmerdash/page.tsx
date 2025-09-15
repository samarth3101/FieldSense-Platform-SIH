"use client";

import { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  MapPin, 
  User, 
  Home,
  TrendingUp,
  CloudRain,
  Thermometer,
  Activity,
  Calendar,
  Bell,
  Camera,
  BarChart3,
  Leaf,
  Droplets,
  AlertTriangle,
  CheckCircle,
  Globe,
  Plus,
  Download,
  Smartphone
} from 'lucide-react';


import styles from '@/app/dashboard/farmerdash/FarmerDashboard.module.scss';


const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [language, setLanguage] = useState('en');
  const [currentWeather, setCurrentWeather] = useState({
    temp: 28,
    humidity: 65,
    rainfall: 20
  });

  // Mock data
  const farmerData = {
    name: "राकेश शर्मा",
    phone: "+91 98765 43210",
    village: "Kharadi Village",
    state: "Maharashtra",
    farms: [
      { id: 1, name: "मुख्य खेत", size: "2.5 acres", crop: "गेहूं", location: "Plot A1" },
      { id: 2, name: "दक्षिण खेत", size: "1.8 acres", crop: "चना", location: "Plot B2" }
    ]
  };

  const fpiScore = 78;
  const lastSoilReport = "15 days ago";
  const nextCropSuggestion = "सोयाबीन";

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🚩' }
  ];

  const navigationTabs = [
    { id: 'home', label: 'होम', icon: Home },
    { id: 'uploads', label: 'अपलोड', icon: Upload },
    { id: 'analysis', label: 'विश्लेषण', icon: BarChart3 },
    { id: 'advisory', label: 'सलाह', icon: FileText },
    { id: 'farms', label: 'खेत', icon: MapPin },
    { id: 'profile', label: 'प्रोफ़ाइल', icon: User }
  ];

  const renderHomeContent = () => (
    <div className={styles.homeContent}>
      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <FileText className={styles.cardIcon} />
            <span className={styles.cardTitle}>अंतिम मिट्टी रिपोर्ट</span>
          </div>
          <div className={styles.cardValue}>{lastSoilReport}</div>
          <div className={styles.cardStatus}>
            <CheckCircle className={styles.statusIcon} />
            <span>स्वस्थ</span>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <Leaf className={styles.cardIcon} />
            <span className={styles.cardTitle}>अगली फसल सुझाव</span>
          </div>
          <div className={styles.cardValue}>{nextCropSuggestion}</div>
          <div className={styles.cardSubtext}>खरीफ सीजन के लिए</div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <CloudRain className={styles.cardIcon} />
            <span className={styles.cardTitle}>आज का मौसम</span>
          </div>
          <div className={styles.weatherInfo}>
            <div className={styles.weatherMain}>
              <Thermometer className={styles.weatherIcon} />
              <span className={styles.temperature}>{currentWeather.temp}°C</span>
            </div>
            <div className={styles.weatherDetails}>
              <div className={styles.weatherItem}>
                <Droplets className={styles.weatherIcon} />
                <span>{currentWeather.humidity}% नमी</span>
              </div>
              <div className={styles.weatherItem}>
                <CloudRain className={styles.weatherIcon} />
                <span>{currentWeather.rainfall}% बारिश</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.cardHeader}>
            <Activity className={styles.cardIcon} />
            <span className={styles.cardTitle}>FPI स्कोर</span>
          </div>
          <div className={styles.scoreContainer}>
            <div className={styles.scoreCircle}>
              <svg className={styles.progressRing} viewBox="0 0 100 100">
                <circle
                  className={styles.progressRingBg}
                  cx="50"
                  cy="50"
                  r="40"
                />
                <circle
                  className={styles.progressRingFill}
                  cx="50"
                  cy="50"
                  r="40"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 40}`,
                    strokeDashoffset: `${2 * Math.PI * 40 * (1 - fpiScore / 100)}`
                  }}
                />
              </svg>
              <div className={styles.scoreText}>
                <span className={styles.scoreValue}>{fpiScore}</span>
                <span className={styles.scoreLabel}>अच्छा</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <h3 className={styles.sectionTitle}>त्वरित कार्य</h3>
        <div className={styles.actionGrid}>
          <button 
            className={styles.actionBtn}
            onClick={() => setActiveTab('uploads')}
          >
            <Upload className={styles.actionIcon} />
            <span>डेटा अपलोड करें</span>
          </button>
          <button 
            className={styles.actionBtn}
            onClick={() => setActiveTab('advisory')}
          >
            <FileText className={styles.actionIcon} />
            <span>सलाह देखें</span>
          </button>
          <button 
            className={styles.actionBtn}
            onClick={() => setActiveTab('farms')}
          >
            <MapPin className={styles.actionIcon} />
            <span>मेरे खेत</span>
          </button>
          <button className={styles.actionBtn}>
            <Smartphone className={styles.actionIcon} />
            <span>ऐप डाउनलोड करें</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.recentActivity}>
        <h3 className={styles.sectionTitle}>हाल की गतिविधि</h3>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>
              <FileText />
            </div>
            <div className={styles.activityContent}>
              <span className={styles.activityTitle}>मिट्टी रिपोर्ट अपलोड की गई</span>
              <span className={styles.activityTime}>2 दिन पहले</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>
              <Bell />
            </div>
            <div className={styles.activityContent}>
              <span className={styles.activityTitle}>कीट चेतावनी प्राप्त</span>
              <span className={styles.activityTime}>5 दिन पहले</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUploadsContent = () => (
    <div className={styles.uploadsContent}>
      <h2 className={styles.pageTitle}>डेटा अपलोड करें</h2>
      
      <div className={styles.uploadOptions}>
        <div className={styles.uploadCard}>
          <Camera className={styles.uploadIcon} />
          <h3 className={styles.uploadTitle}>खेत की तस्वीर लें</h3>
          <p className={styles.uploadDescription}>फसल या मिट्टी की तस्वीर अपलोड करें</p>
          <button className={styles.uploadBtn}>
            <Camera />
            कैमरा खोलें
          </button>
        </div>

        <div className={styles.uploadCard}>
          <Upload className={styles.uploadIcon} />
          <h3 className={styles.uploadTitle}>फ़ाइल अपलोड करें</h3>
          <p className={styles.uploadDescription}>CSV, PDF या इमेज फ़ाइलें</p>
          <button className={styles.uploadBtn}>
            <Upload />
            फ़ाइल चुनें
          </button>
        </div>
      </div>

      <div className={styles.uploadHistory}>
        <h3 className={styles.sectionTitle}>अपलोड इतिहास</h3>
        <div className={styles.historyList}>
          <div className={styles.historyItem}>
            <div className={styles.historyIcon}>
              <FileText />
            </div>
            <div className={styles.historyContent}>
              <span className={styles.historyTitle}>soil_report_march.pdf</span>
              <span className={styles.historyDate}>15 मार्च 2025</span>
            </div>
            <div className={styles.historyStatus}>
              <CheckCircle className={styles.statusSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalysisContent = () => (
    <div className={styles.analysisContent}>
      <h2 className={styles.pageTitle}>विश्लेषण रिपोर्ट</h2>
      
      <div className={styles.analysisGrid}>
        <div className={styles.analysisCard}>
          <h3 className={styles.cardTitle}>मिट्टी पोषक तत्व</h3>
          <div className={styles.nutrientBars}>
            <div className={styles.nutrientItem}>
              <span>नाइट्रोजन (N)</span>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{width: '75%'}}></div>
              </div>
              <span>75%</span>
            </div>
            <div className={styles.nutrientItem}>
              <span>फॉस्फोरस (P)</span>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{width: '60%'}}></div>
              </div>
              <span>60%</span>
            </div>
            <div className={styles.nutrientItem}>
              <span>पोटेशियम (K)</span>
              <div className={styles.progressBar}>
                <div className={styles.progress} style={{width: '85%'}}></div>
              </div>
              <span>85%</span>
            </div>
          </div>
        </div>

        <div className={styles.analysisCard}>
          <h3 className={styles.cardTitle}>फसल उत्पादन पूर्वानुमान</h3>
          <div className={styles.yieldGauge}>
            <div className={styles.gaugeContainer}>
              <div className={styles.gaugeValue}>4.2</div>
              <div className={styles.gaugeUnit}>टन/एकड़</div>
            </div>
          </div>
        </div>

        <div className={styles.analysisCard}>
          <h3 className={styles.cardTitle}>कीट-रोग जोखिम</h3>
          <div className={styles.riskIndicators}>
            <div className={styles.riskItem}>
              <div className={styles.riskLevel} data-level="low">
                <CheckCircle />
              </div>
              <span>कम जोखिम</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvisoryContent = () => (
    <div className={styles.advisoryContent}>
      <h2 className={styles.pageTitle}>कृषि सलाह</h2>
      
      <div className={styles.advisoryCards}>
        <div className={styles.advisoryCard}>
          <div className={styles.advisoryHeader}>
            <Droplets className={styles.advisoryIcon} />
            <h3>सिंचाई सुझाव</h3>
          </div>
          <p className={styles.advisoryText}>
            इस सप्ताह 2 बार पानी दें। अगली सिंचाई: कल सुबह
          </p>
        </div>

        <div className={styles.advisoryCard}>
          <div className={styles.advisoryHeader}>
            <Leaf className={styles.advisoryIcon} />
            <h3>उर्वरक सिफारिश</h3>
          </div>
          <p className={styles.advisoryText}>
            20 किलो यूरिया प्रति एकड़ छिड़काव करें
          </p>
        </div>

        <div className={styles.advisoryCard}>
          <div className={styles.advisoryHeader}>
            <AlertTriangle className={styles.advisoryIcon} />
            <h3>कीट चेतावनी</h3>
          </div>
          <p className={styles.advisoryText}>
            2 दिन के अंदर नीम का तेल छिड़काव करें
          </p>
        </div>
      </div>

      <button className={styles.downloadBtn}>
        <Download />
        PDF रिपोर्ट डाउनलोड करें
      </button>
    </div>
  );

  const renderFarmsContent = () => (
    <div className={styles.farmsContent}>
      <div className={styles.farmsHeader}>
        <h2 className={styles.pageTitle}>मेरे खेत</h2>
        <button className={styles.addFarmBtn}>
          <Plus />
          नया खेत जोड़ें
        </button>
      </div>
      
      <div className={styles.farmsList}>
        {farmerData.farms.map((farm) => (
          <div key={farm.id} className={styles.farmCard}>
            <div className={styles.farmInfo}>
              <h3 className={styles.farmName}>{farm.name}</h3>
              <div className={styles.farmDetails}>
                <span>{farm.size} • {farm.crop}</span>
                <span className={styles.farmLocation}>
                  <MapPin />
                  {farm.location}
                </span>
              </div>
            </div>
            <div className={styles.farmActions}>
              <button className={styles.farmActionBtn}>
                <BarChart3 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className={styles.profileContent}>
      <h2 className={styles.pageTitle}>प्रोफ़ाइल</h2>
      
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.profileAvatar}>
            <User />
          </div>
          <div className={styles.profileInfo}>
            <h3 className={styles.profileName}>{farmerData.name}</h3>
            <p className={styles.profilePhone}>{farmerData.phone}</p>
          </div>
        </div>
        
        <div className={styles.profileDetails}>
          <div className={styles.profileRow}>
            <span className={styles.profileLabel}>गांव:</span>
            <span className={styles.profileValue}>{farmerData.village}</span>
          </div>
          <div className={styles.profileRow}>
            <span className={styles.profileLabel}>राज्य:</span>
            <span className={styles.profileValue}>{farmerData.state}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return renderHomeContent();
      case 'uploads': return renderUploadsContent();
      case 'analysis': return renderAnalysisContent();
      case 'advisory': return renderAdvisoryContent();
      case 'farms': return renderFarmsContent();
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
            <span className={styles.logoText}>FieldSense</span>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.languageToggle}>
              <Globe className={styles.toggleIcon} />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className={styles.languageSelect}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
            <button className={styles.profileBtn}>
              <User />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        {navigationTabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.navTab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className={styles.navIcon} />
            <span className={styles.navLabel}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default FarmerDashboard;
