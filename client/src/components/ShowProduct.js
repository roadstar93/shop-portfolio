import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ShowProduct.css";
import { Button } from "@material-ui/core";
// import { ProductContext } from "../context/ProductContext";

export default React.memo(function ShowProduct() {
  // const { products } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  // const test = products.find(({ _id }) => _id === id);  ==> Get a project from an array based on the ID from params

  useEffect(() => {
    async function getDataFromDB() {
      let res = await axios.get(`//localhost:3001/api/getProd/${id}`);
      let data = res.data;
      setProduct({
        ...product,
        title: data.title,
        price: data.price,
        category: data.category,
        description: data.description,
        image: data.images,
      });
    }
    getDataFromDB();
  }, []);

  return (
    <div>
      <h1>Show product</h1>
      <Row className="mx-5 my-2">
        <Row className="w-100">
          <Col md={5}>
            <Row>
              <Col md={12} className="product-image">
                <img
                  className="d-block w-100"
                  src={product.image[0]}
                  alt={product.title}
                ></img>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="product-images">
                <p>Img </p>
                <p>Img </p>
                <p>Img </p>
                <p>Img </p>
              </Col>
            </Row>
          </Col>
          <Col></Col>
          <Col md={5}>
            <h4>{product.title}</h4>
            <Col md={10} className="product-header mt-3">
              <p>Price:</p>
              <p>${product.price}</p>
            </Col>
            <Col md={10} className="product-header">
              <p>Rating:</p>
              <p>$$$$$$</p>
            </Col>
            <Col md={10} className="product-add">
              <Button variant="outline-primary">Add to cart</Button>
            </Col>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md={12}>
            <h4>Description:</h4>
            <p>{product.description}</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}><p>Comments: will be updated</p></Col>
        </Row>
      </Row>
    </div>
  );
});
