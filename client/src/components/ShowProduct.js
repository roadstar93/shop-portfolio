import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default React.memo(function ShowProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    id: ""
  });


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
        id: data._id
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

      {console.log("rendering")}
    </div>
  );
});