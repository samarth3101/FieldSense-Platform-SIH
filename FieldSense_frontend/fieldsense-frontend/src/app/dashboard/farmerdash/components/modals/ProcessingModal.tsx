"use client";
import { RefObject } from "react";
import styles from "../../styles/shared.module.scss";

interface ProcessingModalProps {
  show: boolean;
  processingStep: number;
  processingSteps: string[];
  lottieRef: RefObject<HTMLDivElement | null>;
  t: any;
}

export default function ProcessingModal({ show, processingStep, processingSteps, lottieRef, t }: ProcessingModalProps) {
  if (!show) return null;
  
  const pct = Math.round(((processingStep + 1) / Math.max(processingSteps.length, 1)) * 100);
  const currentStep = processingSteps[processingStep] || "Processing...";
  
  return (
    <div className={styles.modal}>
      <div className={styles.processingModal}>
        <div className={styles.processingContainer}>
          <div className={styles.lottieWrapper} ref={lottieRef}></div>
          <div className={styles.processingText}>
            <h3>FieldSense AI {t.processing || "Processing"}</h3>
            <p className={styles.dynamicText}>{currentStep}</p>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${pct}%` }} />
            </div>
            <div className={styles.progressPercentage}>{pct}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
