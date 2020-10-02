import React, { useState, useEffect, useContext } from "react";
import CommentAdd from "./CommentAdd";
import axios from "axios";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Modal from "react-bootstrap/Modal";
import "../styles/ShowProduct.css";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContex";
import AllReviews from "./AllReviews";

export default React.memo(function ShowProduct() {
  const { updateProducts } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState({
    id: "",
    stock: "",
    amount: 1,
    title: "",
    price: "",
    comments: [],
    category: "",
    description: "",
    image: "",
    images: [],
  });

  const saveToLocal = () => {
    let allProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (allProducts.find((e) => e.id === product.id)) {
      setProduct({ ...product, amount: product.amount + 1 });
      // let fewProducts = allProducts.slice(0, allProducts.find((e) => e.id === product.id))
      allProducts = allProducts.filter((e) => e.id !== product.id);
      localStorage.setItem("products", JSON.stringify(allProducts));
    }
    allProducts.push(product);
    localStorage.setItem("products", JSON.stringify(allProducts));
    updateProducts("add");
    // console.log(allProducts.find((e) => e.id === product.id));
    // console.log(localStorage.getItem("products"))
  };
  // const test = products.find(({ _id }) => _id === id);  ==> Get a project from an array based on the ID from params

  useEffect(() => {
    async function getDataFromDB() {
      let res = await axios.get(`//localhost:3001/api/getProd/${id}`);
      let data = res.data;
      console.log(res.data);
      setProduct({
        ...product,
        stock: data.stock,
        id: data._id,
        title: data.title,
        price: data.price,
        comments: data.comments,
        category: data.category,
        description: data.description,
        image: data.images[0],
        images: data.images, //data.images.slice(1, 3),
      });
    }
    getDataFromDB();
  }, [product.title]);

  return (
    <Container fluid="xl" className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.category}</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="w-100">
        <Col md={5}>
          <Row>
            <Col md={12} className="product-image">
              <img
                className="d-block w-100"
                src={product.image}
                alt={product.title}
                onClick={() => setModalShow(true)}
              ></img>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="product-images">
              {product.images.map((img, id) => {
                if (img !== "") {
                  return (
                    <img
                      onClick={() =>
                        setProduct({
                          ...product,
                          image: img,
                        })
                      }
                      key={id}
                      src={img}
                      alt={product.title}
                    />
                  );
                }
              })}
            </Col>
          </Row>
        </Col>
        <Col md={1}></Col>
        <Col md={5}>
          <h2>{product.title}</h2>
          <Col md={10} className="product-header mt-3">
            <p>Price:</p>
            <p>${product.price.toLocaleString()}</p>
          </Col>
          <Col md={10} className="product-header">
            <p>Rating:</p>
            <p>$$$$$$</p>
          </Col>
          <Col md={10} className="product-header">
            <p>Stock:</p>
            {product.stock >= 4 ? (
              <span className="in-stock">In Stock</span>
            ) : product.stock >= 1 ? (
              <span className="x-remaining">
                {" "}
                {`${product.stock} Remaining`}
              </span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </Col>
          <Col md={10} className="product-add">
            {product.stock === 0 ? (
              <button className="main-button-disabled" disabled>
                Add to cart
              </button>
            ) : (
              <button onClick={saveToLocal} className="main-button">
                Add to cart
              </button>
            )}
          </Col>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={12}>
          <h4>Description:</h4>
          <p>{product.description}</p>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <AllReviews product={product} />
          <Row>{user ? <CommentAdd /> : ""}</Row>
        </Col>
      </Row>
      <MyVerticallyCenteredModal
        product={product}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Container>
  );
});

function MyVerticallyCenteredModal(props) {
  const [product, setProduct] = useState({
    image: props.product.image,
  });
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.product.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={12} className="modal-product-images">
            {product.image === "" ? (
              <img
                className="d-block w-100"
                src={props.product.image}
                alt={props.product.title}
              ></img>
            ) : (
              <img
                className="d-block w-100"
                src={product.image}
                alt={props.product.title}
              ></img>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={12} className="product-images">
            {props.product.images.map((img, id) => {
              if (img !== "") {
                return (
                  <img
                    onClick={() =>
                      setProduct({
                        ...product,
                        image: img,
                      })
                    }
                    key={id}
                    src={img}
                    alt={product.title}
                  />
                );
              }
            })}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
