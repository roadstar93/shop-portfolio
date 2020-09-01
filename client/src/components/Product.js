import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContex";
import { Link } from "react-router-dom";
import "../styles/Product.css";
import "../styles/Button.css";

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
          <button
            onClick={() => {
              handleDelete(product._id);
            }}
            className="main-button"
          >
            Delete
          </button> : ""}
          <p>
          {product.stock >= 4
              ? <span className="in-stock">In Stock</span>
              : product.stock >= 1
              ? <span className="x-remaining"> {`${product.stock} Remaining`}</span>
              : <span className="out-of-stock">Out of Stock</span>}
              </p>
        </div>     
        <div className="product-price">
          <p>${product.price.toLocaleString()}</p>
          <button className="main-button">
            <Link to={`/products/${product._id}`}>Go to product</Link>
          </button>
          {isAdmin ? <button className="main-button">
            <Link to={`/products/editItem/${product._id}`}>Edit</Link>
          </button> : ""}
        </div>
      </div>
    </div>
  );
}
