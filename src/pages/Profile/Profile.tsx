// src/pages/Profile/Profile.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <main className={styles.mainContainer}>
                    <section className={styles.section}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionHeader}>MY PROFILE</h2>
                            <div className={styles.sectionUnderline}></div>
                            <p className={styles.profileText}>
                                Welcome back, user! This is your personal hub for all things GRIZZ.
                            </p>
                        </div>
                    </section>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default Profile;