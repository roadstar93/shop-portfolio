import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContex";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/UserPage.css";
import Order from "./Order";

const UserPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { userAddres } = useContext(UserContext);
  let history = useHistory();

  const [textfields, setTextfields] = useState({
    country: "",
    city: "",
    streetAdress: "",
    zip: "",
  });
  const [showOrder, setShowOrder] = useState({
    show: false,
    order: "",
  });

  const updateOrderState = (id) => {
    setShowOrder({ ...showOrder, show: !showOrder.show, order: id });
  };

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
      axios.put(`/api/updateAddress/${id}`, output);
    } catch (error) {
      alert("Error in post" + error.message);
    }
  };

  useEffect(() => {
    function checkUser() {
      if (!user.id) {
        history.push("/");
      }
    }
    checkUser();
  }, [history, user.id]);

  return (
    <div className="UserPage">
      <h1>Your details</h1>
      <Row className="ml-3">
        <Col xs={6}>
          <div>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Age: {user.age}</p>
            <div>
              <div>
                <h3>Orders</h3>
                <Order
                  user={user}
                  updateOrderState={updateOrderState}
                  showOrder={showOrder}
                />
              </div>
              <h3>Address:</h3>
              {userAddres ? (
                <div>
                  <p>Country : {userAddres.country}</p>
                  <p>City : {userAddres.city}</p>
                  <p>Address : {userAddres.streetAdress}</p>
                  <p>Zip : {userAddres.zip}</p>
                </div>
              ) : (
                <p>You do not have set a default address</p>
              )}
            </div>
          </div>
        </Col>
        <Col xs={4}>
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
