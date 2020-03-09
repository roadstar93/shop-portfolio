const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post("/api/addProd", (req, res, next) => {
  const { Title, Price, Category, Description, Image } = req.body;

  const zaStuff = {
    Title ,
    Price,
    Category,
    Description,
    Image
  }

  console.log(zaStuff);
});


module.exports = router;