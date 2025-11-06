// src/App.tsx

import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  HTMLIonMenuElement
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect, useRef } from 'react';

// Import Pages
import Home from './pages/Home/Home';
import Beers from './pages/Beers/Beers';
import About from './pages/About/About';
import History from './pages/History/History';
import ProductPage from './pages/ProductPage/ProductPage';

// Import Global UI Components
import TopHeader from './components/TopHeader/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import SplashScreen from './components/SplashScreen/SplashScreen';
import CartModal from './components/CartModal/CartModal';
import LoginModal from './components/LoginModal/LoginModal'; 

// Import Providers
import { CartProvider } from './context/CartContext'; 
import { AuthProvider } from './context/AuthContext'; // <-- IMPORT AUTH PROVIDER

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const menuRef = useRef<HTMLIonMenuElement>(null);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  
  // --- NEW: State to manage loading for the login modal ---
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  // Show initial splash screen
  if (isLoading) {
    return <SplashScreen />;
  }

  const toggleMenu = () => {
    menuRef.current?.toggle();
  };

  const closeMenu = () => {
    menuRef.current?.close();
  };

  // --- NEW: Function to handle the login click ---
  const handleLoginClick = () => {
    setIsLoginLoading(true); // Show the splash screen overlay

    // Wait for 1.5 seconds, then hide splash and show modal
    setTimeout(() => {
      setIsLoginLoading(false);
      setIsLoginModalOpen(true);
    }, 1500); // 1.5 second delay
  };

  return (
    <IonApp>
      {/* --- WRAP WITH AUTH PROVIDER --- */}
      <AuthProvider>
        <CartProvider>
          <IonReactRouter>
            <SideMenu
              menuRef={menuRef}
              onClose={closeMenu}
              onLoginClick={handleLoginClick} // <-- UPDATED PROP
            />
            <TopHeader
              onMenuToggle={toggleMenu}
              onCartClick={() => setIsCartOpen(true)}
              onLoginClick={handleLoginClick} // <-- UPDATED PROP
            />
            
            <CartModal 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
            />

            <LoginModal 
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
            />

            <IonRouterOutlet id="main-content">
              {/* Main Tab Routes */}
              <Route exact path="/home" component={Home} />
              <Route exact path="/beers" component={Beers} />
              <Route exact path="/about" component={About} />

              {/* Product Detail Route */}
              <Route exact path="/beer/:productId" component={ProductPage} />

              {/* Side Menu Routes */}
              <Route exact path="/history" component={History} />
              <Route exact path="/product-info" component={Home} />
              <Route exact path="/developers" component={Home} />
              <Route exact path="/contact" component={Home} />
              <Route exact path="/locations" component={Home} />
              <Route exact path="/settings" component={Home} />

              {/* Default Redirect */}
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
          </IonReactRouter>
        </CartProvider>
      </AuthProvider>

      {/* --- NEW: Conditionally render splash screen as an overlay --- */}
      {isLoginLoading && <SplashScreen />}
    </IonApp>
  );
};

export default App;