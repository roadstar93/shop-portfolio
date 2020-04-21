import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
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
    <ProductContext.Provider value={{ products }}>
      {props.children}
    </ProductContext.Provider>
  );
};
