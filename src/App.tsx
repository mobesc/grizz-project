// src/App.tsx

import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react'; // Import React hooks

// Import Pages
import Home from './pages/Home/Home';
import Beers from './pages/Beers/Beers';
import About from './pages/About/About';

// Import Global UI Components
import BottomNav from './components/BottomNav/BottomNav';
import TopHeader from './components/TopHeader/TopHeader';
import SideMenu from './components/SideMenu/SideMenu';
import SplashScreen from './components/SplashScreen/SplashScreen'; // Import the new Splash Screen

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
  // State to manage loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for 3 seconds then hide the splash screen
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000ms = 3 seconds
  }, []);

  // Show SplashScreen if still loading
  if (isLoading) {
    return <SplashScreen />;
  }

  // Show the main app once loading is false
  return (
    <IonApp>
      <IonReactRouter>
        <SideMenu />
        <TopHeader />
        <IonRouterOutlet id="main-content">
          {/* Main Tab Routes */}
          <Route exact path="/home" component={Home} />
          <Route exact path="/beers" component={Beers} />
          <Route exact path="/about" component={About} />
          
          {/* Placeholder Side Menu Routes */}
          <Route exact path="/account" component={Home} />
          <Route exact path="/history" component={Home} />
          <Route exact path="/product-info" component={Home} />
          <Route exact path="/developers" component={Home} />
          <Route exact path="/contact" component={Home} />
          <Route exact path="/locations" component={Home} />
          <Route exact path="/settings" component={Home} />

          {/* Default Redirect */}
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>
        <BottomNav />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;