// src/pages/Home.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className={styles.mainContainer}>
          <main>
            {/* -- Hero Section -- */}
            <section id="hero" className={styles.heroSection}>
              <div className={styles.heroOverlay}></div>
              <div className={styles.heroContent}>
                <h2 className={styles.heroTitle}>CRAFTED.</h2>
                <h2 className={styles.heroTitle}>FEARLESS.</h2>
                <p className={styles.heroSubtitle}>Welcome to GRIZZ. We brew bold, untamed beer for the wild at heart.</p>
              </div>
            </section>
            
            {/* -- Contact Section -- */}
            <section id="contact" className={styles.section}>
              <div className={`${styles.container} ${styles.textContainer}`}>
                  <h2 className={styles.sectionHeader}>GET IN TOUCH</h2>
                  <div className={styles.sectionUnderline}></div>
                  <p>
                      Have questions, feedback, or just want to talk beer? We'd love to hear from you.
                  </p>
                  <a href="mailto:contact@grizzbeer.com" className={styles.ctaButton}>
                      EMAIL US
                  </a>
              </div>
            </section>
          </main>
          
          {/* -- Footer -- */}
          <footer className={styles.footer}>
            <div className={styles.container}>
              <p className={styles.footerLogo}>GRIZZ BEER CO.</p>
              <p>&copy; {new Date().getFullYear()} GRIZZ Beer Company. All Rights Reserved. Drink Responsibly.</p>
            </div>
          </footer>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;