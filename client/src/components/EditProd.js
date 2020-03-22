import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function EditProd() {
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: ""
  });

  const [textfields, setTextFields] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: ""
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
      image: [textfields.image]
    };

    e.preventDefault();

    //Send updated to server
    try {
      axios.put(`//localhost:3001/api/updateProd/${id}`, output); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
      console.log(output + " sent");
    } catch (error) {
      alert("Error in post" + error.message);
    }

    //reset fields
    setTextFields({
      ...textfields,
      title: "",
      price: "",
      category: "",
      description: "",
      image: []
    });
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
        image:data.images[0]
      });
      console.log(data)
      setTextFields({
        ...textfields,
        title: data.title,
        price: data.price,
        category: data.category,
        description: data.description,
        image: data.images
      });
    }
    getDataFromDB();
  }, []);

  return (
    <div>
      <h1>Edit prod page</h1>
      <form onSubmit={handleSubmit} className={classes.root} noValidate>
        <TextField
          onChange={handleChange}
          name="title"
          id="standard-basic"
          label="Title"
        />
        <TextField
          onChange={handleChange}
          name="price"
          id="standard-basic"
          label="Price"
        />
        <TextField
          onChange={handleChange}
          name="category"
          id="standard-basic"
          label="Category"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="image"
          label="Image"
        />
        <TextField
          onChange={handleChange}
          id="soutlined-multiline-static"
          multiline
          rows="4"
          name="description"
          label="Description"
        />
        <Button type="submit" color="primary">
          Send
        </Button>
      </form>
    </div>
  );
}
