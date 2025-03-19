"use client";

import RegisterForm from "@/components/RegisterForm";
import { useState } from "react";
import { BASE_URL } from "@/lib/baseUrl";

export default function Register() {
  const [response, setResponse] = useState(null);

  function handleSubmit(data) {
    const { username, password } = data;
    addUser({ username, password });
  }

  async function addUser(user) {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    setResponse(res);
  }

  return (
    <div className="m-auto flex w-full max-w-md flex-col items-center px-4 py-16">
      <RegisterForm handleSubmit={handleSubmit} response={response} />
    </div>
  );
}
