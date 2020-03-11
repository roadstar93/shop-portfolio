import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/Notfound";
import AddProd from "./components/AddProd";
import ShowProduct from "./components/ShowProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/products/addItem" component={AddProd} />
          <Route exact path="/products/:id" component={ShowProduct} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
