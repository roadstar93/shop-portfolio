import React, { useState, useContext } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { UserContext } from "../context/UserContex";
import "../styles/Login.css";

export default function Login({ updateState, updateToast }) {
  const [textfields, setTextfields] = useState({
    username: "",
    password: "",
  });

  const { updateUser } = useContext(UserContext);
  const { updateAddress } = useContext(UserContext);

  const handleSubmit = (e) => {
    axios
      .post("//localhost:3001/api/login", {
        username: textfields.username,
        password: textfields.password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          updateUser(response.data);
          updateAddress(response.data.address[0])
          if(updateToast) {
            updateToast();
          }          
          updateState();
        }
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error in post" + error.message);
      });
    e.preventDefault();
  };

  const handleChange = (e) => {
    setTextfields({ ...textfields, [e.target.name]: e.target.value });
  };
  return (
    <Container fluid="lg" className="login-container">
      <Row className="mx-3 justify-content-center mb-3">
        <Col xs={7} className="mb-3">
          <h1>Login</h1>
        </Col>
        <Col xs={7}>
          <form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={textfields.username}
                placeholder="Username"
                onChange={handleChange}
                name="username"
                type="text"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={textfields.password}
                placeholder="Password"
                onChange={handleChange}
                name="password"
                type="password"
              />
            </Form.Group>
            <Row>
              <Col className="d-flex justify-content-end" xs={12}>
                <Button variant="link">Forgot password?</Button>
              </Col>
            </Row>
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
