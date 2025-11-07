// src/components/SideMenu/SideMenu.tsx

import React from 'react'; // <-- Removed useRef
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  HTMLIonMenuElement,
  IonButton,
  useIonRouter // <-- NEW: IMPORT useIonRouter
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
  logOutOutline,
  // Removed cameraOutline, trashOutline
} from 'ionicons/icons';
import styles from './SideMenu.module.css';
import { useAuth } from '../../context/AuthContext'; 

interface SideMenuProps {
  menuRef: React.RefObject<HTMLIonMenuElement>;
  onClose: () => void;
  onLoginClick: () => void; 
}

const SideMenu: React.FC<SideMenuProps> = ({ menuRef, onClose, onLoginClick }) => {
  const { user, logout } = useAuth(); // <-- Removed updateProfilePhoto
  const router = useIonRouter(); // <-- NEW: Get router
  // Removed fileInputRef and useIonActionSheet

  const menuItems = [
    { text: 'Home', icon: homeOutline, path: '/home' },
    { text: 'Our Beers', icon: beerOutline, path: '/beers' },
    { text: 'About Us', icon: informationCircleOutline, path: '/about' },
    { text: 'Company History', icon: bookOutline, path: '/history' },
    { text: 'About our Products', icon: documentTextOutline, path: '/product-info' },
    { text: 'Developers', icon: codeSlashOutline, path: '/developers' },
    { text: 'Contact Us', icon: callOutline, path: '/contact' },
  ];

  const handleLoginClick = () => {
    onLoginClick(); // Open the modal
    onClose();      // Close the menu
  };

  const handleLogoutClick = () => {
    logout(); // Log the user out
    onClose(); // Close the menu
  };

  // --- NEW: Function to navigate to account page ---
  const goToAccountPage = () => {
    router.push('/account');
    onClose();
  };
  
  // Removed handleFileChange and handleChangePhotoClick

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

          {/* --- Conditional Login/Profile Item --- */}
          {user ? (
            // --- User is LOGGED IN ---
            <IonItem 
              button={true} // <-- MAKE ITEM CLICKABLE
              lines="none" 
              className={`${styles.menuItem} ${styles.profileItem}`}
              onClick={goToAccountPage} // <-- NAVIGATE ON CLICK
            >
              <div className={styles.loginContent}> 
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className={styles.profileAvatar}
                  />
                ) : (
                  <IonIcon 
                    icon={personCircleOutline} 
                    className={styles.loginIcon}
                  />
                )}
                <IonLabel className={styles.profileEmail}>{user.username}</IonLabel> {/* <-- Show username */}
                
                {/* REMOVED Change Photo button */}

                <IonButton 
                  fill="clear" 
                  className={styles.logoutButton}
                  onClick={(e) => {
                    e.stopPropagation(); // <-- Prevent navigation
                    handleLogoutClick();
                  }}
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

          {/* Removed hidden file input */}

          {menuItems.map((item, index) => (
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
          ))}
          
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;