import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/Product.css";

export default function Product({ product, handleDelete }) {

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <div className="product-text">
        <div className="product-info">
          <Link to={`/products/${product._id}`}>
            <h4>{product.title}</h4>
          </Link>
          <p>{product.description.substring(0, 100)}</p>
          <Button
            onClick={() => {
              handleDelete(product._id);
            }}
            variant="primary"
          >
            Delete
          </Button>
        </div>
        <div className="product-price">
          <p>${product.price}</p>
          <Button variant="outline-primary">
            <Link to={`/products/${product._id}`}>Go to product</Link>
          </Button>
          <Button variant="outline-primary">
            <Link to={`/products/editItem/${product._id}`}>Edit</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
