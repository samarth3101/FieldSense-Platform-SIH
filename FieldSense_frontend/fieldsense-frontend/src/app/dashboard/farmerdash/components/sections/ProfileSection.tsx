"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/ProfileSection.module.scss";
import {
  User, Phone, Mail, MapPin, Calendar, BarChart3, Activity,
  Settings, HelpCircle, LogOut, ChevronRight, X
} from "lucide-react";
import { useLanguage } from "../../hooks/useLanguage";

interface ProfileSectionProps {
  onClose?: () => void;
}

function readLoginUser() {
  const keys = ["fs_user","user","userData","loginResponse","auth_user"];
  let name = "", email = "", phone = "";
  for (const k of keys) {
    try {
      const raw = localStorage.getItem(k);
      if (raw) {
        const p = JSON.parse(raw);
        name = p?.name || p?.fullName || p?.user?.name || name;
        email = p?.email || p?.user?.email || email;
        phone = p?.phone || p?.mobile || p?.user?.phone || phone;
      }
    } catch {}
  }
  return { name, email, phone };
}

export default function ProfileSection({ onClose }: ProfileSectionProps) {
  const { language, t } = useLanguage();
  const [user, setUser] = useState<{name:string;email:string;phone:string}>({ name:"", email:"", phone:"" });
  const [avatar, setAvatar] = useState<string>(localStorage.getItem("fs_avatar") || "");
  const fpiScore = 78;

  // Localized labels to avoid t.name shape issues
  const labels = language === "hi"
    ? {
        PROFILE: "प्रोफ़ाइल",
        USER: "उपयोगकर्ता",
        FPI: "FPI स्कोर",
        LANGUAGE: "भाषा",
        PHONE: "फोन",
        EMAIL: "ईमेल",
        CONTACT_INFO: "संपर्क जानकारी",
        PERSONAL_INFO: "व्यक्तिगत जानकारी",
        NAME: "नाम",
        VILLAGE: "गाँव",
        MEMBER_SINCE: "से सदस्य",
        ACCOUNT_SETTINGS: "खाता सेटिंग्स",
        HELP_SUPPORT: "सहायता",
        LOGOUT: "लॉगआउट",
        CHANGE_PHOTO: "फोटो बदलें"
      }
    : {
        PROFILE: "Profile",
        USER: "user",
        FPI: "FPI score",
        LANGUAGE: "Language",
        PHONE: "Phone",
        EMAIL: "Email",
        CONTACT_INFO: "Contact info",
        PERSONAL_INFO: "Personal info",
        NAME: "Name",
        VILLAGE: "Village",
        MEMBER_SINCE: "Member since",
        ACCOUNT_SETTINGS: "Account settings",
        HELP_SUPPORT: "Help & support",
        LOGOUT: "Logout",
        CHANGE_PHOTO: "Change photo"
      };

  useEffect(() => {
    setUser(readLoginUser());
  }, []);

  const handleLogout = () => {
    const confirmMessage = language === "hi" ? "क्या आप वाकई लॉगआउट करना चाहते हैं?" : "Are you sure you want to logout?";
    if (!window.confirm(confirmMessage)) return;

    if ((window as any).handleDashboardLogout) (window as any).handleDashboardLogout();
    localStorage.clear();
    sessionStorage.clear();
    alert(language === "hi" ? "सफलतापूर्वक लॉगआउट हो गए" : "Successfully logged out");
    window.location.replace("/");
  };

  const onPickAvatar = () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = (e: any) => {
      const f = e.target.files?.[0]; if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        setAvatar(url);
        localStorage.setItem("fs_avatar", url);
      };
      reader.readAsDataURL(f);
    };
    input.click();
  };

  return (
    <div className={styles.profileContent}>
      {onClose && (
        <div className={styles.profileModalHeader}>
          <h1>{labels.PROFILE}</h1>
          <button onClick={onClose} className={styles.closeBtn}><X /></button>
        </div>
      )}

      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar} onClick={onPickAvatar} title={labels.CHANGE_PHOTO}>
          {avatar ? (
            <div style={{ width:"100%", height:"100%", borderRadius:"50%", backgroundImage:`url(${avatar})`, backgroundSize:"cover", backgroundPosition:"center" }} />
          ) : <User /> }
        </div>
        <div className={styles.profileInfo}>
          <h2 className={styles.profileName}>{user.name || "—"}</h2>
          <p className={styles.profileLocation}>{user.email || "—"}</p>
          <span className={styles.memberSince}>FieldSense {labels.USER}</span>
        </div>
      </div>

      <div className={styles.profileStats}>
        <div className={styles.statCard}>
          <Activity className={styles.statIcon} />
          <span className={styles.statValue}>{fpiScore}/100</span>
          <span className={styles.statLabel}>{labels.FPI}</span>
        </div>
        <div className={styles.statCard}>
          <BarChart3 className={styles.statIcon} />
          <span className={styles.statValue}>{language==="hi"?"हिंदी":"English"}</span>
          <span className={styles.statLabel}>{labels.LANGUAGE}</span>
        </div>
        <div className={styles.statCard}>
          <Phone className={styles.statIcon} />
          <span className={styles.statValue}>{user.phone || "—"}</span>
          <span className={styles.statLabel}>{labels.PHONE}</span>
        </div>
      </div>

      <div className={styles.profileSections}>
        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>{labels.CONTACT_INFO}</h3>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <Phone className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{labels.PHONE}:</span>
                <span className={styles.infoValue}>{user.phone || "—"}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Mail className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{labels.EMAIL}:</span>
                <span className={styles.infoValue}>{user.email || "—"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileSection}>
          <h3 className={styles.sectionTitle}>{labels.PERSONAL_INFO}</h3>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <User className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{labels.NAME}:</span>
                <span className={styles.infoValue}>{user.name || "—"}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <MapPin className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{labels.VILLAGE}:</span>
                <span className={styles.infoValue}>—</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Calendar className={styles.infoIcon} />
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>{labels.MEMBER_SINCE}:</span>
                <span className={styles.infoValue}>—</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profileActions}>
          <button className={styles.actionButton}>
            <Settings className={styles.actionIcon} />
            <span>{labels.ACCOUNT_SETTINGS}</span>
            <ChevronRight className={styles.chevronIcon} />
          </button>

          <button className={styles.actionButton}>
            <HelpCircle className={styles.actionIcon} />
            <span>{labels.HELP_SUPPORT}</span>
            <ChevronRight className={styles.chevronIcon} />
          </button>

          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut className={styles.actionIcon} />
            <span>{labels.LOGOUT}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
