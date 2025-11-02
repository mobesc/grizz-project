// src/components/FilterModal/FilterModal.tsx

import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonFooter,
  IonList,
  IonItem,
  IonCheckbox,
  IonLabel
} from '@ionic/react';
import styles from './FilterModal.module.css';

// Define the Beer structure
interface Beer {
  id: string;
  type: string;
  [key: string]: any; // Allow other properties
}

interface FilterModalProps {
  isOpen: boolean;
  allBeers: Beer[];
  activeFilters: string[];
  onClose: () => void;
  onApply: (selectedTypes: string[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, allBeers, activeFilters, onClose, onApply }) => {
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(activeFilters);

  // When the modal opens, update its internal state to match the active filters
  useEffect(() => {
    setSelectedTypes(activeFilters);
  }, [activeFilters, isOpen]);

  // Find all unique beer types from the list
  useEffect(() => {
    const types = allBeers.map(beer => beer.type);
    const uniqueTypes = [...new Set(types)];
    setAvailableTypes(uniqueTypes);
  }, [allBeers]);

  // Handle checking/unchecking a box
  const handleCheck = (e: any) => {
    const { checked, value } = e.detail;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } else {
      setSelectedTypes(selectedTypes.filter(type => type !== value));
    }
  };

  // Handle "Reset" button
  const handleReset = () => {
    setSelectedTypes([]);
  };

  // Handle "Apply" button
  const handleApply = () => {
    onApply(selectedTypes); // Send the selected types back to the Beers page
  };

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose} 
      className={styles.filterModal}
      backdropDismiss={true}
    >
      <IonHeader className={styles.modalHeader}>
        <IonToolbar>
          <IonTitle>Filter By</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className={styles.modalContent}>
        <IonList className={styles.filterList}>
          <IonItem lines="full" className={styles.listHeader}>
            <IonLabel>Beer Type</IonLabel>
          </IonItem>
          {availableTypes.map(type => (
            <IonItem key={type} lines="none" className={styles.filterItem}>
              <IonCheckbox
                value={type}
                checked={selectedTypes.includes(type)}
                onIonChange={handleCheck}
              >
                {type}
              </IonCheckbox>
            </IonItem>
          ))}
        </IonList>
      </IonContent>

      <IonFooter className={styles.modalFooter}>
        <IonToolbar>
          <IonButton 
            className={styles.resetButton} 
            fill="clear"
            onClick={handleReset}
          >
            Reset
          </IonButton>
          <IonButton 
            className={styles.applyButton} 
            fill="solid"
            onClick={handleApply}
          >
            Apply
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default FilterModal;