"use client";

import LoginForm from "@/components/LoginForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "http://13.60.105.124:3000/";

export default function Login() {
  const [response, setResponse] = useState(null);
  const router = useRouter();

  function handleSubmit(data) {
    const { username, password } = data;
    loginUser({ username, password });
  }

  async function loginUser(data) {
    const res = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setResponse(res);

    const result = await res.json();

    if (result.redirectUrl) {
      router.push(result.redirectUrl);
    }
  }

  return (
    <div className="m-auto flex w-full max-w-md flex-col items-center px-4 py-16">
      <LoginForm handleSubmit={handleSubmit} response={response} />
    </div>
  );
}
