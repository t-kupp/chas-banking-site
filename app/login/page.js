"use client";

import LoginForm from "@/components/LoginForm";
import { useState } from "react";

const BASE_URL = "http://localhost:3000/";

export default function Login() {
  const [response, setResponse] = useState(null);

  function handleSubmit(data) {
    if (data.action === "register") {
      const { username, password } = data;
      addUser({ username, password });
    }
  }

  async function addUser(user) {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    setResponse(res);
  }

  return (
    <div className="m-auto flex w-full max-w-md flex-col items-center px-4">
      <LoginForm handleSubmit={handleSubmit} response={response} />
    </div>
  );
}
