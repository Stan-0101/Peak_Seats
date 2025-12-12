import React, { useEffect } from "react";
import "./meals.css";
import Meals from "../JS Function/meals"; // correct import
import backgroundImage from '../images/background.jpg';


function Meal() {
  useEffect(() => {
    Meals(); // run the Add to Cart setup function
  }, []);

  return (
    <div className="body">
      <div className="bg">
              <img src={backgroundImage} alt="Background" className="bg-image" />
            </div>

      <div className="Content">
        <section className="ordering-section">
          <div className="backbutton">
            <button onClick={() => window.history.back()} className="back-btn">
              ←
            </button>
          </div>

          <h1 className="page-title">Delivered Meals</h1>

          <div className="menu-grid">
            <div className="food-card">
              <img src={require('../images/greenwich.jpg')} alt="Greenwich" />
              <h3>Greenwich</h3>
              <p>₱99 per order</p>
              <button>Add to Cart</button>
            </div>

            <div className="food-card">
              <img src={require('../images/potato-corner.jpg')} alt="Potato Corner" />
              <h3>Potato Corner</h3>
              <p>₱220 per order</p>
              <button>Add to Cart</button>
            </div>

            <div className="food-card">
              <img src={require('../images/taters.jpg')} alt="Taters" />
              <h3>Taters</h3>
              <p>₱250 per pack</p>
              <button>Add to Cart</button>
            </div>

            <div className="food-card">
              <img src={require('../images/jollibee.jpg')}alt="Jollibee" />
              <h3>Jollibee</h3>
              <p>₱180 per meal</p>
              <button>Add to Cart</button>
            </div>

            <div className="food-card">
              <img src={require('../images/mang-inasal.jpg')} alt="Mang Inasal" />
              <h3>Mang Inasal</h3>
              <p>₱200 per meal</p>
              <button>Add to Cart</button>
            </div>

            <div className="food-card">
              <img src={require('../images/chowking.jpg')} alt="Chowking" />
              <h3>Chowking</h3>
              <p>₱250 per order</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Meal;
