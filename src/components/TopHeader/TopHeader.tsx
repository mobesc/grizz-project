// src/components/TopHeader/TopHeader.tsx

import { IonIcon } from '@ionic/react';
import { cartOutline, menuOutline, searchOutline } from 'ionicons/icons';
import styles from './TopHeader.module.css';

const TopHeader: React.FC = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        {/* Left Side: Hamburger Menu */}
        <button className={styles.iconButton}>
          <IonIcon icon={menuOutline} />
        </button>

        {/* Right Side: Action Icons */}
        <div className={styles.actionGroup}>
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