import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "../styles/Signup.css";

export default function Signup() {
  const [textfields, setTextfields] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    age: "",
  });

  const createYears = () => {
    let years = [];
    for (let i = 1950; i < 2021; i++) {
      years.push(i);
    }
    return years;
  };

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
    <Container fluid="lg" className="signup-container">
      <Row className="mx-3 justify-content-center mb-3">
        <Col xs={7} className="mb-3">
          <h1>Signup</h1>
        </Col>
        <Col xs={7}>
          <form onSubmit={handleSubmit} noValidate>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={textfields.email}
                placeholder="Email"
                onChange={handleChange}
                name="email"
                type="email"
              />
            </Form.Group>
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
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                value={textfields.password2}
                placeholder="Password"
                onChange={handleChange}
                name="password2"
                type="password"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Age</Form.Label>
              <Form.Control
                value={textfields.age}
                placeholder="Age"
                onChange={handleChange}
                name="age"
                as="select"
              >
                {(createYears().map((year)=>(
                    <option>{year}</option>
                )))}
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
