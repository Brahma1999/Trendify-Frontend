import React from "react";
import Navbar from "../features/navbar/Navbar";
import AdminProductDetail from "../features/admin/components/AdminProductDetail";
export default function AdminProductDetailPage() {
  return (
    <div>
      <Navbar>
        <AdminProductDetail />
      </Navbar>
    </div>
  );
}
