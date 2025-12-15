import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';
import backgroundImage from '../images/background.jpg';

function AdminDashboard() {
  return (
    <div className="body">
      <div className="bg">
        <img src={backgroundImage} alt="Background" className="bg-image" />
      </div>
      
      {/* Back Button */}
      <div className="backbutton">
        <button onClick={() => window.history.back()} className="back-btn">
          ←
        </button>
      </div>

      <div className="Content">
        <div className="admin-dashboard">
          <Container className="admin-content">
            
            {/* Welcome Header */}
            <Row className="mb-5">
              <Col>
                <div className="welcome-header">
                  <h1 className="welcome-title">
                    Admin Dashboard
                  </h1>
                  <p className="welcome-subtitle">
                    Manage your system efficiently
                  </p>
                </div>
              </Col>
            </Row>

            {/* Management Cards */}
            <Row className="justify-content-center">
              <Col lg={6} className="mb-4">
                <Link to="/All Users" className="card-link">
                  <Card className="nav-card user-management-card">
                    <Card.Body className="d-flex align-items-center">
                      <div className="nav-icon">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="nav-content">
                        <Card.Title>User Management</Card.Title>
                        <Card.Text>
                          View and manage all user accounts
                        </Card.Text>
                        <div className="arrow-icon">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
              
              <Col lg={6} className="mb-4">
                <Link to="/All Reservations" className="card-link">
                  <Card className="nav-card booking-management-card">
                    <Card.Body className="d-flex align-items-center">
                      <div className="nav-icon">
                        <i className="fas fa-ticket-alt"></i>
                      </div>
                      <div className="nav-content">
                        <Card.Title>Booking Management</Card.Title>
                        <Card.Text>
                          View and manage all reservations
                        </Card.Text>
                        <div className="arrow-icon">
                          <i className="fas fa-arrow-right"></i>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            </Row>

          </Container>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;