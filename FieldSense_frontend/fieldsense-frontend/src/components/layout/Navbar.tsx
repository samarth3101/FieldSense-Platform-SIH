// src/components/layout/Navbar.tsx
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🌱 FieldSense</div>
      <ul className={styles.navLinks}>
        <li><a href="#features">Features</a></li>
        <li><a href="#auth">Login / Signup</a></li>
      </ul>
    </nav>
  );
}
