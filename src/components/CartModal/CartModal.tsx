// src/components/CartModal/CartModal.tsx

import React from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
  IonFooter
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons'; // <-- REMOVED trashOutline
import { useCart } from '../../context/CartContext';
import styles from './CartModal.module.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the CartItem structure
interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
  type?: string; // Added 'type' to match "Golden Ale" or "Case (24 Bottles)"
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  // --- REMOVED clearCart from useCart ---
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();

  // Calculate the total price
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose} 
      className={styles.cartModal}
      backdropDismiss={true}
    >
      <IonHeader className={styles.modalHeader}>
        <IonToolbar>
          <IonTitle>YOUR CART</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose} fill="clear" className={styles.closeButton}>
              <IonIcon icon={closeOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.modalContent}>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <h3>Your cart is empty</h3>
            <IonButton onClick={onClose} routerLink="/beers" fill="clear" className={styles.shopButton}>
              Shop Our Beers
            </IonButton>
          </div>
        ) : (
          <> {/* Use Fragment to hold multiple root elements */}
            <div className={styles.itemList}>
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className={styles.cartItem}>
                  {/* Image */}
                  <img 
                    src={item.imageUrl || 'https://placehold.co/80x80/f4f4f5/facc15?text=GRIZZ'} 
                    alt={item.name} 
                    className={styles.itemImage}
                    onError={(e) => { (e.target as HTMLImageElement).src='https://placehold.co/80x80/f4f4f5/facc15?text=GRIZZ'; }}
                  />
                  {/* Details */}
                  <div className={styles.itemDetails}>
                    <h2 className={styles.itemName}>{item.name}</h2>
                    <p className={styles.itemPackage}>{item.type || '6-Pack'}</p> {/* Fallback to 6-pack */}
                    
                    <div className={styles.itemControls}>
                      <div className={styles.quantitySelector}>
                        <button 
                          className={styles.quantityButton} 
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className={styles.quantityDisplay}>{item.quantity}</span>
                        <button 
                          className={styles.quantityButton}
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className={styles.removeButton}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {/* Price (CURRENCY CHANGE) */}
                  <span className={styles.itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className={styles.noteSection}>
              <label htmlFor="cartNote">Add a note to your order</label>
              <textarea id="cartNote" className={styles.noteTextarea}></textarea>
            </div>
          </>
        )}

      </IonContent>

      {/* --- FOOTER --- */}
      {cartItems.length > 0 && (
        <IonFooter className={styles.modalFooter}>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            {/* Price (CURRENCY CHANGE) */}
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <p className={styles.footerText}>Tax included and shipping calculated at checkout</p>
          <IonButton expand="block" className={styles.checkoutButton}>
            CHECK OUT
          </IonButton>
          
          {/* --- REMOVED CLEAR CART BUTTON --- */}
          
        </IonFooter>
      )}
    </IonModal>
  );
};

export default CartModal;