import React from "react";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";

export default function login() {
  return (
    <main className="login-page bg-gray h-screen">
      <Logo />
      <LoginForm />
    </main>
  );
}
