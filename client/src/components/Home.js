import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { ProductContext } from "../context/ProductContext";
import "../styles/Home.css";

export default function Home() {
  const { products } = useContext(ProductContext);
  let featureEnd;

  let featureStart = function () {
    let maxProductStart = products.length - 4;
    let n = Math.floor(Math.random() * maxProductStart);

    if (n > maxProductStart) {
      n = maxProductStart;
    }
    console.log(n);
    featureEnd = n + 4;
    return n;
  };

  let featuredProducts = products.slice(featureStart(), featureEnd);
  let carouselItems = products.slice(4, 7);

  return (
    <div className="Home">
      <Row className="justify-content-center my-3">
        <Col sm={12} md={7} className="Product-carousel">
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
                  <p>{item.description.substring(0, 100)}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
          <Col xs={0} md={3} className="Product-promotion">
            <img
              className="d-block w-100"
              src="https://images.unsplash.com/photo-1543330091-27228394c7dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1369&q=80"
              alt="First slide"
            />

              <img
              className="d-block w-100 mt-3"
              src="https://images.unsplash.com/photo-1543330091-27228394c7dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1369&q=80"
              alt="First slide"
            />
          </Col>
      </Row>
      <Row className="Product-slider-title pt-3">
        <h3>Featured Products</h3>
      </Row>
      <Row className="Product-slider pt-3">
        {featuredProducts.map((product) => (
          <Col xs={12} md={3} key={product._id}>
            <Link
              className="text-decoration-none"
              to={`/products/${product._id}`}
            >
              <Image src={product.images[0]} alt={product.title} thumbnail />
              <h4>{product.title}</h4>
              <p>Price: ${product.price.toLocaleString()}</p>
            </Link>
          </Col>
        ))}
      </Row>

      <Row>
        <img
          className="banner"
          src="https://images.unsplash.com/photo-1563452675059-efa1e2e7a787?ixlib=rb-1.2.1&auto=format&fit=crop&w=2125&q=80"
          alt="banner"
        />
      </Row>
      <Row className="text-center ">
        <div  className="shop-slogan">
        <Col>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dictum
          nunc fermentum urna semper pulvinar. Nulla ornare nec metus eu.{" "}
        </Col>
        <Col >
          Lorem ipg elit. Fusce dictum nunc fermentum urna semper pulvinar. sum
          dolor sit amet, consectetur adipiscinNulla ornare nec metus eu.{" "}
        </Col>
        <Col >
          Lorem Nulla ornare neipsum dolor sit amet, consectetur adipiscing
          elit. Fusce dictum nunc fermentum urna semper pulvinar. c metus eu.{" "}
        </Col>
        </div>
      </Row>
    </div>
  );
}
