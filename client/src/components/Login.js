import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../styles/Login.css";

export default function Login() {
  const [textfields, setTextfields] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setTextfields({
      ...setTextfields,
      [e.target.name]: e.target.value,
    });
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
                placeholder="password"
                onChange={handleChange}
                name="password"
                type="password"
              />
            </Form.Group>
            <Row >
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
