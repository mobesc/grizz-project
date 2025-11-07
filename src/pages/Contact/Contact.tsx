// src/pages/Contact/Contact.tsx

import React from 'react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  useIonToast
} from '@ionic/react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [presentToast] = useIonToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a backend
    presentToast({
      message: 'Message sent! We\'ll get back to you soon.',
      duration: 3000,
      color: 'success'
    });
    // Here you would reset the form state
  };

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <main className={styles.mainContainer}>
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeader}>GET IN TOUCH</h2>
              <div className={styles.sectionUnderline}></div>
              <p className={styles.contactText}>
                Have a question, a suggestion, or a partnership inquiry? Drop us a line using the form below, and our team will get back to you as soon as possible.
              </p>

              <form className={styles.formContainer} onSubmit={handleSubmit}>
                <IonItem className={styles.formItem}>
                  <IonLabel position="floating">Your Name</IonLabel>
                  <IonInput type="text" required />
                </IonItem>
                <IonItem className={styles.formItem}>
                  <IonLabel position="floating">Your Email</IonLabel>
                  <IonInput type="email" required />
                </IonItem>
                <IonItem className={styles.formItem}>
                  <IonLabel position="floating">Message</IonLabel>
                  <IonTextarea rows={6} required />
                </IonItem>
                <IonButton
                  type="submit"
                  expand="block"
                  className={styles.submitButton}
                >
                  Send Message
                </IonButton>
              </form>

            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Contact;