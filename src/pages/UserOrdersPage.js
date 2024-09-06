import React from "react";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";
export default function UserOrdersPage() {
  return (
    <div>
      <Navbar>
        <UserOrders />
      </Navbar>
    </div>
  );
}
