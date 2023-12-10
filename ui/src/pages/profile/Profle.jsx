import React, { useState, useEffect } from 'react';
import getCurrentUser from '../../utils/getCurrentUser.js';
import './Profile.scss';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js';

const Profile = () => {
  const currentUser = getCurrentUser();
  const id = currentUser._id;
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

  return (
    <div>
      <div>
        {/* Sidenav */}
        <div className="sidenav">
          <div className="profile">
            <img src={currentUser.img} alt="" width="100" height="100" />

            <div className="name">{userData?.name}</div>
            <div className="job">
              {userData?.isSeller ? <p>Recruiter</p> : <p>Applicant</p>}
            </div>
          </div>

          <div className="sidenav-url">
            <div className="url">
              <Link to="/profile" className="active">
                Profile
              </Link>
              <hr align="center" />
            </div>
            <div className="url">
              <Link to="/update-profile" className="link">
                Update Profile
              </Link>
              <hr align="center" />
            </div>
          </div>
        </div>
        {/* End */}

        {/* Main */}
        <div className="main">
          <h2>User Profile</h2>
          <div className="card">
            <div className="card-body">
              <i className="fa fa-pen fa-xs edit"></i>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>:</td>
                    <td>{userData?.name}</td>
                  </tr>
                  <tr>
                    <td>Username</td>
                    <td>:</td>
                    <td>{userData?.username}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{userData?.email}</td>
                  </tr>
                  <tr>
                    <td>Country</td>
                    <td>:</td>
                    <td>{userData?.country}</td>
                  </tr>
                  <tr>
                    <td>Contact</td>
                    <td>:</td>
                    <td>{userData?.phone}</td>
                  </tr>
                  <tr>
                    <td>Job</td>
                    <td>:</td>
                    {userData?.isSeller ? <td>Recruiter</td> : <td>Applicant</td>}
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>:</td>
                    <td>{userData?.desc}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End */}
      </div>
    </div>
  );
};

export default Profile;
