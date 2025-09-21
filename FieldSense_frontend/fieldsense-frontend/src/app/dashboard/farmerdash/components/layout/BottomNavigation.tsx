import { Home, Camera, MessageCircle, Sparkles } from 'lucide-react';
import styles from '../../styles/shared.module.scss';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  t: any;
}

const BottomNavigation = ({ activeTab, onTabChange, t }: BottomNavigationProps) => {
  return (
    <nav className={styles.bottomNav}>
      <button
        className={`${styles.navTab} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => onTabChange('home')}
      >
        <Home className={styles.navIcon} />
        <span className={styles.navLabel}>{t.home}</span>
      </button>
      
      <button
        className={`${styles.navTab} ${activeTab === 'capture' ? styles.active : ''}`}
        onClick={() => onTabChange('capture')}
      >
        <Camera className={styles.navIcon} />
        <span className={styles.navLabel}>{t.capture}</span>
      </button>
      
      <button
        className={`${styles.navTab} ${activeTab === 'krishimitra' ? styles.active : ''}`}
        onClick={() => onTabChange('krishimitra')}
      >
        <div className={styles.aiTabIcon}>
          <MessageCircle className={styles.navIcon} />
          <Sparkles className={styles.aiIndicator} />
        </div>
        <span className={styles.navLabel}>{t.krishiMitra}</span>
      </button>
    </nav>
  );
};

export default BottomNavigation;
