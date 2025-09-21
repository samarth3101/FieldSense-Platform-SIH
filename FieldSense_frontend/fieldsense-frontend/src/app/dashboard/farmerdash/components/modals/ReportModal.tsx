"use client";
import { X, Download, FileText, Droplets, TrendingUp, Clock, MapPin, User, Phone, Mail, Calendar, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { reportService } from "../../services/reportService";
import styles from "../../styles/shared.module.scss";

interface ReportModalProps {
  show: boolean;
  data: any | null;
  onClose: () => void;
  language: string;
  t: any;
}

function fmt(n: any, d = 2) {
  return typeof n === "number" ? n.toFixed(d) : n ?? "—";
}

function getRiskIcon(level: string) {
  switch(level?.toLowerCase()) {
    case 'low': return <CheckCircle className={styles.riskIconLow} />;
    case 'medium': return <AlertTriangle className={styles.riskIconMedium} />;
    case 'high': return <XCircle className={styles.riskIconHigh} />;
    default: return <AlertTriangle className={styles.riskIconUnknown} />;
  }
}

function getRiskColor(level: string) {
  switch(level?.toLowerCase()) {
    case 'low': return '#22c55e';
    case 'medium': return '#f59e0b'; 
    case 'high': return '#ef4444';
    default: return '#6b7280';
  }
}

function getLocationName(req: any, language: string) {
  if (req?.city && req?.state) return `${req.city}, ${req.state}`;
  if (req?.lat && req?.lon) {
    const lat = parseFloat(req.lat);
    const lon = parseFloat(req.lon);
    if (lat >= 18.4 && lat <= 18.6 && lon >= 73.7 && lon <= 73.9) {
      return language === "hi" ? "पुणे, महाराष्ट्र" : "Pune, Maharashtra";
    }
    if (lat >= 19.0 && lat <= 19.3 && lon >= 72.7 && lon <= 73.1) {
      return language === "hi" ? "मुंबई, महाराष्ट्र" : "Mumbai, Maharashtra";
    }
    if (lat >= 28.4 && lat <= 28.8 && lon >= 76.9 && lon <= 77.3) {
      return language === "hi" ? "दिल्ली" : "Delhi";
    }
    return `${fmt(lat,3)}°N, ${fmt(lon,3)}°E`;
  }
  return language === "hi" ? "अज्ञात स्थान" : "Unknown Location";
}

function getUserData() {
  const authKeys = [
    'fs_user', 'user', 'authData', 'userData', 'loginData', 'currentUser', 'auth_user'
  ];

  for (const key of authKeys) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log(`Found user data in ${key}:`, parsed);
        
        const userData = {
          name: parsed.name || parsed.fullName || parsed.user?.name || parsed.user?.fullName || "Samarth Patil",
          email: parsed.email || parsed.user?.email || "samarthpatil@example.com", 
          phone: parsed.phone || parsed.mobile || parsed.user?.phone || parsed.user?.mobile || "+91 98765 43210"
        };

        // Return if we have actual data
        if (userData.name && userData.email) {
          return userData;
        }
      }
    } catch (e) {
      console.log(`Error parsing ${key}:`, e);
    }
  }

  return { 
    name: "Samarth Patil", 
    email: "samarthpatil@example.com", 
    phone: "+91 98765 43210" 
  };
}

