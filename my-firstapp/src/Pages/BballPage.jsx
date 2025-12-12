// src/Pages/BballPage.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ballgame1 from '../images/ballgame1.jpg';
import './SportsPage.css';
import backgroundImage from '../images/background.jpg';

function BballPage() {
  return (
    <div className="body">
      {/* background */}
      <div className="bg">
              <img src={backgroundImage} alt="Background" className="bg-image" />
            </div>

      {/* main content */}
      <div className="Content">
        <div className="backbutton">
          <button onClick={() => window.history.back()} className="back-btn">←</button>
        </div>

        <div className="TITLE">BASKETBALL</div>

      
        <div className="Provider">PBA</div>
        <div className="games">
          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img variant="top" src={ballgame1} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>San Miguel vs TNT</Card.Title>
                  <Card.Text>GAME 6<br />@Araneta Coliseum<br />Sept 15, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img variant="top" src={require('../images/ballgame2.jpg')} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Ginebra vs Red Dragons</Card.Title>
                  <Card.Text>SEMI-FINALS<br />@MOA Arena<br />Sept 17, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img variant="top" src={require('../images/game3.jpg')} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Magnolia vs TNT</Card.Title>
                  <Card.Text><br />@Smart Araneta<br />Sept 19, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img variant="top" src={require('../images/game4.jpg')} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Magnolio vs Ginebra</Card.Title>
                  <Card.Text><br />@PhilSports Arena<br />Sept 22, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>
        </div>

        {/*MPBL */}
        <div className="Provider">MPBL</div>
        <div className="games">
          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img variant="top" src={ballgame1} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Batangas vs Pampanga</Card.Title>
                  <Card.Text>FINALS GAME 3<br />@MOA Arena<br />Sept 25, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img variant="top" src={ballgame1} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Bulacan vs Rizal</Card.Title>
                  <Card.Text>GAME 1<br />@MOA Arena<br />Sept 26, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img variant="top" src={ballgame1} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Makati vs Pasig</Card.Title>
                  <Card.Text>QUARTER-FINALS<br />@MOA Arena<br />Sept 27, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img variant="top" src={ballgame1} alt="Basketball Game" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Cavite vs Laguna</Card.Title>
                  <Card.Text>EXHIBITION<br />@MOA Arena<br />Sept 28, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BballPage;
