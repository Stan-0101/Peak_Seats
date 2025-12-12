import React, { useEffect } from "react";
import "./addtocart.css";
import useAddToCart from "../JS Function/addtocart.js";
import backgroundImage from '../images/background.jpg';


function AddtoCart() {
 useAddToCart();

  return (
    <div className="body">
      <div className="bg">
              <img src={backgroundImage} alt="Background" className="bg-image" />
            </div>

      <div className="content">
        <section className="cart-section">

            <div className="backbutton">
            <button onClick={() => window.history.back()} className="back-btn">
              ←
            </button>
          </div>
          <h1 className="page-title">Your Cart</h1>

          <div className="add-item">
            <select id="meal-select">
              <option value="">Select a meal</option>
              <option value="Greenwich" data-price="99">
                Greenwich - ₱99
              </option>
              <option value="Potato Corner" data-price="220">
                Potato Corner - ₱220
              </option>
              <option value="Taters" data-price="250">
                Taters - ₱250
              </option>
              <option value="Jollibee" data-price="180">
                Jollibee - ₱180
              </option>
              <option value="Mang Inasal" data-price="200">
                Mang Inasal - ₱200
              </option>
              <option value="Chowking" data-price="250">
                Chowking - ₱250
              </option>
            </select>
            <input type="number" id="meal-qty" min="1" defaultValue="1" />
            <button id="add-item-btn">Add to Cart</button>
          </div>

          <div className="cart-items"></div>

          <div className="cart-summary" style={{ display: "none" }}>
            <h2>
              Total: ₱<span className="cart-total">0</span>
            </h2>
            <a href="/CheckoutPage" className="checkout-btn">
              Proceed to Checkout
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AddtoCart;