function translate(key: string, language: string): string {
  const translations: { [key: string]: { hi: string; en: string } } = {
    cropAnalysisReport: { hi: "फसल विश्लेषण रिपोर्ट", en: "Crop Analysis Report" },
    farmerInformation: { hi: "किसान की जानकारी", en: "Farmer Information" },
    name: { hi: "नाम:", en: "Name:" },
    email: { hi: "ईमेल:", en: "Email:" },
    phone: { hi: "फोन:", en: "Phone:" },
    location: { hi: "स्थान:", en: "Location:" },
    satelliteIndices: { hi: "उपग्रह सूचकांक", en: "Satellite Indices" },
    vegetationIndex: { hi: "वनस्पति सूचकांक", en: "Vegetation Index" },
    weatherSummary: { hi: "मौसम सारांश", en: "Weather Summary" },
    humidity: { hi: "आर्द्रता", en: "Humidity" },
    temperature: { hi: "तापमान", en: "Temperature" },
    rain7days: { hi: "वर्षा (7 दिन)", en: "Rain (7 days)" },
    riskAnalysis: { hi: "जोखिम विश्लेषण", en: "Risk Analysis" },
    soil: { hi: "मिट्टी", en: "Soil" },
    crop: { hi: "फसल", en: "Crop" },
    pest: { hi: "कीट", en: "Pest" },
    aiInsights: { hi: "एआई अंतर्दृष्टि", en: "AI Insights" },
    confidence: { hi: "विश्वसनीयता:", en: "Confidence:" },
    keyDrivers: { hi: "प्रमुख कारक", en: "Key Drivers" },
    poweredBy: { hi: "द्वारा संचालित:", en: "Powered by:" },
    precisionAgriculture: { hi: "सटीक कृषि समाधान", en: "Precision Agriculture" },
    downloadPDF: { hi: "PDF डाउनलोड करें", en: "Download PDF" },
    downloadJSON: { hi: "JSON डाउनलोड करें", en: "Download JSON" },
    low: { hi: "कम", en: "Low" },
    medium: { hi: "मध्यम", en: "Medium" },
    high: { hi: "उच्च", en: "High" },
    unknown: { hi: "अज्ञात", en: "Unknown" }
  };

  return translations[key]?.[language as 'hi' | 'en'] || key;
}

function generateInsights(data: any, language: string) {
  const insights = [];
  const i = data.indices || {};
  const w = data.weather || {};
  const s = data.soil || {};
  const c = data.crop || {};
  const p = data.pest || {};

  const ndvi = parseFloat(i.ndvi);
  if (!isNaN(ndvi)) {
    if (ndvi >= 0.6) {
      insights.push(language === "hi" ? "फसल का स्वास्थ्य उत्कृष्ट है - उच्च हरित आवरण" : "Excellent crop health - high vegetation cover");
    } else if (ndvi >= 0.4) {
      insights.push(language === "hi" ? "फसल का स्वास्थ्य मध्यम है - निगरानी की आवश्यकता" : "Moderate crop health - monitoring required");
    } else {
      insights.push(language === "hi" ? "फसल का स्वास्थ्य चिंताजनक - तत्काल कार्रवाई आवश्यक" : "Poor crop health - immediate action needed");
    }
  }

  const temp = parseFloat(w.t2m_c);
  const humidity = parseFloat(w.rh2m_pct);
  const rain = parseFloat(w.rain_mm);

  if (!isNaN(temp) && temp > 30) {
    insights.push(language === "hi" ? "उच्च तापमान - अतिरिक्त सिंचाई की आवश्यकता" : "High temperature - additional irrigation needed");
  }
  
  if (!isNaN(humidity) && humidity > 85) {
    insights.push(language === "hi" ? "उच्च आर्द्रता - फंगल रोगों का खतरा" : "High humidity - fungal disease risk");
  }

  if (!isNaN(rain) && rain > 100) {
    insights.push(language === "hi" ? "भारी वर्षा - जल निकासी सुनिश्चित करें" : "Heavy rainfall - ensure proper drainage");
  }

  return insights;
}

