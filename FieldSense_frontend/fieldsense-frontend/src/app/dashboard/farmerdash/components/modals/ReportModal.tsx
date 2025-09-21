import { X, Download, Droplets, TrendingUp, Clock } from 'lucide-react';
import { ReportData } from '../../types';
import { reportService } from '../../services/reportService';
import styles from '../../styles/shared.module.scss';

interface ReportModalProps {
  show: boolean;
  reportData: ReportData | null;
  onClose: () => void;
  language: string;
  t: any;
}

const ReportModal = ({ show, reportData, onClose, language, t }: ReportModalProps) => {
  if (!show || !reportData) return null;

  const handleDownload = () => {
    reportService.downloadReport(reportData, null, language);
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
            <h2>{language === 'hi' ? 'फसल विश्लेषण रिपोर्ट' : 'Crop Analysis Report'}</h2>
            <div className={styles.reportMeta}>
              <span>ID: {reportData.id}</span>
              <span>{reportData.timestamp}</span>
            </div>
          </div>
          
          <div className={styles.reportSection}>
            <h3>{language === 'hi' ? 'किसान की जानकारी' : 'Farmer Information'}</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span>{language === 'hi' ? 'नाम:' : 'Name:'}</span>
                <span>{reportData.farmer.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span>{language === 'hi' ? 'किसान ID:' : 'Farmer ID:'}</span>
                <span>{reportData.farmer.farmerID}</span>
              </div>
              <div className={styles.infoItem}>
                <span>{language === 'hi' ? 'फोन:' : 'Phone:'}</span>
                <span>{reportData.farmer.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span>{language === 'hi' ? 'स्थान:' : 'Location:'}</span>
                <span>{reportData.farmer.village}, {reportData.farmer.state}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.reportSection}>
            <h3>{language === 'hi' ? 'विश्लेषण परिणाम' : 'Analysis Results'}</h3>
            <div className={styles.analysisResults}>
              <div className={styles.scoreCard}>
                <div className={styles.scoreValue}>{reportData.cropHealth}/100</div>
                <div className={styles.scoreLabel}>
                  {language === 'hi' ? 'फसल स्वास्थ्य' : 'Crop Health'}
                </div>
              </div>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <Droplets className={styles.metricIcon} />
                  <span className={styles.metricValue}>{reportData.soilMoisture}%</span>
                  <span className={styles.metricLabel}>
                    {language === 'hi' ? 'मिट्टी नमी' : 'Soil Moisture'}
                  </span>
                </div>
                <div className={styles.metricCard}>
                  <TrendingUp className={styles.metricIcon} />
                  <span className={styles.metricValue}>{reportData.yieldPrediction}</span>
                  <span className={styles.metricLabel}>
                    {language === 'hi' ? 'टन/एकड़' : 'Ton/Acre'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.reportSection}>
            <h3>{language === 'hi' ? 'पोषक तत्व विश्लेषण' : 'Nutrient Analysis'}</h3>
            <div className={styles.nutrientAnalysis}>
              <div className={styles.nutrientItem}>
                <span className={styles.nutrientName}>
                  {language === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}
                </span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: `${reportData.npkLevels.n}%`}}></div>
                </div>
                <span className={styles.nutrientValue}>{reportData.npkLevels.n}%</span>
              </div>
              <div className={styles.nutrientItem}>
                <span className={styles.nutrientName}>
                  {language === 'hi' ? 'फॉस्फोरस (P)' : 'Phosphorus (P)'}
                </span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: `${reportData.npkLevels.p}%`}}></div>
                </div>
                <span className={styles.nutrientValue}>{reportData.npkLevels.p}%</span>
              </div>
              <div className={styles.nutrientItem}>
                <span className={styles.nutrientName}>
                  {language === 'hi' ? 'पोटेशियम (K)' : 'Potassium (K)'}
                </span>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{width: `${reportData.npkLevels.k}%`}}></div>
                </div>
                <span className={styles.nutrientValue}>{reportData.npkLevels.k}%</span>
              </div>
            </div>
          </div>
          
          <div className={styles.reportSection}>
            <h3>{language === 'hi' ? 'सुझाव' : 'Recommendations'}</h3>
            <ul className={styles.recommendations}>
              {reportData.recommendations.map((rec: string, index: number) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className={styles.reportSection}>
            <h3>{language === 'hi' ? 'सिंचाई अनुसूची' : 'Irrigation Schedule'}</h3>
            <div className={styles.scheduleList}>
              {reportData.irrigationSchedule.map((schedule: string, index: number) => (
                <div key={index} className={styles.scheduleItem}>
                  <Clock className={styles.scheduleIcon} />
                  <span>{schedule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className={styles.reportFooter}>
          <button onClick={handleDownload} className={styles.downloadBtn}>
            <Download />
            {t.downloadReport}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
