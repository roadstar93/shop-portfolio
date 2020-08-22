import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ShoppingCart.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const { updateProducts } = useContext(ProductContext);

  const deleteItem = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    localStorage.setItem(
      "products",
      JSON.stringify(products.filter((product) => product.id !== id))
    );
    updateProducts();
  };

  const handleChange = (e) => {
    setQuantity({ ...quantity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (id) => {
    const singleProd = products.filter((product) => product.id === id);
    let productAmount = quantity[id];
    let objIndex = singleProd.findIndex((obj) => obj.id === id);
    singleProd[objIndex].amount = productAmount;
    let remainingProducts = products.filter((product) => product.id !== id);
    let newProducts = singleProd.concat(remainingProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
    setTotalValue(
      newProducts.reduce((a, { amount, price }) => a + amount * price, 0)
    );
    console.log(newProducts);
  };

  useEffect(() => {
    const getProducts = () => {
      let allproducts = JSON.parse(localStorage.getItem("products")) || [];
      setProducts(allproducts);
      setTotalValue(
        allproducts.reduce((a, { amount, price }) => a + amount * price, 0)
      );
    };
    getProducts();
  }, []);
  return (
    <Container fluid="lg" className="mb-3">
      <h1>Shopping Cart</h1>
      <Row>
        {products.map((product, index) => (
          <Col key={index} xs={12} className="products">
            <div className="product-img">
              <Button
                onClick={() => {
                  deleteItem(product.id)
                }}
                variant="primary"
              >
                Remove
              </Button>
              <img src={product.images[0]} alt={product.title} />
              <Link to={`/products/${product.id}`}>
                <h4>{product.title}</h4>
              </Link>
            </div>
            <div className="product-details">
              <Form.Group
                onChange={handleChange}
                className="product-amount"
                controlId="formGroupEmail"
              >
                <Form.Label className="pr-1">Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  name={product.id}
                  defaultValue={product.amount}
                  as="select"
                >
                  <option>{product.amount}</option>
                  <option onClick={() => handleSubmit(product.id)}>1</option>
                  <option onClick={() => handleSubmit(product.id)}>2</option>
                  <option onClick={() => handleSubmit(product.id)}>3</option>
                  <option onClick={() => handleSubmit(product.id)}>4</option>
                  <option onClick={() => handleSubmit(product.id)}>5</option>
                  </Form.Control>
                {/* {quantity[product.id] ?  <Button onClick={() => handleSubmit(product.id)} type="submit">
                  Update
                </Button> : <Button disabled type="submit">
                  Update
                </Button> } */}               
              </Form.Group>
              <h5>Price: $ {product.price.toLocaleString()}</h5>
            </div>
          </Col>
        ))}
      </Row>
      <Row>
        <Col className="d-flex justify-content-end align-items-center" xs={12}>
          <h4>Total: $ {totalValue.toLocaleString()}</h4>
          <Button className="ml-2" variant="outline-primary">
            Continue
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingCart;
