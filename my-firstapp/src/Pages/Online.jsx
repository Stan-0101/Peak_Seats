import React from "react";
import "./onlinepayment.css";


function Online(){
    return(
        <div className="payment-success">
    <div class="icon">✅</div>
    <h2>Payment Successful!</h2>
    <p>Thank you for purchasing with Peak Seats.<br/>We look forward to seeing you at the venue!</p>
    <a href="index.html" class="back-btn">Return to Home</a>
  </div>
    );
}
export default Online;