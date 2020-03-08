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

  return (
    <div>
      <h1>Add prod page</h1>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" />
        <TextField id="standard-basic" label="Price" />
        <TextField id="standard-basic" label="Category" />
      </form>
    </div>
  );
}
