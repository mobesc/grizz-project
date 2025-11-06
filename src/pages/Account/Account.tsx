// src/pages/Account/Account.tsx

import React, { useState, useRef } from 'react'; // <-- IMPORT useRef
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  useIonToast
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { useAuth } from '../../context/AuthContext';
import styles from './Account.module.css';

const Account: React.FC = () => {
  const { user, updateUserProfile } = useAuth(); // <-- GET updateUserProfile
  const [presentToast] = useIonToast();
  
  // Create state for the form fields
  // Initialize username from user's email if available, otherwise empty
  const [username, setUsername] = useState(user?.email.split('@')[0] || '');

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null); // <-- NEW REF

  const handleSaveChanges = () => {
    if (!user) {
      presentToast({
        message: 'You must be logged in to save changes.',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    // In a real app, you'd send this to your backend/Firebase
    console.log("Saving changes for:", user.email, "New username:", username);

    // Update the local state in AuthContext
    updateUserProfile({ email: user.email, photoURL: user.photoURL }); // For now, email and photo remain same

    presentToast({
      message: 'Account details saved!',
      duration: 2000,
      color: 'success'
    });
  };

  // --- NEW: Trigger click on hidden file input ---
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  // --- NEW: Handle file selection ---
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotoURL = reader.result as string;
        // Update the user's profile with the new photo URL
        updateUserProfile({ photoURL: newPhotoURL });
        presentToast({
          message: 'Profile photo updated!',
          duration: 2000,
          color: 'success'
        });
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>My Account</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          
          {/* --- Profile Image Section --- */}
          <div className={styles.profileImageSection}>
            {/* --- Clickable Image/Icon --- */}
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className={styles.profileImage} 
                onClick={handlePhotoClick} // <-- MAKE CLICKABLE
              />
            ) : (
              <IonIcon 
                icon={personCircleOutline} 
                className={styles.profileIcon} 
                onClick={handlePhotoClick} // <-- MAKE CLICKABLE
              />
            )}
            <IonButton 
              fill="clear" 
              className={styles.changeButton}
              onClick={handlePhotoClick} // <-- BUTTON ALSO TRIGGERS IT
            >
              Change Photo
            </IonButton>
            
            {/* --- HIDDEN FILE INPUT --- */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }} // Hide the input
              onChange={handleFileChange}
            />
          </div>

          {/* --- Profile Form Section --- */}
          <div className={styles.formSection}>
            <IonItem className={styles.formItem}>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput 
                value={username}
                onIonInput={(e) => setUsername(e.detail.value!)}
              />
            </IonItem>
            <IonItem className={styles.formItem}>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput 
                value={user?.email || ''}
                readonly={true} 
              />
            </IonItem>
          </div>

          <IonButton 
            expand="block" 
            className={styles.saveButton}
            onClick={handleSaveChanges}
          >
            Save Changes
          </IonButton>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Account;