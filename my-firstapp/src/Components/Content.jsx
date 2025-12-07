import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Carousel, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bball from '../images/bball feature.jpg';
import swimming from '../images/swimming feature.jpg';
import vball from '../images/vball feature.jpeg';
import './content.css';

function ContentComponent() {
 

  return (
    <div className="body">
      {/* Background */}
      <div className="bg">
        <div className="bg-left"></div>
        <div className="bg-center-lines"></div>
        <div className="bg-right"></div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="feature">
          <Container className="carousel-container">
            <Carousel className="custom-carousel">
              <Carousel.Item>
                <img src={bball} alt="Basketball" className="d-block w-100" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={swimming} alt="Swimming" className="d-block w-100" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={vball} alt="Volleyball" className="d-block w-100" />
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>

        {/*Featured Games*/}
        <div className="SportContent">
          {/* Basketball */}
          <div className="SportSection">
            <div className="Title">
              BASKETBALL
              <button className="heart-btn" aria-label="Favorite">❤</button>
            </div>

            <div className="scroll-container">
             
              

              <div className="games" id="basketball">
                <div className="Card">
                  <Link to="/BasketballPage">
                    <Card.Img src={require('../images/ballgame1.jpg')} alt="Basketball Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/BasketballPage">
                    <Card.Img src={require('../images/ballgame2.jpg')} alt="Basketball Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/BasketballPage">
                    <Card.Img src={require('../images/ballgame3.jpg')} alt="Basketball Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/BasketballPage">
                    <Card.Img src={require('../images/ballgame4.jpg')} alt="Basketball Game" />
                  </Link>
                </div>
              </div>

             
            </div>
          </div>

          {/* Volleyball */}
          <div className="SportSection">
            <div className="Title">
              VOLLEYBALL
              <button className="heart-btn" aria-label="Favorite">❤</button>
            </div>

            <div className="scroll-container">
           

              <div className="games" id="volleyball">
                <div className="Card">
                  <Link to="/VolleyballPage">
                    <Card.Img src={require('../images/volleyballgame1.jpg')} alt="Volleyball Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/VolleyballPage">
                    <Card.Img src={require('../images/volleyballgame2.jpg')} alt="Volleyball Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/VolleyballPage">
                    <Card.Img src={require('../images/volleyballgame3.jpg')} alt="Volleyball Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/VolleyballPage">
                    <Card.Img src={require('../images/volleyballgame4.png')} alt="Volleyball Game" />
                  </Link>
                </div>
              </div>

             
            </div>
          </div>

          {/* Swimming */}
          <div className="SportSection">
            <div className="Title">
              SWIMMING
              <button className="heart-btn" aria-label="Favorite">❤</button>
            </div>

            <div className="scroll-container">
              

              <div className="games" id="swimming">
                <div className="Card">
                  <Link to="/SwimmingPage">
                    <Card.Img src={require('../images/slp swim compe.jpg')} alt="Swimming Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/SwimmingPage">
                    <Card.Img src={require('../images/slp swim compe 2.jpg')} alt="Swimming Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/SwimmingPage">
                    <Card.Img src={require('../images/slp aosi 2025 longcourse.jpg')} alt="Swimming Game" />
                  </Link>
                </div>
                <div className="Card">
                  <Link to="/SwimmingPage">
                    <Card.Img src={require('../images/psi cnl-car qualifying 2022.jpg')} alt="Swimming Game" />
                  </Link>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentComponent;
