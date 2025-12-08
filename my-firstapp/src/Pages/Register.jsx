import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosconfig'; 
import './register.css';

function Register() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullname = e.target.fullname.value.trim();
    const email = e.target.email.value.trim();
    const username = e.target.username.value.trim();
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const res = await api.post('/register.php', {  
        fullname,
        email,
        username,
        password,
      });

      setMessage(res.data.message || 'Unexpected response');
    } catch (err) {
      setMessage('Error connecting to backend.');
    }
  };

  return (
    <div className="body">
      <div className="bg">
        <div className="bg-left"></div>
        <div className="bg-center-lines"></div>
        <div className="bg-right"></div>
      </div>

      <div className="content">
        <section className="register-section">
          <div className="register-container">
            <h2>Create an Account</h2>
            <form id="registerForm" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              <p id="message" style={{ color: 'red', textAlign: 'center' }}>{message}</p>

              <button type="submit" className="register-btn">Register</button>

              <p className="login-text">
                Already have an account? <Link to="/LoginPage">Login</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
