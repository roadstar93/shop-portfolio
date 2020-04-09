import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";

export default function NavbarMain() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <Row>
        <Col xs={12} className="d-flex justify-content-end px-5">
          <svg
            className="bi bi-bag-fill"
            width="2em"
            height="2em"
            viewBox="0 -5 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z" />
          </svg>
          <Button onClick={() => setModalShow(true)} variant="link">
            {/* <Link to="/login">Login</Link> */}Login
          </Button>
          <Button variant="link">
            <Link to="/signup">Signup</Link>
          </Button>
        </Col>
      </Row>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Shop-Alot</Navbar.Brand>
        <Nav className="mr-auto">
          <Button variant="link">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link">
            <Link to="/products">Products</Link>
          </Button>
          <Button variant="link">
            <Link to="/contact">Contact</Link>
          </Button>
        </Nav>
        <Form inline>
          <p>User info if logged</p>
        </Form>
      </Navbar>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
