import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import loginFunction from '../JS Function/loginFunc.js';

function LoginPage() {
  React.useEffect(() => {
    loginFunction(); 
  }, []);

  return (
    <div className="body">
      <div className="bg">
        <div className="bg-left"></div>
        <div className="bg-center-lines"></div>
        <div className="bg-right"></div>
      </div>

      <div className="content">
        <section className="login-section">
          <div className="login-container">
            <h2>Login to Peak Seats</h2>
            <form id="loginForm">
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username" required />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required />
              </div>

              <button type="submit" className="login-btn">Login</button>
              <p className="signup-text">
                Don’t have an account? <Link to="/RegisterPage">Sign up</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
