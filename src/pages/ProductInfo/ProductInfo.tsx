// src/pages/ProductInfo/ProductInfo.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './ProductInfo.module.css';

const ProductInfo: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <main className={styles.mainContainer}>
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeader}>OUR COMMITMENT TO QUALITY</h2>
              <div className={styles.sectionUnderline}></div>
              <p className={styles.infoText}>
                At GRIZZ Beer Co., we believe that untamed flavor starts with unmatched quality. We're obsessed with the details. From the source of our water to the strain of our yeast, every element is chosen with purpose.
              </p>
              <p className={styles.infoText}>
                Our brewmasters use a blend of traditional techniques and modern innovation. We source premium hops and malts from the best growers in the world, ensuring that every can and bottle of GRIZZ delivers a consistent, bold, and unforgettable experience.
              </p>
              <p className={styles.infoText}>
                We don't cut corners. We don't rush the process. We brew with passion, and we're proud to share the results with you.
              </p>
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ProductInfo;