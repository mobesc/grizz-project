// src/pages/Beers/Beers.tsx

import {
  IonContent,
  IonPage,
  IonButton,
  useIonRouter,
  IonActionSheet, 
} from '@ionic/react';
import styles from './Beers.module.css';
import React, { useState, useEffect } from 'react'; 
// FilterModal import is removed

// --- BEERCARD COMPONENT ---
const BeerCard: React.FC<{ id: string; name: string; price: number; imageUrl: string; }> = ({ id, name, price, imageUrl }) => {
    const router = useIonRouter();

    const handleClick = () => {
        router.push(`/beer/${id}`);
    };
    
    return (
        <div className={styles.beerCard} onClick={handleClick}>
            <div className={styles.imageWrapper}>
                <img src={imageUrl} alt={name} className={styles.beerImage} onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/400x400/18181b/facc15?text=GRIZZ'; }}/>
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.beerName}>{name}</h3>
                <p className={styles.beerPrice}>₱{price.toFixed(2)}</p>
            </div>
        </div>
    );
};

// --- MOCK DATA ---
const beerList = [
    { id: 'grizzly-gold', name: 'GRIZZLY GOLD', type: 'Golden Ale', description: 'A light, crisp golden ale with a hint of citrus.', imageUrl: '/assets/product1.png', price: 719.00 },
    { id: 'midnight-paws', name: 'MIDNIGHT PAWS', type: 'Porter', description: 'Dark, rich, and roasty with notes of chocolate and coffee.', imageUrl: '/assets/product2.png', price: 799.00 },
    { id: 'forest-haze', name: 'FOREST HAZE', type: 'Hazy IPA', description: 'A juicy, tropical IPA with low bitterness and a smooth finish.', imageUrl: '/assets/product3.png', price: 919.00 },
];

// --- NEW: Helper to get unique types for the filter ---
const allBeerTypes = ['All Types', ...new Set(beerList.map(beer => beer.type))];

const Beers: React.FC = () => {
    
    // --- STATE VARIABLES ---
    const [displayedBeers, setDisplayedBeers] = useState(beerList);
    const [filteredBeers, setFilteredBeers] = useState(beerList); 
    const [sortType, setSortType] = useState('default');
    const [activeFilter, setActiveFilter] = useState('All Types'); // <-- CHANGED
    const [showSortSheet, setShowSortSheet] = useState(false);
    const [showFilterSheet, setShowFilterSheet] = useState(false); // <-- CHANGED

    // --- This effect filters the beerList ---
    useEffect(() => {
      if (activeFilter === 'All Types') {
        setFilteredBeers(beerList); // No filters, show all
      } else {
        const newFilteredBeers = beerList.filter(beer => 
          beer.type === activeFilter // <-- CHANGED to single filter
        );
        setFilteredBeers(newFilteredBeers);
      }
    }, [activeFilter]); // Re-run when filter changes


    // --- This effect now sorts the *filteredBeers* ---
    useEffect(() => {
        let sortedBeers = [...filteredBeers]; 

        if (sortType === 'price_asc') {
            sortedBeers.sort((a, b) => a.price - b.price);
        } else if (sortType === 'price_desc') {
            sortedBeers.sort((a, b) => b.price - a.price);
        } else if (sortType === 'name_asc') {
            sortedBeers.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        setDisplayedBeers(sortedBeers);
    }, [sortType, filteredBeers]); 

    // --- NEW: Function to create filter buttons ---
    const createFilterButtons = () => {
      const buttons = allBeerTypes.map(type => ({
        text: type,
        handler: () => setActiveFilter(type)
      }));

      buttons.push({
        text: 'Cancel',
        role: 'cancel'
      });
      return buttons;
    };

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

                            <div className={styles.controlsContainer}>
                                <IonButton 
                                    className={styles.controlButton} 
                                    fill="outline"
                                    onClick={() => setShowFilterSheet(true)} // <-- UPDATED onClick
                                >
                                    FILTER
                                </IonButton>
                                <IonButton 
                                    className={styles.controlButton} 
                                    fill="outline"
                                    onClick={() => setShowSortSheet(true)}
                                >
                                    SORT
                                </IonButton>
                            </div>

                            <div className={styles.beerGrid}>
                                {displayedBeers.map((beer) => ( 
                                    <BeerCard 
                                        key={beer.id} 
                                        id={beer.id} 
                                        name={beer.name} 
                                        price={beer.price} 
                                        imageUrl={beer.imageUrl} 
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </IonContent>

            {/* --- SORT ACTION SHEET --- */}
            <IonActionSheet
                isOpen={showSortSheet}
                onDidDismiss={() => setShowSortSheet(false)}
                header="Sort By"
                buttons={[
                    {
                        text: 'Default',
                        handler: () => setSortType('default')
                    },
                    {
                        text: 'Price: Low to High',
                        handler: () => setSortType('price_asc')
                    },
                    {
                        text: 'Price: High to Low',
                        handler: () => setSortType('price_desc')
                    },
                    {
                        text: 'Name: A to Z',
                        handler: () => setSortType('name_asc')
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    }
                ]}
            />

            {/* --- NEW: FILTER ACTION SHEET --- */}
            <IonActionSheet
                isOpen={showFilterSheet}
                onDidDismiss={() => setShowFilterSheet(false)}
                header="Filter By Beer Type"
                buttons={createFilterButtons()}
            />

        </IonPage>
    );
};

export default Beers;