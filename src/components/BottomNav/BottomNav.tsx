// src/components/BottomNav/BottomNav.tsx

import { IonIcon, useIonRouter } from '@ionic/react';
import { beerOutline, homeOutline, informationCircleOutline } from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import styles from './BottomNav.module.css';

const BottomNav: React.FC = () => {
  const router = useIonRouter();
  const location = useLocation();

  // Function to handle navigation clicks
  const navigateTo = (path: string) => {
    // 'root' direction makes it feel like a native tab switch with no back animation
    router.push(path, 'root', 'replace');
  };

  // Helper to check if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={styles.navContainer}>
      <div className={styles.navBubble}>
        <button
          className={`${styles.navButton} ${isActive('/home') ? styles.active : ''}`}
          onClick={() => navigateTo('/home')}
        >
          <IonIcon icon={homeOutline} />
        </button>
        <button
          className={`${styles.navButton} ${isActive('/beers') ? styles.active : ''}`}
          onClick={() => navigateTo('/beers')}
        >
          <IonIcon icon={beerOutline} />
        </button>
        <button
          className={`${styles.navButton} ${isActive('/about') ? styles.active : ''}`}
          onClick={() => navigateTo('/about')}
        >
          <IonIcon icon={informationCircleOutline} />
        </button>
      </div>
    </div>
  );
};

export default BottomNav;