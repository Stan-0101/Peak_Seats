import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosconfig';
import './ViewReservations.css';
import backgroundImage from '../images/background.jpg'; // Add this import

function ViewReservations() {
  const navigate = useNavigate();
  
  const loggedUser = localStorage.getItem('loggedUser');
  const userDataString = localStorage.getItem('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    count: 0,
    totalAmount: '0.00'
  });

  useEffect(() => {
    if (!loggedUser) {
      navigate('/LoginPage');
      return;
    }
    
    fetchReservations();
  }, [loggedUser, navigate]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try GET request first
      const response = await api.get('/getUserReservations.php', {
        params: { user_id: loggedUser }
      });
      
      if (response.data.success) {
        setReservations(response.data.data || []);
        setStats({
          count: response.data.count || 0,
          totalAmount: response.data.total_amount || '0.00'
        });
      } else {
        setError(response.data.message || 'No reservations found');
      }
    } catch (err) {
      console.error('Error:', err);
      
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data?.message || 'Server error'}`);
      } else if (err.request) {
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        setError('Error loading reservations. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchReservations();
  };

  const getPaymentBadgeClass = (method) => {
    return method === 'online_card' ? 'badge-online' : 'badge-onsite';
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₱0.00';
    
    const cleanAmount = typeof amount === 'string' 
      ? parseFloat(amount.replace(/,/g, '')) 
      : parseFloat(amount);
    
    return `₱${cleanAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  if (!loggedUser) {
    return null;
  }

  return (
    <div className="body">
      
      <div className="bg">
        <img src={backgroundImage} alt="Background" className="bg-image" />
      </div>

      <div className="reservations-container">
        
        <div className="backbutton">
          <button onClick={() => navigate('/')} className="back-btn">
            ←
          </button>
        </div>

        <div className="header">
          <h1>My Reservations</h1>
          <p>View your seat reservations and booking history</p>
          
          <div className="current-user-info">
            <div className="user-info-left">
              <span className="user-badge"> {userData?.full_name || loggedUser}</span>
              <span className="user-id">ID: {loggedUser}</span>
            </div>
            <button onClick={handleRefresh} className="refresh-btn" disabled={loading}>
              {loading ? ' Loading...' : ' Refresh'}
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="user-summary">
          <div className="summary-card">
            <h3>📊 Reservation Summary</h3>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-label">Total Reservations</span>
                <span className="stat-value">{stats.count}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Total Amount</span>
                <span className="stat-value">{formatCurrency(stats.totalAmount)}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Status</span>
                <span className="stat-value status-active">Active</span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading reservations...</p>
          </div>
        ) : reservations.length > 0 ? (
          <div className="reservations-list">
            <h2>Your Reservations ({reservations.length})</h2>
            <div className="table-responsive">
              <table className="reservations-table">
                <thead>
                  <tr>
                    <th>Reservation ID</th>
                    <th>Arena Name</th>
                    <th>Seat Numbers</th>
                    <th>Total Amount</th>
                    <th>Payment Method</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.reservation_id}>
                      <td className="reservation-id">#{reservation.reservation_id}</td>
                      <td className="arena-name">{reservation.arena_name}</td>
                      <td className="seat-numbers">
                        <div className="seats-display">
                          {reservation.seat_numbers.split(',').map((seat, index) => (
                            <span key={index} className="seat-badge">{seat.trim()}</span>
                          ))}
                          <span className="seat-count">({reservation.seat_count} seats)</span>
                        </div>
                      </td>
                      <td className="total-amount">{formatCurrency(reservation.total_amount)}</td>
                      <td>
                        <span className={`payment-badge ${getPaymentBadgeClass(reservation.payment_method)}`}>
                          {reservation.payment_text}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="no-reservations">
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No Reservations Found</h3>
              <p>You haven't made any reservations yet.</p>
              <button 
                onClick={() => navigate('/')} 
                className="browse-btn"
              >
                Browse Events
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewReservations;