import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

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

      {products.map(product => (
        <Product key={product._id} product={product} />
      ))}
      <Button onClick={getDataFromDB} size="small">
        Get data
      </Button>
      <Link to="/products/addItem">Add Product</Link>
    </div>
  );
}

export default Products;
