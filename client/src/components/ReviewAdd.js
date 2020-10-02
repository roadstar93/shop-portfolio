import React, { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContex";
import Form from "react-bootstrap/Form";
import "../styles/Button.css"
import "../styles/ReviewAdd.css";


const ReviewAdd = () => {
  const [textfield, setTexfield] = useState();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const handleChange = (e) => {
    setTexfield(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const output = { 
        comment: textfield,
        userID: user.id,
        username: user.username
    };
    try {
      axios.post(`//localhost:3001/api/${id}/comment`, output); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
    } catch (error) {
      alert("Error in creating comment" + error.message);
    }
  };
  return (
    <div className="review-form">
      <form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Leave a review:</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            value={textfield}
            onChange={handleChange}
            name="textfield"
            placeholder="Describe your experience here"
          />
        </Form.Group>
        <button type="submit" className="main-button">
                Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewAdd;
