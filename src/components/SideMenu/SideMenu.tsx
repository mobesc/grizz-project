// src/components/SideMenu/SideMenu.tsx

import React from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  // HTMLIonMenuElement is a global type and does not need to be imported.
} from '@ionic/react';
import {
  homeOutline,
  beerOutline,
  informationCircleOutline,
  businessOutline,
  callOutline,
  codeSlashOutline,
  cogOutline,
  documentTextOutline,
  bookOutline,
  personOutline,
  cartOutline
  // Removed logInOutline
} from 'ionicons/icons';
import styles from './SideMenu.module.css';

// 1. Define the props
interface SideMenuProps {
  menuRef: React.RefObject<HTMLIonMenuElement>;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ menuRef, onClose }) => {
  const menuItems = [
    { text: 'Home', icon: homeOutline, path: '/home' },
    { text: 'Our Beers', icon: beerOutline, path: '/beers' },
    { text: 'About Us', icon: informationCircleOutline, path: '/about' },
    { text: 'Company History', icon: bookOutline, path: '/history' },
    { text: 'About our Products', icon: documentTextOutline, path: '/product-info' },
    { text: 'Developers', icon: codeSlashOutline, path: '/developers' },
    { text: 'Contact Us', icon: callOutline, path: '/contact' },
    { text: 'Find Us', icon: businessOutline, path: '/locations' },
    { text: 'Settings', icon: cogOutline, path: '/settings' },
    { text: 'Profile', icon: personOutline, path: '/profile' },
    { text: 'Cart', icon: cartOutline, path: '/cart' },
    // Removed 'Login / Register' from this list
  ];

  return (
    <IonMenu 
      ref={menuRef}
      contentId="main-content" 
      type="overlay" 
      className={styles.sideMenu}
    >
      <IonContent>
        {/* Navigation List */}
        <IonList className={styles.menuList}>
          {menuItems.map((item, index) => (
            item.text === 'About Us' ? (
              <React.Fragment key={index}>
                <IonItem 
                  routerLink={item.path} 
                  routerDirection="none" 
                  lines="none" 
                  className={styles.menuItem} 
                  onClick={onClose}
                >
                  <IonIcon slot="start" icon={item.icon} className={styles.menuIcon} />
                  <IonLabel>{item.text}</IonLabel>
                </IonItem>
                <div className={styles.divider}></div>
              </React.Fragment>
            ) : (
              <IonItem 
                key={index} 
                routerLink={item.path} 
                routerDirection="none" 
                lines="none" 
                className={styles.menuItem} 
                onClick={onClose}
              >
                <IonIcon slot="start" icon={item.icon} className={styles.menuIcon} />
                <IonLabel>{item.text}</IonLabel>
              </IonItem>
            )
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;