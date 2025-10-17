// src/components/SideMenu/SideMenu.tsx

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonAvatar
} from '@ionic/react';
import {
  businessOutline,
  callOutline,
  codeSlashOutline,
  cogOutline,
  documentTextOutline,
  personCircleOutline,
  bookOutline
} from 'ionicons/icons';
import styles from './SideMenu.module.css';

const SideMenu: React.FC = () => {
  // Your new list of menu items
  const menuItems = [
    { text: 'My Account', icon: personCircleOutline, path: '/account' },
    { text: 'Company History', icon: bookOutline, path: '/history' },
    { text: 'About our Products', icon: documentTextOutline, path: '/product-info' },
    { text: 'Developers', icon: codeSlashOutline, path: '/developers' },
    { text: 'Contact Us', icon: callOutline, path: '/contact' },
    { text: 'Find Us', icon: businessOutline, path: '/locations' },
    { text: 'Settings', icon: cogOutline, path: '/settings' },
  ];

  return (
    <IonMenu contentId="main-content" type="overlay" className={styles.sideMenu}>
      <IonContent>
        {/* -- User Profile Section -- */}
        <div className={styles.profileSection}>
          <IonAvatar className={styles.profileImage}>
            {/* Using an icon as a placeholder. Replace 'src' with a real image URL when ready. */}
            <IonIcon icon={personCircleOutline} />
          </IonAvatar>
          <h2 className={styles.profileName}>Guest User</h2>
          <p className={styles.profileNumber}>+63 912 345 6789</p>
        </div>

        {/* -- Navigation List -- */}
        <IonList className={styles.menuList}>
          {menuItems.map((item, index) => (
            <IonItem key={index} routerLink={item.path} routerDirection="none" lines="none" className={styles.menuItem}>
              <IonIcon slot="start" icon={item.icon} className={styles.menuIcon} />
              <IonLabel>{item.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;