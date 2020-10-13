import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function EditProd() {
  let history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    stock:"",
    price: "",
    category: "",
    description: "",
    image: "",
    image1: "",
    image2: "",
    image3: "",
  });

  const [textfields, setTextFields] = useState({
    title: "",
    stock:"",
    price: "",
    category: "",
    description: "",
    image1: "",
    image2: "",
    image3: "",
  });

  const handleChange = (e) => {
    setTextFields({ ...textfields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const output = {
      title: textfields.title,
      stock: textfields.stock,
      price: textfields.price,
      category: textfields.category,
      description: textfields.description,
      image: [textfields.image1, textfields.image2, textfields.image3],
    };

    e.preventDefault();

    //Send updated to server
    try {
      axios.put(`/api/updateProd/${id}`, output); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
    } catch (error) {
      alert("Error in post" + error.message);
    }
    history.goBack();
  };

  useEffect(() => {
    async function getDataFromDB() {
      let res = await axios.get(`/api/getProd/${id}`);
      let data = res.data;
      setProduct({
        ...product,
        title: data.title,
        stock: data.stock,
        price: data.price,
        category: data.category,
        description: data.description,
        image: [],
        image1: data.images[0],
        image2: data.images[1],
        image3: data.images[2],
      });
      console.log(data);
      setTextFields({
        ...textfields,
        title: data.title,
        stock: data.stock,
        price: data.price,
        category: data.category,
        description: data.description,
        image1: data.images[0],
        image2: data.images[1],
        image3: data.images[2],
      });
    }
    getDataFromDB();
  }, [id]);

  return (
    <div>
      <h1>Edit prod page</h1>
      <form onSubmit={handleSubmit} noValidate>
        <Row className="w-100 mx-3">
          <Col xs={5}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={textfields.title}
                placeholder="Product title"
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={textfields.price}
                placeholder="Product price"
                onChange={handleChange}
                name="price"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                value={textfields.stock}
                placeholder="Stock amount"
                onChange={handleChange}
                name="stock"
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={textfields.category}
                placeholder="Category"
                onChange={handleChange}
                name="category"
                as="select"
              >
                <option>Laptop, Tablets and Smartphones</option>
                <option>PC, Hardware & Software</option>
                <option>TV, Audio & Photo</option>
                <option>Gaming</option>
                <option>Auto</option>
                <option>Fashion</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Row className="w-100">
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Image 1</Form.Label>
                <Form.Control
                  type="text"
                  value={textfields.image1}
                  placeholder="Image link"
                  onChange={handleChange}
                  name="image1"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Image 2</Form.Label>
                <Form.Control
                  type="text"
                  value={textfields.image2}
                  placeholder="Image link"
                  onChange={handleChange}
                  name="image2"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Image 3</Form.Label>
                <Form.Control
                  type="text"
                  value={textfields.image3}
                  placeholder="Image link"
                  onChange={handleChange}
                  name="image3"
                />
              </Form.Group>
            </Col>
          </Row>
          <Col xs={5}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="4"
                value={textfields.description}
                onChange={handleChange}
                name="description"
              />
            </Form.Group>
            <Button type="submit" variant="outline-primary">
              Submit
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}
