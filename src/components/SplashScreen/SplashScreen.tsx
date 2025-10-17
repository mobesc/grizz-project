// src/components/SplashScreen/SplashScreen.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './SplashScreen.module.css';

const SplashScreen: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={styles.splashContainer}>
          <h1 className={styles.logo}>GRIZZ</h1>
          <div className={styles.spinner}></div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;