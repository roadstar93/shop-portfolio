import React, { useState, useEffect } from "react";
import axios from "axios";
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

function Products() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);

  async function getDataFromDB() {
    let res = await axios.get("//localhost:3001/api/getProd");
    let  data = res.data
    setProjects(data);
  }

//   useEffect(() => {
//    //getDataFromDB();
//   }, []);

  return (
    <div>
      <h1>Products</h1>

      {projects.map(project => (
        <Card key={project._id} className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Testing stuff
            </Typography>
            <Typography variant="h5" component="h2">
              {project.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {project.category}
            </Typography>
            <Typography variant="body2" component="p">
              {project.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
       <Button onClick={getDataFromDB} size="small">Get data</Button>
      <Link to="/products/addItem">Add Product</Link>
    </div>
  );
}

export default Products;
