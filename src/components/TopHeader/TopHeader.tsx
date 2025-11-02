// src/components/TopHeader/TopHeader.tsx

import { IonIcon, useIonRouter, IonBadge } from '@ionic/react';
import { cartOutline, menuOutline, searchOutline, personOutline }from 'ionicons/icons';
import styles from './TopHeader.module.css';
import { useCart } from '../../context/CartContext';

interface TopHeaderProps {
  onMenuToggle: () => void;
  onCartClick: () => void; // <-- Prop to open the modal
}

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuToggle, onCartClick }) => { // <-- Get prop
  const router = useIonRouter();
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  const goToLogin = () => {
    router.push('/login', 'root', 'replace');
  };

  const goToHome = () => {
    router.push('/home', 'root', 'replace');
  }

  // --- MODIFIED: This function now calls the prop from App.tsx ---
  const handleCartClick = () => {
    onCartClick(); // <-- It should ONLY have this line
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerBar}>

        <div className={styles.leftGroup}>
          <button className={styles.iconButton} onClick={onMenuToggle}>
            <IonIcon icon={menuOutline} />
          </button>
          <button className={styles.iconButton} onClick={goToLogin}>
            <IonIcon icon={personOutline} />
          </button>
        </div>

        {/* --- MODIFIED CENTER GROUP --- */}
        <div className={styles.centerGroup} onClick={goToHome} style={{ cursor: 'pointer' }}>
          {/* Replaced image with H1 text */}
          <h1 className={styles.logo}>GRIZZ</h1>
        </div>
        {/* --- END MODIFIED GROUP --- */}

        <div className={styles.rightGroup}>
          <button className={styles.iconButton}>
            <IonIcon icon={searchOutline} />
          </button>
          <button className={`${styles.iconButton} ${styles.cartButtonContainer}`} onClick={handleCartClick}>
            <IonIcon icon={cartOutline} />
            {cartItemCount > 0 && (
              <IonBadge color="primary" className={styles.cartBadge}>
                {cartItemCount}
              </IonBadge>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopHeader;