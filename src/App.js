import React, {useEffect, useState} from "react";
import LeftScreen from "./components/leftScreen/leftScreen";
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Pizzas from "./components/pizzaScreen/pizzaScreen";
import Salads from "./components/saladsPage/saladPage";
import './components/cssRightScreens/screenRight.css'
import Drinks from "./components/drinksScreen/drinkScreen";
import Cart from "./components/cart/cart";
import HomePage from "./components/Home/Home";
import './adaptive.css'
import DisappearingPage from "./components/FadingPage/fade";

const tele = window.Telegram.WebApp;

function App() {

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  useEffect(()=>{
    tele.ready()
  })

  return (
    <BrowserRouter forceRefresh={true}>
      <div className="wrap">
        <LeftScreen/>
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>
          <Route path="/pizzas">
            <Pizzas
              cart={cart}
              setCart={setCart}
            />
          </Route>
          <Route path="/salads">
            <Salads
              cart={cart}
              setCart={setCart}
            />
          </Route>
          <Route path="/drinks">
            <Drinks
              cart={cart}
              setCart={setCart}
            />
          </Route>
          <Route path="/cart">
            <Cart cart={cart} setCart={setCart} />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
