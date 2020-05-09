import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [noOfProducts, setNoOfProducts] = useState("");

  async function getDataFromDB() {
    let res = await axios.get("//localhost:3001/api/getProd");
    let data = res.data;
    setProducts(data);
  }

  function updateProducts(input) {
    if (input === "add") {
      let products = noOfProducts + 1;
      setNoOfProducts(products);
    } else {
      let products = noOfProducts - 1;
      setNoOfProducts(products);
    }
  }

  useEffect(() => {
    const getProducts = () => {
      if (JSON.parse(localStorage.getItem("products"))) {
        let allproducts = JSON.parse(localStorage.getItem("products")).length;
        setNoOfProducts(allproducts);
      } else {
        let allproducts = "";
        setNoOfProducts(allproducts);
      }
    };
    getProducts();
  }, [noOfProducts]);

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <ProductContext.Provider value={{ products, updateProducts, noOfProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};
