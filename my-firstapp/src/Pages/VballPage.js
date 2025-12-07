import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SportsPage.css";

function VballPage() {
  return (
    <div className="body">
      {/* background */}
      <div className="bg">
        <div className="bg-left"></div>
        <div className="bg-center-lines"></div>
        <div className="bg-right"></div>
      </div>

      {/* main content */}
      <div className="Content">
        <div className="backbutton">
          <button onClick={() => window.history.back()} className="back-btn">
            ←
          </button>
        </div>

        <div className="TITLE">VOLLEYBALL</div>

        {/* PVL */}
        <div className="Provider">PVL</div>
        <div className="games">
          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img
                variant="top"
                src={require("../images/vgame1.jpg")}
                alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>PLDT vs Kobe Shinwa</Card.Title>
                  <Card.Text>
                    <br />
                    @Araneta Coliseum
                    <br />
                    September 15, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img
                variant="top"
                src={require("../images/vgame2.jpg")}
                alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Chery Tiggo vs Creamline</Card.Title>
                  <Card.Text>
                    <br />
                    @MOA Arena
                    <br />
                    September 10, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img
                variant="top"
                src={require("../images/vgame3.jpg")}
                alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>ZUS Coffee vs Creamline</Card.Title>
                  <Card.Text>
                    ELIMINATION ROUND
                    <br />
                    @Rizal Stadium
                    <br />
                    September 5, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/AranetaPage" className="card-link">
              <Card.Img
                variant="top"
                src={require("../images/vgame4.jpg")}
                alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>Kobe Shinwa vs Chery Tiggo</Card.Title>
                  <Card.Text>
                    <br />
                    @Smart Araneta
                    <br />
                    September 18, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>
        </div>

        {/* NCAA */}
        <div className="Provider">NCAA</div>
        <div className="games">
          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img
                variant="top"
                src={require("../images/uaap1.jpg")}
                alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>La Salle vs UST</Card.Title>
                  <Card.Text>
                    <br />
                    @MOA Arena
                    <br />
                    September 18, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img 
              variant="top"src={require("../images/uaap1.png")}alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>UP vs NU</Card.Title>
                  <Card.Text> 
                    QUARTER-FINALS<br />@MOA Arena<br />September 12, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img
                variant="top"
                src={require("../images/uaap2.png")}
                alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>UP vs Adamson</Card.Title>
                  <Card.Text>
                    ELIMINATIONS
                    <br />
                    @MOA Arena
                    <br />
                    September 8, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>

          <Card className="game-card">
            <Link to="/MOAPage" className="card-link">
              <Card.Img
                variant="top"
                src={require("../images/uaap3.jpg")}
                alt="Volleyball Game"
              />
              <Card.Body className="game-card-body">
                <div className="Caption">
                  <Card.Title>UE vs FEU</Card.Title>
                  <Card.Text>
                    <br />
                    @MOA Arena
                    <br />
                    September 3, 2025
                  </Card.Text>
                </div>
              </Card.Body>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default VballPage;
