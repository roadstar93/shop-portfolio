import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Products() {
  const [products, setProducts] = useState([]);
  const [catProducts, setCatProducts] = useState([]);
  const [categories, setCategories] = useState("All");

  const updateCategory = (cat) => {
    if (cat === "") {
      const allProds = products.filter(({ category }) => category.length > 1); //Find all products
      return allProds;
    } else {
      const categoryProds = products.filter(({ category }) => category === cat); //Find products where category is the same as selected box
      return categoryProds;
    }
  };

  async function getDataFromDB() {
    let res = await axios.get("//localhost:3001/api/getProd");
    let data = res.data;
    setProducts(data);
    setCatProducts(data);
  }

  const handleDelete = (p) => {
    //Send updated to server
    try {
      axios.delete(`//localhost:3001/api/deleteProd/${p}`); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
      console.log("Product Deleted");
    } catch (error) {
      alert("Error " + error.message);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <Container fluid>
        <Row className="ml-auto mr-auto">
          <Col xs={0} md={3}>
            <Form>
              <Form.Check
                type="radio"
                onChange={() => {
                  setCategories("Laptop, Tablets and Smartphones");
                  setCatProducts(
                    updateCategory("Laptop, Tablets and Smartphones")
                  );
                }}
                checked={categories === "Laptop, Tablets and Smartphones"}
                value="Laptop, Tablets and Smartphones"
                aria-label="radio 1"
                label="Laptop, Tablets and Smartphones"
              />
              <Form.Check
                type="radio"
                onChange={() => {
                  setCategories("PC, Hardware & Software");
                  setCatProducts(updateCategory("PC, Hardware & Software"));
                }}
                checked={categories === "PC, Hardware & Software"}
                value="PC, Hardware & Software"
                aria-label="radio 1"
                label="PC, Hardware & Software"
              />
              <Form.Check
                type="radio"
                onChange={() => {
                  setCategories("TV, Audio & Photo");
                  setCatProducts(updateCategory("TV, Audio & Photo"));
                }}
                checked={categories === "TV, Audio & Photo"}
                value="TV, Audio & Photo"
                aria-label="radio 1"
                label="TV, Audio & Photo"
              />
              <Form.Check
                type="radio"
                onChange={() => {
                  setCategories("Gaming");
                  setCatProducts(updateCategory("Gaming"));
                }}
                checked={categories === "Gaming"}
                value="Gaming"
                aria-label="radio 1"
                label="Gaming"
              />
              <Form.Check
                type="radio"
                onChange={() => {
                  setCategories("Auto");
                  setCatProducts(updateCategory("Auto"));
                }}
                checked={categories === "Auto"}
                value="Auto"
                aria-label="radio 1"
                label="Auto"
              />
              <Form.Check
                type="radio"
                onChange={() => {
                  setCategories("Fashion");
                  setCatProducts(updateCategory("Fashion"));
                }}
                checked={categories === "Fashion"}
                value="Fashion"
                aria-label="radio 1"
                label="Fashion"
              />
              <Form.Check
                type="radio"
                onChange={() => {
                  setCategories("All");
                  setCatProducts(updateCategory(""));
                }}
                checked={categories === "All"}
                value="All"
                aria-label="radio 1"
                label="All"
              />

              <Button type="submit">Submit</Button>
            </Form>
          </Col>
          <Col xs={12} md={9}>
            <Row>
              {catProducts.map((product) => (
                <Col key={product._id} xs={10} md={6} xl={4} className="mb-3">
                  <Product product={product} handleDelete={handleDelete} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Button onClick={getDataFromDB} size="small">
        Get data
      </Button>
      <Link to="/products/addItem">Add Product</Link>
    </div>
  );
}

export default Products;
