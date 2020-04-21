import React, { useEffect, useState } from "react";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      let allproducts = JSON.parse(localStorage.getItem("products"));
      setProducts(allproducts);
    };
    getProducts();
  }, []);
  return (
    <div>
      <h1>Shopping Cart</h1>
      {products.map((product, id)=>(
          <h1 key={id}>Title: {product.title}</h1>
      ))}
    </div>
  );
};

export default ShoppingCart;
