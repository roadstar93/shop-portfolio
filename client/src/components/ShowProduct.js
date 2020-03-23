import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { ProductContext } from "../context/ProductContext";

export default React.memo(function ShowProduct() {
  // const { products } = useContext(ProductContext);
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  // const test = products.find(({ _id }) => _id === id);  ==> Get a project from an array based on the ID from params

  useEffect(() => {
    async function getDataFromDB() {
      let res = await axios.get(`//localhost:3001/api/getProd/${id}`);
      let data = res.data;
      setProduct({
        ...product,
        title: data.title,
        price: data.price,
        category: data.category,
        description: data.description,
        image: data.images
      });
    }
    getDataFromDB();
  }, []);

  return (
    <div>
      <h1>Show product</h1>
      <h4>{product.title}</h4>
      <h4>{product.price}</h4>
      <h4>{product.description}</h4>
    </div>
  );
});
