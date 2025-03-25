"use client";

import LoginForm from "@/components/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/baseUrl";
import { useLogin } from "@/context/loginContext";

export default function Login() {
  const [response, setResponse] = useState(null);
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/account");
    }
  }, [isLoggedIn]);

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

    console.log(result);

    if (res.status === 201) {
      localStorage.setItem("session", JSON.stringify(result.session));
      setIsLoggedIn(true);
      router.push("/account");
    }
  }

  return (
    <div className="m-auto flex w-full max-w-md flex-col items-center px-4 py-16">
      <LoginForm handleSubmit={handleSubmit} response={response} />
    </div>
  );
}
