"use client";

import LoginForm from "@/components/LoginForm";

export default function Login() {
  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <div className="m-auto flex w-full max-w-md flex-col items-center px-4">
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  );
}
