// src/components/SplashScreen/SplashScreen.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './SplashScreen.module.css';

const SplashScreen: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.splashContainer}>
          {/* Replaced H1 text with the logo image */}
          <img 
            src="/assets/LOGO_ONLY.png" 
            alt="GRIZZ Logo" 
            className={styles.logoImage} 
          />
          <div className={styles.spinner}></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;