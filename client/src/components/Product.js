import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContex";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/Product.css";

export default function Product({ product, handleDelete }) {
  const [isAdmin, setIsAdmin] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsAdmin(user.isAdmin);
  },[user.isAdmin]);

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <div className="product-text">
        <div className="product-info">
          <Link to={`/products/${product._id}`}>
            <h4>{product.title}</h4>
          </Link>
          {/* <p>{product.description.substring(0, 100)}</p> */}
          {isAdmin ? 
          <Button
            onClick={() => {
              handleDelete(product._id);
            }}
            variant="primary"
          >
            Delete
          </Button> : ""}
          <p>
            {product.stock >= 4
              ? "In Stock"
              : product.stock >= 1
              ? `${product.stock} Remaining`
              : "Out of Stock"}
              </p>
        </div>     
        <div className="product-price">
          <p>${product.price.toLocaleString()}</p>
          <Button variant="outline-primary">
            <Link to={`/products/${product._id}`}>Go to product</Link>
          </Button>
          {isAdmin ? <Button variant="outline-primary">
            <Link to={`/products/editItem/${product._id}`}>Edit</Link>
          </Button> : ""}
        </div>
      </div>
    </div>
  );
}
