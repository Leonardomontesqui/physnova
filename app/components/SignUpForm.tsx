"use client";

import React, { useState } from "react";

export default function SignUpForm() {
  interface signUpData {
    username: string;
    email: string;
    password: string;
  }

  const [signUpData, setSignUpData] = useState<signUpData>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <form className="flex flex-col">
      <label htmlFor="username">Username:</label>
      <input id="username" value={signUpData.username} />
      <label htmlFor="email">Email:</label>
      <input id="email" value={signUpData.email} />
      <label htmlFor="password">Password:</label>
      <input id="password" value={signUpData.password} />
    </form>
  );
}
