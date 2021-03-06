const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Product = require("../models/products");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Save product
router.post("/api/addProd", (req, res, next) => {
  const { title, price, category, description, image, stock } = req.body;

  const newProduct = {
    title: title,
    stock: stock,
    price: price,
    category: category,
    description: description,
    images: image,
  };
  console.log(newProduct);
  Product.create(newProduct, function (error, newProduct) {
    if (error) {
      console.log(`Error creating new product: ${error}`);
      res.status(400).json(`Error creating new product ${error}`);
    } else {
      console.log(`New product added succesfully`);
      res.status(200).json(`Product added successfully ${newProduct}`);
    }
  });
});

//Get all products
router.get("/api/getProd", (req, res) => {
  Product.find({}, function (error, products) {
    if (error) {
      res.status(400).json(`Error getting products ${error}`);
      res.send("Error: " + error.message);
    } else {
      res.status(200).send(products);
    }
  });
});

//Get individual product
router.get("/api/getProd/:id", (req, res) => {
  Product.findById(req.params.id)
    .populate("comments")
    .exec(function (error, product) {
      if (error) {
        res.status(400).json(`Error getting products ${error}`);
        res.send("Error: " + error.message);
      } else {
        console.log(`Retrived product ${product._id}`);
        res.status(200).send(product);
      }
    });
});

//Update product
router.put("/api/updateProd/:id", (req, res) => {
  const { title, price, category, description, image, stock } = req.body;

  const updateProd = {
    stock: stock,
    title: title,
    price: price,
    category: category,
    description: description,
    images: image,
  };

  Product.findByIdAndUpdate(req.params.id, updateProd, function (
    error,
    updatedProduct
  ) {
    if (error) {
      res.status(400).json(`Error getting products ${error}`);
    } else {
      console.log(`Product updated successfully ${updatedProduct}`);
      res.status(200).json(`Product updated successfully ${updatedProduct}`);
    }
  });
});

//Update Stock
router.put("/api/updateStock/:id", (req, res) => {
  const { stock } = req.body;

  let updatedStock = {
    stock,
  };

  Product.findByIdAndUpdate(req.params.id, updatedStock, function (
    error,
    updatedProduct
  ) {
    if (error) {
      res.status(400).json(`Error getting products ${error}`);
    } else {
      console.log(`Product updated successfully ${updatedProduct}`);
      res.status(200).json(`Product updated successfully ${updatedProduct}`);
    }
  });
});

//Delete product
router.delete("/api/deleteProd/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, function (error) {
    if (error) {
      console.log("There was a problem removing the product");
    } else {
      console.log("Product deleted");
      res.status(200).json(`Product deleted successfully`);
    }
  });
});

module.exports = router;
