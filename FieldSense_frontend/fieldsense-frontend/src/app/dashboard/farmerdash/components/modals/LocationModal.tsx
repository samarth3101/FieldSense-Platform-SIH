"use client";
import { MapPin, Clock, Loader } from "lucide-react";
import styles from "../../styles/shared.module.scss";

interface LocationModalProps {
  show: boolean;
  locationData: any;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  farmerName: string;
  t: any;
  language?: string; // Add language prop
}

function formatLocation(locationData: any) {
  if (!locationData) return null;
  
  const { lat, long: lon, city, state, country } = locationData;
  
  const latNum = typeof lat === 'number' ? lat : parseFloat(lat);
  const lonNum = typeof lon === 'number' ? lon : parseFloat(lon);
  
  if (isNaN(latNum) || isNaN(lonNum)) {
    return {
      address: "Location unavailable",
      coordinates: null
    };
  }
  
  const parts = [];
  if (city && city !== "Unknown") parts.push(city);
  if (state && state !== "Unknown") parts.push(state);
  if (country && country !== "Unknown" && country !== "India") parts.push(country);
  
  const address = parts.length > 0 ? parts.join(", ") : null;
  const coordsString = `${latNum.toFixed(4)}°N, ${lonNum.toFixed(4)}°E`;
  
  if (address) {
    return {
      address,
      coordinates: coordsString
    };
  }
  
  return {
    address: coordsString,
    coordinates: null
  };
}

// Complete translation for location modal
function translateLocation(key: string, language: string): string {
  const translations: { [key: string]: { hi: string; en: string } } = {
    confirmLocation: { hi: "स्थान की पुष्टि करें", en: "Confirm Location" },
    gettingLocation: { hi: "स्थान प्राप्त कर रहे हैं...", en: "Getting location..." },
    locationError: { hi: "स्थान प्राप्त करने में त्रुटि", en: "Error getting location" },
    highAccuracy: { hi: "उच्च सटीकता GPS", en: "High Accuracy GPS" },
    cancel: { hi: "रद्द करें", en: "Cancel" },
    confirmAndAnalyze: { hi: "पुष्टि करें और विश्लेषण करें", en: "Confirm and Analyze" }
  };

  return translations[key]?.[language as 'hi' | 'en'] || key;
}

export default function LocationModal({ show, locationData, isLoading, onClose, onConfirm, farmerName, t, language = 'en' }: LocationModalProps) {
  if (!show) return null;
  
  const location = formatLocation(locationData);
  const currentTime = new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN', { 
    timeZone: 'Asia/Kolkata',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className={styles.modal}>
      <div className={styles.locationModal}>
        <div className={styles.locationHeader}>
          <div className={styles.locationIcon}>
            <MapPin size={24} />
          </div>
          <h3>{translateLocation('confirmLocation', language)}</h3>
        </div>
        
        <div className={styles.locationContent}>
          {isLoading ? (
            <div className={styles.locationLoading}>
              <Loader className={styles.spinner} />
              <p>{translateLocation('gettingLocation', language)}</p>
            </div>
          ) : location ? (
            <div className={styles.locationInfo}>
              <div className={styles.locationDetail}>
                <MapPin size={16} />
                <div>
                  <div className={styles.locationAddress}>{location.address}</div>
                  {location.coordinates && (
                    <div className={styles.locationCoords}>{location.coordinates}</div>
                  )}
                </div>
              </div>
              
              <div className={styles.locationDetail}>
                <Clock size={16} />
                <div>
                  <div className={styles.locationTime}>{currentTime}</div>
                  <div className={styles.locationTimezone}>Asia/Kolkata (IST)</div>
                </div>
              </div>
              
              <div className={styles.locationAccuracy}>
                <span className={styles.accuracyDot} />
                {translateLocation('highAccuracy', language)}
              </div>
            </div>
          ) : (
            <div className={styles.locationError}>
              <p>{translateLocation('locationError', language)}</p>
            </div>
          )}
        </div>
        
        <div className={styles.locationFooter}>
          <button onClick={onClose} className={styles.cancelBtn}>
            {translateLocation('cancel', language)}
          </button>
          <button 
            onClick={onConfirm} 
            className={styles.confirmBtn}
            disabled={isLoading || !locationData}
          >
            {translateLocation('confirmAndAnalyze', language)}
          </button>
        </div>
      </div>
    </div>
  );
}
