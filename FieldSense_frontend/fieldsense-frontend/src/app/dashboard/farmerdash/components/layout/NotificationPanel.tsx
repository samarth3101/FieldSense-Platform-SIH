import { X, AlertTriangle } from 'lucide-react';
import { NotificationData } from '../../types';
import styles from '../../styles/shared.module.scss';

interface NotificationPanelProps {
  notifications: NotificationData[];
  show: boolean;
  onClose: () => void;
  t: any;
}

const NotificationPanel = ({ notifications, show, onClose, t }: NotificationPanelProps) => {
  return (
    <div className={`${styles.notificationPanel} ${show ? styles.show : ''}`}>
      <div className={styles.notificationHeader}>
        <h3>{t.notifications}</h3>
        <button onClick={onClose} className={styles.closeBtn}>
          <X />
        </button>
      </div>
      <div className={styles.notificationList}>
        {notifications.map((notification) => (
          <div key={notification.id} className={`${styles.notificationItem} ${notification.urgent ? styles.urgent : ''}`}>
            <div className={styles.notificationIcon}>
              <notification.icon />
            </div>
            <div className={styles.notificationContent}>
              <h4 className={styles.notificationTitle}>{notification.title}</h4>
              <p className={styles.notificationMessage}>{notification.message}</p>
              <span className={styles.notificationTime}>{notification.time}</span>
            </div>
            {notification.urgent && (
              <div className={styles.urgentBadge}>
                <AlertTriangle size={12} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
