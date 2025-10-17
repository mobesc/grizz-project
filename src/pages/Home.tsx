import { IonContent, IonPage } from '@ionic/react';
import styles from './Home.module.css';

// -- COMPONENT: Beer Card --
const BeerCard: React.FC<{ name: string; type: string; description: string; imageUrl: string; }> = ({ name, type, description, imageUrl }) => (
  <div className={styles.beerCard}>
    <img src={imageUrl} alt={name} className={styles.beerImage} onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/400x400/18181b/facc15?text=GRIZZ'; }}/>
    <div className={styles.beerCardContent}>
      <h3 className={styles.beerName}>{name}</h3>
      <p className={styles.beerType}>{type}</p>
      <p className={styles.beerDescription}>{description}</p>
    </div>
  </div>
);

// -- MAIN PAGE COMPONENT: Home --
const Home: React.FC = () => {
  const beers = [
    { name: 'GRIZZLY GOLD', type: 'Golden Ale', description: 'A light, crisp golden ale with a hint of citrus. Perfect for any occasion.', imageUrl: 'assets/beer-placeholder-1.png' },
    { name: 'MIDNIGHT PAWS', type: 'Porter', description: 'Dark, rich, and roasty with notes of chocolate and coffee.', imageUrl: 'assets/beer-placeholder-2.png' },
    { name: 'FOREST HAZE', type: 'Hazy IPA', description: 'A juicy, tropical IPA with low bitterness and a smooth finish.', imageUrl: 'assets/beer-placeholder-3.png' },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div className={styles.mainContainer}>

          {/* -- Floating Header -- */}
          <header className={styles.header}>
            <div className={styles.navBar}>
              <h1 className={styles.logo} onClick={() => scrollToSection('hero')}>GRIZZ</h1>
              <nav className={styles.navLinks}>
                <button onClick={() => scrollToSection('beers')}>OUR BEERS</button>
                <button onClick={() => scrollToSection('about')}>ABOUT US</button>
                <button onClick={() => scrollToSection('contact')}>CONTACT</button>
              </nav>
            </div>
          </header>

          {/* -- Main Content -- */}
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

            {/* -- Beers Section -- */}
            <section id="beers" className={styles.section}>
              <div className={styles.container}>
                <div className={styles.sectionHeader}>
                  <h2>OUR BEERS</h2>
                  <div className={styles.sectionUnderline}></div>
                </div>
                <div className={styles.beerGrid}>
                  {beers.map((beer, index) => (
                    <BeerCard key={index} {...beer} />
                  ))}
                </div>
              </div>
            </section>

            {/* -- About Section -- */}
            <section id="about" className={`${styles.section} ${styles.bgZinc900}`}>
              <div className={`${styles.container} ${styles.textContainer}`}>
                <h2 className={styles.sectionHeader}>FORGED IN THE WILD</h2>
                <div className={styles.sectionUnderline}></div>
                <p>
                  GRIZZ was born from a passion for two things: the great outdoors and great beer. We believe every pint should be an adventure. That's why we use only the finest natural ingredients and a fearless brewing process to create beers with untamed flavor.
                </p>
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