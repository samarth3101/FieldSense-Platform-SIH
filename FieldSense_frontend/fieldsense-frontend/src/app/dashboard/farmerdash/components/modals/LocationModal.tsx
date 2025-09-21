import { X, MapPin, Crosshair, User, Loader2 } from 'lucide-react';
import { LocationData } from '../../types';
import styles from '../../styles/shared.module.scss';

interface LocationModalProps {
  show: boolean;
  locationData: LocationData;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  farmerName: string;
  t: any;
}

const LocationModal = ({ 
  show, 
  locationData, 
  isLoading, 
  onClose, 
  onConfirm, 
  farmerName, 
  t 
}: LocationModalProps) => {
  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>{t.locationAccess}</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            <X />
          </button>
        </div>
        
        {locationData.lat ? (
          <div className={styles.locationInfo}>
            {/* Coordinates Row */}
            <div className={styles.locationRow}>
              <div className={styles.locationItem}>
                <MapPin className={styles.locationIcon} />
                <div className={styles.locationDetails}>
                  <span className={styles.locationLabel}>Lat:</span>
                  <span className={styles.locationValue}>{locationData.lat}</span>
                </div>
              </div>
              
              <div className={styles.locationItem}>
                <Crosshair className={styles.locationIcon} />
                <div className={styles.locationDetails}>
                  <span className={styles.locationLabel}>Long:</span>
                  <span className={styles.locationValue}>{locationData.long}</span>
                </div>
              </div>
            </div>
            
            {/* City and State Row - COMBINED */}
            <div className={styles.locationRow}>
              <div className={styles.locationItem}>
                <MapPin className={styles.locationIcon} />
                <div className={styles.locationDetails}>
                  <span className={styles.locationLabel}>City:</span>
                  <span className={styles.locationValue}>{locationData.city}</span>
                </div>
              </div>
              
              <div className={styles.locationItem}>
                <MapPin className={styles.locationIcon} />
                <div className={styles.locationDetails}>
                  <span className={styles.locationLabel}>State:</span>
                  <span className={styles.locationValue}>{locationData.state}</span>
                </div>
              </div>
            </div>
            
            {/* User Row */}
            <div className={styles.locationItem}>
              <User className={styles.locationIcon} />
              <div className={styles.locationDetails}>
                <span className={styles.locationLabel}>User:</span>
                <span className={styles.locationValue}>{farmerName}</span>
              </div>
            </div>
            
            <button onClick={onConfirm} className={styles.confirmBtn}>
              {t.confirmLocation}
            </button>
          </div>
        ) : (
          <div className={styles.loadingLocation}>
            <Loader2 className={styles.spinner} />
            <p>{t.gettingCoordinates}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationModal;
