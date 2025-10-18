// src/pages/History/History.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './History.module.css';

const History: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <main className={styles.mainContainer}>
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeader}>OUR HISTORY</h2>
              <div className={styles.sectionUnderline}></div>
              <p className={styles.historyText}>
                Founded in a garage with nothing but a dream and a bold recipe, GRIZZ was born from a passion for two things: the great outdoors and great beer. We believed every pint should be an adventure, a taste of the untamed.
              </p>
              <p className={styles.historyText}>
                Our first brew, the 'Grizzly Gold,' quickly became a local legend. We grew from that single garage to a small, dedicated brewhouse, but our philosophy never changed. We use only the finest natural ingredients and a fearless brewing process to create beers with untamed flavor.
              </p>
              <p className={styles.historyText}>
                Today, GRIZZ is more than just a beer—it's a community. We're a team with big ambitions, dedicated to crafting beers that are as bold and authentic as the wilderness that inspires us.
              </p>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default History;