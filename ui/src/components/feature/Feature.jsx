import React from 'react'
import "./Feature.scss"

const Feature = () => {
  return (
    <div className="feature">
      <div className="container">
        <div className="item">
        <h1>The best part? Everything.</h1>
        <div className="title">
            <img src='./img/check.png' alt=''/>
            Stick to your budget
        </div>
        <p>Find the right service for every price point. No hourly rates, just project-based pricing.</p>
        <div className="title">
            <img src='./img/check.png' alt=''/>
            Get quality work done quickly
        </div>
        <p>Hand your project over to a talented freelancer in minutes, get long-lasting results.</p>
        <div className="title">
            <img src='./img/check.png' alt=''/>
            Pay when you're happy
        </div>
        <p>Upfront quotes mean no surprises. Payments only get released when you approve.</p>
        <div className="title">
            <img src='./img/check.png' alt=''/>
            Count on 24/7 support
        </div>
        <p>Our round-the-clock support team is available to help anytime, anywhere.</p>
        </div>
        <div className="item">
            <video src='./img/video.mp4' controls></video>
        </div>
      </div>
    </div>
    
  )
}

export default Feature