// src/pages/ProductPage/ProductPage.tsx

import React, { useState, useEffect } from 'react';
import { IonContent, IonPage, IonIcon, IonButton, useIonToast, IonLoading } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './ProductPage.module.css';
import { chevronBackOutline, checkmarkCircle, star, starOutline } from 'ionicons/icons';
import { useCart } from '../../context/CartContext';

// --- MOCK DATA with NEW image paths ---
const beerDatabase: { [key: string]: any } = {
  'grizzly-gold': {
    id: 'grizzly-gold',
    name: 'GRIZZLY GOLD',
    type: 'Golden Ale',
    description: 'Our main Golden Ale, Grizzly Gold, is both easy to drink and flavorful. We use pale malts for a light body and color, adding Cascade hops for hints of citrus. It has a clean fermentation, highlighting the quality ingredients. Great with lighter foods or by itself after spending time outdoors.',
    imageUrl: '/assets/product1.png', // <-- NEW IMAGE
    price: 12.99, // Assuming $ price
    abv: 5.2,
    ibu: 25,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.5,
    reviewCount: 128
  },
  'midnight-paws': {
    id: 'midnight-paws',
    name: 'MIDNIGHT PAWS',
    type: 'Porter',
    description: 'Try the deep flavors of Midnight Paws Porter. This strong beer uses roasted barley and chocolate malt for notes of coffee, dark chocolate, and a touch of caramel. Balanced hop bitterness leads to a rich, smooth finish.',
    imageUrl: '/assets/product2.png', // <-- NEW IMAGE
    price: 14.99, // Assuming $ price
    abv: 6.0,
    ibu: 35,
    volume: '6-Pack (12oz Cans)',
    availability: 'Year-Round',
    rating: 4.8,
    reviewCount: 95
  },
  'forest-haze': {
    id: 'forest-haze',
    name: 'FOREST HAZE',
    type: 'Hazy IPA',
    description: 'Enjoy our Forest Haze IPA, heavily hopped with Citra and Mosaic for strong tropical fruit smells like mango and citrus. Oats and wheat give it a full, soft texture and its hazy look. Low bitterness makes it extra juicy and smooth.',
    imageUrl: '/assets/product3.png', // <-- NEW IMAGE
    price: 15.99, // Assuming $ price
    abv: 6.5,
    ibu: 40,
    volume: '4-Pack (16oz Cans)',
    availability: 'Seasonal Release',
    rating: 4.6,
    reviewCount: 210
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

                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>

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