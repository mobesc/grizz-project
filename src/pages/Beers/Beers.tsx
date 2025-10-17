// src/pages/Beers/Beers.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './Beers.module.css';

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

const Beers: React.FC = () => {
    const beerList = [
        { name: 'GRIZZLY GOLD', type: 'Golden Ale', description: 'A light, crisp golden ale with a hint of citrus.', imageUrl: '/assets/beer-placeholder-1.png' },
        { name: 'MIDNIGHT PAWS', type: 'Porter', description: 'Dark, rich, and roasty with notes of chocolate and coffee.', imageUrl: '/assets/beer-placeholder-2.png' },
        { name: 'FOREST HAZE', type: 'Hazy IPA', description: 'A juicy, tropical IPA with low bitterness and a smooth finish.', imageUrl: '/assets/beer-placeholder-3.png' },
    ];

    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <main className={styles.mainContainer}>
                    <section className={styles.section}>
                        <div className={styles.container}>
                            <div className={styles.sectionHeader}>
                                <h2>OUR BEERS</h2>
                                <div className={styles.sectionUnderline}></div>
                            </div>
                            <div className={styles.beerGrid}>
                                {beerList.map((beer, index) => (
                                    <BeerCard key={index} {...beer} />
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default Beers;