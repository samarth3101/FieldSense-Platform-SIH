import { ReactNode } from 'react';
import styles from '../../styles/shared.module.scss';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

const StatCard = ({ icon, label, value }: StatCardProps) => {
  return (
    <div className={styles.statItem}>
      {icon}
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statValue}>{value}</span>
    </div>
  );
};

export default StatCard;
