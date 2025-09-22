"use client";
import styles from "../../styles/shared.module.scss";
import { MapPin, Thermometer, Droplets, Wind, CloudRain, Calendar, Clock, Sparkles, Leaf } from "lucide-react";
import { useDashboardData } from "../../hooks/useDashboardData";

interface HomeSectionProps {
  onCaptureClick: () => void;
  language?: "hi" | "en";
}

export default function HomeSection({ onCaptureClick, language = "hi" }: HomeSectionProps) {
  const { displayName, greeting, address, weather, loading } = useDashboardData(language);
  const t = (hi: string, en: string) => (language === "hi" ? hi : en);
  const now = new Date();
  const dateStr = now.toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", { day: "2-digit", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString(language === "hi" ? "hi-IN" : "en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={styles.homeWrap}>
      {/* Greeting */}
      <div className={styles.heroCard}>
        <div className={styles.heroTitle}>
          {t("नमस्ते", "Hello")}, {displayName}!
        </div>
        <div className={styles.heroSub}>
          {t("आज आपके खेत की स्थिति देखें", "Check today’s field status")} • {greeting}
        </div>
        <div className={styles.heroMeta}>
          <div className={styles.metaItem}><Calendar size={16} /> {dateStr}</div>
          <div className={styles.metaItem}><Clock size={16} /> {timeStr}</div>
        </div>
      </div>

      {/* Full Address */}
      <div className={styles.locationStrip}>
        <MapPin className={styles.stripIcon} />
        <span className={styles.stripLabel}>{t("पता", "Address")}:</span>
        <span className={styles.stripValue}>
          {loading ? t("लोड हो रहा है...", "Loading...") : (address.full || t("उपलब्ध नहीं", "Unavailable"))}
        </span>
      </div>

      {/* Mini metrics */}
      <div className={styles.miniGrid}>
        <div className={styles.miniCard}>
          <Thermometer className={styles.miniIcon} />
          <div className={styles.miniLabel}>{t("तापमान", "Temperature")}</div>
          <div className={styles.miniValue}>{weather.temp_c != null ? `${Math.round(weather.temp_c)}°C` : "—"}</div>
        </div>
        <div className={styles.miniCard}>
          <Droplets className={styles.miniIcon} />
          <div className={styles.miniLabel}>{t("आर्द्रता", "Humidity")}</div>
          <div className={styles.miniValue}>{weather.humidity_pct != null ? `${Math.round(weather.humidity_pct)}%` : "—"}</div>
        </div>
        <div className={styles.miniCard}>
          <CloudRain className={styles.miniIcon} />
          <div className={styles.miniLabel}>{t("वर्षा संभावना", "Rain chance")}</div>
          <div className={styles.miniValue}>{weather.rain_chance_pct != null ? `${Math.round(weather.rain_chance_pct)}%` : "—"}</div>
        </div>
        <div className={styles.miniCard}>
          <Wind className={styles.miniIcon} />
          <div className={styles.miniLabel}>{t("पवन गति", "Wind")}</div>
          <div className={styles.miniValue}>{weather.wind_kph != null ? `${Math.round(weather.wind_kph)} km/h` : "—"}</div>
        </div>
      </div>

      {/* Insights row */}
      <div className={styles.insightsRow}>
        <div className={styles.insightCard}>
          <Leaf className={styles.insightIcon} />
          <div className={styles.insightText}>
            {t("आज AI विश्लेषण से अपनी फसल की स्थिति जाँचे।", "Use AI today to check crop condition.")}
          </div>
        </div>
        <div className={styles.insightCard}>
          <Sparkles className={styles.insightIcon} />
          <div className={styles.insightText}>
            {t("बेहतर सलाह के लिए सटीक स्थान और साफ़ फोटो लें।", "Get precise advice with accurate location and clear photos.")}
          </div>
        </div>
      </div>

      {/* Smart Action */}
      <div className={styles.smartActions}>
        <div className={styles.sectionTitle}>{t("स्मार्ट कार्य", "Smart actions")}</div>
        <div className={styles.actionGrid}>
          <button className={styles.smartActionBtn} onClick={onCaptureClick}>
            <div className={styles.actionIconBg}><Sparkles className={styles.actionIcon} /></div>
            <div className={styles.actionContent}>
              <div className={styles.actionTitle}>{t("फील्ड कैप्चर करें", "Capture Field")}</div>
              <div className={styles.actionDesc}>
                {t("AI विश्लेषण के लिए छवि/स्थान लें", "Take image/location for AI analysis")}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
