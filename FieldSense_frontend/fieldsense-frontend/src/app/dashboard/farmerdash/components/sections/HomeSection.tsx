import { MapPin, Activity, Thermometer, CheckCircle, BarChart3, ChevronRight, Camera } from 'lucide-react';
import WeatherCard from '../cards/WeatherCard';
import FarmStatusCard from '../cards/FarmStatusCard';
import StatCard from '../cards/StatCard';
import { useLanguage } from '../../hooks/useLanguage';
import { FarmerData, WeatherData } from '../../types';
import styles from '../../styles/HomeSection.module.scss';

interface HomeSectionProps {
  farmerData: FarmerData | null;
  weatherData: WeatherData | null;
  onCaptureClick: () => void;
}

const HomeSection = ({ farmerData, weatherData, onCaptureClick }: HomeSectionProps) => {
  const { language, t } = useLanguage();
  const fpiScore = 78;

  console.log('🏠 HomeSection rendering with language:', language);

  return (
    <div className={styles.homeContent}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeHeader}>
          <div className={styles.userGreeting}>
            <h2 className={styles.greeting}>
              {t.greeting}, {language === 'hi' ? 'राकेश!' : 'Rakesh!'}
            </h2>
            <p className={styles.subGreeting}>{t.subtitle}</p>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className={styles.quickStats}>
          <StatCard
            icon={<MapPin className={styles.statIcon} />}
            label={t.totalLand}
            value={farmerData?.totalLand || (language === 'hi' ? '4.3 एकड़' : '4.3 acres')}
          />
          <StatCard
            icon={<Activity className={styles.statIcon} />}
            label={t.fpiScore}
            value={`${fpiScore}/100`}
          />
          <StatCard
            icon={<Thermometer className={styles.statIcon} />}
            label={t.temperature}
            value={`${weatherData?.temp || 28}°C`}
          />
        </div>
      </div>

      {/* Weather Card */}
      <WeatherCard weatherData={weatherData} />

      {/* Smart Actions */}
      <div className={styles.smartActions}>
        <h3 className={styles.sectionTitle}>{t.smartActions}</h3>
        <div className={styles.actionGrid}>
          <button 
            className={styles.smartActionBtn}
            onClick={onCaptureClick}
          >
            <div className={styles.actionIconBg}>
              <Camera className={styles.actionIcon} />
            </div>
            <div className={styles.actionContent}>
              <span className={styles.actionTitle}>{t.captureField}</span>
              <span className={styles.actionDesc}>{t.aiAnalysis}</span>
            </div>
            <ChevronRight className={styles.chevronIcon} />
          </button>
        </div>
      </div>

      {/* Farm Status */}
      <div className={styles.farmStatus}>
        <h3 className={styles.sectionTitle}>{t.myFarms}</h3>
        <div className={styles.farmGrid}>
          {farmerData?.farms?.map((farm) => (
            <FarmStatusCard key={`${farm.id}-${language}`} farm={farm} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
