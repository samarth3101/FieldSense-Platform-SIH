import { Bell, Globe, User } from 'lucide-react';
import styles from '../../styles/Header.module.scss';

interface HeaderProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  notifications: any[];
  showNotifications: boolean;
  onToggleNotifications: () => void;
  onProfileClick: () => void;
  t: any;
}

const Header = ({
  language,
  onLanguageChange,
  notifications,
  showNotifications,
  onToggleNotifications,
  onProfileClick,
  t
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>🌱</div>
          <span className={styles.logoText}>FieldSense</span>
          <span className={styles.betaBadge}>AI</span>
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.languageToggle}>
            <Globe className={styles.toggleIcon} />
            <select 
              value={language} 
              onChange={(e) => onLanguageChange(e.target.value)}
              className={styles.languageSelect}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          <button 
            className={styles.notificationBtn}
            onClick={onToggleNotifications}
          >
            <Bell />
            <span className={styles.notificationBadge}>
              {notifications.filter(n => n.urgent).length || notifications.length}
            </span>
          </button>
          
          <button className={styles.profileBtn} onClick={onProfileClick}>
            <User />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
