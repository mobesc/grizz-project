// src/pages/ProductPage/ProductPage.tsx

import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonIcon, IonButton, useIonToast, IonLoading } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './ProductPage.module.css';
import { chevronBackOutline, checkmarkCircle, star, starOutline } from 'ionicons/icons';
import { useCart } from '../../context/CartContext';

// --- MOCK DATA with UPDATED NAMES ---
const beerDatabase: { [key: string]: any } = {
  'glacier-punch': {
    id: 'glacier-punch',
    name: 'GLACIER PUNCH',
    type: 'Pilsner',
    description: 'A crisp, arctic-inspired pilsner with a chillingly smooth finish. Brewed with mountain-pure water and a hint of icy mint, it\'s the perfect refreshment for cooling down.',
    imageUrl: '/assets/product1.png',
    price: 719.00,
    abv: 5.0,
    ibu: 22,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.5,
    reviewCount: 128
  },
  'apple-riz': {
    id: 'apple-riz',
    name: 'APPLE RIZ',
    type: 'Hard Apple Cider',
    description: 'A hard apple cider with a bold, electric taste. This isn\'t your standard cider; it\'s refreshingly tart with a sweet apple kick that\'s shockingly good. Get the Rizz.',
    imageUrl: '/assets/product2.png',
    price: 799.00,
    abv: 7.5,
    ibu: 10,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.8,
    reviewCount: 95
  },
  'honey-bees': {
    id: 'honey-bees',
    name: 'HONEY BEES',
    type: 'Honey Ale',
    description: 'A sweet, golden honey ale. We brew this with a touch of real, locally-sourced honey for a smooth, nectar-like flavor that\'s buzzing with taste. A truly sweet escape.',
    imageUrl: '/assets/product3.png',
    price: 919.00,
    abv: 7.5,
    ibu: 20,
    volume: '4-Pack (16oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.6,
    reviewCount: 210
  },
  'berry-blast': {
    id: 'berry-blast',
    name: 'BERRY BLAST',
    type: 'Fruited Ale',
    description: 'A vibrant, fruity ale bursting with a mix of wild berries. This brew is a sweet and tangy explosion of flavor, with notes of raspberry, blueberry, and a hint of cherry. It\'s a blast in every sip.',
    imageUrl: '/assets/product4.png',
    price: 899.00, 
    abv: 7.5,
    ibu: 15,
    volume: '4-Pack (16oz Cans)',
    availability: 'Limited Edition',
    rating: 4.7,
    reviewCount: 150
  },
  // --- NEW PRODUCTS START HERE ---
  'lemon-zest': {
    id: 'lemon-zest',
    name: 'LEMON ZEST',
    type: 'Radler',
    description: 'A bright, refreshing lager mixed with a sharp twist of natural lemon. Incredibly sessionable and perfect for a sunny day.',
    imageUrl: '/assets/product5.png',
    price: 739.00,
    abv: 4.5,
    ibu: 15,
    volume: '6-Pack (12oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.4,
    reviewCount: 92
  },
  'tropical-twist': {
    id: 'tropical-twist',
    name: 'TROPICAL TWIST',
    type: 'Fruited IPA',
    description: 'An explosion of pineapple, mango, and passionfruit notes. This Hazy IPA is juicy, smooth, and a vacation in a can.',
    imageUrl: '/assets/product6.png',
    price: 899.00,
    abv: 6.5,
    ibu: 40,
    volume: '6-Pack (12oz Cans)',
    availability: 'Limited Edition',
    rating: 4.8,
    reviewCount: 178
  },
  'cucumber-lime': {
    id: 'cucumber-lime',
    name: 'CUCUMBER LIME',
    type: 'Gose',
    description: 'A refreshingly tart gose with a cool, crisp cucumber flavor and a zesty lime finish. Supremely crushable.',
    imageUrl: '/assets/product7.png',
    price: 829.00,
    abv: 4.8,
    ibu: 12,
    volume: '6-Pack (12oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.6,
    reviewCount: 105
  },
  'kiwi-splash': {
    id: 'kiwi-splash',
    name: 'KIWI SPLASH',
    type: 'Fruited Sour',
    description: 'A vibrant, tangy sour ale bursting with the exotic flavor of fresh kiwi. A delightful splash of sweet and sour.',
    imageUrl: '/assets/product8.jpg',
    price: 849.00,
    abv: 5.5,
    ibu: 10,
    volume: '6-Pack (12oz Bottles)',
    availability: 'Limited Edition',
    rating: 4.7,
    reviewCount: 133
  },
  'watermelon-wave': {
    id: 'watermelon-wave',
    name: 'WATERMELON WAVE',
    type: 'Fruit Ale',
    description: 'Ride the wave of pure refreshment. This light ale is infused with natural watermelon for a sweet, juicy, and sessionable brew.',
    imageUrl: '/assets/product9.png',
    price: 789.00,
    abv: 5.0,
    ibu: 18,
    volume: '6-Pack (12oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.5,
    reviewCount: 142
  },
  'crimson-paws': {
    id: 'crimson-paws',
    name: 'CRIMSON PAWS',
    type: 'Red Ale',
    description: 'A bold, malty Red Ale. Features a deep crimson color and a rich caramel malt profile, balanced by a touch of earthy hops.',
    imageUrl: '/assets/product10.png',
    price: 859.00,
    abv: 5.8,
    ibu: 30,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.6,
    reviewCount: 155
  },
  'strawberry-watermelon': {
    id: 'strawberry-watermelon',
    name: 'STRAWBERRY WATERMELON',
    type: 'Fruited Ale',
    description: 'The ultimate summer combination. Sweet strawberries and juicy watermelon come together in this bright, refreshing fruit ale.',
    imageUrl: '/assets/product11.png',
    price: 819.00,
    abv: 5.1,
    ibu: 16,
    volume: '6-Pack (12oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.7,
    reviewCount: 168
  },
  'golden-lager': {
    id: 'golden-lager',
    name: 'GOLDEN LAGER',
    type: 'Lager',
    description: 'A crisp, clean, and perfectly balanced golden lager. It\'s the standard for a reason—a rich, rewarding, and refreshing classic.',
    imageUrl: '/assets/product12.png',
    price: 699.00,
    abv: 5.0,
    ibu: 20,
    volume: '4-Pack (16oz Cans)',
    availability: 'Year-Round',
    rating: 4.4,
    reviewCount: 230
  },
  'crisp-wheat-beer': {
    id: 'crisp-wheat-beer',
    name: 'CRISP WHEAT BEER',
    type: 'Wheat Beer',
    description: 'Light, refreshing, and smooth. Our Wheat Beer features subtle notes of clove and banana with a soft, bready finish. An unfiltered classic.',
    imageUrl: '/assets/product13.png',
    price: 799.00,
    abv: 5.2,
    ibu: 15,
    volume: '6-Pack (12oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.5,
    reviewCount: 134
  },
  'strawberry-fields': {
    id: 'strawberry-fields',
    name: 'STRAWBERRY FIELDS',
    type: 'Fruit Ale',
    description: 'A light, golden ale conditioned on heaps of fresh strawberries. A sweet, aromatic, and easy-drinking beer for any occasion.',
    imageUrl: '/assets/product14.png',
    price: 829.00,
    abv: 5.2,
    ibu: 18,
    volume: '6-Pack (12oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.6,
    reviewCount: 122
  },
  'berry-breeze': {
    id: 'berry-breeze',
    name: 'BERRY BREEZE',
    type: 'Fruited Ale',
    description: 'A refreshing breeze of mixed berries. This ale combines raspberry, blueberry, and blackberry for a complex, juicy, and vibrant brew.',
    imageUrl: '/assets/product15.png',
    price: 839.00,
    abv: 5.4,
    ibu: 17,
    volume: '6-Pack (12oz Cans)',
    availability: 'Limited Edition',
    rating: 4.7,
    reviewCount: 119
  },
  'grapefruit-splash': {
    id: 'grapefruit-splash',
    name: 'GRAPEFRUIT SPLASH',
    type: 'Radler',
    description: 'A zesty, citrus-forward radler. We blend our classic lager with a big splash of grapefruit juice for a tart and tantalizing thirst-quencher.',
    imageUrl: '/assets/product16.png',
    price: 749.00,
    abv: 4.6,
    ibu: 16,
    volume: '6-Pack (12oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.5,
    reviewCount: 99
  },
  'pineapple-punch': {
    id: 'pineapple-punch',
    name: 'PINEAPPLE PUNCH',
    type: 'Fruited Ale',
    description: 'A powerful punch of tropical pineapple flavor. This ale is sweet, tangy, and a perfect escape to a tropical paradise.',
    imageUrl: '/assets/product17.png',
    price: 809.00,
    abv: 5.3,
    ibu: 15,
    volume: '6-Pack (12oz Cans)',
    availability: 'Limited Edition',
    rating: 4.6,
    reviewCount: 138
  },
  'mango-tango': {
    id: 'mango-tango',
    name: 'MANGO TANGO',
    type: 'Fruited Ale',
    description: 'It takes two to tango! This ale features a dance of sweet mango and a hint of zesty citrus, creating a smooth, juicy, and balanced beer.',
    imageUrl: '/assets/product18.jpg',
    price: 819.00,
    abv: 5.5,
    ibu: 19,
    volume: '6-Pack (12oz Bottles)',
    availability: 'Limited Edition',
    rating: 4.7,
    reviewCount: 151
  },
  'raspberry-ripple': {
    id: 'raspberry-ripple',
    name: 'RASPBERRY RIPPLE',
    type: 'Fruited Sour',
    description: 'A delightful sour ale with a ripple of sweet raspberry. It\'s tart, jammy, and finishes with a crisp, clean pucker.',
    imageUrl: '/assets/product19.jpg',
    price: 869.00,
    abv: 5.6,
    ibu: 11,
    volume: '6-Pack (12oz Bottles)',
    availability: 'Limited Edition',
    rating: 4.8,
    reviewCount: 102
  },
  'citrus-burst': {
    id: 'citrus-burst',
    name: 'CITRUS BURST',
    type: 'IPA',
    description: 'A classic IPA bursting with grapefruit, orange, and lemon notes. A solid hop bitterness and a clean malt backbone make this an IPA-lover\'s dream.',
    imageUrl: '/assets/product20.png',
    price: 879.00,
    abv: 6.7,
    ibu: 55,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.7,
    reviewCount: 205
  },
  'crisp-lager': {
    id: 'crisp-lager',
    name: 'CRISP LAGER',
    type: 'Lager',
    description: 'Wonderfully light and exceptionally crisp. This is your new go-to lager for pure, uncomplicated refreshment. Simple, clean, and delicious.',
    imageUrl: '/assets/product21.png',
    price: 689.00,
    abv: 4.8,
    ibu: 18,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.3,
    reviewCount: 188
  },
  'craft-pale-ale': {
    id: 'craft-pale-ale',
    name: 'CRAFT PALE ALE',
    type: 'Pale Ale',
    description: 'A perfectly crafted pale ale. Balances floral and citrus hop aromas with a solid malt backbone, making it a flavorful yet easy-drinking choice.',
    imageUrl: '/assets/product22.png',
    price: 849.00,
    abv: 5.6,
    ibu: 35,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.6,
    reviewCount: 192
  }
  // --- NEW PRODUCTS END HERE ---
};
// --- END MOCK DATA ---

