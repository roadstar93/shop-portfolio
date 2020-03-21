import React from "react";
import Container from "@material-ui/core/Container";
import Carousel from 'react-bootstrap/Carousel';

export default function Home() {
  return (
    <div>
      <Container maxWidth="xl">
        <h1>Main page</h1>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1584386161274-91d1fcb007b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1584386161274-91d1fcb007b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
        {/* <img
          src="https://images.unsplash.com/photo-1584386161274-91d1fcb007b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
          alt="first image"
        /> */}
      </Container>
    </div>
  );
}
