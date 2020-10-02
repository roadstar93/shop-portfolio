import React from "react";
import ReviewAdd from "./ReviewAdd";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/AllReviews.css";

const AllReviews = ({ product, user }) => {
  return (
    <div className="reviews-container">
      <h3>Reviews :rating will show here</h3>
        {product.comments.length === 0
          ? "Be the first to review this product"
          : product.comments.map((comm) => (
              <Col key={comm._id} className="review mb-3 pr-0 pl-4">
                <p className="review-author">{comm.author.name}</p>
                <p className="review-rating">Rating: "Will be added"</p>
                <p className="review-text">{comm.text}</p>
              </Col>
            ))}
        <Row className="pl-5">{user ? "": <ReviewAdd /> }</Row>
    </div>
  );
};

export default AllReviews;
