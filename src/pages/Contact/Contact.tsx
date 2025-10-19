// src/pages/Contact/Contact.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <main className={styles.mainContainer}>
                    <section className={styles.section}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionHeader}>CONTACT US</h2>
                            <div className={styles.sectionUnderline}></div>
                            <p className={styles.contactText}>
                                Have questions, feedback, or just want to talk beer? We'd love to hear from you.
                            </p>
                             <a href="mailto:contact@grizzbeer.com" className={styles.ctaButton}>
                                EMAIL US
                            </a>
                        </div>
                    </section>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default Contact;