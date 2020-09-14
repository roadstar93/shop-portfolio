import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContex";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/UserPage.css";

const UserPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { userAddres } = useContext(UserContext);

  const [textfields, setTextfields] = useState({
    country: "",
    city: "",
    streetAdress: "",
    zip: "",
  });

  const handleChange = (e) => {
    setTextfields({ ...textfields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const output = {
      country: textfields.country,
      city: textfields.city,
      streetAdress: textfields.streetAdress,
      zip: textfields.zip,
    };

    try {
      axios.put(`//localhost:3001/api/updateAddress/${id}`, output);
      console.log(output);
    } catch (error) {
      alert("Error in post" + error.message);
    }
    console.log("worked");
    
  };




  return (
    <div className="UserPage">
      <h1>Your details</h1>
      <Row className="ml-3">
        <Col xs={5}>
          <div>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Age: {user.age}</p>
            <div>
              <h3>Address:</h3>
              <p>Country : {userAddres.country}</p>
              <p>City : {userAddres.city}</p>
              <p>Address : {userAddres.streetAdress}</p>
              <p>Zip : {userAddres.zip}</p>
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <h3>Update Address</h3>
          <form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Country</Form.Label>
              <Form.Control
                value={textfields.country}
                placeholder="Country"
                onChange={handleChange}
                name="country"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={textfields.city}
                placeholder="City"
                onChange={handleChange}
                name="city"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={textfields.streetAdress}
                onChange={handleChange}
                name="streetAdress"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                value={textfields.zip}
                onChange={handleChange}
                placeholder="Postal Code"
                name="zip"
                type="text"
              />
            </Form.Group>
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default UserPage;
