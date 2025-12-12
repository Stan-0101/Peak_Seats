import React, { useEffect, useState } from "react";
import "./checkout.css";
import checkoutFunction from "../JS Function/checkout.js";
import backgroundImage from '../images/background.jpg';

export default function Checkout() {
  const [payment, setPayment] = useState("");

  useEffect(() => {
    checkoutFunction();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="body">
      <div className="bg">
              <img src={backgroundImage} alt="Background" className="bg-image" />
            </div>

      <div className="content">
        <div className="checkout-container">
             <div className="backbutton">
            <button onClick={() => window.history.back()} className="back-btn">
              ←
            </button>
          </div>
          <h2>Checkout Summary</h2>
          <div className="cart-summary">
            <div className="cart-items"></div>
            <div className="total-box">
              <h3>
                Total: ₱<span className="cart-total">0</span>
              </h3>
            </div>
          </div>

          <hr />

          <h2>Choose Payment Method</h2>
          <form id="checkoutForm" onSubmit={handleSubmit}>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  required
                  checked={payment === "card"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Pay Online (Credit/Debit Card)
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="onsite"
                  checked={payment === "onsite"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Pay Onsite (at the game venue)
              </label>
            </div>

            {payment === "card" && (
              <div className="card-fields" id="cardFields">
                <input type="text" placeholder="Cardholder Name" required />
                <input type="text" placeholder="Card Number" maxLength="19" required />
                <input type="text" placeholder="MM/YY" maxLength="5" required />
                <input type="text" placeholder="CVV" maxLength="4" required />
              </div>
            )}

            {payment === "onsite" && (
              <div className="onsite-info" id="onsiteInfo">
                Please prepare your payment. You will pay at the venue before the game starts.
              </div>
            )}

            <button type="submit" className="pay-btn">Proceed</button>
          </form>
        </div>
      </div>
    </div>
  );
}
