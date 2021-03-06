import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Login from "./Login";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContex";
import Toast from "react-bootstrap/Toast";
import "../styles/Navbar.css";

export default React.memo(function NavbarMain() {
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);

  const { noOfProducts } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  function updateState() {
    setModalShow(!modalShow);
  }
  function updateToast() {
    setShow(!show);
  }

  const handleSubmit = () => {
    axios
      .get("/api/logout")
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <Row>
        <Col xs={12} className="d-flex justify-content-end px-5">
          {show ? (
            <Toast
              className="py-0 mt-2 mr-3"
              onClose={() => setShow(false)}
              show={show}
              delay={4000}
              autohide
            >
              <Toast.Body className="py-0">
                Welcome back {user.username}
              </Toast.Body>
            </Toast>
          ) : (
            ""
          )}

          <div className="cart">
            <Link to="/cart">
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
            </Link>
            <p>{noOfProducts}</p>
            {console.log("rendered nav")}
          </div>
          {user.username ? (
            <div>
              <Button variant="link">
                <Link to={`/user/${user.id}`}>{user.username}</Link>
              </Button>
              <Button onClick={handleSubmit} variant="link">
                <a href="/">Logout</a>
              </Button>
            </div>
          ) : (
            <div>
              <Button onClick={updateState} variant="link">
                Login
              </Button>
              <Button variant="link">
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          )}
        </Col>
      </Row>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand id="logo">
          <Link to="/">
            SH<span className="logo-b">O</span>P-A-L
            <span className="logo-b">O</span>T
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto nav-links">
            <Button variant="link text-decoration-none">
              <Link to="/">Home</Link>
            </Button>
            <Button variant="link text-decoration-none">
              <Link to="/products">Products</Link>
            </Button>
            <Button variant="link text-decoration-none">
              <Link to="/contact">Contact</Link>
            </Button>
          </Nav>

          <Form inline></Form>
        </Navbar.Collapse>
      </Navbar>
      <LogInModal
        onEnter={updateToast}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
});

function LogInModal(props) {
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
        <Login updateToast={props.onEnter} updateState={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
