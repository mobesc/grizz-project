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
import Account from './pages/Account/Account';
import ProductInfo from './pages/ProductInfo/ProductInfo'; 
import Developers from './pages/Developers/Developers'; 
import Contact from './pages/Contact/Contact'; 
import Checkout from './pages/Checkout/Checkout'; // <-- NEW IMPORT

// Import Global UI Components
import TopHeader from './components/TopHeader/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import SplashScreen from './components/SplashScreen/SplashScreen';
import CartModal from './components/CartModal/CartModal';
import LoginModal from './components/LoginModal/LoginModal'; 

// Import Providers
import { CartProvider } from './context/CartContext'; 
import { AuthProvider } from './context/AuthContext';

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
  
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  const toggleMenu = () => {
    menuRef.current?.toggle();
  };

  const closeMenu = () => {
    menuRef.current?.close();
  };

  const handleLoginClick = () => {
    setIsLoginLoading(true); 

    setTimeout(() => {
      setIsLoginLoading(false);
      setIsLoginModalOpen(true);
    }, 1500);
  };

  return (
    <IonApp>
      <AuthProvider>
        <CartProvider>
          <IonReactRouter>
            <SideMenu
              menuRef={menuRef}
              onClose={closeMenu}
              onLoginClick={handleLoginClick} 
            />
            <TopHeader
              onMenuToggle={toggleMenu}
              onCartClick={() => setIsCartOpen(true)}
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

              {/* --- UPDATED Side Menu Routes --- */}
              <Route exact path="/history" component={History} />
              <Route exact path="/product-info" component={ProductInfo} />
              <Route exact path="/developers" component={Developers} />
              <Route exact path="/contact" component={Contact} />

              {/* Account Route */}
              <Route exact path="/account" component={Account} />

              {/* --- NEW CHECKOUT ROUTE --- */}
              <Route exact path="/checkout" component={Checkout} />

              {/* Default Redirect */}
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
            
          </IonReactRouter>
        </CartProvider>
      </AuthProvider>

      {isLoginLoading && <SplashScreen />}
    </IonApp>
  );
};

export default App;