import React from 'react'
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <h1>Navbar component</h1>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
        </div>
    )
}
