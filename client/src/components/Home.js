import React, { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { ProductContext } from "../context/ProductContext";
import "../styles/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  const { products } = useContext(ProductContext);
  let firstFive = products.slice(0, 4);
  let carouselItems = products.slice(4, 7);
  return (
    <div className="Home">
      <h1>Main page</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="Product-carousel">
          <Carousel>
            {carouselItems.map((item) => (
              <Carousel.Item key={item._id}>
                <Link to={`/products/${item._id}`}>
                  <img
                    className="d-block w-100"
                    src={item.images[0]}
                    alt={item.title}
                  />
                </Link>
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col xs={0} md={3}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1543330091-27228394c7dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1369&q=80"
            alt="First slide"
          />
        </Col>
      </Row>
      <Row className="Product-slider pt-3">
        {firstFive.map((product) => (
          <Col xs={12} md={3} key={product._id}>
            <Link
              className="text-decoration-none"
              to={`/products/${product._id}`}
            >
              <Image src={product.images[0]} thumbnail />
              <h4>Title: {product.title}</h4>
              <p>Price: ${product.price}</p>
            </Link>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-around text-center">
        <Col xs={3}>Something </Col>
        <Col xs={3}>Something</Col>
        <Col xs={3}>Something</Col>
      </Row>
    </div>
  );
}
