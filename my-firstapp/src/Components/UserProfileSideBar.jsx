import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfileSidebar.css';

function UserProfileSidebar({ isOpen, onClose }) {
  const [userInfo, setUserInfo] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedUser');
    if (loggedUser) {
      fetchUserInfo(loggedUser);
      const savedPicture = localStorage.getItem(`profilePic_${loggedUser}`);
      if (savedPicture) {
        setProfilePicture(savedPicture);
      }
    }
  }, [isOpen]);

  const fetchUserInfo = async (username) => {
    try {
      const apiURL = "https://sheetdb.io/api/v1/8d0djbxprffme";
      const response = await fetch(`${apiURL}/search?Username=${username}`);
      const data = await response.json();
      
      if (data.length > 0) {
        setUserInfo(data[0]);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleEditClick = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue || '');
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem(`profilePic_${userInfo.Username}`, reader.result);
        alert('Profile picture updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveField = async () => {
    setIsSaving(true);
    try {
      const apiURL = "https://sheetdb.io/api/v1/8d0djbxprffme";
      
      const updateData = { ...userInfo, [editingField]: tempValue };

      await fetch(`${apiURL}/search?Username=${userInfo.Username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: updateData
        })
      });

      if (editingField === 'Username' && tempValue !== userInfo.Username) {
        localStorage.setItem("loggedUser", tempValue);

        if (profilePicture) {
          localStorage.setItem(`profilePic_${tempValue}`, profilePicture);
          localStorage.removeItem(`profilePic_${userInfo.Username}`);
        }
      }

      setUserInfo(updateData);
      setEditingField(null);
      setTempValue('');
      alert('Field updated successfully!');
    } catch (error) {
      console.error("Error saving field:", error);
      alert('Error saving changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    onClose();
    navigate('/LoginPage');
    alert('Logged out successfully!');
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      
      <div className={`user-profile-sidebar ${isOpen ? 'open' : ''}`}>
        <button className="sidebar-close-btn" onClick={onClose}>✕</button>
        
        <div className="sidebar-content">
          {userInfo ? (
            <>
              <div className="user-header">
                <div className="avatar-container">
                  <div className="user-avatar">
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="profile-pic" />
                    ) : (
                      '👤'
                    )}
                  </div>
                  <label htmlFor="picture-upload" className="edit-picture-btn" title="Change picture">
                    📷
                  </label>
                  <input
                    id="picture-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    style={{ display: 'none' }}
                  />
                </div>
                <h2>{userInfo.Username || 'User'}</h2>
              </div>

              <div className="user-details">
                {/* Username Field */}
                <div className="detail-item">
                  <div className="field-header">
                    <label>Username:</label>
                    {editingField !== 'Username' && (
                      <button 
                        className="mini-edit-btn" 
                        onClick={() => handleEditClick('Username', userInfo.Username)}
                        title="Edit username"
                      >
                        ✎
                      </button>
                    )}
                  </div>
                  {editingField === 'Username' ? (
                    <div className="edit-field">
                      <input
                        type="text"
                        className="edit-input"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        autoFocus
                      />
                      <div className="field-buttons">
                        <button className="save-field-btn" onClick={handleSaveField} disabled={isSaving}>
                          ✓
                        </button>
                        <button className="cancel-field-btn" onClick={() => setEditingField(null)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{userInfo.Username || 'Not provided'}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="detail-item">
                  <div className="field-header">
                    <label>Password:</label>
                    {editingField !== 'Password' && (
                      <button 
                        className="mini-edit-btn" 
                        onClick={() => handleEditClick('Password', userInfo.Password)}
                        title="Edit password"
                      >
                        ✎
                      </button>
                    )}
                  </div>
                  {editingField === 'Password' ? (
                    <div className="edit-field">
                      <input
                        type="password"
                        className="edit-input"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        autoFocus
                      />
                      <div className="field-buttons">
                        <button className="save-field-btn" onClick={handleSaveField} disabled={isSaving}>
                          ✓
                        </button>
                        <button className="cancel-field-btn" onClick={() => setEditingField(null)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>••••••••</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="detail-item">
                  <div className="field-header">
                    <label>Email:</label>
                    {editingField !== 'Email' && (
                      <button 
                        className="mini-edit-btn" 
                        onClick={() => handleEditClick('Email', userInfo.Email)}
                        title="Edit email"
                      >
                        ✎
                      </button>
                    )}
                  </div>
                  {editingField === 'Email' ? (
                    <div className="edit-field">
                      <input
                        type="email"
                        className="edit-input"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        autoFocus
                      />
                      <div className="field-buttons">
                        <button className="save-field-btn" onClick={handleSaveField} disabled={isSaving}>
                          ✓
                        </button>
                        <button className="cancel-field-btn" onClick={() => setEditingField(null)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{userInfo.Email || 'Not provided'}</p>
                  )}
                </div>
                
                {/* Phone Field */}
                <div className="detail-item">
                  <div className="field-header">
                    <label>Phone:</label>
                    {editingField !== 'Phone' && (
                      <button 
                        className="mini-edit-btn" 
                        onClick={() => handleEditClick('Phone', userInfo.Phone)}
                        title="Edit phone"
                      >
                        ✎
                      </button>
                    )}
                  </div>
                  {editingField === 'Phone' ? (
                    <div className="edit-field">
                      <input
                        type="tel"
                        className="edit-input"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        autoFocus
                      />
                      <div className="field-buttons">
                        <button className="save-field-btn" onClick={handleSaveField} disabled={isSaving}>
                          ✓
                        </button>
                        <button className="cancel-field-btn" onClick={() => setEditingField(null)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{userInfo.Phone || 'Not provided'}</p>
                  )}
                </div>

                {/* Full Name Field */}
                <div className="detail-item">
                  <div className="field-header">
                    <label>Full Name:</label>
                    {editingField !== 'Full Name' && (
                      <button 
                        className="mini-edit-btn" 
                        onClick={() => handleEditClick('Full Name', userInfo['Full Name'])}
                        title="Edit full name"
                      >
                        ✎
                      </button>
                    )}
                  </div>
                  {editingField === 'Full Name' ? (
                    <div className="edit-field">
                      <input
                        type="text"
                        className="edit-input"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        autoFocus
                      />
                      <div className="field-buttons">
                        <button className="save-field-btn" onClick={handleSaveField} disabled={isSaving}>
                          ✓
                        </button>
                        <button className="cancel-field-btn" onClick={() => setEditingField(null)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{userInfo['Full Name'] || 'Not provided'}</p>
                  )}
                </div>

                {/* Address Field */}
                <div className="detail-item">
                  <div className="field-header">
                    <label>Address:</label>
                    {editingField !== 'Address' && (
                      <button 
                        className="mini-edit-btn" 
                        onClick={() => handleEditClick('Address', userInfo.Address)}
                        title="Edit address"
                      >
                        ✎
                      </button>
                    )}
                  </div>
                  {editingField === 'Address' ? (
                    <div className="edit-field">
                      <input
                        type="text"
                        className="edit-input"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        autoFocus
                      />
                      <div className="field-buttons">
                        <button className="save-field-btn" onClick={handleSaveField} disabled={isSaving}>
                          ✓
                        </button>
                        <button className="cancel-field-btn" onClick={() => setEditingField(null)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{userInfo.Address || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="button-group-bottom">
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="loading">
              <p>Loading user information...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfileSidebar;
