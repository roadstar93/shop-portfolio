import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ShoppingCart.css";
import Button from "react-bootstrap/Button";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState("");
  const { updateProducts } = useContext(ProductContext);
  const deleteItem = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    localStorage.setItem(
      "products",
      JSON.stringify(products.filter((product) => product.id !== id))
    );
    updateProducts();
  };

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
        {products.map((product, index) => (
          <Col key={index} xs={12} className="products">
            <div className="product-img">
              <Button
                onClick={() => {
                  deleteItem(product.id);
                }}
                variant="primary"
              >
                X
              </Button>
              <img src={product.images[0]} alt={product.title} />
              <Link to={`/products/${product.id}`}>
                <h4>{product.title}</h4>
              </Link>
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
