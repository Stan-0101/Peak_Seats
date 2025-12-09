import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./checkout.css";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Add state for card details
  const [cardDetails, setCardDetails] = useState({
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const {
    arena = "Unknown Arena",
    selectedSeats = [],
    totalPrice = 0,
    quantity = null,
  } = location.state || {};

  const saveReservation = async () => {
    try {
      
      const loggedUser = localStorage.getItem('loggedUser');
      const user_id = loggedUser || 'defaultuser';
      
      if (!loggedUser) {
        console.warn("⚠️ No user logged in. Using default user for testing.");
      }
      
     
      const reservationData = {
        user_id: user_id,
        arena_name: arena,
        seat_numbers: selectedSeats.length > 0 ? selectedSeats.join(", ") : `${quantity} ticket(s)`,
        total_amount: totalPrice,
        payment_method: payment === "card" ? "online_card" : "onsite"
      };

      
      if (payment === "card") {
        reservationData.card_holder_name = cardDetails.cardholderName;
        reservationData.card_number_last4 = cardDetails.cardNumber.replace(/\s/g, '').slice(-4);
        reservationData.card_expiry = cardDetails.expiry;
        reservationData.card_cvv = parseInt(cardDetails.cvv) || 0;
      }

      console.log("Sending reservation data:", reservationData);

      const response = await fetch('http://localhost/Peak_Seats/backend-peakseats/api/insertSeatReserv.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      const responseText = await response.text();
      console.log("Raw response from PHP:", responseText);

      try {
        const result = JSON.parse(responseText);
        console.log("Parsed JSON result:", result);
        return result;
      } catch (parseError) {
        console.error("Failed to parse JSON. PHP returned:", responseText);
        return { 
          success: false, 
          message: "Server returned invalid JSON. Check PHP for errors." 
        };
      }
      
    } catch (error) {
      console.error('Network error:', error);
      return { 
        success: false, 
        message: "Network error: " + error.message 
      };
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Starting payment process...");

    // Check if user is logged in
    const loggedUser = localStorage.getItem('loggedUser');
    if (!loggedUser) {
      const useDefault = window.confirm(
        " You are not logged in.\n\nFor testing purposes, use a default account?\n\nClick OK to continue with 'defaultuser' or Cancel to login first."
      );
      
      if (!useDefault) {
        setIsSubmitting(false);
        navigate("/LoginPage");
        return;
      }
    }

    // Validation for card payment
    if (payment === "card") {
      const { cardholderName, cardNumber, expiry, cvv } = cardDetails;
      
      if (!cardholderName.trim() || !cardNumber.trim() || !expiry.trim() || !cvv.trim()) {
        alert("Please fill in all card details");
        setIsSubmitting(false);
        return;
      }

      // Simple validation
      if (cardNumber.replace(/\s/g, '').length < 16) {
        alert("Please enter a valid 16-digit card number");
        setIsSubmitting(false);
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert("Please enter expiry date in MM/YY format (e.g., 12/25)");
        setIsSubmitting(false);
        return;
      }

      if (!/^\d{3,4}$/.test(cvv)) {
        alert("Please enter a valid 3 or 4 digit CVV");
        setIsSubmitting(false);
        return;
      }
    }

    console.log("Saving reservation to database...");
    const result = await saveReservation();
    
    if (result.success) {
      const totalSeats = selectedSeats.length > 0  
        ? `${selectedSeats.join(", ")}`
        : quantity
        ? `${quantity} ticket(s)`
        : "None";

      console.log("Reservation successful! ID:", result.reservation_id);

      alert(
        `Payment Successful!\n\nArena: ${arena}\nSeats/Tickets: ${totalSeats}\nTotal: ₱${totalPrice.toLocaleString()}\nMethod: ${
          payment === "card" ? "Credit/Debit Card" : "Pay Onsite"
        }\nReservation ID: ${result.reservation_id}\nReserved by: ${localStorage.getItem('loggedUser') || 'defaultuser'}`
      );

      // Clear
      if (payment === "card") {
        setCardDetails({
          cardholderName: "",
          cardNumber: "",
          expiry: "",
          cvv: ""
        });
      }

      navigate("/"); 
    } else {
      console.error("Reservation failed:", result.message);
      alert("Error: " + result.message);
      setIsSubmitting(false);
    }
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
            <button 
              onClick={() => window.history.back()} 
              className="back-btn"
              disabled={isSubmitting}
            >
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
            
            
            <div className="user-info">
              <p><strong>Reserved by:</strong> {localStorage.getItem('loggedUser') || 'Not logged in'}</p>
            </div>
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                />
                Pay Onsite (at the venue)
              </label>
            </div>

            {payment === "card" && (
              <div className="card-fields">
                <input 
                  type="text" 
                  name="cardholderName"
                  placeholder="Cardholder Name" 
                  value={cardDetails.cardholderName}
                  onChange={handleCardChange}
                  required 
                  disabled={isSubmitting}
                />
                <input 
                  type="text" 
                  name="cardNumber"
                  placeholder="Card Number" 
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  maxLength="19" 
                  required 
                  disabled={isSubmitting}
                />
                <input 
                  type="text" 
                  name="expiry"
                  placeholder="MM/YY" 
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  maxLength="5" 
                  required 
                  disabled={isSubmitting}
                />
                <input 
                  type="text" 
                  name="cvv"
                  placeholder="CVV" 
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  maxLength="4" 
                  required 
                  disabled={isSubmitting}
                />
              </div>
            )}

            {payment === "onsite" && (
              <div className="onsite-info">
                Please prepare your payment. You will pay at the venue before the event starts.
                <br /><br />
                <strong>Note:</strong> Your seat reservation will be held for 24 hours.
              </div>
            )}

            <button 
              type="submit" 
              className="pay-btn" 
              disabled={isSubmitting || !payment}
            >
              {isSubmitting ? "Processing..." : "Confirm Payment"}
            </button>

            {isSubmitting && (
              <p className="processing-note">
                Please wait while we save your reservation...
                <br />
                <small>Check browser console (F12) for details</small>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}