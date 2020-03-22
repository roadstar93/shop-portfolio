import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Products() {
  const [products, setProducts] = useState([]);

  async function getDataFromDB() {
    let res = await axios.get("//localhost:3001/api/getProd");
    let data = res.data;
    setProducts(data);
  }

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Container fluid>
        <Row className="ml-auto mr-auto">
          <Col xs={0} md={3}>
            Categories
          </Col>
          <Col xs={12} md={9}>
            <Row>
              {products.map(product => (
                <Col key={product._id} xs={10} md={6} xl={4} className="mb-3">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Button onClick={getDataFromDB} size="small">
        Get data
      </Button>
      <Link to="/products/addItem">Add Product</Link>
    </div>
  );
}

export default Products;
