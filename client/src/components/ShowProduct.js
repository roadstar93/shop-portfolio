import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Modal from "react-bootstrap/Modal";
import "../styles/ShowProduct.css";
// import { ProductContext } from "../context/ProductContext";

export default React.memo(function ShowProduct() {
  // const { products } = useContext(ProductContext);
  const { id } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    images: [],
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
        image: data.images[0],
        images: data.images.slice(1, 3),
      });
    }
    getDataFromDB();
  }, []);

  return (
    <Container fluid="xl" className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
        <Breadcrumb.Item href={`/products/${product.category}`}>
          {product.category}
        </Breadcrumb.Item>
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
                      onClick={() => setModalShow(true)}
                      key={id}
                      src={img}
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
            <p>${product.price}</p>
          </Col>
          <Col md={10} className="product-header">
            <p>Rating:</p>
            <p>$$$$$$</p>
          </Col>
          <Col md={10} className="product-add">
            <Button variant="outline-primary">Add to cart</Button>
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
          <h4>Comments: </h4>
          <p> will be updated</p>
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
          <Col md={12} className="modal-product-image">
            <img
              className="d-block w-100"
              src={props.product.image}
              alt={props.product.title}
            ></img>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="product-images">
            {props.product.images.map((img, id) => {
              if (img !== "") {
                return <img key={id} src={img} />;
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
