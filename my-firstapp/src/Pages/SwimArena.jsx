import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Arena.css";
import SwimArena from "../images/SwimArena.jpg";

function AquaDome() {
  const [quantity, setQuantity] = useState(1);
  
  const navigate = useNavigate();

  const TICKET_PRICE = 250;
  const totalPrice = quantity * TICKET_PRICE;


  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const handleProceed = () => {
    if (quantity <= 0) {
      alert("Please select at least one ticket.");
      return;
    }
    navigate("/PaymentPage", {
      state: {
        arena: "Aqua Dome",
        selectedSeats: [`${quantity} Ticket(s)`],
        totalPrice,
      },
    });
  };

  return (
    <div className="body">
      <div className="bg">
        <div className="bg-left"></div>
        <div className="bg-center-lines"></div>
        <div className="bg-right"></div>
      </div>

      <div className="Content">
        <div className="backbutton">
          <button onClick={() => window.history.back()} className="back-btn">
            ←
          </button>
        </div>

        <Link to="/MealsPage">
          <div className="Meals">
            <button className="foods-btn">🍕</button>
          </div>
        </Link>

        <div className="ArenaName">Aqua Dome</div>
        <div className="Arena">
          <img src={SwimArena} alt="Swimming Arena" className="arena-img" />
        </div>

        <div className="section">
          <h3>National Swim Finals</h3>
          <p>Date: October 25, 2025</p>
          <p>₱350 per ticket</p>
          <div className="quantity-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </div>

          <div className="summary-total">
            <p>
              {quantity} Ticket(s) - Total: ₱{totalPrice.toLocaleString()}
            </p>
            <button className="checkout-modal-btn" onClick={handleProceed}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AquaDome;
