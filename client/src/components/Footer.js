import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../styles/Footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  return (
    <div className="Footer">
      <ListGroup className="FooterData" variant="flush">
        <Row>
          <Col>
            <ListGroup.Item>
              <a href="mailto:">contact@shop-alot.com</a>
              <br />
              <a href="tel:+1 (888) 555-4444">+1 (888) 555-4444</a>
            </ListGroup.Item>
          </Col>
          <Col>
            <ListGroup.Item>
              Copyright {new Date().getFullYear()}
              <br />
              All rights reserved
            </ListGroup.Item>
          </Col>
          <Col>
            <ListGroup.Item>
              <p> </p>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
}
