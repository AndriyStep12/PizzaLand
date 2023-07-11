import './leftScreen.css'
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png'

function LeftScreen() {

  return (
    <div className="leftScreen">
      <div className="up">
        <img src={logo} alt="" />
        <p className="h3">Pizza Land</p>
      </div>
      <div className="center">
        <Link to="/">
          <div className="block_leftScreen">Home</div>
        </Link>
        <Link to="/pizzas">
          <div className="block_leftScreen">Pizzas</div>
        </Link>
        <Link to="/salads">
          <div className="block_leftScreen">Salads</div>
        </Link>
        <Link to="/drinks">
          <div className="block_leftScreen">Drinks</div>
        </Link>
      </div>
      <div className="bottom">
        <Link to="/cart">
          <div className="block_leftScreen">Your Cart</div>
        </Link>
      </div>
    </div>
  );
}

export default LeftScreen;
