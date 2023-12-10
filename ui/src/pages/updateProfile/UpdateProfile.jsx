import React, { useState, useEffect } from 'react';
import getCurrentUser from '../../utils/getCurrentUser.js';
import newRequest from '../../utils/newRequest.js';
import './UpdateProfile.scss';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const currentUser = getCurrentUser();
  const id = currentUser._id;
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await newRequest.get(`/users/${id}`);
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    country: '',
    phone: '',
    desc: '',
  });

  useEffect(() => {
    // Set the initial state when userData changes
    if (userData) {
      setFormData({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password || '',
        country: userData.country || '',
        phone: userData.phone || '',
        desc: userData.desc || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await newRequest.put(`/users/${currentUser._id}`, formData);

      if (response.status === 200) {
        const updatedUser = response.data;
        console.log('User updated successfully:', updatedUser);
        // You can perform additional actions, such as updating state or showing a success message
      } else {
        console.error('Failed to update user profile:', response.statusText);
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error, show error message, etc.
    }
    navigate('/profile');
  };

  return (
    <div className="update-profile">
      <h1>Update Profile</h1>
      <br />
      <form>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
        <br />
        <label>
          Contact:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="desc" value={formData.desc} onChange={handleChange} />
        </label>
        <br />
        {/* Add other input fields for updating profile */}
        <button type="button" onClick={handleUpdate}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
