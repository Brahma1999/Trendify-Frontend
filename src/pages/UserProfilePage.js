import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import Navbar from "../features/navbar/Navbar";

export default function UserProfilePage() {
  return (
    <div>
      <Navbar>
        <UserProfile />
      </Navbar>
    </div>
  );
}
