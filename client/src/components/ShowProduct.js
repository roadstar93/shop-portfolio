import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ShowProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  async function getDataFromDB() {
    let res = await axios.get(`//localhost:3001/api/getProd/${id}`);
    let data = res.data;
    setProduct(data);
  }

  
  useEffect(() => {
    getDataFromDB();
  });

  return (
    <div>
      <h1>Show product</h1>
      {console.log(id)}
      {console.log(product)}
    </div>
  );
}
