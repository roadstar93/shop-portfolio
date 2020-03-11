import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function Product({product}) {
    const classes = useStyles();

  return (
    <div>
      <Card key={product._id} className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Testing stuff
          </Typography>
          <Typography variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {product.category}
          </Typography>
          <Typography variant="body2" component="p">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small"><Link to={`/products/${product._id}`}>Go to product</Link></Button>
        </CardActions>
      </Card>
    </div>
  );
}
