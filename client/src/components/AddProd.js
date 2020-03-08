import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    Price: Number,
    Category: "",
    Description: "",
    Image: ""
  });

  const handleChange = e => {
    setTextFields({ ...textfields, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Add prod page</h1>
      <form className={classes.root} noValidate autoComplete="off">
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
          id="soutlined-multiline-static"
          multiline
          rows="4"
          name="Description"
          label="Description"
        />
      </form>
    </div>
  );
}
