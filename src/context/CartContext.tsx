// src/context/CartContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the structure of a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string; // Optional image
  quantity: number;
  selectedPackage?: string; // Keep track of the selected package if applicable
  type?: string; // For "Golden Ale", etc.
  volume?: string; // <-- NEW: To store "6-Pack (12oz Cans)"
}

// --- MODIFIED: Added clearCart ---
interface CartContextState {
  cartItems: CartItem[];
  addToCart: (item: any) => void; // Function to add items
  getCartItemCount: () => number; // Function to get total item count
  removeFromCart: (itemId: string) => void; 
  updateItemQuantity: (itemId: string, newQuantity: number) => void; 
  clearCart: () => void; // <-- NEW
}

// Create the context
const CartContext = createContext<CartContextState | undefined>(undefined);

// Create a provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('grizzCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

   // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('grizzCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);


  const addToCart = (itemToAdd: any) => {
    setCartItems(prevItems => {
      // Check if item with same ID AND selectedPackage exists (even if selectedPackage is undefined)
      const existingItem = prevItems.find(item =>
          item.id === itemToAdd.id && item.selectedPackage === itemToAdd.selectedPackage
        );
      if (existingItem) {
        // If item exists, increment quantity
        return prevItems.map(item =>
          item.id === itemToAdd.id && item.selectedPackage === itemToAdd.selectedPackage
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity 1
        // Ensure only necessary fields are added
        const newItem: CartItem = {
            id: itemToAdd.id,
            name: itemToAdd.name,
            price: itemToAdd.price,
            imageUrl: itemToAdd.imageUrl,
            selectedPackage: itemToAdd.selectedPackage, // Will be undefined if not provided
            type: itemToAdd.type, // Add the type
            volume: itemToAdd.volume, // <-- NEW: Add the volume
            quantity: 1
        };
        // Filter out any potential extra properties from itemToAdd before adding
        const cleanItemToAdd = { ...newItem };
        return [...prevItems, cleanItemToAdd];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== itemId);
    });
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeFromCart(itemId);
    } else {
      // Otherwise, update the quantity
      setCartItems(prevItems => {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        );
      });
    }
  };

  // --- NEW: clearCart function ---
  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemCount = () => {
     // Sum up quantities of all items
     return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        getCartItemCount, 
        removeFromCart,
        updateItemQuantity,
        clearCart // <-- NEW
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the Cart context easily
export const useCart = (): CartContextState => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};