const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Product = require("../models/products");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post("/api/addProd", (req, res, next) => {
  const { Title, Price, Category, Description, Image } = req.body;

  const newProduct = {
    title: Title,
    price: Price,
    category: Category,
    description: Description,
    image: Image
  };

  Product.create(newProduct, function(error, newProduct) {
    if (error) {
      console.log(`Error creating new product: ${error}`);
    } else {
      res.redirect("/");
      console.log(`New product added succesfully`);
    }
  });
});

router.get("/api/getProd", (req, res) => {
  Product.find({}, function(error, products) {
    if (error) {
      res.status(400).json(`Error getting products ${error}`);
      res.send("Error: " + error.message);
    } else {
      res.send(products);
    }
  });
});

router.get("/api/getProd/:id", (req, res) => {
  Product.findById(req.params.id)
    .exec(function(error, product) {
      if (error) {
        res.status(400).json(`Error getting products ${error}`);
        res.send("Error: " + error.message);
      } else {
        console.log(product)
        res.send(product);
      }
    });
});

module.exports = router;
