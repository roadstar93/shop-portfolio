import React, { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [catProducts, setCatProducts] = useState([]);
  const [categories, setCategories] = useState("All");
  const [listView, setListView] = useState(false);

  const updateCategory = (cat) => {
    if (cat === "") {
      const allProds = products.filter(({ category }) => category.length > 1); //Find all products
      return allProds;
    } else {
      const categoryProds = products.filter(({ category }) => category === cat); //Find products where category is the same as selected box
      return categoryProds;
    }
  };

  const changeView = (e) => {
    setListView(!listView);
    e.preventDefault();
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
    <div className="main">
      <Container fluid>
        <Row className="ml-auto mr-auto mt-3">
          <Col xs={0} md={3} className="pr-0">
            <Form className="categories h-100 pl-3">
              <h1>Categories</h1>
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
                htmlFor="Laptop, Tablets and Smartphones"
                id="Laptop, Tablets and Smartphones"
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
                htmlFor="PC, Hardware & Software"
                id="PC, Hardware & Software"
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
                id="TV, Audio & Photo"
                htmlFor="TV, Audio & Photo"
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
                htmlFor="Gaming"
                id="Gaming"
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
                htmlFor="Auto"
                id="Auto"
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
                htmlFor="Fashion"
                id="Fashion"
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
                label="All Products"
                htmlFor="All Products"
                id="All Products"
              />
            </Form>
          </Col>
          <Col xs={12} md={9}>
            <Row className="products-top mx-0 mb-2">
              <div>
              <h2>
                {categories === "All" ? "Showing all products" : categories}
              </h2>
              <p className="mb-0">{catProducts.length} {catProducts.length === 1 ? "product" : "products" }</p>
              </div>
              <p className="mb-0">
                Product view:{" "}
                <button onClick={changeView}>
                  {listView ? (
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-card-list"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                      />
                      <circle cx="3.5" cy="5.5" r=".5" />
                      <circle cx="3.5" cy="8" r=".5" />
                      <circle cx="3.5" cy="10.5" r=".5" />
                    </svg>
                  ) : (
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-grid-3x3-gap-fill"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
                    </svg>
                  )}
                </button>
              </p>
            </Row>
            <Row>
              {catProducts.map((product) => (
                <Col key={product._id} xs={listView ? 4 : 10} className="mb-3">
                  <Product
                    listView={listView}
                    product={product}
                    handleDelete={handleDelete}
                  />
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
