// src/App.tsx

import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  HTMLIonMenuElement // Import the type for our menu element
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect, useRef } from 'react'; // Import useRef

// Import Pages
import Home from './pages/Home/Home';
import Beers from './pages/Beers/Beers';
import About from './pages/About/About';
import History from './pages/History/History';

// Import Global UI Components
import TopHeader from './components/TopHeader/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import SplashScreen from './components/SplashScreen/SplashScreen';

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
  
  // This is our direct link to the menu element
  const menuRef = useRef<HTMLIonMenuElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  // This function now DIRECTLY toggles the menu element
  const toggleMenu = () => {
    menuRef.current?.toggle(); 
  };

  // This function DIRECTLY closes the menu element
  const closeMenu = () => {
    menuRef.current?.close();
  };

  return (
    <IonApp>
      <IonReactRouter>
        {/* Pass the ref and functions to the components */}
        <SideMenu 
          menuRef={menuRef} 
          onClose={closeMenu} 
        />
        <TopHeader 
          onMenuToggle={toggleMenu} 
        />
        
        <IonRouterOutlet id="main-content">
          {/* Main Tab Routes */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/beers" component={Beers} />
          <Route exact path="/about" component={About} />
          
          {/* Side Menu Routes */}
          <Route exact path="/history" component={History} />
          <Route exact path="/login" component={Home} />
          <Route exact path="/product-info" component={Home} />
          <Route exact path="/developers" component={Home} />
          <Route exact path="/contact" component={Home} />
          <Route exact path="/locations" component={Home} />
          <Route exact path="/settings" component={Home} />

          {/* Default Redirect */}
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;