// Helper function to render stars (remains the same)
const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<IonIcon key={`full-${i}`} icon={star} className={styles.starIcon} />);
    }
    if (hasHalfStar && rating - fullStars >= 0.5) {
         stars.push(<IonIcon key="half-ish" icon={star} className={styles.starIcon} />);
    }
    const emptyStars = 5 - stars.length;
     for (let i = 0; i < emptyStars; i++) {
        stars.push(<IonIcon key={`empty-${i}`} icon={starOutline} className={styles.starIcon} />);
    }
    return stars;
};

const ProductPage: React.FC = () => {
  const history = useHistory();
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useCart();
  const [presentToast] = useIonToast();

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (productId && beerDatabase[productId]) {
      setTimeout(() => {
          setProduct(beerDatabase[productId]);
          setLoading(false);
      }, 100);
    } else if (productId) {
      setError(true);
      setLoading(false);
    } else {
        setLoading(false);
        setError(true);
    }
  }, [productId]);

  const goBack = () => {
    history.goBack();
  };

  const handleAddToCart = (item: any) => {
    if (!item) return;
    addToCart(item);
    presentToast({
      message: `${item.name} added to cart!`,
      duration: 2000,
      position: 'bottom',
      color: 'success',
      icon: checkmarkCircle,
    });
  };

  if (loading) {
     return ( <IonPage><IonContent fullscreen><IonLoading isOpen={loading} message={'Loading beer...'} /></IonContent></IonPage> );
  }

  if (error || !product) {
     return (
      <IonPage>
        <IonContent fullscreen className={styles.mainContainer}>
          <div className={styles.container}>
            <IonButton fill="clear" onClick={goBack} className={styles.backButton}>
              <IonIcon icon={chevronBackOutline} slot="start" />
              Back
            </IonButton>
            <h2>Product Not Found</h2>
            <p>Sorry, we couldn't find the beer ID '{productId || 'unknown'}'.</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <main className={styles.mainContainer}>
          <div className={styles.container}>
             <IonButton fill="clear" onClick={goBack} className={styles.backButton}>
              <IonIcon icon={chevronBackOutline} slot="start" />
              Back to Beers
            </IonButton>

            <div className={styles.productLayout}>
               <div className={styles.imageColumn}>
                 <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={styles.productImage}
                  onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/600x600/18181b/facc15?text=GRIZZ'; }}
                />
               </div>

               <div className={styles.detailsColumn}>
                <h1 className={styles.productName}>{product.name}</h1>
                <p className={styles.productType}>{product.type}</p>

                <div className={styles.ratingContainer}>
                    {renderStars(product.rating)}
                    <span className={styles.reviewCount}>({product.reviewCount} Reviews)</span>
                </div>

                {/* --- CURRENCY CHANGE --- */}
                <p className={styles.productPrice}>₱{product.price.toFixed(2)}</p>

                <div className={styles.specs}>
                  <span>ABV: {product.abv}%</span>
                  <span>IBU: {product.ibu}</span>
                </div>

                <p className={styles.productVolume}>{product.volume}</p>
                <p className={styles.productAvailability}>Availability: {product.availability}</p>

                <h3 className={styles.descriptionHeader}>Description</h3>
                <p className={styles.productDescription}>{product.description}</p>

                <IonButton
                  expand="block"
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </IonButton>
              </div>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default ProductPage;