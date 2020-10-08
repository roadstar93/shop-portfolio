import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact">
      <h1 id="title">
        C<span>o</span>ntact Us
      </h1>
      <Container fluid="lg" className="cart-container mb-3">
        <Row>
          <Col className="pl-3 address-container">
            <div className="contact-hq">
              <p className="mb-1">Headquarters:</p>
              <p className="mb-0 pl-3">5600 Blvd des Galeries, Bur 530</p>
              <p className="mb-2 pl-3">Brasov, Brasov G2K 366</p>
            </div>
            <div className="contact-links">
              <p>
                <span>Email: </span><a href="mailto:">contact@shop-alot.com</a>
              </p>
              <p>
                <span>Phone: </span><a href="tel:+1 (888) 555-4444">+1 (888) 555-4444</a>
              </p>
            </div>
          </Col>
          <Col className="d-flex justify-content-end">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89245.39472653632!2d25.526422912041273!3d45.65245670088947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b862aa214f1%3A0x6cf5f2ef54391e0f!2sBra%C8%99ov%2C%20Romania!5e0!3m2!1sen!2sde!4v1602145884128!5m2!1sen!2sde"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title="contact-city"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
