import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import profile from '../images/profile.png';
import './Navbar.css';
import useNavBarToggle from './NavToggle';
import UserProfileSidebar from './UserProfileSideBar';

function NavBarComponent() {
  const { isCollapsed, handleNavClick, handleToggleClick } = useNavBarToggle();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = (e) => {
    e.preventDefault();
    const loggedUser = localStorage.getItem('loggedUser');
    
    if (loggedUser) {
      setIsProfileOpen(true);
    } else {
      navigate('/LoginPage');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">

          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" className="logo-img" />
            <span>PEAK SEATS</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={handleToggleClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
            <div className="navbar-nav mx-auto">
              <Link to="/BasketballPage" className="nav-link" onClick={handleNavClick}>BASKETBALL</Link>
              <Link to="/SwimmingPage" className="nav-link" onClick={handleNavClick}>SWIMMING</Link>
              <Link to="/VolleyballPage" className="nav-link" onClick={handleNavClick}>VOLLEYBALL</Link>
            </div>

            <div className="nav-icons">
              <Link to="/Favorites" className="favorite-icon" onClick={handleNavClick}>❤</Link>
              <button 
                className="avatar-link" 
                onClick={handleProfileClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <img src={profile} alt="Profile" className="profile-img" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <UserProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}

export default NavBarComponent;