export default function ReportModal({ show, data, onClose, language, t }: ReportModalProps) {
  if (!show || !data) return null;

  const user = getUserData();
  console.log('Report Modal - Using user ', user);

  const i = data.indices || {};
  const w = data.weather || {};
  const s = data.soil || {};
  const c = data.crop || {};
  const p = data.pest || {};
  const req = data?.request || {};
  
  const reportId = `FSR-${Date.now().toString().slice(-8)}`;
  const location = getLocationName(req, language);
  const insights = generateInsights(data, language);
  const confidence = Math.round(((s.confidence || 0) + (c.confidence || 0) + (p.confidence || 0)) / 3 * 100);

  const onDownloadPDF = async () => {
    try {
      // Create PDF-style text content
      const content = `
${translate('cropAnalysisReport', language)}
${'='.repeat(50)}

${translate('farmerInformation', language)}:
${translate('name', language)} ${user.name}
${translate('email', language)} ${user.email}
${translate('phone', language)} ${user.phone}
${translate('location', language)} ${location}

${translate('satelliteIndices', language)}:
NDVI: ${fmt(i.ndvi)}
${translate('vegetationIndex', language)}

${translate('weatherSummary', language)}:
${translate('temperature', language)}: ${fmt(w.t2m_c, 1)}°C
${translate('humidity', language)}: ${fmt(w.rh2m_pct, 0)}%
${translate('rain7days', language)}: ${fmt(w.rain_mm, 1)} mm

${translate('riskAnalysis', language)}:
${translate('soil', language)}: ${translate(s.level || 'unknown', language)}
${translate('crop', language)}: ${translate(c.level || 'unknown', language)}
${translate('pest', language)}: ${translate(p.level || 'unknown', language)}

${translate('aiInsights', language)}:
${insights.map((insight, i) => `${i + 1}. ${insight}`).join('\n')}

${translate('confidence', language)} ${confidence}%

Generated by FieldSense AI • ${new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}
      `;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FieldSense_Report_${reportId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF download failed:", e);
    }
  };

  const onDownloadJSON = async () => {
    try {
      const enhancedData = {
        reportId,
        user,
        location,
        insights,
        confidence,
        timestamp: new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN'),
        ...data
      };
      
      const blob = new Blob([JSON.stringify(enhancedData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FieldSense_Report_${reportId}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("JSON download failed:", e);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.reportModal}>
        <div className={styles.reportHeader}>
          <div className={styles.reportLogo}>
            <div className={styles.logoIcon}>🌱</div>
            <div className={styles.logoText}>
              <span>FieldSense</span>
              <span className={styles.aiTag}>AI</span>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            <X />
          </button>
        </div>

        <div className={styles.reportContent}>
          <div className={styles.reportTitle}>
            <h2>{translate('cropAnalysisReport', language)}</h2>
            <div className={styles.reportMeta}>
              <span className={styles.reportId}>ID: {reportId}</span>
              <span>{new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN')}</span>
            </div>
          </div>

          {/* User Information */}
          <div className={styles.reportSection}>
            <h3><User className={styles.sectionIcon} /> {translate('farmerInformation', language)}</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span><User size={16} /> {translate('name', language)}</span>
                <span>{user.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span><Mail size={16} /> {translate('email', language)}</span>
                <span>{user.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span><Phone size={16} /> {translate('phone', language)}</span>
                <span>{user.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span><MapPin size={16} /> {translate('location', language)}</span>
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Satellite Indices */}
          <div className={styles.reportSection}>
            <h3>{translate('satelliteIndices', language)}</h3>
            <div className={styles.ndviCard}>
              <div className={styles.ndviValue} style={{ color: parseFloat(i.ndvi) >= 0.5 ? '#22c55e' : parseFloat(i.ndvi) >= 0.3 ? '#f59e0b' : '#ef4444' }}>
                NDVI: {fmt(i.ndvi)}
              </div>
              <div className={styles.ndviDesc}>
                {translate('vegetationIndex', language)}
              </div>
              <div className={styles.ndviDate}>
                <Calendar size={14} /> {i.data_date || new Date().toISOString().split('T')[0]}
              </div>
            </div>
          </div>

          {/* Weather Summary */}
          <div className={styles.reportSection}>
            <h3>{translate('weatherSummary', language)}</h3>
            <div className={styles.weatherGrid}>
              <div className={styles.weatherCard}>
                <Droplets className={styles.weatherIcon} style={{ color: '#3b82f6' }} />
                <div className={styles.weatherValue}>{fmt(w.rh2m_pct, 0)}%</div>
                <div className={styles.weatherLabel}>{translate('humidity', language)}</div>
              </div>
              <div className={styles.weatherCard}>
                <TrendingUp className={styles.weatherIcon} style={{ color: '#f59e0b' }} />
                <div className={styles.weatherValue}>{fmt(w.t2m_c, 1)}°C</div>
                <div className={styles.weatherLabel}>{translate('temperature', language)}</div>
              </div>
              <div className={styles.weatherCard}>
                <Clock className={styles.weatherIcon} style={{ color: '#06b6d4' }} />
                <div className={styles.weatherValue}>{fmt(w.rain_mm, 1)} mm</div>
                <div className={styles.weatherLabel}>{translate('rain7days', language)}</div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className={styles.reportSection}>
            <h3>{translate('riskAnalysis', language)}</h3>
            <div className={styles.riskGrid}>
              <div className={styles.riskCard}>
                {getRiskIcon(s.level)}
                <div>
                  <div className={styles.riskTitle}>{translate('soil', language)}</div>
                  <div className={styles.riskLevel} style={{ color: getRiskColor(s.level) }}>
                    {translate(s.level || 'unknown', language)}
                  </div>
                </div>
              </div>
              <div className={styles.riskCard}>
                {getRiskIcon(c.level)}
                <div>
                  <div className={styles.riskTitle}>{translate('crop', language)}</div>
                  <div className={styles.riskLevel} style={{ color: getRiskColor(c.level) }}>
                    {translate(c.level || 'unknown', language)}
                  </div>
                </div>
              </div>
              <div className={styles.riskCard}>
                {getRiskIcon(p.level)}
                <div>
                  <div className={styles.riskTitle}>{translate('pest', language)}</div>
                  <div className={styles.riskLevel} style={{ color: getRiskColor(p.level) }}>
                    {translate(p.level || 'unknown', language)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className={styles.reportSection}>
            <h3>🤖 {translate('aiInsights', language)}</h3>
            <div className={styles.insightsContainer}>
              {insights.map((insight, idx) => (
                <div key={idx} className={styles.insightItem}>
                  <div className={styles.insightBullet}>•</div>
                  <div className={styles.insightText}>{insight}</div>
                </div>
              ))}
            </div>
            <div className={styles.confidenceBar}>
              <span className={styles.confidenceLabel}>
                {translate('confidence', language)} {confidence}%
              </span>
              <div className={styles.confidenceTrack}>
                <div 
                  className={styles.confidenceFill} 
                  style={{ width: `${confidence}%`, backgroundColor: confidence >= 70 ? '#22c55e' : confidence >= 50 ? '#f59e0b' : '#ef4444' }}
                />
              </div>
            </div>
          </div>

          {/* Drivers */}
          <div className={styles.reportSection}>
            <h4>{translate('keyDrivers', language)}</h4>
            <div className={styles.driversList}>
              {(s.drivers || []).concat(c.drivers || []).concat(p.drivers || []).map((d: string, idx: number) => (
                <div key={idx} className={styles.driverChip}>{d}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.reportFooter}>
          <div className={styles.reportActions}>
            <button onClick={onDownloadPDF} className={styles.downloadBtnSecondary}>
              <FileText size={18} /> {translate('download TXT', language)}
            </button>
            <button onClick={onDownloadJSON} className={styles.downloadBtn}>
              <Download size={18} /> {translate('downloadJSON', language)}
            </button>
          </div>
          <div className={styles.reportCredits}>
            <span>{translate('poweredBy', language)} FieldSense AI • {translate('precisionAgriculture', language)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
