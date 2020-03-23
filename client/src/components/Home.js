import React from "react";
import Container from "@material-ui/core/Container";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/Home.css"

export default function Home() {
  return (
    <div className="Home">
      <Container maxWidth="xl">
        <h1>Main page</h1>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.unsplash.com/photo-1584386161274-91d1fcb007b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col xs={0} md={3}>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1584386161274-91d1fcb007b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
              alt="First slide"
            />
          </Col>
        </Row>
        <Row className="justify-content-around text-center">
          <Col xs={3}>Something</Col>
          <Col xs={3}>Something</Col>
          <Col xs={3}>Something</Col>
        </Row>
      </Container>
    </div>
  );
}
