import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ShoppingCart.css";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState("");

  useEffect(() => {
    const getProducts = () => {
      let allproducts = JSON.parse(localStorage.getItem("products"));
      setProducts(allproducts);
      setTotalValue(allproducts.reduce((a, { price }) => a + price, 0));
    };
    getProducts();
  }, []);
  return (
    <Container fluid="lg" className="mb-3">
      <h1>Shopping Cart</h1>
      <Row>
        {products.map((product, id) => (
          <Col key={id} xs={12} className="products">
            <div className="product-img">
              <img src={product.images[0]} alt={product.title} />
              <h4>Title: {product.title}</h4>
            </div>
            <div className="product-details">
              <h5>Price: $ {product.price}</h5>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="d-flex justify-content-end" xs={12}>
          <h4>Total: $ {totalValue}</h4>
          {console.log(totalValue)}
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingCart;
