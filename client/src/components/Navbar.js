import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function NavbarMain() {
  return (
    <div>
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
          <Button variant="outline-light" className="mr-2">
            <Link to="/signup">Signup</Link>
          </Button>
          <Button variant="outline-light">
            <Link to="/login">Login</Link>
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}
