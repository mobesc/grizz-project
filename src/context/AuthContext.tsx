// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the shape of our User object
interface User {
  id: string; // Unique ID for each user
  email: string;
  username: string; // Added username
  password: string; // NOTE: In a real app, this would be hashed!
  photoURL: string | null; // URL to their profile picture
}

// Define the shape of the context
interface AuthContextState {
  user: Omit<User, 'password'> | null; // The logged-in user (password omitted for security)
  login: (email: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUserProfile: (updates: Partial<Omit<User, 'id' | 'password'>>) => void;
}

// Create the context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

// Create the Provider component
interface AuthProviderProps {
  children: ReactNode;
}

// --- Helper Functions for localStorage ---
const getStoredAccounts = (): User[] => {
  try {
    const accounts = localStorage.getItem('grizzAccountList');
    return accounts ? JSON.parse(accounts) : [];
  } catch (e) {
    console.error("Failed to parse accounts from localStorage", e);
    return [];
  }
};

const getStoredUser = (storage: Storage): Omit<User, 'password'> | null => {
  try {
    const storedUser = storage.getItem('grizzUser');
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Failed to parse user from storage", e);
    return null;
  }
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // State for all registered accounts
  const [allAccounts, setAllAccounts] = useState<User[]>(getStoredAccounts);
  // State for the currently logged-in user
  const [user, setUser] = useState<Omit<User, 'password'> | null>(() => {
    // Check session storage first (user didn't click "Remember Me")
    const sessionUser = getStoredUser(sessionStorage);
    if (sessionUser) return sessionUser;
    
    // Check local storage (user clicked "Remember Me")
    const localUser = getStoredUser(localStorage);
    if (localUser) return localUser;

    return null;
  });
  
  const [storageType, setStorageType] = useState<'localStorage' | 'sessionStorage'>(() => {
     return localStorage.getItem('grizzUser') ? 'localStorage' : 'sessionStorage';
  });

  // Save all accounts to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('grizzAccountList', JSON.stringify(allAccounts));
    } catch (e) {
      console.error("Failed to save accounts to localStorage", e);
    }
  }, [allAccounts]);

  // Save/Remove current user from storage when it changes
  useEffect(() => {
    try {
      const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
      if (user) {
        storage.setItem('grizzUser', JSON.stringify(user));
      } else {
        // Clear from both on logout
        localStorage.removeItem('grizzUser');
        sessionStorage.removeItem('grizzUser');
      }
    } catch (e) {
      console.error("Failed to save user to storage", e);
    }
  }, [user, storageType]);

  // --- Real Auth Functions ---

  const register = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Basic validation
    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Check if user already exists
    if (allAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists." };
    }

    // Create new user
    const newUser: User = {
      id: new Date().toISOString(), // Simple unique ID
      email: email.toLowerCase(),
      username: email.split('@')[0], // Default username
      password: password, // In a real app, HASH THIS PASSWORD
      photoURL: null,
    };

    // Add to accounts list
    setAllAccounts(prevAccounts => [...prevAccounts, newUser]);

    // Log the user in (session storage by default for registration)
    const { password: _, ...userToStore } = newUser;
    setStorageType('sessionStorage');
    setUser(userToStore);
    
    return { success: true };
  };

  const login = async (email: string, password: string, rememberMe: boolean): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: "Email and password are required." };
    }
    
    const foundUser = allAccounts.find(acc => acc.email.toLowerCase() === email.toLowerCase());

    // Check if user exists
    if (!foundUser) {
      return { success: false, error: "No account found with this email." };
    }

    // Check password
    if (foundUser.password !== password) {
      // NOTE: In a real app, you'd compare hashes
      return { success: false, error: "Incorrect password." };
    }

    // Login successful
    const { password: _, ...userToStore } = foundUser;
    setStorageType(rememberMe ? 'localStorage' : 'sessionStorage');
    setUser(userToStore);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<Omit<User, 'id' | 'password'>>) => {
    if (!user) return; // Not logged in

    let updatedUser: Omit<User, 'password'> | null = null;

    // Update the master account list
    setAllAccounts(prevAccounts => 
      prevAccounts.map(acc => {
        if (acc.id === user.id) {
          const newAccountData = { ...acc, ...updates };
          const { password: _, ...userToStore } = newAccountData;
          updatedUser = userToStore; // Capture the updated user data
          return newAccountData;
        }
        return acc;
      })
    );

    // Update the currently logged-in user state
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUserProfile }}>
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