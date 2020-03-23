import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Product({ product, handleDelete }) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
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
      </Card>
    </div>
  );
}
