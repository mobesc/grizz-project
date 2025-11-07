// src/pages/Account/Account.tsx

import React, { useState, useRef, useEffect } from 'react';
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
  useIonToast,
  useIonRouter // <-- Import useIonRouter
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { useAuth } from '../../context/AuthContext';
import styles from './Account.module.css';

const Account: React.FC = () => {
  const { user, updateUserProfile } = useAuth();
  const [presentToast] = useIonToast();
  const router = useIonRouter(); // <-- Get router
  
  // Create state for the form fields
  const [username, setUsername] = useState(user?.username || '');

  // Ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- NEW: Redirect if not logged in ---
  useEffect(() => {
    if (!user) {
      router.push('/home', 'root', 'replace');
      presentToast({
        message: 'You must be logged in to view this page.',
        duration: 2000,
        color: 'warning'
      });
    } else {
      // Update username state if user data changes (e.g., on first load)
      setUsername(user.username);
    }
  }, [user, router, presentToast]);


  const handleSaveChanges = () => {
    if (!user) return; // Should be covered by useEffect, but good practice

    // Update the local state in AuthContext
    updateUserProfile({ username: username });

    presentToast({
      message: 'Account details saved!',
      duration: 2000,
      color: 'success'
    });
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotoURL = reader.result as string;
        updateUserProfile({ photoURL: newPhotoURL });
        presentToast({
          message: 'Profile photo updated!',
          duration: 2000,
          color: 'success'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Don't render anything if the user is not logged in (will be redirected)
  if (!user) {
    return null;
  }

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
          
          <div className={styles.profileImageSection}>
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Profile" 
                className={styles.profileImage} 
                onClick={handlePhotoClick}
              />
            ) : (
              <IonIcon 
                icon={personCircleOutline} 
                className={styles.profileIcon} 
                onClick={handlePhotoClick}
              />
            )}
            <IonButton 
              fill="clear" 
              className={styles.changeButton}
              onClick={handlePhotoClick}
            >
              Change Photo
            </IonButton>
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>

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