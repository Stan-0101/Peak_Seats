import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./checkout.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");


  const {
    arena = "Unknown Arena",
    selectedSeats = [],
    totalPrice = 0,
    quantity = null,
  } = location.state || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalSeats =
      selectedSeats.length > 0  
        ? `${selectedSeats.join(", ")}`
        : quantity
        ? `${quantity} ticket(s)`
        : "None";

    alert(
      `Payment Successful!\n\nArena: ${arena}\nSeats/Tickets: ${totalSeats}\nTotal: ₱${totalPrice.toLocaleString()}\nMethod: ${
        payment === "card" ? "Credit/Debit Card" : "Pay Onsite"
      }`
    );

    navigate("/"); 
  };

  return (
    <div className="body">
      <div className="bg">
        <div className="bg-left"></div>
        <div className="bg-center-lines"></div>
        <div className="bg-right"></div>
      </div>

      <div className="content">
        <div className="checkout-container">
          <div className="backbutton">
            <button onClick={() => window.history.back()} className="back-btn">
              ←
            </button>
          </div>

          <h2>Payment Summary</h2>
          <div className="cart-summary">
            <p><strong>Arena:</strong> {arena}</p>
            <p>
              <strong>Selected Seats / Tickets:</strong>{" "}
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : quantity
                ? `${quantity} ticket(s)`
                : "None"}
            </p>
            <h3>Total: ₱{totalPrice.toLocaleString()}</h3>
          </div>

          <hr />

          <h2>Choose Payment Method</h2>
          <form onSubmit={handleSubmit}>
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
                Pay Onsite (at the venue)
              </label>
            </div>

            {payment === "card" && (
              <div className="card-fields">
                <input type="text" placeholder="Cardholder Name" required />
                <input type="text" placeholder="Card Number" maxLength="19" required />
                <input type="text" placeholder="MM/YY" maxLength="5" required />
                <input type="text" placeholder="CVV" maxLength="4" required />
              </div>
            )}

            {payment === "onsite" && (
              <div className="onsite-info">
                Please prepare your payment. You will pay at the venue before the event starts.
              </div>
            )}

            <button type="submit" className="pay-btn">Confirm Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
