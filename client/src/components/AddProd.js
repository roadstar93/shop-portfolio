import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    image1:"",
    image2:"",
    image3:"",
  });

  const handleChange = (e) => {
    setTextFields({ ...textfields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let images = [textfields.image1,textfields.image2,textfields.image3];
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
      <h1>Add prod page</h1>
      <form onSubmit={handleSubmit} className={classes.root} noValidate>
        <TextField
          value={textfields.title}
          onChange={handleChange}
          name="title"
          id="standard-basic"
          label="Title"
        />
        <TextField
          value={textfields.price}
          onChange={handleChange}
          name="price"
          id="standard-basic"
          label="Price"
        />
        <TextField
          value={textfields.category}
          onChange={handleChange}
          name="category"
          id="standard-basic"
          label="Category"
        />
        <TextField
          value={textfields.image1}
          onChange={handleChange}
          id="standard-basic"
          name="image1"
          label="Image"
        />
        <TextField
          value={textfields.image2}
          onChange={handleChange}
          id="standard-basic"
          name="image2"
          label="Image"
        />
        <TextField
          value={textfields.image3}
          onChange={handleChange}
          id="standard-basic"
          name="image3"
          label="Image"
        />
        <TextField
          value={textfields.description}
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
