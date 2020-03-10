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
  Product.find()
    .then(products => res.json(products))
    .catch(error => res.status(400).json(`Error getting products ${error}`));
});

module.exports = router;
