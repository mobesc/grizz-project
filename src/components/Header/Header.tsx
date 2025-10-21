// src/components/Header/Header.tsx

import React from 'react';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton,
  IonTitle, IonIcon, IonBadge, IonButton,
} from '@ionic/react';
// import { useHistory } from 'react-router-dom'; // No longer need useHistory for cart
import { cartOutline, searchOutline, menuOutline } from 'ionicons/icons';
import styles from './Header.module.css';
import { useCart } from '../../context/CartContext';

interface HeaderProps {
    onCartClick: () => void; // New prop for opening cart menu
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
//   const history = useHistory(); // Not needed for cart anymore
  const { totalItems } = useCart();

//   const goToCart = () => { // Old function, removed
//     history.push('/cart');
//   };

  return (
    <IonHeader className={styles.header}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton menu="main-menu" className={styles.menuButton}> {/* Assuming a 'main-menu' for left hamburger */}
            <IonIcon icon={menuOutline} />
          </IonMenuButton>
        </IonButtons>
        <IonTitle className={styles.logo}>
          <img src="/assets/grizz-logo.png" alt="Grizz" className={styles.logoImage} />
        </IonTitle>
        <IonButtons slot="end">
          <IonButton fill="clear" className={styles.iconButton}>
            <IonIcon icon={searchOutline} className={styles.headerIcon} />
          </IonButton>
          <IonButton fill="clear" className={styles.iconButton} onClick={onCartClick}> {/* Use onCartClick prop */}
            <IonIcon icon={cartOutline} className={styles.headerIcon} />
            {totalItems > 0 && <IonBadge color="warning" className={styles.cartBadge}>{totalItems}</IonBadge>}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;