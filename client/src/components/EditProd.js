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
    price: "",
    category: "",
    description: "",
    image: "",
    image1:"",
    image2:"",
    image3:"",
  });

  const [textfields, setTextFields] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    image1:"",
    image2:"",
    image3:"",
  });

  const handleChange = e => {
    setTextFields({ ...textfields, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    const output = {
      title: textfields.title,
      price: textfields.price,
      category: textfields.category,
      description: textfields.description,
      image: [textfields.image1,textfields.image2,textfields.image3]
    };

    e.preventDefault();

    //Send updated to server
    try {
      axios.put(`//localhost:3001/api/updateProd/${id}`, output); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
      console.log(output + " sent");
    } catch (error) {
      alert("Error in post" + error.message);
    }
    history.goBack();
  };

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
        image: [],
        image1: data.images[0],
        image2:data.images[1],
        image3:data.images[2],
      });
      console.log(data);
      setTextFields({
        ...textfields,
        title: data.title,
        price: data.price,
        category: data.category,
        description: data.description,
        image1: data.images[0],
        image2:data.images[1],
        image3:data.images[2],
      });
    }
    getDataFromDB();
  }, []);

  return (
    <div>
      <h1>Edit prod page</h1>
      <form onSubmit={handleSubmit} noValidate>
      <Row className="w-100">
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
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={textfields.category}
                placeholder="Category"
                onChange={handleChange}
                name="category"
              />
            </Form.Group>
          </Col>
          <Row className="w-100">
            <Col>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Image 1</Form.Label>
                <Form.Control
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
            <Button type="submit" variant="outline-primary">Submit</Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}
