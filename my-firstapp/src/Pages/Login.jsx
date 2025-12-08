import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosconfig'; 
import './login.css';

function LoginPage() {
  const [responseMsg, setResponseMsg] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    setResponseMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');

    // Validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setResponseMsg('Please enter both username and password.');
      document.getElementById('message').style.color = 'red';
      return;
    }

    console.log('Submitting login data:', formData);
    
    try {
      const res = await api.post("/login.php", {
        username: formData.username,
        password: formData.password,
      });
      
      console.log('Response from server:', res.data);
      setResponseMsg(res.data.message);
      
      // Handle successful login
      if (res.data.success) {
        
        document.getElementById('message').style.color = 'green';
        
       
        setFormData({
          username: '',
          password: ''
        });
        
        
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      } else {
        document.getElementById('message').style.color = 'red';
      }
    } catch (err) {
      console.error('Error details:', err);
      console.error('Error response:', err.response);
      
      if (err.response) {
       
        setResponseMsg(err.response.data?.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        
        console.error('No response received. Check if backend is running.');
        setResponseMsg('Cannot connect to server. Please check backend.');
      } else {
       
        setResponseMsg('Error: ' + err.message);
      }
      document.getElementById('message').style.color = 'red';
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
        <section className="login-section">
          <div className="login-container">
            <h2>Login to Peak Seats</h2>
            
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username" 
                  placeholder="Enter your username" 
                  value={formData.username}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Enter your password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                />
              </div>

              <p id="message" style={{ textAlign: 'center', margin: '10px 0', fontWeight: 'bold' }}>
                {responseMsg}
              </p>

              <button type="submit" className="login-btn">Login</button>
              
              <p className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
              
              <p className="signup-text">
                Don't have an account? <Link to="/RegisterPage">Sign up</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;