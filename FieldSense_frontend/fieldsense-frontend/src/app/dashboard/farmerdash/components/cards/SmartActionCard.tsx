import { Camera, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import styles from '../../styles/shared.module.scss';

interface SmartActionCardProps {
  onCaptureClick?: () => void;
}

const SmartActionCard = ({ onCaptureClick }: SmartActionCardProps) => {
  const { t } = useLanguage();

  return (
    <div className={styles.smartActions}>
      <h3 className={styles.sectionTitle}>{t.smartActions}</h3>
      <div className={styles.actionGrid}>
        <button 
          className={`${styles.smartActionBtn} ${styles.primary}`}
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
  );
};

export default SmartActionCard;
