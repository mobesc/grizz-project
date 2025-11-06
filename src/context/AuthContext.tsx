// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our User object
interface User {
  email: string;
  photoURL: string | null; // URL to their profile picture
}

// Define the shape of the context
interface AuthContextState {
  user: User | null; // The user is either an object or null
  login: (email: string, rememberMe: boolean) => void; 
  logout: () => void; 
  updateUserProfile: (updates: Partial<User>) => void; // <-- NEW FUNCTION
}

// Create the context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

// Create the Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // --- MOCK LOGIN/LOGOUT FUNCTIONS ---
  // In a real app, you'd call Firebase here
  
  const login = (email: string, rememberMe: boolean) => { 
    const mockUser: User = {
      email: email,
      photoURL: null 
      // photoURL: 'https://i.pravatar.cc/150' // <-- Example: Uncomment to test with a photo
    };
    setUser(mockUser);
    console.log("Mock user logged in:", mockUser);
    console.log("Remember Me:", rememberMe); 
  };

  const logout = () => {
    setUser(null);
    console.log("User logged out.");
  };

  // --- NEW: Update User Profile Function ---
  const updateUserProfile = (updates: Partial<User>) => {
    setUser(prevUser => {
      if (!prevUser) return null; // Can't update if no user is logged in
      const updated = { ...prevUser, ...updates };
      console.log("User profile updated:", updated);
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProfile }}> {/* <-- ADD NEW FUNCTION */}
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the context
export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};