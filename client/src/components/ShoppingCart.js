import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContex";
import Login from "./Login";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/ShoppingCart.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ShoppingCart = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [totalValue, setTotalValue] = useState("");
  const [PaymentOption, setPaymentOption] = useState("After Delivery");
  const { updateProducts } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const { userAddres } = useContext(UserContext);

  function updateState() {
    setModalShow(!modalShow);
  }

  const deleteItem = (id) => {
    const singleProd = products.filter((product) => product.id === id);
    let objIndex = singleProd.findIndex((obj) => obj.id === id);
    let productAmount = singleProd[objIndex].amount;
    let productPrice = singleProd[objIndex].price * productAmount;
    setTotalValue(totalValue - productPrice);
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
  const handleChangePayment = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleSubmit = (e) => {
    var currDate = new Date();
    var dd = String(currDate.getDate()).padStart(2, "0");
    var mm = String(currDate.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = currDate.getFullYear();

    const output = {
      userID: user.id,
      id: uuidv4(),
      products: products,
      address: userAddres,
      paymentMethod: PaymentOption,
      shipping: totalValue > 300 ? "Free" : "Paid",
      totalAmount: totalValue > 300 ? totalValue : totalValue + 10,
      date: mm + "/" + dd + "/" + yyyy,
    };
    try {
      // axios.put(`//localhost:3001/api/newOrder`, output);
      products.forEach((product) => {
        const singleProd = products.filter(
          (productz) => productz.id === product.id
        ); //Filter each product where the id is the same
        let objIndex = singleProd.findIndex((obj) => obj.id === product.id); //get index for each product
        let productAmount = singleProd[objIndex].amount; //get the value from the index
        let updatedStock;
        //If the amount is not changed we remove 1 item from stock
        if (productAmount > 0) {
          updatedStock = product.stock - productAmount;
        } else {
          updatedStock = product.stock - 1;
        }

        let outputStock = { stock: updatedStock };
        try {
          axios.put(`//localhost:3001/api/updateStock/${product.id}`, outputStock);
        } catch (error) {
          alert("Error in post" + error.message);
        }
        console.log(updatedStock);
      });
    } catch (error) {
      alert("Error in post" + error.message);
    }

    e.preventDefault();
  };

  const handleSubmitQuantity = (id) => {
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
    <div className="main-container">
      <h1 id="title">
        Sh<span>o</span>pping Cart
      </h1>
      <Container fluid="lg" className="cart-container mb-3">
        <Row className="pl-3">
          <h4>Items:</h4>
          {products.map((product, index) => (
            <Col key={index} xs={12} className="products">
              <div className="product-img">
                <Button
                  onClick={() => {
                    deleteItem(product.id);
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
                    <option onClick={() => handleSubmitQuantity(product.id)}>
                      1
                    </option>
                    <option onClick={() => handleSubmitQuantity(product.id)}>
                      2
                    </option>
                    <option onClick={() => handleSubmitQuantity(product.id)}>
                      3
                    </option>
                    <option onClick={() => handleSubmitQuantity(product.id)}>
                      4
                    </option>
                    <option onClick={() => handleSubmitQuantity(product.id)}>
                      5
                    </option>
                  </Form.Control>
                </Form.Group>
                <h5>Price: $ {product.price.toLocaleString()}</h5>
              </div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col
            className="d-flex justify-content-end align-items-center"
            xs={12}
          >
            <h4>Total: $ {totalValue.toLocaleString()}</h4>
          </Col>
        </Row>
        <Row className="order-info">
          <h4>Address:</h4>
          {user ? (
            <div>
              {userAddres ? (
                <div className="pl-4">
                  {" "}
                  <p>Country : {userAddres.country}</p>
                  <p>City : {userAddres.city}</p>
                  <p>Address : {userAddres.streetAdress}</p>
                  <p>Zip : {userAddres.zip}</p>
                </div>
              ) : (
                <p className="pl-4">
                  You do not have a default address set, please go to{" "}
                  <Link to={`/user/${user.id}`}>your account</Link> to set one
                  up
                </p>
              )}
            </div>
          ) : (
            <p>
              Please <span onClick={updateState}>log in</span> or if you do not
              have an account
              <span>
                {" "}
                <Link to="/signup">sign up</Link>
              </span>{" "}
              to set up an address.
            </p>
          )}
        </Row>
        <Row className="order-info">
          <h4>Shipping Details: </h4>
          {totalValue > 300 ? (
            <div>
              <input
                type="radio"
                defaultChecked
                value="free"
                name="shippingOption"
                aria-label="Radio button for following text input"
              />{" "}
              Free shipping with Yesterday Shipping.
            </div>
          ) : products.length < 1 ? (
            <p>No items in your cart.</p>
          ) : (
            <div>
              <input
                type="radio"
                defaultChecked
                value="paid"
                name="shippingOption"
                aria-label="Radio button for following text input"
              />{" "}
              $10 Shipping fee with Yesterday Shipping.
            </div>
          )}
        </Row>
        <Row className="pl-3">
          <h4>Payment:</h4>
          <Form.Group
            onChange={handleChange}
            className="product-amount"
            controlId="formGroupEmail"
          >
            <Form.Control
              type="text"
              name="PaymentOption"
              defaultValue="After Delivery"
              as="select"
              onChange={handleChangePayment}
            >
              <option>After delivery</option>
              <option>Debit/Credidt Card</option>
              <option>Paypal</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <div className="order-confirm">
          <p>
            Total including shipping fee: $
            {totalValue < 300
              ? (totalValue + 10).toLocaleString()
              : totalValue.toLocaleString()}
          </p>

          {user ? (
            <Button
              className="ml-2"
              variant="outline-primary"
              onClick={handleSubmit}
            >
              Confirm Order
            </Button>
          ) : (
            <Button disabled className="ml-2" variant="outline-primary">
              Confirm Order
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Login updateToast={props.onEnter} updateState={props.onHide} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShoppingCart;
