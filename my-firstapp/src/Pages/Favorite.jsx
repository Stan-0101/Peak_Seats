import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import initFavorites from "../JS Function/Favorites.js";
import "../Pages/favorites.css";
import backgroundImage from '../images/background.jpg';

function FavoritePage() {
  const navigate = useNavigate();

  useEffect(() => {
    initFavorites();
  }, []);

  const handleItemClick = (e, id) => {
    // Navigate based on item id
    const map = {
      basketball: '/BasketballPage',
      volleyball: '/VolleyballPage',
      swimming: '/SwimmingPage'
    };
    const path = map[id] || '/';
    navigate(path);
  };

  return (
    <div className="body">
      <div className="bg">
              <img src={backgroundImage} alt="Background" className="bg-image" />
            </div>

      <div className="content">
        <div className="BOX">
        <div className="favorites-box">
          <div className="header">
            <h2>Favorites</h2>
            <span className="search-icon">🔍</span>
          </div>

          <div className="item" id="basketball">
            <div className="item-info" onClick={(e) => handleItemClick(e, 'basketball')}>
              <img src={require('../images/basketball.jpg')} alt="Basketball" />
              <div className="item-text">
                <h4>Basketball Highlights</h4>
                <p>Experience the most thrilling moments on the court</p>
              </div>
            </div>
            <div className="heart"></div>
          </div>

          <div className="item" id="volleyball">
            <div className="item-info" onClick={(e) => handleItemClick(e, 'volleyball')}>
              <img src={require('../images/volleyball.jpg')} alt="Volleyball" />
              <div className="item-text">
                <h4>Volleyball Power Plays</h4>
                <p>Top rallies, spikes, and team moments that defined the season.</p>
              </div>
            </div>
            <div className="heart"></div>
          </div>

          <div className="item" id="swimming">
            <div className="item-info" onClick={(e) => handleItemClick(e, 'swimming')}>
              <img src={require('../images/swimming.jpg')} alt="Swimming" />
              <div className="item-text">
                <h4>Championship Swim Finals</h4>
                <p>Relive the fastest races and record-breaking finishes in the pool.</p>
              </div>
            </div>
            <div className="heart"></div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritePage;
