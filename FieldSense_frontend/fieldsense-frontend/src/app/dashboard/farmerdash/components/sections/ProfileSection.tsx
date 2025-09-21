import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  BarChart3, 
  Activity,
  Settings, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../hooks/useLanguage';
import { FarmerData } from '../../types';
import styles from '../../styles/ProfileSection.module.scss';

interface ProfileSectionProps {
  farmerData: FarmerData | null;
  onClose?: () => void;
}

const ProfileSection = ({ farmerData, onClose }: ProfileSectionProps) => {
  const { language, t } = useLanguage();
  const router = useRouter();
  const fpiScore = 78;

  console.log('👤 ProfileSection rendering with language:', language);

  const handleLogout = () => {
    const confirmMessage = language === 'hi' 
      ? "क्या आप वाकई लॉगआउट करना चाहते हैं?"
      : "Are you sure you want to logout?";
      
    const confirmed = window.confirm(confirmMessage);
    
    if (confirmed) {
      console.log('🚪 Logging out...');
      
      // Clear ALL authentication data
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear any cookies if you're using them
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Show logout message
      const logoutMessage = language === 'hi' 
        ? "सफलतापूर्वक लॉगआउट हो गए"
        : "Successfully logged out";
        
      alert(logoutMessage);
      
      // IMPORTANT: Use replace to prevent back navigation + force reload
      window.location.replace('/');
      
      // Additional security: Clear browser history
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '/');
      }
    }
  };

  if (!farmerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profileContent}>
      {onClose && (
        <div className={styles.profileModalHeader}>
          <h1>{t.profile}</h1>
          <button onClick={onClose} className={styles.closeBtn}>
            <X />
          </button>
        </div>
      )}
      
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar}>
          <User />
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{farmerData.name}</h2>
          <p className={styles.profileLocation}>{farmerData.village}, {farmerData.state}</p>
          <span className={styles.memberSince}>
            {t.memberSince}: {farmerData.memberSince}
          </span>
        </div>
      </div>

      <div className={styles.profileStats}>
        <div className={styles.statCard}>
          <MapPin className={styles.statIcon} />
          <span className={styles.statValue}>{farmerData.totalLand}</span>
          <span className={styles.statLabel}>{t.totalLand}</span>
        </div>
        <div className={styles.statCard}>
          <Activity className={styles.statIcon} />
          <span className={styles.statValue}>{fpiScore}/100</span>
          <span className={styles.statLabel}>{t.fpiScore}</span>
        </div>
        <div className={styles.statCard}>
          <BarChart3 className={styles.statIcon} />
          <span className={styles.statValue}>{farmerData.farms.length}</span>
          <span className={styles.statLabel}>
            {language === 'hi' ? 'खेत' : 'Farms'}
          </span>
        </div>
      </div>

      <div className={styles.profileSections}>
        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>{t.contactInfo}</h3>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <Phone className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.phone}:</span>
                <span className={styles.infoValue}>{farmerData.phone}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Mail className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.email}:</span>
                <span className={styles.infoValue}>{farmerData.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>{t.personalInfo}</h3>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <MapPin className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.village}:</span>
                <span className={styles.infoValue}>{farmerData.village}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <MapPin className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.district}:</span>
                <span className={styles.infoValue}>{farmerData.district}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <MapPin className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.state}:</span>
                <span className={styles.infoValue}>{farmerData.state}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <MapPin className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.pincode}:</span>
                <span className={styles.infoValue}>{farmerData.pincode}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>{t.aboutAccount}</h3>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <User className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.farmerID}:</span>
                <span className={styles.infoValue}>{farmerData.farmerID}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Calendar className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{t.memberSince}:</span>
                <span className={styles.infoValue}>{farmerData.memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.profileActions}>
        <button className={styles.actionButton}>
          <Settings className={styles.actionIcon} />
          <span>{t.accountSettings}</span>
          <ChevronRight className={styles.chevronIcon} />
        </button>
        
        <button className={styles.actionButton}>
          <HelpCircle className={styles.actionIcon} />
          <span>{t.helpSupport}</span>
          <ChevronRight className={styles.chevronIcon} />
        </button>
        
        <button className={styles.logoutButton} onClick={handleLogout}>
          <LogOut className={styles.actionIcon} />
          <span>{t.logout}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
