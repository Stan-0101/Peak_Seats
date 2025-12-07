import React, { useState } from "react";
import MOAArena from "../images/MOA.png";
import "./Arena.css";
import { Link, useNavigate } from "react-router-dom";

function MOA() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const navigate = useNavigate();

  // pricing
  const PRICE_MAP = {
    PATRON_A: 2070,
    PATRON_B: 1150,
    LOWER_BOX: 865,
    UPPER_BOX: 290,
  };

  // Check kung anong section yung seat na select
  const getSeatSection = (seatNumber) => {
    const num = parseInt(seatNumber);
    if ([105, 106, 107, 116, 117, 118].includes(num)) return "PATRON_A";
    if ([101, 104, 108, 111, 112, 115, 119, 122].includes(num)) return "PATRON_B";
    if (num >= 203 && num <= 220) return "LOWER_BOX";
    if (num >= 400 && num <= 422) return "UPPER_BOX";
    return null;
  };

  // inaadd yung selected seat sa array ng selectedSeats
  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((num) => num !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  // ni check kung nandun na ba sa array yung seat
  const isSeatSelected = (seatNumber) => selectedSeats.includes(seatNumber);

  // nag calculate kung magkano total ng lahat ng selected seat
  const getPriceBreakdown = () => {
    const breakdown = {
      PATRON_A: { count: 0, price: PRICE_MAP.PATRON_A, total: 0 },
      PATRON_B: { count: 0, price: PRICE_MAP.PATRON_B, total: 0 },
      LOWER_BOX: { count: 0, price: PRICE_MAP.LOWER_BOX, total: 0 },
      UPPER_BOX: { count: 0, price: PRICE_MAP.UPPER_BOX, total: 0 },
    };

    selectedSeats.forEach((seat) => {
      const section = getSeatSection(seat);
      if (section) {
        breakdown[section].count++;
        breakdown[section].total = breakdown[section].count * breakdown[section].price;
      }
    });
    return breakdown;
  };

  // total ng lahat ng seats
  const totalPrice = Object.values(getPriceBreakdown()).reduce(
    (sum, s) => sum + s.total,
    0
  );

  

  // proceed to payment
  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    navigate("/PaymentPage", {
      state: { arena: "MOA Arena", selectedSeats, totalPrice },
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

        <div className="ArenaName">MOA Arena</div>
        <div className="Arena">
          <img src={MOAArena} alt="MOA Arena" className="arena-img" />
        </div>

        {/* kapag may na select kahit isang seat lalabas sya */}
        
        {selectedSeats.length > 0 && (
          <div className="selected-seats-center">
            <div className="center-summary">
              <h3>Selected Seats</h3>
              <div className="seats-display">
                {selectedSeats.map((seat) => (
                  <span key={seat} className="seat-badge">
                    {seat}
                  </span>
                ))}
              </div>
              {/* cary ng values sa paymentpage*/}
              <div className="summary-total">
                <p>
                  {selectedSeats.length} seat(s) - Total: PHP{" "}
                  {totalPrice.toLocaleString()}
                </p>
                <button className="checkout-modal-btn" onClick={handleProceed}>
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="Seats">
          {/* PATRON A */}
          <div className="section">
            <h3>PATRON A - PHP 2,070</h3>
            <div className="row">
              {["105", "106", "107", "116", "117", "118" ].map((seat) => (
                <button
                  key={seat}
                  className={`seat ${isSeatSelected(seat) ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>

          {/* PATRON B */}
          <div className="section">
            <h3>PATRON B - PHP 1,150</h3>
            <div className="row">
              {["101", "104", "108", "111", "112", "115", "119", "122"].map(
                (seat) => (
                  <button
                    key={seat}
                    className={`seat ${isSeatSelected(seat) ? "selected" : ""}`}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* LOWER BOX */}
          <div className="section">
            <h3>LOWER BOX - PHP 865</h3>
            <div className="row">
              {["203", "204", "205", "206"].map((seat) => (
                <button
                  key={seat}
                  className={`seat ${isSeatSelected(seat) ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>

          {/* UPPER BOX */}
          <div className="section">
            <h3>UPPER BOX - PHP 290</h3>
            <div className="row">
              {["400", "401", "402", "403", "410", "411", "412"].map((seat) => (
                <button
                  key={seat}
                  className={`seat ${isSeatSelected(seat) ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MOA;
