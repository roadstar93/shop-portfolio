import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContex";
import Form from "react-bootstrap/Form";
import "../styles/Button.css";
import "../styles/ReviewAdd.css";

const ReviewAdd = () => {
  const [textfields, setTexfields] = useState({
    text: "",
    rating: Number,
  });
  const { user } = useContext(UserContext);
  const { id } = useParams();
  let history = useHistory();
  const handleChange = (e) => {
    setTexfields({ ...textfields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const output = {
      comment: textfields.text,
      rating: textfields.rating,
      userID: user.id,
      username: user.username,
    };
    //Push review directly without reloading the page
    // const newReviewFront = {
    //   text: textfields.text,
    //   author: {
    //     id: user.id,
    //     name: user.username,
    //   },
    //   rating: textfields.rating,
    // };
    if (textfields.rating > 0) {
      try {
        axios.post(`//localhost:3001/api/${id}/comment`, output); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
      } catch (error) {
        alert("Error in creating comment" + error.message);
      }
      // newReview(newReviewFront);
    } else {
      alert("Please slect product rating");
    }
      alert("Review added succesfully, it will be viewable shortly")
      setTexfields({...textfields, text: ""})
  };
  return (
    <div className="review-form">
      <form onSubmit={handleSubmit} noValidate>
        <Form.Group
          onChange={handleChange}
          className="review-rating"
          controlId="formGroupEmail"
        >
          <Form.Label className="pr-1">Rating:</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            defaultValue=""
            required
            as="select"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-star-fill review-star"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
          </svg>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Leave a review:</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            value={textfields.text}
            onChange={handleChange}
            name="text"
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
