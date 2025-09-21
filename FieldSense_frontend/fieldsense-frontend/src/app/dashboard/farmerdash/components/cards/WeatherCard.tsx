import { CloudRain, Droplets } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { WeatherData } from '../../types';
import styles from '../../styles/shared.module.scss';

interface WeatherCardProps {
  weatherData: WeatherData | null;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  const { language, t } = useLanguage();

  if (!weatherData) {
    return (
      <div className={styles.weatherCard}>
        <div className={styles.weatherHeader}>
          <h3 className={styles.cardTitle}>{t.todayWeather}</h3>
          <span className={styles.weatherCondition}>Loading...</span>
        </div>
      </div>
    );
  }

  // Translate weather condition
  const getWeatherCondition = () => {
    if (language === 'hi') {
      return t.partlyCloud; // or weatherData.condition if it's already in Hindi
    } else {
      return 'Partly Cloudy'; // English condition
    }
  };

  return (
    <div className={styles.weatherCard}>
      <div className={styles.weatherHeader}>
        <h3 className={styles.cardTitle}>{t.todayWeather}</h3>
        <span className={styles.weatherCondition}>{getWeatherCondition()}</span>
      </div>
      <div className={styles.weatherGrid}>
        <div className={styles.mainWeather}>
          <div className={styles.tempDisplay}>
            <span className={styles.temperature}>{weatherData.temp}°C</span>
            <CloudRain className={styles.weatherIcon} />
          </div>
        </div>
        <div className={styles.weatherDetails}>
          <div className={styles.weatherItem}>
            <Droplets className={styles.weatherIcon} />
            <span className={styles.weatherLabel}>{t.humidity}</span>
            <span className={styles.weatherValue}>{weatherData.humidity}%</span>
          </div>
          <div className={styles.weatherItem}>
            <CloudRain className={styles.weatherIcon} />
            <span className={styles.weatherLabel}>{t.rainfall}</span>
            <span className={styles.weatherValue}>{weatherData.rainfall}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
