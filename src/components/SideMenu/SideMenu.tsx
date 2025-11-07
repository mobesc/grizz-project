// src/components/SideMenu/SideMenu.tsx

import React, { useRef } from 'react'; // <-- ADD useRef
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  HTMLIonMenuElement,
  IonButton,
  useIonActionSheet // <-- NEW: IMPORT useIonActionSheet
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
  cameraOutline, // <-- NEW ICON
  trashOutline // <-- NEW ICON
} from 'ionicons/icons';
import styles from './SideMenu.module.css';
import { useAuth } from '../../context/AuthContext'; 

interface SideMenuProps {
  menuRef: React.RefObject<HTMLIonMenuElement>;
  onClose: () => void;
  onLoginClick: () => void; 
}

const SideMenu: React.FC<SideMenuProps> = ({ menuRef, onClose, onLoginClick }) => {
  const { user, logout, updateProfilePhoto } = useAuth(); // <-- NEW: Get updateProfilePhoto
  const fileInputRef = useRef<HTMLInputElement>(null); // <-- NEW: Ref for hidden file input
  const [presentActionSheet] = useIonActionSheet(); // <-- NEW: Action sheet hook

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

  // --- NEW: Handle file input change ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convert the image to a Base64 string and update the profile photo
        updateProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // --- NEW: Show action sheet for changing photo ---
  const handleChangePhotoClick = () => {
    presentActionSheet({
      header: 'Change Profile Photo',
      buttons: [
        // {
        //   text: 'Take Photo',
        //   icon: cameraOutline,
        //   handler: () => {
        //     // In a real app, you'd use a camera plugin here (e.g., @capacitor/camera)
        //     console.log('Take Photo clicked');
        //   },
        // },
        {
          text: 'Upload from Gallery',
          icon: cameraOutline,
          handler: () => {
            fileInputRef.current?.click(); // Trigger the hidden file input
          },
        },
        {
          text: 'Remove Photo',
          icon: trashOutline,
          role: 'destructive',
          handler: () => {
            updateProfilePhoto(null); // Set photoURL to null
          },
          // Only show "Remove Photo" if there's an actual photo
          cssClass: user?.photoURL ? '' : styles.hiddenButton, 
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
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

          {/* --- Conditional Login/Profile Item --- */}
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
                    onClick={handleChangePhotoClick} // <-- Make avatar clickable
                  />
                ) : (
                  <IonIcon 
                    icon={personCircleOutline} 
                    className={styles.loginIcon} 
                    onClick={handleChangePhotoClick} // <-- Make icon clickable
                  />
                )}
                <IonLabel className={styles.profileEmail}>{user.email}</IonLabel>
                
                {/* NEW: Change Photo button */}
                <IonButton 
                  fill="clear" 
                  className={styles.changePhotoButton}
                  onClick={handleChangePhotoClick}
                >
                  <IonIcon icon={cameraOutline} slot="start" />
                  CHANGE PHOTO
                </IonButton>

                <IonButton 
                  fill="clear" 
                  className={styles.logoutButton}
                  onClick={handleLogoutClick}
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

          {/* NEW: Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }} // Keep it hidden
          />

          {/* --- UPDATED: Removed special case for 'About Us' --- */}
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
          {/* --- END UPDATE --- */}
          
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;