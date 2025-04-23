"use client";

import LoginForm from "@/components/login/LoginForm";
import { useState } from "react";
import Lottie from "lottie-react";


export default function LoginPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex justify-center items-center bg-gray-950">

      <LoginForm />

      {/*<p>Holi</p>*/}

    </div>
  );
}