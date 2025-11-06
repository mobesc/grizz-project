// src/components/SideMenu/SideMenu.tsx

import React from 'react'; // <-- REMOVED useState
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  HTMLIonMenuElement,
  IonButton,
  useIonRouter // <-- NEW IMPORT
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
  personCircleOutline,
  logOutOutline 
  // REMOVED cameraOutline
} from 'ionicons/icons';
import styles from './SideMenu.module.css';
import { useAuth } from '../../context/AuthContext'; 

// 1. Define the props
interface SideMenuProps {
  menuRef: React.RefObject<HTMLIonMenuElement>;
  onClose: () => void;
  onLoginClick: () => void; 
}

const SideMenu: React.FC<SideMenuProps> = ({ menuRef, onClose, onLoginClick }) => {
  const { user, logout } = useAuth(); 
  const router = useIonRouter(); // <-- NEW: Initialize router

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
  ];

  const handleLoginClick = () => {
    onLoginClick(); // Open the modal
    onClose();      // Close the menu
  };

  const handleLogoutClick = () => {
    logout(); // Log the user out
    onClose(); // Close the menu
  };

  // --- NEW: Handler for clicking the profile icon/image ---
  const handleProfileClick = () => {
    router.push('/account'); // Navigate to the new page
    onClose(); // Close the menu
  };

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

          {/* --- UPDATED: Conditional Login/Profile Item --- */}
          {user ? (
            // --- User is LOGGED IN ---
            <IonItem 
              lines="none" 
              className={`${styles.menuItem} ${styles.profileItem}`} 
            >
              <div className={styles.loginContent}> 
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className={styles.profileAvatar}
                    onClick={handleProfileClick} // <-- MAKE CLICKABLE
                  />
                ) : (
                  <IonIcon 
                    icon={personCircleOutline} 
                    className={styles.loginIcon}
                    onClick={handleProfileClick} // <-- MAKE CLICKABLE
                  />
                )}
                <IonLabel className={styles.profileEmail}>{user.email}</IonLabel>
                <IonButton 
                  fill="clear" 
                  className={styles.logoutButton}
                  onClick={handleLogoutClick} // Don't stop propagation
                >
                  <IonIcon icon={logOutOutline} slot="start" />
                  Logout
                </IonButton>
              </div>
            </IonItem>
          ) : (
            // --- User is LOGGED OUT ---
            <IonItem 
              button={true}
              lines="none" 
              className={`${styles.menuItem} ${styles.loginItem}`} 
              onClick={handleLoginClick}
            >
              <div className={styles.loginContent}> 
                <IonIcon icon={personCircleOutline} className={styles.loginIcon} />
                <IonLabel>Login / Signup</IonLabel>
              </div>
            </IonItem>
          )}
          
          <div className={styles.divider}></div>
          {/* --- END NEW ITEM --- */}


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

      {/* --- REMOVED ACTION SHEET --- */}
      
    </IonMenu>
  );
};

export default SideMenu;