import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ShoppingCart.css";
import Button from "react-bootstrap/Button";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState("");

  const deleteItem = (id) => {
    setProducts(products.filter(product => product.id !== id))
    console.log(products)
  }

  useEffect(() => {
    const getProducts = () => {
      let allproducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(allproducts);
      setTotalValue(allproducts.reduce((a, { price }) => a + price, 0));
    };
    getProducts();
  }, []);
  return (
    <Container fluid="lg" className="mb-3">
      <h1>Shopping Cart</h1>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} className="products">
            <div className="product-img">
              <Button
              onClick={() => {
                deleteItem(product.id)
              }}
                variant="primary"
              >
                X
              </Button>
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
        <Col className="d-flex justify-content-end align-items-center" xs={12}>
          <h4>Total: $ {totalValue}</h4>
          <Button className="ml-2" variant="outline-primary">
            Continue
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingCart;
