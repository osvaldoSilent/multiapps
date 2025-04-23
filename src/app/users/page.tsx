'use client';

import { useEffect, useState } from "react";
import LoginForm from "@/components/login/LoginForm";
import UsersList from "@/components/users/UsersList";

export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex justify-center items-center">

      <UsersList />

    </div>
  );
}