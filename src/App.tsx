// src/App.tsx

import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Import Pages
import Home from './pages/Home';
import Beers from './pages/Beers/Beers';
import About from './pages/About/About';

// Import Global UI Components
import BottomNav from './components/BottomNav/BottomNav';
import TopHeader from './components/TopHeader/TopHeader';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <TopHeader /> {/* Add the new top header here */}
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/beers" component={Beers} />
        <Route exact path="/about" component={About} />
        <Redirect exact from="/" to="/home" />
      </IonRouterOutlet>
      <BottomNav />
    </IonReactRouter>
  </IonApp>
);

export default App;