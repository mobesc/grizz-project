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
                <img src={imageUrl} alt={name} className={styles.beerImage} onError={(e) => { (e.target as HTMLImageElement).src='[https://placehold.co/400x400/18181b/facc15?text=GRIZZ](https://placehold.co/400x400/18181b/facc15?text=GRIZZ)'; }}/>
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
    { id: 'glacier-punch', name: 'GLACIER PUNCH', type: 'Pilsner', description: 'A crisp, arctic-inspired pilsner...', imageUrl: '/assets/product1.png', price: 719.00 },
    { id: 'apple-riz', name: 'APPLE RIZ', type: 'Hard Apple Cider', description: 'A hard apple cider with a bold, electric taste...', imageUrl: '/assets/product2.png', price: 799.00 },
    { id: 'honey-bees', name: 'HONEY BEES', type: 'Honey Ale', description: 'A sweet, golden honey ale...', imageUrl: '/assets/product3.png', price: 919.00 },
    { id: 'berry-blast', name: 'BERRY BLAST', type: 'Fruited Ale', description: 'A vibrant, fruity ale bursting with a mix of wild berries...', imageUrl: '/assets/product4.png', price: 899.00 },
    
    // --- NEW PRODUCTS START HERE ---
    { id: 'lemon-zest', name: 'LEMON ZEST', type: 'Radler', description: 'A bright, refreshing lager...', imageUrl: '/assets/product5.png', price: 739.00 },
    { id: 'tropical-twist', name: 'TROPICAL TWIST', type: 'Fruited IPA', description: 'An explosion of pineapple, mango...', imageUrl: '/assets/product6.png', price: 899.00 },
    { id: 'cucumber-lime', name: 'CUCUMBER LIME', type: 'Gose', description: 'A refreshingly tart gose...', imageUrl: '/assets/product7.png', price: 829.00 },
    { id: 'kiwi-splash', name: 'KIWI SPLASH', type: 'Fruited Sour', description: 'A vibrant, tangy sour ale...', imageUrl: '/assets/product8.jpg', price: 849.00 },
    { id: 'watermelon-wave', name: 'WATERMELON WAVE', type: 'Fruit Ale', description: 'Ride the wave of pure refreshment...', imageUrl: '/assets/product9.png', price: 789.00 },
    { id: 'crimson-paws', name: 'CRIMSON PAWS', type: 'Red Ale', description: 'A bold, malty Red Ale...', imageUrl: '/assets/product10.png', price: 859.00 },
    { id: 'strawberry-watermelon', name: 'STRAWBERRY WATERMELON', type: 'Fruited Ale', description: 'The ultimate summer combination...', imageUrl: '/assets/product11.png', price: 819.00 },
    { id: 'golden-lager', name: 'GOLDEN LAGER', type: 'Lager', description: 'A crisp, clean, and perfectly balanced golden lager...', imageUrl: '/assets/product12.png', price: 699.00 },
    { id: 'crisp-wheat-beer', name: 'CRISP WHEAT BEER', type: 'Wheat Beer', description: 'Light, refreshing, and smooth...', imageUrl: '/assets/product13.png', price: 799.00 },
    { id: 'strawberry-fields', name: 'STRAWBERRY FIELDS', type: 'Fruit Ale', description: 'A light, golden ale conditioned on heaps of fresh strawberries...', imageUrl: '/assets/product14.png', price: 829.00 },
    { id: 'berry-breeze', name: 'BERRY BREEZE', type: 'Fruited Ale', description: 'A refreshing breeze of mixed berries...', imageUrl: '/assets/product15.png', price: 839.00 },
    { id: 'grapefruit-splash', name: 'GRAPEFRUIT SPLASH', type: 'Radler', description: 'A zesty, citrus-forward radler...', imageUrl: '/assets/product16.png', price: 749.00 },
    { id: 'pineapple-punch', name: 'PINEAPPLE PUNCH', type: 'Fruited Ale', description: 'A powerful punch of tropical pineapple flavor...', imageUrl: '/assets/product17.png', price: 809.00 },
    { id: 'mango-tango', name: 'MANGO TANGO', type: 'Fruited Ale', description: 'It takes two to tango! This ale features a dance of sweet mango...', imageUrl: '/assets/product18.jpg', price: 819.00 },
    { id: 'raspberry-ripple', name: 'RASPBERRY RIPPLE', type: 'Fruited Sour', description: 'A delightful sour ale with a ripple of sweet raspberry...', imageUrl: '/assets/product19.jpg', price: 869.00 },
    { id: 'citrus-burst', name: 'CITRUS BURST', type: 'IPA', description: 'A classic IPA bursting with grapefruit...', imageUrl: '/assets/product20.png', price: 879.00 },
    { id: 'crisp-lager', name: 'CRISP LAGER', type: 'Lager', description: 'Wonderfully light and exceptionally crisp...', imageUrl: '/assets/product21.png', price: 689.00 },
    { id: 'craft-pale-ale', name: 'CRAFT PALE ALE', type: 'Pale Ale', description: 'A perfectly crafted pale ale...', imageUrl: '/assets/product22.png', price: 849.00 }
    // --- NEW PRODUCTS END HERE ---
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