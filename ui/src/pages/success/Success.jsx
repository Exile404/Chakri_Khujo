import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import "./Success.scss"


const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    console.log('Component rendered!'); // This will log every time the component renders
  
    const makeRequest = async () => {
      try {
        console.log('Making request...'); // This will log every time a request is made
        await newRequest.put("/gigs/confirm", { payment_intent });
        setTimeout(() => {
          navigate("/mygigs");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
  
    makeRequest();
  }, []);
  

  return (
    <div className="success">
      Payment successful. You are being redirected to the orders page. Please do
      not close the page
    </div>
  );
};

export default Success;