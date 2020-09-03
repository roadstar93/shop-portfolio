import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/UserPage.css";

const UserPage = () => {
  const { id } = useParams();
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
      axios.post(`api/updateAddress/${id}`, output);
      console.log(output);
    } catch (error) {
      alert("Error in post" + error.message);
    }
    console.log("worked");
  };
  return (
    <div className="UserPage">
      <h1>Userpage</h1>
      <Row className="ml-3">
        <Col xs={5}>
          <div>
            <p>Email: (email)</p>
            <p>Username: (username)</p>
            <p>Age: (age)</p>
          </div>
        </Col>
        <Col xs={6}>
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
              <Form.Label>Adress</Form.Label>
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
