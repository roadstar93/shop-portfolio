import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function AddProd() {
  const classes = useStyles();
  const [textfields, setTextFields] = React.useState({
    Title: "",
    Price: "",
    Category: "",
    Description: "",
    Image: ""
  });

  const handleChange = e => {
    setTextFields({ ...textfields, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    const output = {
      Title: textfields.Title,
      Price: textfields.Price,
      Category: textfields.Category,
      Description: textfields.Description,
      Image: textfields.Image
    };

    console.log(output);

    e.preventDefault();
    try {
      axios.post("//localhost:3001/api/addProd", output); // axios.post("//localhost:3001/api/addProd", output); used for dev enviroment testing
    } catch (error) {
      alert("Error in post" + error.message);
    }

    setTextFields({
      Title: "",
      Price: "",
      Category: "",
      Description: "",
      Image: ""
    });
  };

  return (
    <div>
      <h1>Add prod page</h1>
      <form onSubmit={handleSubmit} className={classes.root} noValidate>
        <TextField
          onChange={handleChange}
          name="Title"
          id="standard-basic"
          label="Title"
        />
        <TextField
          onChange={handleChange}
          name="Price"
          id="standard-basic"
          label="Price"
        />
        <TextField
          onChange={handleChange}
          name="Category"
          id="standard-basic"
          label="Category"
        />
        <TextField
          onChange={handleChange}
          id="standard-basic"
          name="Image"
          label="Image"
        />
        <TextField
          onChange={handleChange}
          id="soutlined-multiline-static"
          multiline
          rows="4"
          name="Description"
          label="Description"
        />
        <Button type="submit" color="primary">
          Send
        </Button>
      </form>
    </div>
  );
}
