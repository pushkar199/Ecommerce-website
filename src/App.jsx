import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Product from "./components/Product";


function App() {
  
  return (
    <>
      <Nav />
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/product/:id"  element={ <Product/> } />
        <Route path="/cart"  element={<Cart/>} />
        
      </Routes>
    </>
  );
}

export default App;
