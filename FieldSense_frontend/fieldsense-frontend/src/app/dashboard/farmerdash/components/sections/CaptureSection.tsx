"use client";
import React from "react";
import { Camera, FileText } from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";
import styles from "../../styles/CaptureSection.module.scss";

interface CaptureSectionProps {
  onCaptureRequest: (mode: string) => void;
}

export default function CaptureSection({ onCaptureRequest }: CaptureSectionProps) {
  const { language, t } = useLanguage();

  return (
    <div className={styles.captureContent}>
      <div className={styles.captureHeader}>
        <h2 className={styles.pageTitle}>{t.captureField}</h2>
        <p className={styles.captureSubtitle}>{t.aiPoweredAnalysis}</p>
      </div>

      <div className={styles.captureOptions}>
        <div className={styles.captureCard} onClick={() => onCaptureRequest("camera")}>
          <div className={styles.captureIconWrapper}>
            <Camera className={styles.captureIcon} />
          </div>
          <h3 className={styles.captureTitle}>{t.takePhoto}</h3>
          <p className={styles.captureDesc}>{t.realTimeAnalysis}</p>
          <div className={styles.captureFeatures}>
            <span>• {t.gpsEnabled}</span>
            <span>• {t.instantProcessing}</span>
            <span>• {t.diseaseDetection}</span>
          </div>
        </div>

        <div className={styles.captureCard} onClick={() => onCaptureRequest("gallery")}>
          <div className={styles.captureIconWrapper}>
            <FileText className={styles.captureIcon} />
          </div>
          <h3 className={styles.captureTitle}>{t.uploadGallery}</h3>
          <p className={styles.captureDesc}>
            {language === "hi" ? "मौजूदा तस्वीरें अपलोड करें" : "Upload existing photos"}
          </p>
          <div className={styles.captureFeatures}>
            <span>• {t.batchUpload}</span>
            <span>• {t.historicalAnalysis}</span>
            <span>• {t.comparisonMode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
