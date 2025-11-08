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
  IonFooter,
  useIonRouter // <-- NEW IMPORT
} from '@ionic/react';
import { closeOutline } from 'ionicons/icons'; 
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
  type?: string; 
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateItemQuantity } = useCart();
  const router = useIonRouter(); // <-- NEW: Get router

  // Calculate the total price
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // --- NEW: Handle checkout navigation ---
  const handleCheckout = () => {
    onClose(); // Close the modal
    router.push('/checkout'); // Navigate to the checkout page
  };

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
          <> 
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
                    <p className={styles.itemPackage}>{item.type || '6-Pack'}</p> 
                    
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
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <p className={styles.footerText}>Tax included and shipping calculated at checkout</p>
          {/* --- MODIFIED: Added onClick handler --- */}
          <IonButton 
            expand="block" 
            className={styles.checkoutButton}
            onClick={handleCheckout} 
          >
            CHECK OUT
          </IonButton>
          
        </IonFooter>
      )}
    </IonModal>
  );
};

export default CartModal;