import React from "react";
import ProductForm from "../features/admin/components/ProductForm";
import Navbar from "../features/navbar/Navbar";

export default function AdminProductFormPage() {
  return (
    <div>
      <Navbar>
        <ProductForm />
      </Navbar>
    </div>
  );
}
