import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/background.jpg';
import './SportsPage.css';

function SwimPage() {
  return (
    <div className="body">
      <div className="bg">
        <img src={backgroundImage} alt="Background" className="bg-image" />
      </div>

      <div className="Content">
        <div className="backbutton"> 
          <button onClick={() => window.history.back()} className="back-btn">←</button>
        </div>

        <div className="TITLE">SWIMMING</div>

        <div className="Provider">SLP</div>
        <div className="games">
          <Card className="game-card">
            <Link to="/SwimArena" className="card-link">
              <Card.Img variant="top" src={require('../images/panagoc2024.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Philippine Aquatics Open Championship</Card.Title>
                  <Card.Text>@Araneta Coliseum<br />Sept 15, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/SwimArena" className="card-link">
              <Card.Img variant="top" src={require('../images/slp final battle 2025.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>SLP Final Battle 2025</Card.Title>
                  <Card.Text>@MOA Arena<br />Sept 17, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/SwimArena" className="card-link">
              <Card.Img variant="top" src={require('../images/slp aosi 2024 longcourse.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>SLP AOSI LongCourse</Card.Title>
                  <Card.Text>@Smart Araneta<br />Sept 19, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/SwimArena" className="card-link">
              <Card.Img variant="top" src={require('../images/psi grand prix 2023.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Grand Prix Championship</Card.Title>
                  <Card.Text>ELIMINATION<br />@PhilSports Arena<br />Sept 22, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>
        </div>

        <div className="Provider">PAI</div>
        <div className="games">
          <Card className="game-card">
            <Link to="/PAIArena" className="card-link">
              <Card.Img variant="top" src={require('../images/psi grand prix 2023.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>DCIT vs CPE</Card.Title>
                  <Card.Text>GAME 2<br />@DLSU-D Gym<br />Sept 29, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/PAIArena" className="card-link">
              <Card.Img variant="top" src={require('../images/psi grand prix 2023.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>BSIT vs BSECE</Card.Title>
                  <Card.Text>GAME 3<br />@DLSU-D Gym<br />Sept 30, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/PAIArena" className="card-link">
              <Card.Img variant="top" src={require('../images/psi grand prix 2023.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>BSCS vs BSMATH</Card.Title>
                  <Card.Text>EXHIBITION<br />@DLSU-D Gym<br />Oct 1, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/PAIArena" className="card-link">
              <Card.Img variant="top" src={require('../images/psi grand prix 2023.jpg')} alt="Swimming Event" />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>COE vs CLA</Card.Title>
                  <Card.Text>ELIMINATION<br />@DLSU-D Gym<br />Oct 2, 2025</Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SwimPage;