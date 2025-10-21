// src/pages/Beers/Beers.tsx

import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react';
import styles from './Beers.module.css';

// Updated BeerCard to use IonCard and routerLink
const BeerCard: React.FC<{ id: string; name: string; type: string; description: string; imageUrl: string; }> = ({ id, name, type, description, imageUrl }) => {
    return (
        <IonCard button={true} routerLink={`/beer/${id}`} className={styles.beerCard} >
            <img src={imageUrl} alt={name} className={styles.beerImage} onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/400x400/18181b/facc15?text=GRIZZ'; }}/>
            <IonCardContent className={styles.beerCardContent}>
                <IonCardTitle className={styles.beerName}>{name}</IonCardTitle>
                <IonCardSubtitle className={styles.beerType}>{type}</IonCardSubtitle>
                {/* Use the SHORTER description from the list for the card */}
                <p className={styles.beerDescription}>{description.split('.')[0] + '.'}</p>
            </IonCardContent>
        </IonCard>
    );
};


const Beers: React.FC = () => {
    // List with updated image paths and shorter descriptions for display here
    const beerList = [
        { id: 'grizzly-gold', name: 'GRIZZLY GOLD', type: 'Golden Ale', description: 'A light, crisp golden ale with a hint of citrus.', imageUrl: '/assets/GRIZZLY-GOLD.png' }, // <-- UPDATED PATH
        { id: 'midnight-paws', name: 'MIDNIGHT PAWS', type: 'Porter', description: 'Dark, rich, and roasty with notes of chocolate and coffee.', imageUrl: '/assets/MIDNIGHT-PAWS.png' }, // <-- UPDATED PATH
        { id: 'forest-haze', name: 'FOREST HAZE', type: 'Hazy IPA', description: 'A juicy, tropical IPA with low bitterness and a smooth finish.', imageUrl: '/assets/FOREST-HAZE.png' }, // <-- UPDATED PATH
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
                                    // Pass the shorter description to the card
                                    <BeerCard key={index} id={beer.id} name={beer.name} type={beer.type} description={beer.description} imageUrl={beer.imageUrl} />
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