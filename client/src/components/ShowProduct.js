import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default React.memo(function ShowProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    Title: "",
    Price: "",
    Category: "",
    Description: "",
    Id: ""
  });

  async function getDataFromDB() {
    let res = await axios.get(`//localhost:3001/api/getProd/${id}`);
    let data = res.data;
    setProduct({
      ...product,
      Title: data.title,
      Price: data.price,
      Category: data.category,
      Description: data.description,
      Id: data._id
    });
  }

  useEffect(() => {
    getDataFromDB();
  },[]);

  return (
    <div>
      <h1>Show product</h1>
            
  <h4>{product.Title}</h4>
  <h4>{product.Price}</h4>
  <h4>{product.Description}</h4>
  {console.log("rendering")}
    </div>
  );
});
