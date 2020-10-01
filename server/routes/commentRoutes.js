const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/products");
const Comment = require("../models/comments");

//Create Comment
router.post("/api/:id/comment", function (req, res) {
  const { comment, userID, username } = req.body;
  const newComment = { comment: comment, userID: userID, username: username };
  Product.findById(req.params.id, function (error, prod) {
    if (error) {
      console.log(`Error finding product: ${error}`);
      res.status(400).json(`Error finding product ${error}`);
    } else {
      Comment.create({comment:comment}, function (error, comm) {
        if (error) {
          console.log(`Error creating new comment: ${error}`);
        } else {
          comm.text = newComment.comment;
          comm.author.id = newComment.userID;
          comm.author.name = newComment.username;
          comm.save();
          prod.comments.push(comm);
          prod.save();
          console.log(`Added new comment: ${comm}`);
        }
        res.status(200).json(`Comment added successfully to ${prod}`);
      });
    }
  });
});

module.exports = router;
