import React from "react";
import Navbar from "../features/navbar/Navbar";
import Cart from "../features/cart/Cart";

export default function CartPage() {
  return (
    <div>
      <Navbar>
        <Cart />
      </Navbar>
    </div>
  );
}
