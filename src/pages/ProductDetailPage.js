import React from "react";
import Navbar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/components/ProductDetail";

export default function ProductDetailPage() {
  return (
    <div>
      <Navbar>
        <ProductDetail />
      </Navbar>
    </div>
  );
}
