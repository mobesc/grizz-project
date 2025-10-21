// src/pages/Beers/Beers.tsx

import { IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/react'; // Added IonCard components
// Removed useIonRouter as routerLink handles navigation now
import styles from './Beers.module.css';

// Updated BeerCard to use IonCard and routerLink
const BeerCard: React.FC<{ id: string; name: string; type: string; description: string; imageUrl: string; }> = ({ id, name, type, description, imageUrl }) => {
    return (
        // Use IonCard for better structure and built-in routing
        <IonCard button={true} routerLink={`/beer/${id}`} className={styles.beerCard} > {/* Add routerLink here */}
            <img src={imageUrl} alt={name} className={styles.beerImage} onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/400x400/18181b/facc15?text=GRIZZ'; }}/>
            {/* Use IonCardContent for padding */}
            <IonCardContent className={styles.beerCardContent}>
                 {/* Optional: Use IonCardHeader/Title/Subtitle for semantic structure if preferred */}
                 {/* <IonCardHeader> */}
                    <IonCardTitle className={styles.beerName}>{name}</IonCardTitle>
                    <IonCardSubtitle className={styles.beerType}>{type}</IonCardSubtitle>
                 {/* </IonCardHeader> */}
                <p className={styles.beerDescription}>{description}</p>
            </IonCardContent>
        </IonCard>
    );
};


const Beers: React.FC = () => {
    // Added 'id' field for routing (use URL-friendly slugs)
    const beerList = [
        { id: 'grizzly-gold', name: 'GRIZZLY GOLD', type: 'Golden Ale', description: 'A light, crisp golden ale with a hint of citrus.', imageUrl: '/assets/beer-placeholder-1.png' },
        { id: 'midnight-paws', name: 'MIDNIGHT PAWS', type: 'Porter', description: 'Dark, rich, and roasty with notes of chocolate and coffee.', imageUrl: '/assets/beer-placeholder-2.png' },
        { id: 'forest-haze', name: 'FOREST HAZE', type: 'Hazy IPA', description: 'A juicy, tropical IPA with low bitterness and a smooth finish.', imageUrl: '/assets/beer-placeholder-3.png' },
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
                                {/* Pass the 'id' prop to BeerCard */}
                                {beerList.map((beer, index) => (
                                    <BeerCard key={index} id={beer.id} {...beer} />
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