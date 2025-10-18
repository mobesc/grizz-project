// src/components/TopHeader/TopHeader.tsx

import { IonIcon, useIonRouter } from '@ionic/react';
import { cartOutline, menuOutline, searchOutline, personOutline } from 'ionicons/icons'; // Changed to personOutline
import styles from './TopHeader.module.css';

interface TopHeaderProps {
  onMenuToggle: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuToggle }) => {
  const router = useIonRouter();

  const goToLogin = () => {
    router.push('/login', 'root', 'replace');
  };
  
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBar}>
        
        {/* Left Section: Hamburger Menu & Login */}
        <div className={styles.leftGroup}>
          <button className={styles.iconButton} onClick={onMenuToggle}>
            <IonIcon icon={menuOutline} />
          </button>
          <button className={styles.iconButton} onClick={goToLogin}>
            <IonIcon icon={personOutline} /> {/* Updated icon here */}
          </button>
        </div>

        {/* Center Section: Logo */}
        <div className={styles.centerGroup}>
          <h1 className={styles.logo}>GRIZZ</h1>
        </div>

        {/* Right Section: Action Icons */}
        <div className={styles.rightGroup}>
          <button className={styles.iconButton}>
            <IonIcon icon={searchOutline} />
          </button>
          <button className={styles.iconButton}>
            <IonIcon icon={cartOutline} />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TopHeader;