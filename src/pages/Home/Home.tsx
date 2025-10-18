// src/pages/Home/Home.tsx

import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import styles from './Home.module.css';
import Footer from '../../components/Footer/Footer'; // 1. IMPORT THE NEW FOOTER

// We can re-use the BeerCard component logic here
const BeerCard: React.FC<{ name: string; type: string; imageUrl: string; }> = ({ name, type, imageUrl }) => (
    <div className={styles.productCard}>
        <img src={imageUrl} alt={name} className={styles.productImage} onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/400x400/f4f4f5/facc15?text=GRIZZ'; }}/>
        <div className={styles.productInfo}>
            <h3 className={styles.productName}>{name}</h3>
            <p className={styles.productType}>{type}</p>
        </div>
    </div>
);

const Home: React.FC = () => {
  const router = useIonRouter();

  const goToBeerPage = () => {
    router.push('/beers', 'root', 'replace');
  };

  const featuredBeers = [
    { name: 'GRIZZLY GOLD', type: 'Golden Ale', imageUrl: '/assets/beer-placeholder-1.png' },
    { name: 'MIDNIGHT PAWS', type: 'Porter', imageUrl: '/assets/beer-placeholder-2.png' },
    { name: 'FOREST HAZE', type: 'Hazy IPA', imageUrl: '/assets/beer-placeholder-3.png' },
  ];

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
            
            {/* --- PRODUCT SNEAK PEEK SECTION --- */}
            <section id="sneak-peek" className={styles.sneakPeekSection}>
              <div className={styles.sneakPeekHeader}>
                <h2 className={styles.sectionHeader}>OUR BEERS</h2>
                <button onClick={goToBeerPage} className={styles.seeMoreButton}>See More</button>
              </div>
              <div className={styles.productScroll}>
                {featuredBeers.map((beer, index) => (
                  <BeerCard key={index} {...beer} />
                ))}
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
          
          {/* -- 2. REPLACE THE OLD FOOTER WITH THE NEW COMPONENT -- */}
          <Footer />
          
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;