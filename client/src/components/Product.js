import React from "react";
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

export default function Product({project}) {
    const classes = useStyles();
  return (
    <div>
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
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </div>
  );
}
