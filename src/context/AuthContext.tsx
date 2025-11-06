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
  login: (email: string) => void; // Function to log in
  logout: () => void; // Function to log out
  updateProfilePhoto: (photoURL: string | null) => void; // <-- NEW: Function to update photo
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
  
  const login = (email: string) => {
    const mockUser: User = {
      email: email,
      photoURL: null // Start with no photo by default
      // To test with a photo, uncomment and paste a URL here:
      // photoURL: 'https://i.pravatar.cc/150'
    };
    setUser(mockUser);
    console.log("Mock user logged in:", mockUser);
  };

  const logout = () => {
    setUser(null);
    console.log("User logged out.");
  };

  // --- NEW: Function to update profile photo ---
  const updateProfilePhoto = (photoURL: string | null) => {
    if (user) {
      setUser({ ...user, photoURL: photoURL });
      console.log("Profile photo updated:", photoURL);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfilePhoto }}> {/* <-- NEW: Pass updateProfilePhoto */}
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