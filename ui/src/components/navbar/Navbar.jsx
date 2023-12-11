import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // const currentUser = null

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();


  const handleLogout = async ()=>{
    try{
        await newRequest.post("/auth/logout");
        localStorage.setItem('currentUser',null);
        navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Chakri Khujoo </span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
  
          <span>English</span>
          <Link className="link" to="/profile">Profile</Link>
          {currentUser ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img src={currentUser.img || '/img/noavatar.jpg'}alt='' />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                <Link className="link" to="/update-profile">
                  Update Profile
                </Link>
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Created Job List
                    </Link>
                    <Link className="link" to="/add">
                      Add New job
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Jobs
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <Link to ="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button className={active || pathname !== "/" ? "button active" : "button"} >Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=design">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=animation">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=blogger">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/gigs?cat=ai">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?cat=marketing">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?cat=marketing">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?cat=programming">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/gigs?cat=business">
              Business
            </Link>
         
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;