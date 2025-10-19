// src/pages/Cart/Cart.tsx

import { IonContent, IonPage } from '@ionic/react';
import styles from './Cart.module.css';

const Cart: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen={true}>
                <main className={styles.mainContainer}>
                    <section className={styles.section}>
                        <div className={styles.container}>
                            <h2 className={styles.sectionHeader}>YOUR CART</h2>
                            <div className={styles.sectionUnderline}></div>
                            <p className={styles.cartText}>
                                Your cart is currently empty. Go find some beers!
                            </p>
                        </div>
                    </section>
                </main>
            </IonContent>
        </IonPage>
    );
};

export default Cart;