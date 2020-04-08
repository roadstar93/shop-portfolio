import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/Product.css";

export default function Product({ product, handleDelete }) {
  return (
    <div className="product-card">
      <Card style={{ width: "18rem" }}>
      <Link  to={`/products/${product._id}`}>
        <Card.Img variant="top" src={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description.substring(0,100)}</Card.Text>
          <Button variant="outline-primary">
            <Link to={`/products/editItem/${product._id}`}>Edit</Link>
          </Button>
          <Button variant="outline-primary">
            <Link to={`/products/${product._id}`}>Go to product</Link>
          </Button>
          <Button
            onClick={() => {
              handleDelete(product._id);
            }}
            variant="primary"
          >
            Delete
          </Button>
        </Card.Body>
        </Link>
      </Card>
    </div>
  );
}
