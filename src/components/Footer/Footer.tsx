// src/components/Footer/Footer.tsx

import { IonIcon } from '@ionic/react';
import { logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* -- Main Footer Grid -- */}
        <div className={styles.grid}>
          
          {/* Column 1: Brand */}
          <div className={styles.brandColumn}>
            <h2 className={styles.logo}>GRIZZ</h2>
            <p>Bold, untamed beer for the wild at heart.</p>
          </div>

          {/* Column 2: Shop */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Shop</h3>
            <a href="/home">Home</a>
            <a href="/beers">Our Beers</a>
            <a href="/about">About Us</a>
          </div>

          {/* Column 3: Support */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Support</h3>
            <a href="/contact">Contact Us</a>
            <a href="/locations">Find Us</a>
          </div>

          {/* Column 4: Subscribe */}
          <div className={styles.subscribeColumn}>
            <h3 className={styles.columnTitle}>Join Our Community</h3>
            <p>Get exclusive updates and offers.</p>
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">→</button>
            </form>
          </div>
        </div>

        {/* -- Bottom Bar -- */}
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} GRIZZ Beer Company. All Rights Reserved.</p>
          <div className={styles.socialIcons}>
            <a href="#"><IonIcon icon={logoFacebook} /></a>
            <a href="#"><IonIcon icon={logoInstagram} /></a>
            <a href="#"><IonIcon icon={logoTwitter} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;