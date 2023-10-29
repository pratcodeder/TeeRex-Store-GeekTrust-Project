import Products from "./component/Products.js";
import Header from "./component/Header.js";
import FilterSection from "./component/FilterSection.js";
import Cart from "./component/Cart.js";
import { Route, Routes } from "react-router-dom";
import * as React from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Header" element={<Header />} />

        <Route path="/FilterSection" element={<FilterSection />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
