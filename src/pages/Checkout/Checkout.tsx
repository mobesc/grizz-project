// src/pages/Checkout/Checkout.tsx

import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  useIonToast,
  useIonRouter,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonRadioGroup,
  IonListHeader,
  IonRadio
} from '@ionic/react';
import { cardOutline, cashOutline } from 'ionicons/icons';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import styles from './Checkout.module.css';

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [presentToast] = useIonToast();
  const router = useIonRouter();
  
  const [paymentMethod, setPaymentMethod] = useState('creditcard');

  // --- Protection Effect (unchanged) ---
  useEffect(() => {
    // 1. Redirect if not logged in
    if (!user) {
      router.push('/home', 'root', 'replace');
      presentToast({
        message: 'You must be logged in to check out.',
        duration: 2000,
        color: 'warning'
      });
    // 2. Redirect if cart is empty
    } else if (cartItems.length === 0) {
      router.push('/beers', 'root', 'replace');
       presentToast({
        message: 'Your cart is empty.',
        duration: 2000,
        color: 'warning'
      });
    }
  }, [user, cartItems, router, presentToast]);

  // --- Calculations (unchanged) ---
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 50.00; // Mock shipping fee
  const total = subtotal + shipping;

  // --- handlePlaceOrder function REMOVED ---

  // Don't render if checks haven't passed
  if (!user || cartItems.length === 0) {
    return null;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.mainContainer}>
        {/* --- onSubmit handler REMOVED --- */}
        <form>
          <IonGrid className={styles.grid}>
            {/* --- Column 1: Shipping & Payment (unchanged) --- */}
            <IonRow>
              <IonCol size="12" size-md="7" className={styles.formColumn}>
                
                {/* --- Shipping Details --- */}
                <IonList className={styles.formList}>
                  <IonListHeader className={styles.listHeader}>Shipping Details</IonListHeader>
                  <IonItem className={styles.formItem}>
                    <IonLabel position="floating">Full Name</IonLabel>
                    <IonInput type="text" value={user.username} required />
                  </IonItem>
                  <IonItem className={styles.formItem}>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput type="email" value={user.email} readonly />
                  </IonItem>
                  <IonItem className={styles.formItem}>
                    <IonLabel position="floating">Address</IonLabel>
                    <IonInput type="text" required />
                  </IonItem>
                  <IonItem className={styles.formItem}>
                    <IonLabel position="floating">City</IonLabel>
                    <IonInput type="text" required />
                  </IonItem>
                  <IonItem className={styles.formItem}>
                    <IonLabel position="floating">Postal Code</IonLabel>
                    <IonInput type="text" required />
                  </IonItem>
                </IonList>

                {/* --- Payment Method --- */}
                <IonRadioGroup value={paymentMethod} onIonChange={e => setPaymentMethod(e.detail.value)} className={styles.formList}>
                  <IonListHeader className={styles.listHeader}>Payment Method</IonListHeader>
                  <IonItem lines="none" className={styles.radioItem}>
                    <IonIcon icon={cardOutline} slot="start" />
                    <IonLabel>Credit Card</IonLabel>
                    <IonRadio slot="end" value="creditcard"></IonRadio>
                  </IonItem>
                  <IonItem lines="none" className={styles.radioItem}>
                    <IonIcon icon={cashOutline} slot="start" />
                    <IonLabel>Cash on Delivery</IonLabel>
                    <IonRadio slot="end" value="cod"></IonRadio>
                  </IonItem>
                </IonRadioGroup>

                {/* --- Mock Credit Card Form (unchanged) --- */}
                {paymentMethod === 'creditcard' && (
                  <IonList className={`${styles.formList} ${styles.nestedForm}`}>
                     <IonItem className={styles.formItem}>
                      <IonLabel position="floating">Card Number</IonLabel>
                      <IonInput type="text" placeholder="**** **** **** ****" required />
                    </IonItem>
                     <IonRow>
                      <IonCol size="8">
                         <IonItem className={styles.formItem}>
                          <IonLabel position="floating">Expiry (MM/YY)</IonLabel>
                          <IonInput type="text" placeholder="MM/YY" required />
                        </IonItem>
                      </IonCol>
                      <IonCol size="4">
                         <IonItem className={styles.formItem}>
                          <IonLabel position="floating">CVC</IonLabel>
                          <IonInput type="text" placeholder="123" required />
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonList>
                )}

              </IonCol>

              {/* --- Column 2: Order Summary (UPDATED) --- */}
              <IonCol size="12" size-md="5" className={styles.summaryColumn}>
                <div className={styles.summaryBox}>
                  <h2 className={styles.summaryTitle}>Order Summary</h2>
                  <div className={styles.summaryList}>
                    {cartItems.map(item => (
                      <div key={item.id} className={styles.summaryItem}>
                        <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                        <div className={styles.itemDetails}>
                          <span className={styles.itemName}>{item.name}</span>
                          {/* --- ADDED THIS LINE --- */}
                          <span className={styles.itemPackage}>{item.volume || ''}</span>
                          <span className={styles.itemQty}>Qty: {item.quantity}</span>
                        </div>
                        <span className={styles.itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Shipping</span>
                    <span>₱{shipping.toFixed(2)}</span>
                  </div>
                  <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                    <span>Total</span>
                    <span>₱{total.toFixed(2)}</span>
                  </div>
                  <IonButton 
                    type="button" 
                    expand="block" 
                    className={styles.placeOrderButton}
                    onClick={(e) => e.preventDefault()}
                  >
                    Place Order
                  </IonButton>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Checkout;