// src/pages/Developers/Developers.tsx

import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { logoReact, logoIonic, logoGithub } from 'ionicons/icons';
import styles from './Developers.module.css';

const Developers: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <main className={styles.mainContainer}>
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeader}>MEET THE DEVELOPERS</h2>
              <div className={styles.sectionUnderline}></div>
              <p className={styles.devText}>
                This website was built as a modern, cross-platform passion project to showcase the power of web technologies.
              </p>
              <div className={styles.techStack}>
                <div className={styles.techItem}>
                  <IonIcon icon={logoIonic} className={styles.techIcon} />
                  <h3>Ionic Framework</h3>
                  <p>Used for the core application shell and native-like UI components.</p>
                </div>
                <div className={styles.techItem}>
                  <IonIcon icon={logoReact} className={styles.techIcon} />
                  <h3>React & TypeScript</h3>
                  <p>Powers the reactive UI and ensures type-safe, scalable code.</p>
                </div>
                <div className={styles.techItem}>
                  <IonIcon icon={logoGithub} className={styles.techIcon} />
                  <h3>Open Source</h3>
                  <p>This project is open source. Check out the code on GitHub!</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Developers;