import { useState } from "react";
import axios from "axios";
import "./styles.css";

const VehicleForm = ({ token }) => {
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("Rs ");
  const [phone, setPhone] = useState("");
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);

  const handleSubmission = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/submit-vehicle",
        { model, price, phone, maxPictures, pictures },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Vehicle submitted successfully", response.data);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <div className="carForm">
      <h1>Vehicle Information</h1>

      <label>Car Model </label>
      <div>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>

      <label>Price </label>
      <div>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <label>Phone Number </label>
      <div>
        <input
          type="number"
          value={phone}
          minLength="11"
          maxLength="11"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <label>Number of Pictures </label>
      <div>
        <input
          type="number"
          value={maxPictures}
          onChange={(e) => setMaxPictures(e.target.value)}
        />
      </div>

      <label>Picture Upload </label>
      <div> 
        <input
          id ="file"
          type="file"
          multiple
          onChange={(e) => setPictures(Array.from(e.target.files))}
        />
      </div>
      <button onClick={handleSubmission}>Submit</button>
    </div>
  );
};

export default VehicleForm;
