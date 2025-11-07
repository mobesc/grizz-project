// src/pages/Home/Home.tsx

import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import styles from './Home.module.css';
import Footer from '../../components/Footer/Footer';

// --- NEW SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// --- END SWIPER IMPORTS ---

const BeerCard: React.FC<{ name: string; type: string; imageUrl: string; id: string; }> = ({ name, type, imageUrl, id }) => {
    const router = useIonRouter();
    const goToProductPage = () => {
      router.push(`/beer/${id}`);
    };

    return (
      <div className={styles.productCard} onClick={goToProductPage} style={{cursor: 'pointer'}}>
          <img src={imageUrl} alt={name} className={styles.productImage} onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/400x400/f4f4f5/facc15?text=GRIZZ'; }}/>
          <div className={styles.productInfo}>
              <h3 className={styles.productName}>{name}</h3>
              <p className={styles.productType}>{type}</p>
          </div>
      </div>
    );
};

const Home: React.FC = () => {
  const router = useIonRouter();

  const goToBeerPage = () => {
    router.push('/beers', 'root', 'replace');
  };

  // Featured beers with NEW image paths
  const featuredBeers = [
    { id: 'grizzly-gold', name: 'GRIZZLY GOLD', type: 'Golden Ale', imageUrl: '/assets/product1.png' }, // <-- NEW IMAGE
    { id: 'midnight-paws', name: 'MIDNIGHT PAWS', type: 'Porter', imageUrl: '/assets/product2.png' }, // <-- NEW IMAGE
    { id: 'forest-haze', name: 'FOREST HAZE', type: 'Hazy IPA', imageUrl: '/assets/product3.png' }, // <-- NEW IMAGE
  ];

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className={styles.mainContainer}>
          <main>
            {/* --- REPLACED HERO SECTION WITH SWIPER --- */}
            <section id="hero" className={styles.heroSection}>
              <Swiper
                className={styles.heroSwiper}
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
              >
                {/* --- SLIDE 1 --- */}
                <SwiperSlide className={`${styles.heroSlide} ${styles.slide1}`}>
                  <div className={styles.heroOverlay}></div>
                  <div className={styles.heroContent}>
                    {/* --- REMOVED TEXT --- */}
                    <div className={styles.heroButtonContainer}>
                      <a href="/beers" className={styles.ctaButton}>Order Now</a>
                      <a href="/about" className={styles.secondaryButton}>Learn More</a>
                    </div>
                  </div>
                </SwiperSlide>

                {/* --- SLIDE 2 --- */}
                <SwiperSlide className={`${styles.heroSlide} ${styles.slide2}`}>
                  <div className={styles.heroOverlay}></div>
                  <div className={styles.heroContent}>
                    {/* --- REMOVED TEXT --- */}
                    <div className={styles.heroButtonContainer}>
                      <a href="/beers" className={styles.ctaButton}>Order Now</a>
                      <a href="/about" className={styles.secondaryButton}>Learn More</a>
                    </div>
                  </div>
                </SwiperSlide>

                {/* --- SLIDE 3 --- */}
                <SwiperSlide className={`${styles.heroSlide} ${styles.slide3}`}>
                  <div className={styles.heroOverlay}></div>
                  <div className={styles.heroContent}>
                    {/* --- REMOVED TEXT --- */}
                    <div className={styles.heroButtonContainer}>
                      <a href="/beers" className={styles.ctaButton}>Order Now</a>
                      <a href="/about" className={styles.secondaryButton}>Learn More</a>
                    </div>
                  </div>
                </SwiperSlide>

              </Swiper>
            </section>
            {/* --- End Hero Section --- */}

            <section id="sneak-peek" className={styles.sneakPeekSection}>
              <div className={styles.sneakPeekHeader}>
                <h2 className={styles.sectionHeader}>OUR BEERS</h2>
                <button onClick={goToBeerPage} className={styles.seeMoreButton}>See More</button>
              </div>
              <div className={styles.productScroll}>
                {featuredBeers.map((beer, index) => (
                  <BeerCard key={index} id={beer.id} {...beer} />
                ))}
              </div>
            </section>

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

          <Footer />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;