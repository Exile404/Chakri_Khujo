// Example: JobForm.jsx
import React, { useState} from "react";
import "./JobForm.scss";
import { useNavigate, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest"; // Adjust the path accordingly

function JobForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // Define your form fields here
        name: "",
        email: "",
        resume: null,
        gigId: id
        
        // ... other fields
    });
  console.log(id)
  const handleChange = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  
//   useEffect(() => {
//     const makeRequest = async () => {
//       try {
//         const res = await newRequest.post(
//           `/orders/create-post/${id}`
//         );
//         setClientSecret(res.data.clientSecret);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     makeRequest();
//   }, []);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newRequest.post(`/orders/create-post/${id}`, {
        ...formData,
        
      });
      console.log('Jabo na')
      navigate("/orders")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="resume">Resume:</label>
        <input
          type="text"
          name="resume"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JobForm;
