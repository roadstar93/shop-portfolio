import React, { useState } from "react";
import axios from "axios";
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
    age: "1950",
  });

  const createYears = () => {
    let years = [];
    for (let i = 1950; i < parseInt(new Date().getFullYear()) -10; i++) {
      years.push(i);
    }
    return years;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const output = {
      email: textfields.email,
      username: textfields.username,
      age: parseInt(new Date().getFullYear()) - textfields.age,
      password: textfields.password,
    };

    if (textfields.password === textfields.password2) {
      try {
        axios.post("/api/signup", output);
        console.log(output);
      } catch (error) {
        alert("Error in post" + error.message);
      }
      console.log("worked");
    }
  };

  const handleChange = (e) => {
    setTextfields({ ...textfields, [e.target.name]: e.target.value });
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
                {createYears().map((year, id) => (
                  <option key={id}>{year}</option>
                ))}
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
