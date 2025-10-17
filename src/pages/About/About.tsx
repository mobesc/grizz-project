// src/pages/About/About.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './About.module.css';

const About: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <main className={styles.mainContainer}>
                    <section className={styles.section}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionHeader}>FORGED IN THE WILD</h2>
                            <div className={styles.sectionUnderline}></div>
                            <p className={styles.aboutText}>
                                GRIZZ was born from a passion for two things: the great outdoors and great beer. We believe every pint should be an adventure. That's why we use only the finest natural ingredients and a fearless brewing process to create beers with untamed flavor.
                            </p>
                            <p className={styles.aboutText}>
                                We're a small team with big ambitions, dedicated to crafting beers that are as bold and authentic as the wilderness that inspires us.
                            </p>
                        </div>
                    </section>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default About;