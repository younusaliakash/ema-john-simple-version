import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import Order from './components/Order/Order';
import ProductDetail from './components/ProductDetail/ProductDetail';
import LogIn from './components/LogIn/LogIn';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({})
  return (
    <UserContext.Provider value={[userLoggedIn, setUserLoggedIn]}>
      <h1>{userLoggedIn.email}</h1>
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/Shop">
            <Shop></Shop>
          </Route>
          <Route path="/Order">
              <Order></Order>
          </Route>
          <PrivateRoute path="/Inventory">
              <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/shipment">
              <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productkey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
      
    </UserContext.Provider>
  );
}

export default App;
