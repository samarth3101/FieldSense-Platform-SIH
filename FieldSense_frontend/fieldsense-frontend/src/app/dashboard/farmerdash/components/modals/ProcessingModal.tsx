import { RefObject } from 'react';
import styles from '../../styles/shared.module.scss';

interface ProcessingModalProps {
  show: boolean;
  processingStep: number;
  processingSteps: string[];
  lottieRef: RefObject<HTMLDivElement | null>; // Fix: Allow null type
  t: any;
}

const ProcessingModal = ({ 
  show, 
  processingStep, 
  processingSteps, 
  lottieRef, 
  t 
}: ProcessingModalProps) => {
  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.processingModal}>
        <div className={styles.processingContainer}>
          <div className={styles.lottieWrapper} ref={lottieRef}></div>
          <div className={styles.processingText}>
            <h3>FieldSense AI {t.processing}</h3>
            <p className={styles.dynamicText}>{processingSteps[processingStep]}</p>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
              ></div>
            </div>
            <div className={styles.progressPercentage}>
              {Math.round(((processingStep + 1) / processingSteps.length) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;
