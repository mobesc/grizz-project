// src/components/TopHeader/TopHeader.tsx

import { IonIcon, useIonRouter, IonBadge } from '@ionic/react'; // <-- Import IonBadge
import { cartOutline, menuOutline, searchOutline, personOutline } from 'ionicons/icons';
import styles from './TopHeader.module.css';
import { useCart } from '../../context/CartContext'; // <-- Import useCart

interface TopHeaderProps {
  onMenuToggle: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onMenuToggle }) => {
  const router = useIonRouter();
  const { getCartItemCount } = useCart(); // <-- Get cart count function from context
  const cartItemCount = getCartItemCount(); // Calculate count

  const goToLogin = () => {
    router.push('/login', 'root', 'replace');
  };

  // Function to navigate to a potential cart page (implement later)
  const goToCart = () => {
      console.log("Navigating to Cart page...");
      // router.push('/cart', 'root', 'replace'); // Example future navigation
  }

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

        <div className={styles.centerGroup}>
          <h1 className={styles.logo}>GRIZZ</h1>
        </div>

        <div className={styles.rightGroup}>
          <button className={styles.iconButton}>
            <IonIcon icon={searchOutline} />
          </button>
          {/* Cart Button with Badge */}
          <button className={`${styles.iconButton} ${styles.cartButtonContainer}`} onClick={goToCart}> {/* Add container class */}
            <IonIcon icon={cartOutline} />
            {/* Conditionally render badge if count > 0 */}
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