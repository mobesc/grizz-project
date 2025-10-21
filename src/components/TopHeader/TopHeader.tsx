// src/components/TopHeader/TopHeader.tsx

import { IonIcon, useIonRouter, IonBadge } from '@ionic/react'; // Keep IonBadge
import { cartOutline, menuOutline, searchOutline, personOutline } from 'ionicons/icons';
import styles from './TopHeader.module.css';
import { useCart } from '../../context/CartContext';

interface TopHeaderProps {
  onMenuToggle: () => void; // For the LEFT menu
  // Add this back if you implement the right-side cart menu
  // onCartClick: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuToggle }) => { // Keep onMenuToggle
  const router = useIonRouter();
  const { getCartItemCount } = useCart(); // Use getCartItemCount
  const totalItems = getCartItemCount();

  const goToLogin = () => {
    router.push('/login', 'root', 'replace');
  };

  const goToHome = () => {
    router.push('/home', 'root', 'replace');
  }

  // Placeholder function for cart click
  const handleCartClick = () => {
    console.log("Cart icon clicked...");
    // Future: onCartClick(); // Call this if using the right-side menu
  };

  return (
    // Use the div structure again for styling purposes
    <div className={styles.headerContainer}>
      <div className={styles.headerBar}> {/* This div gets the glass effect */}

        <div className={styles.leftGroup}>
          <button className={styles.iconButton} onClick={onMenuToggle}> {/* Use onMenuToggle */}
            <IonIcon icon={menuOutline} />
          </button>
          <button className={styles.iconButton} onClick={goToLogin}>
            <IonIcon icon={personOutline} />
          </button>
        </div>

        {/* Center Section with Image Logo */}
        <div className={styles.centerGroup} onClick={goToHome} style={{ cursor: 'pointer' }}>
          <img
            src="/assets/NAME_LIGHT.png" // Keep the image logo
            alt="GRIZZ Logo"
            className={styles.logoImage} // Use the image style class
          />
        </div>

        <div className={styles.rightGroup}>
          <button className={styles.iconButton}>
            <IonIcon icon={searchOutline} />
          </button>
          <button className={`${styles.iconButton} ${styles.cartButtonContainer}`} onClick={handleCartClick}> {/* Call placeholder */}
            <IonIcon icon={cartOutline} />
            {totalItems > 0 && (
              <IonBadge color="primary" className={styles.cartBadge}>
                {totalItems}
              </IonBadge>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopHeader;