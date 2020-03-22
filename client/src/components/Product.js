import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";



export default function Product({ product }) {


  const handleDelete = () => {
    //Send updated to server
    try {
      axios.delete(`//localhost:3001/api/deleteProd/${product._id}`); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
      console.log("Product Deleted");
    } catch (error) {
      alert("Error " + error.message);
    }
  };

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Button variant="outline-primary">
            <Link to={`/products/editItem/${product._id}`}>Edit</Link>
          </Button>
          <Button variant="outline-primary">
            <Link to={`/products/${product._id}`}>Go to product</Link>
          </Button>
          <Button onClick={handleDelete} variant="primary">
           Delete
          </Button>
        </Card.Body>
      </Card>
      {console.log(product.images)}
    </div>
  );
}
