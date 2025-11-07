// src/pages/ProductPage/ProductPage.tsx

import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonIcon, IonButton, useIonToast, IonLoading } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './ProductPage.module.css';
import { chevronBackOutline, checkmarkCircle, star, starOutline } from 'ionicons/icons';
import { useCart } from '../../context/CartContext';

// --- MOCK DATA with NEW PHP prices AND RENAMED PRODUCTS ---
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
  }
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