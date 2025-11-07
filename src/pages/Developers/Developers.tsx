// src/pages/Developers/Developers.tsx

import { IonContent, IonPage, IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons'; 
import styles from './Developers.module.css';

const Developers: React.FC = () => {
  
  // Updated team array with new roles
  const team = [
    { name: 'Bryan Erickson Soriano', role: 'Lead Developer', image: '/assets/icon1.png' },
    { name: 'Ivan Aba-a', role: 'UI/UX & Brand Design', image: '/assets/icon2.png'  },
    { name: 'Simplicio Juanir', role: 'Project Documentation', image: '/assets/icon3.png'  },
    { name: 'Renier Lopez', role: 'QA & Asset Coordinator', image: '/assets/icon4.png'  },
    { name: 'Mikhail Pitstock Mendoza', role: 'Product & Brand Specialist', image: '/assets/icon5.png' },
  ];

  // This function will handle errors if an image fails to load
  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Re-use the default person icon as a fallback
    (e.target as HTMLImageElement).style.display = 'none'; // Hide the broken image
    
    // Create a fallback icon
    const icon = document.createElement('ion-icon');
    icon.icon = personCircleOutline;
    icon.className = styles.devIconFallback; // Use a different class for the icon
    
    // Check if parentNode exists before inserting
    if (e.currentTarget.parentNode) {
      e.currentTarget.parentNode.prepend(icon);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <main className={styles.mainContainer}>
          <section className={styles.section}>
            <div className={styles.container}>
              <h2 className={styles.sectionHeader}>MEET THE TEAM</h2>
              <div className={styles.sectionUnderline}></div>
              <p className={styles.devText}>
                This project was brought to life by a dedicated team of creators passionate about great beer and great code.
              </p>

              <div className={styles.devList}>
                {team.map((member, index) => (
                  <div key={index} className={styles.devMember}>
                    
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className={styles.devIcon} 
                      onError={onImageError}
                    />

                    <div className={styles.devInfo}>
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Developers;