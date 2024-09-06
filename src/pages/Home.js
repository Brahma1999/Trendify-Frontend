import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

export default function Home() {
  return (
    <div>
      <Navbar>
        <ProductList />
      </Navbar>
    </div>
  );
}
