"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value }); //
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Implement login logic here using NextAuth.js or your chosen method
    // This might involve sending a login request to your backend API

    // Upon successful login, redirect to the home page
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
