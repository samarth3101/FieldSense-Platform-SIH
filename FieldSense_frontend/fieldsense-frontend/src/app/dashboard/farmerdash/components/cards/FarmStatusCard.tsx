import { CheckCircle, BarChart3 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { Farm } from '../../types';
import styles from '../../styles/shared.module.scss';

interface FarmStatusCardProps {
  farm: Farm;
}

const FarmStatusCard = ({ farm }: FarmStatusCardProps) => {
  const { language, t } = useLanguage();

  // Translate status based on current language
  const getHealthText = (health: string) => {
    if (language === 'hi') {
      if (health === 'Excellent' || health === 'उत्कृष्ट') return 'उत्कृष्ट';
      if (health === 'Good' || health === 'अच्छा') return 'अच्छा';
      return health;
    } else {
      if (health === 'उत्कृष्ट' || health === 'Excellent') return 'Excellent';
      if (health === 'अच्छा' || health === 'Good') return 'Good';
      return health;
    }
  };

  const healthText = getHealthText(farm.health);
  const isExcellent = healthText === 'Excellent' || healthText === 'उत्कृष्ट';

  return (
    <div className={styles.farmStatusCard}>
      <div className={styles.farmHeader}>
        <div className={styles.farmBasic}>
          <h4 className={styles.farmName}>{farm.name}</h4>
          <span className={styles.farmSize}>{farm.size} • {farm.crop}</span>
          <div className={styles.farmMeta}>
            <span className={styles.soilType}>{farm.soilType}</span>
            <span className={styles.irrigationType}>{farm.irrigationType}</span>
          </div>
        </div>
        <div className={`${styles.healthBadge} ${isExcellent ? styles.excellent : styles.good}`}>
          <CheckCircle className={styles.healthIcon} />
          {healthText}
        </div>
      </div>
      <div className={styles.farmFooter}>
        <span className={styles.lastUpdate}>
          {language === 'hi' ? 'अपडेट' : 'Updated'}: {farm.lastUpdate} {language === 'hi' ? 'दिन पहले' : 'days ago'}
        </span>
        <button className={styles.viewDetailsBtn}>
          <BarChart3 className={styles.detailIcon} />
          {language === 'hi' ? 'विश्लेषण देखें' : 'View Analysis'}
        </button>
      </div>
    </div>
  );
};

export default FarmStatusCard;
