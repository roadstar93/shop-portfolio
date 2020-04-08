import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function AddProd() {
  const classes = useStyles();
  const [textfields, setTextFields] = React.useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: [],
    image1: "",
    image2: "",
    image3: "",
  });

  const handleChange = (e) => {
    setTextFields({ ...textfields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let images = [textfields.image1, textfields.image2, textfields.image3];
    const output = {
      title: textfields.title,
      price: textfields.price,
      category: textfields.category,
      description: textfields.description,
      image: images,
    };

    console.log(output);

    try {
      axios.post("//localhost:3001/api/addProd", output); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
    } catch (error) {
      alert("Error in post" + error.message);
    }
    setTextFields({
      ...textfields,
      title: "",
      price: "",
      category: "",
      description: "",
      image1: "",
      image2: "",
      image3: "",
    });
  };

  return (
    <div>
      <h1>Add a new product:</h1>
      <form onSubmit={handleSubmit} className={classes.root} noValidate>
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
