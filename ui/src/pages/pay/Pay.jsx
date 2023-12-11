import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useLocation, useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { v4 as uuidv4 } from 'uuid';

const stripePromise = loadStripe(
  "pk_test_51OKKQCIYNwtwWGpJGpEx8HLsG7sIX31bFJBEkHbe9y5GglZ0ow792DLOCyFdu7s7Nj6HAR9u1QZomA00JlYctPFY0093YW6se2"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useLocation();
  console.log(state)
  state.idNum = uuidv4();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(`/gigs/create-payment-intent/${state.userId}`, state);
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [state]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  
  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;