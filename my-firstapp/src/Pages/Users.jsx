import React, { useState, useEffect } from "react";
import api from "../api/axiosconfig";
import "./Users.css";
import backgroundImage from '../images/background.jpg';

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Use your api instance from axiosconfig
      const response = await api.get("/getusers.php");
      
      console.log("Users API Response:", response.data);
      
      if (response.data.success) {
        const usersData = response.data.users || [];
        setUsers(usersData);
        setFilteredUsers(usersData);
      } else {
        setError(`Server Error: ${response.data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        (user.Full_Name && user.Full_Name.toLowerCase().includes(lowercasedTerm)) ||
        (user.Email_Address && user.Email_Address.toLowerCase().includes(lowercasedTerm)) ||
        (user.Username && user.Username.toLowerCase().includes(lowercasedTerm))
    );
    
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Handle user selection
  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Select all users
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  // Check if user is selected
  const isUserSelected = (userId) => selectedUsers.includes(userId);

  // Get avatar color based on name
  const getAvatarColor = (name) => {
    if (!name) return "#4CAF50";
    const colors = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336", "#607D8B"];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // DELETE SELECTED USERS
  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) {
      alert("Please select at least one user to delete.");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} user(s)?\nThis action cannot be undone.`)) {
      return;
    }
    
    try {
      setIsDeleting(true);
      setError("");
      
      // Call the PHP delete endpoint
      const response = await api.post(
        "/deleteuser.php",
        { user_ids: selectedUsers }
      );
      
      console.log("Delete Response:", response.data);
      
      if (response.data.success) {
        // Success - update local state
        const remainingUsers = users.filter(user => !selectedUsers.includes(user.id));
        setUsers(remainingUsers);
        setFilteredUsers(remainingUsers);
        setSelectedUsers([]);
        
        // Show success message
        alert(`${response.data.deleted_count || selectedUsers.length} user(s) deleted successfully.`);
      } else {
        setError(`Delete failed: ${response.data.message}`);
      }
    } catch (err) {
      console.error("Error deleting users:", err);
      setError("Failed to delete users. Please check your connection.");
    } finally {
      setIsDeleting(false);
    }
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
        <div className="ArenaName">User Management</div>

        {/* Stats and summary */}
        {selectedUsers.length > 0 && (
          <div className="selected-seats-center">
            <div className="center-summary">
              <h3>Selected Users ({selectedUsers.length})</h3>
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
              placeholder="Search by name, email, or username..."
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
              onClick={fetchUsers} 
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
            <button className="retry-btn" onClick={fetchUsers}>
              <i className="fas fa-sync-alt"></i> Retry
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        ) : (
          /* Users table */
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      disabled={isDeleting}
                    />
                  </th>
                  <th><i className="fas fa-user"></i> Full Name</th>
                  <th><i className="fas fa-envelope"></i> Email Address</th>
                  <th><i className="fas fa-at"></i> Username</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-data">
                      <i className="fas fa-user-slash"></i>
                      {searchTerm ? "No users found matching your search" : "No users found"}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr 
                      key={user.id} 
                      className={`user-row ${isUserSelected(user.id) ? "selected" : ""}`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={isUserSelected(user.id)}
                          onChange={() => handleUserSelect(user.id)}
                          disabled={isDeleting}
                        />
                      </td>
                      <td>
                        <div className="user-info">
                          <div 
                            className="user-avatar"
                            style={{ backgroundColor: getAvatarColor(user.Full_Name) }}
                          >
                            {user.Full_Name ? user.Full_Name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <span className="user-name">
                            {user.Full_Name || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="user-email">
                        {user.Email_Address || "N/A"}
                      </td>
                      <td>
                        <span className="username">
                          <i className="fas fa-user-circle"></i> {user.Username || "N/A"}
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
                Showing {filteredUsers.length} of {users.length} users
              </div>
              {selectedUsers.length > 0 && (
                <div className="selection-info">
                  {selectedUsers.length} user(s) selected
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;