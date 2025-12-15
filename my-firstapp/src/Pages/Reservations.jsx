import React, { useState, useEffect } from "react";
import api from "../api/axiosconfig";
import "./Reservations.css";
import backgroundImage from '../images/background.jpg';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch reservations data
  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("Fetching reservations...");
      const response = await api.get("/getreservations.php");
      
      console.log("Reservations API Response:", response.data);
      
      if (response.data.success) {
        const reservationsData = response.data.reservations || [];
        setReservations(reservationsData);
        setFilteredReservations(reservationsData);
      } else {
        setError(`Server Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error fetching reservations:", err);
      if (err.response) {
        setError(`Error ${err.response.status}: ${err.response.data?.message || "Failed to load reservations"}`);
      } else if (err.request) {
        setError("No response from server. Check if PHP server is running.");
      } else {
        setError("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredReservations(reservations);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = reservations.filter(
      (reservation) =>
        (reservation.user_id && reservation.user_id.toString().toLowerCase().includes(lowercasedTerm)) ||
        (reservation.arena_name && reservation.arena_name.toLowerCase().includes(lowercasedTerm)) ||
        (reservation.seat_numbers && reservation.seat_numbers.toLowerCase().includes(lowercasedTerm)) ||
        (reservation.payment_method && reservation.payment_method.toLowerCase().includes(lowercasedTerm))
    );
    
    setFilteredReservations(filtered);
  }, [searchTerm, reservations]);

  // Handle reservation selection
  const handleReservationSelect = (reservationId) => {
    setSelectedReservations((prev) =>
      prev.includes(reservationId)
        ? prev.filter((id) => id !== reservationId)
        : [...prev, reservationId]
    );
  };

  // Select all reservations
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedReservations(filteredReservations.map(res => res.reservation_id));
    } else {
      setSelectedReservations([]);
    }
  };

  // Check if reservation is selected
  const isReservationSelected = (reservationId) => selectedReservations.includes(reservationId);

  // Get payment method icon
  const getPaymentIcon = (method) => {
    if (!method) return 'fa-money-bill-wave';
    switch(method.toLowerCase()) {
      case 'online_card':
        return 'fa-credit-card';
      case 'onsite':
        return 'fa-cash-register';
      default:
        return 'fa-money-bill-wave';
    }
  };

  // Get arena icon
  const getArenaIcon = (arena) => {
    if (!arena) return 'fa-map-marker-alt';
    if (arena.includes('Araneta')) return 'fa-landmark';
    if (arena.includes('MOA')) return 'fa-building';
    if (arena.includes('Aqua')) return 'fa-water';
    return 'fa-map-marker-alt';
  };

  // DELETE SELECTED RESERVATIONS
  const handleDeleteSelected = async () => {
    if (selectedReservations.length === 0) {
      alert("Please select at least one reservation to delete.");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete ${selectedReservations.length} reservation(s)?\nThis action cannot be undone.`)) {
      return;
    }
    
    try {
      setIsDeleting(true);
      setError("");
      
      console.log("Deleting reservations:", selectedReservations);
      
      // Call the PHP delete endpoint
      const response = await api.post(
        "/deletereservation.php",
        { reservation_ids: selectedReservations },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Delete Response:", response.data);
      
      if (response.data.success) {
        // Success - update local state
        const remainingReservations = reservations.filter(res => !selectedReservations.includes(res.reservation_id));
        setReservations(remainingReservations);
        setFilteredReservations(remainingReservations);
        setSelectedReservations([]);
        
        // Show success message
        alert(`${response.data.deleted_count || selectedReservations.length} reservation(s) deleted successfully.`);
      } else {
        setError(`Delete failed: ${response.data.message}`);
        alert(`Delete failed: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Error deleting reservations:", err);
      console.error("Error details:", err.response?.data);
      
      let errorMessage = "Failed to delete reservations. ";
      if (err.response) {
        errorMessage += `Server responded with ${err.response.status}: ${err.response.data?.message || err.response.statusText}`;
      } else if (err.request) {
        errorMessage += "No response from server. Check CORS headers in PHP.";
      } else {
        errorMessage += err.message;
      }
      
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  // Calculate total revenue
  const calculateTotalRevenue = () => {
    return filteredReservations.reduce((total, res) => {
      const amount = parseFloat(res.total_amount.replace(/,/g, '')) || 0;
      return total + amount;
    }, 0);
  };

 

  return (
    <div className="body">
      <div className="bg">
        <img src={backgroundImage} alt="Background" className="bg-image" />
      </div>

      <div className="Content">
        {/* Back button */}
        <div className="backbutton">
          <button onClick={() => window.history.back()} className="back-btn">
            ←
          </button>
        </div>

        {/* Page title */}
        <div className="ArenaName">Reservation Management</div>

        

        {/* Stats Card */}
        <div className="stats-card">
          <div className="stats-content">
            <div className="stats-text">
              <h3>Total Reservations</h3>
              <h2 className="total-count">{reservations.length}</h2>
              <p className="stats-subtext">
                Total Revenue: PHP {calculateTotalRevenue().toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="stats-icon">
              <i className="fas fa-ticket-alt"></i>
            </div>
          </div>
        </div>

        {/* Selected reservations summary */}
        {selectedReservations.length > 0 && (
          <div className="selected-seats-center">
            <div className="center-summary">
              <h3>Selected Reservations ({selectedReservations.length})</h3>
              <div className="summary-total">
                <button 
                  className="delete-btn" 
                  onClick={handleDeleteSelected}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Deleting...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-trash"></i> Delete Selected
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search bar */}
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by user ID, arena, seats, or payment method..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="action-buttons">
            <button 
              className="refresh-btn" 
              onClick={fetchReservations} 
              disabled={loading || isDeleting}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-sync-alt"></i>
              )} Refresh
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i> 
            <div className="error-details">
              <strong>Error:</strong> {error}
            </div>
            <button className="retry-btn" onClick={fetchReservations}>
              <i className="fas fa-sync-alt"></i> Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading reservations...</p>
          </div>
        ) : (
          /* Reservations table */
          <div className="reservations-table-container">
            <table className="reservations-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedReservations.length === filteredReservations.length && filteredReservations.length > 0}
                      onChange={handleSelectAll}
                      disabled={isDeleting}
                    />
                  </th>
                  <th><i className="fas fa-user"></i> User ID</th>
                  <th><i className="fas fa-landmark"></i> Arena</th>
                  <th><i className="fas fa-chair"></i> Seats</th>
                  <th><i className="fas fa-money-bill-wave"></i> Total Amount</th>
                  <th><i className="fas fa-credit-card"></i> Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      <i className="fas fa-ticket-alt"></i>
                      {searchTerm ? "No reservations found matching your search" : "No reservations found"}
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((reservation) => (
                    <tr 
                      key={reservation.reservation_id} 
                      className={`reservation-row ${isReservationSelected(reservation.reservation_id) ? "selected" : ""}`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={isReservationSelected(reservation.reservation_id)}
                          onChange={() => handleReservationSelect(reservation.reservation_id)}
                          disabled={isDeleting}
                        />
                      </td>
                      <td className="user-id">
                        <i className="fas fa-user-circle"></i> {reservation.user_id || "N/A"}
                      </td>
                      <td>
                        <div className="arena-info">
                          <i className={`fas ${getArenaIcon(reservation.arena_name)}`}></i>
                          <span className="arena-name">
                            {reservation.arena_name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="seat-numbers">
                        <span className="seats-badge">
                          <i className="fas fa-chair"></i> {reservation.seat_numbers || "N/A"}
                        </span>
                      </td>
                      <td className="total-amount">
                        <span className="amount-badge">
                          PHP {reservation.total_amount || "0.00"}
                        </span>
                      </td>
                      <td>
                        <span className="payment-method">
                          <i className={`fas ${getPaymentIcon(reservation.payment_method)}`}></i>
                          {reservation.payment_method === 'online_card' ? 'Online Card' : 
                           reservation.payment_method === 'onsite' ? 'Onsite' : 
                           reservation.payment_method || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Table footer */}
            <div className="table-footer">
              <div className="pagination-info">
                Showing {filteredReservations.length} of {reservations.length} reservations
              </div>
              {selectedReservations.length > 0 && (
                <div className="selection-info">
                  {selectedReservations.length} reservation(s) selected
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservations;