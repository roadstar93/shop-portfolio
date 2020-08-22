import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import "../styles/Notfound.css";

export default function Notfound() {
  return (
    <Container fluid="lg" className="not-found mb-3">
      <div>
        <h1>4<span>0</span>4</h1>
        <p>Sorry the page you are looking for does not exist!</p>
      </div>
     <Link to="/"><h3>Go Back</h3></Link> 
    </Container>
  );
}
