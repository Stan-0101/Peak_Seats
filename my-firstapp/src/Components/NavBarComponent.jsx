import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import profile from '../images/profile.png';
import './Navbar.css';
import useNavBarToggle from './NavToggle';
import UserProfileSidebar from './UserProfileSideBar';

function NavBarComponent() {
  const { isCollapsed, handleNavClick, handleToggleClick } = useNavBarToggle();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserStatus = () => {
      const loggedUser = localStorage.getItem('loggedUser');
      const userDataString = localStorage.getItem('userData');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      
      // Set admin status
      if (loggedUser && loggedUser.trim() === 'Admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      
      // Set user name
      if (userData?.full_name) {
        setUserName(userData.full_name);
      } else if (loggedUser) {
        setUserName(loggedUser);
      } else {
        setUserName('');
      }
    };

    checkUserStatus();
    
    // Check user status when storage changes
    window.addEventListener('storage', checkUserStatus);
    
    // Check on location change (when navigating)
    const interval = setInterval(checkUserStatus, 1000);
    
    return () => {
      window.removeEventListener('storage', checkUserStatus);
      clearInterval(interval);
    };
  }, [location]);

  const handleProfileClick = (e) => {
    e.preventDefault();
    const loggedUser = localStorage.getItem('loggedUser');
    
    if (loggedUser) {
      setIsProfileOpen(true);
    } else {
      navigate('/LoginPage');
    }
  };

  const handleReservationsClick = (e) => {
    e.preventDefault();
    const loggedUser = localStorage.getItem('loggedUser');
    
    if (loggedUser) {
      navigate('/Reservations');
    } else {
      navigate('/LoginPage');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('userData');
    setIsAdmin(false);
    setUserName('');
    setIsProfileOpen(false);
    window.location.href = '/';
  };

  // Add user name to profile tooltip
  const getProfileTitle = () => {
    if (!userName) return 'Login';
    return `${userName} (Click to view profile)`;
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
              
              {isAdmin && (
                <Link to="/Admin Dashboard" className="nav-link admin-tab" onClick={handleNavClick}>
                  ADMIN DASHBOARD
                </Link>
              )}
            </div>

            <div className="nav-icons">
              <Link to="/Favorites" className="favorite-icon" onClick={handleNavClick}>❤</Link>
              
             
              <button 
                className="reservations-icon" 
                onClick={handleReservationsClick}
                title={userName ? "View My Reservations" : "Login to View Reservations"}
                style={{ 
                  background: userName ? 'rgba(76, 209, 55, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: '0 10px', 
                  fontSize: '24px',
                  position: 'relative'
                }}
              >
                📋
                {userName && (
                  <span className="user-indicator"></span>
                )}
              </button>
              
              {/* Profile*/}
              <button 
                className="avatar-link" 
                onClick={handleProfileClick}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: 0,
                  position: 'relative'
                }}
                title={getProfileTitle()}
              >
                <img src={profile} alt="Profile" className="profile-img" />
                {userName && (
                  <div className="user-status-indicator"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <UserProfileSidebar 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        userName={userName}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />
    </>
  );
}

export default NavBarComponent;