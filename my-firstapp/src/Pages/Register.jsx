import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axiosconfig'; 
import './register.css';
import backgroundImage from '../images/background.jpg';

function Register() {
  const [responseMsg, setResponseMsg] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setResponseMsg('Passwords do not match.');
      return;
    }

    // Check if any field is empty
    for (let key in formData) {
      if (key !== 'confirmPassword' && !formData[key].trim()) {
        setResponseMsg('Please fill all fields.');
        return;
      }
    }

    console.log('Submitting form data:', formData);
    
    try {
      const res = await api.post("/insertuser.php", {
        fullname: formData.fullname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      
      console.log('Response from server:', res.data);
      setResponseMsg(res.data.message);
      
      // Clear form on success
      if (res.data.success) {
        setFormData({
          fullname: '',
          email: '',
          username: '',
          password: '',
          confirmPassword: ''
        });
        
        
        document.getElementById('message').style.color = 'green';
        
        
        setTimeout(() => {
          window.location.href = '/LoginPage';
        }, 100);
      } else {
        document.getElementById('message').style.color = 'red';
      }
    } catch (err) {
      console.error('Error details:', err);
      console.error('Error response:', err.response);
      
      if (err.response) {
        
        setResponseMsg(err.response.data?.message || `Error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response
        console.error('No response received. Check if backend is running.');
        setResponseMsg('Cannot connect to server. Please check backend.');
      } else {
        // Something else happened
        setResponseMsg('Error: ' + err.message);
      }
      document.getElementById('message').style.color = 'red';
    }
  };

  return (
    <div className="body">
      <div className="bg">
              <img src={backgroundImage} alt="Background" className="bg-image" />
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
                  value={formData.fullname}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.username}
                  onChange={handleChange}
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
                  
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <p id="message" style={{ textAlign: 'center', margin: '10px 0', fontWeight: 'bold' }}>
                {responseMsg}
              </p>

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