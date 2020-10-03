import React, { useEffect, useState } from "react";
import ReviewAdd from "./ReviewAdd";
import Star from "./Star";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/AllReviews.css";
import "../styles/StarRating.css";

const AllReviews = ({ product, user }) => {
  // const [reviews, setReviews] = useState([]);

  // const newReview = (i) => {
  //   setReviews(reviews.push(i));
  //   console.log(`Comment pushed ${i.text}`);
  //   console.log(reviews)
  // };

  // useEffect(() => {
  //   setReviews(product.comments);
  // }, [reviews]);
  return (
    <div className="reviews-container">
      {console.log("Rendering All reviews")}
      <h3>Reviews :rating will show here</h3>
      {product.comments.length === 0 ? (
        <p className="review-text-none pl-4 mb-3">
          Be the first one to review this product
        </p>
      ) : (
        product.comments.map((comm) => (
          <Col key={comm._id} className="review mb-3 pr-0 pl-4">
            <p className="review-author">{comm.author.name}</p>
            <div className="review-rating">
              <p className="mb-0">Rating:</p>{" "}
              <div className="star-rating ml-1">
                {[...Array(comm.rating)].map((n, i) => (
                  <Star key={i} selected={i < comm.rating} />
                ))}
              </div>
            </div>
            <p className="review-text">{comm.text}</p>
          </Col>
        ))
      )}
      <Row className="pl-5">
        {user ? <ReviewAdd /> : ""}
      </Row>
    </div>
  );
};

export default AllReviews;
