// src/components/Header/Header.tsx
import { IonHeader, IonToolbar, IonNavLink } from '@ionic/react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    // The collapse="fade" property is designed for this transparent effect
    <IonHeader className={styles.ionHeader} collapse="fade">
      <IonToolbar className={styles.ionToolbar}>
        <div className={styles.navBar}>
          <IonNavLink routerLink="/home" className={styles.logo}>
            <h1>GRIZZ</h1>
          </IonNavLink>
          <nav className={styles.navLinks}>
            <IonNavLink routerLink="/beers">OUR BEERS</IonNavLink>
            <IonNavLink routerLink="/about">ABOUT US</IonNavLink>
            <IonNavLink routerLink="/home#contact">CONTACT</IonNavLink>
          </nav>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;