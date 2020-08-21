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
            </ListGroup.Item>
          </Col>
          <Col>
            <ListGroup.Item>
              Copyright {new Date().getFullYear()}
              <br />
              All rights reserved
            </ListGroup.Item>
          </Col>
          {/* <ListGroup.Item>
          <h5>CONTACT</h5>
          Headquarters:
          <br />
          5600 Blvd des Galeries, Bur 530 <br />
          Québec, Québec G2K 2H6
        </ListGroup.Item> */}

          <Col>
            <ListGroup.Item>
              <a href="tel:+1 (888) 555-4444">+1 (888) 555-4444</a>
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
}
