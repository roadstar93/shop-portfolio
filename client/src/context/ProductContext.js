import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = props => {
  const [products, setProducts] = useState("testing from context");

  const getProducts = data => {
    setProducts(data);
  };

  return (
      <ProductContext.Provider value={{getProducts, products}}>
          {props.children}
      </ProductContext.Provider>
  )
}
