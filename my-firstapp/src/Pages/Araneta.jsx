import React, { useState } from "react";
import AranetaArena from "../images/Araneta.jpg";
import "./Arena.css";
import { Link, useNavigate } from "react-router-dom";

function Araneta() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  // pricing
  const PRICE_MAP = {
    PATRON_A: 2070,
    PATRON_B: 1150,
    LOWER_BOX: 865,
    UPPER_BOX: 290,
    GEN_AD: 115,
  };

  // check kung anong section yung seat na select
  const getSeatSection = (seatNumber) => {
    const num = parseInt(seatNumber);
    if ([104, 105, 106, 107, 108, 109].includes(num)) return "PATRON_A";
    if ([110, 111, 112, 113, 114, 115, 116].includes(num)) return "PATRON_B";
    if (num >= 200 && num <= 211) return "LOWER_BOX";
    if (num >= 400 && num <= 410) return "UPPER_BOX";
    if ([501, 502, 503, 504].includes(num)) return "GEN_AD";
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

  // calculate lahat ng seats
  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const section = getSeatSection(seat);
      return total + (PRICE_MAP[section] || 0);
    }, 0);
  };

  // total price
  const totalPrice = getTotalPrice();

  

  // proceed to payment
  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    navigate("/PaymentPage", {
      state: { arena: "Smart Araneta Coliseum", selectedSeats, totalPrice },
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

        <div className="ArenaName">Smart Araneta Coliseum</div>
        <div className="Arena">
          <img src={AranetaArena} alt="Araneta Coliseum" className="arena-img" />
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
          {/* Patron A */}
          <div className="section">
            <h3>PATRON A - PHP 2,070</h3>
            <div className="row">
              {["104", "105", "106", "107", "108", "109"].map((seat) => (
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

          {/* Patron B */}
          <div className="section">
            <h3>PATRON B - PHP 1,150</h3>
            <div className="row">
              {["110", "111", "112", "113", "114", "115", "116"].map((seat) => (
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

          {/* Lower Box */}
          <div className="section">
            <h3>LOWER BOX - PHP 865</h3>
            <div className="row">
              {["200", "201", "202", "203", "204", "205", "206", "207"].map(
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

          {/* Upper Box */}
          <div className="section">
            <h3>UPPER BOX - PHP 290</h3>
            <div className="row">
              {["400", "401", "402", "403", "404", "405", "406", "407"].map(
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

          {/* Gen Ad */}
          <div className="section">
            <h3>GEN. ADMISSION - PHP 115</h3>
            <div className="row">
              {["501", "502", "503", "504"].map((seat) => (
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

export default Araneta;
