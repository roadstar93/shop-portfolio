import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Signup from "./components/Signup";
import Notfound from "./components/Notfound";
import AddProd from "./components/AddProd";
import ShowProduct from "./components/ShowProduct";
import EditProd from "./components/EditProd";
import Footer from "./components/Footer";
import { ProductProvider } from "./context/ProductContext";
import ShoppingCart from "./components/ShoppingCart";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <ProductProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/addItem" component={AddProd} />
          <Route exact path="/products/editItem/:id" component={EditProd} />
          <Route exact path="/products/:id" component={ShowProduct} />
          <Route exact path="/cart" component={ShoppingCart} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signup" component={Signup} />
          <Route component={Notfound} />
        </Switch>
        </ProductProvider>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
