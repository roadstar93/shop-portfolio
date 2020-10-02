import React from 'react';
import Col from "react-bootstrap/Col";

const AllReviews = ({product}) => {
    return (
        <div>
            <h3>Reviews</h3>
            {product.comments.length === 0
              ? "Be the first to review this product"
              : product.comments.map((comm) => (
                  <Col key={comm._id} className="mb-3">
                    <p>{comm.text}</p>
                  </Col>
                ))}
        </div>
    );
}

export default AllReviews;
