// src/components/LoginModal/LoginModal.tsx

import React, { useState } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonInput,
  IonLabel,
  IonFooter,
  IonCheckbox // <-- NEW IMPORT
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import styles from './LoginModal.module.css';
import { useAuth } from '../../context/AuthContext'; 

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState('login'); 
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // <-- NEW STATE

  const { login } = useAuth(); 

  // Clear form when closing
  const handleClose = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setRememberMe(false); // <-- RESET
    setView('login');
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    
    login(email, rememberMe); // <-- PASS rememberMe
    
    handleClose(); // Close modal on successful login
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(''); 
    
    // Registering doesn't need "remember me", so we pass false
    login(email, false); 
    
    handleClose(); // Close modal on successful registration
  };

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={handleClose} 
      className={styles.loginModal}
      backdropDismiss={true}
    >
      <IonHeader className={styles.modalHeader}>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={handleClose} fill="clear" className={styles.closeButton}>
              <IonIcon icon={closeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.modalContent}>
        
        <div className={styles.logoContainer}>
          <h1 className={styles.logo}>GRIZZ</h1>
        </div>

        {view === 'login' ? (
          /* --- LOGIN FORM --- */
          <form className={styles.formContainer} onSubmit={handleLogin}>
            <h2 className={styles.title}>Sign in</h2>


            <IonItem className={styles.formItem}>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput 
                type="email" 
                value={email}
                onIonInput={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem className={styles.formItem}>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput 
                type="password" 
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>

            {/* --- NEW REMEMBER ME CHECKBOX --- */}
            <IonItem lines="none" className={styles.rememberItem}>
              <IonLabel>Remember Me</IonLabel>
              <IonCheckbox 
                slot="start"
                checked={rememberMe}
                onIonChange={(e) => setRememberMe(e.detail.checked)}
              />
            </IonItem>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <IonButton 
              type="submit" 
              expand="block" 
              className={styles.submitButton}
            >
              Continue
            </IonButton>

            <button
              type="button" 
              className={styles.toggleButton}
              onClick={() => setView('register')}
            >
              DON'T HAVE AN ACCOUNT? REGISTER
            </button>
          </form>
        ) : (
          /* --- REGISTER FORM --- */
          <form className={styles.formContainer} onSubmit={handleRegister}>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>Fill out the form to register</p>

            <IonItem className={styles.formItem}>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput 
                type="email" 
                value={email}
                onIonInput={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem className={styles.formItem}>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput 
                type="password" 
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>
            <IonItem className={styles.formItem}>
              <IonLabel position="floating">Confirm Password</IonLabel>
              <IonInput 
                type="password" 
                value={confirmPassword}
                onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                required
              />
            </IonItem>

            {error && <p className={styles.errorMessage}>{error}</p>}

            <IonButton 
              type="submit" 
              expand="block" 
              className={styles.submitButton}
            >
              Register
            </IonButton>

            <button
              type="button" 
              className={styles.toggleButton}
              onClick={() => setView('login')}
            >
              ALREADY HAVE AN ACCOUNT? LOGIN
            </button>
          </form>
        )}
      </IonContent>
      
      <IonFooter className={styles.modalFooter}>
        <IonToolbar>
          <a href="#" className={styles.footerLink}>Privacy policy</a>
          <a href="#" className={styles.footerLink}>Terms of service</a>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default LoginModal;