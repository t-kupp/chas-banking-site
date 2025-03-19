"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "http://13.60.105.124:3000/";

export default function Account() {
  const [user, setUser] = useState({});
  const [isSessionValid, setIsSessionValid] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
    console.log("userinfo called");
  }, []);

  async function getUserInfo() {
    const session = localStorage.getItem("session");

    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json", session: session },
    });

    const answer = await res.json();

    console.log(answer);

    if (res.status != 200) {
      setIsSessionValid(false);
      console.log("Invalid session token.");
    }

    if (res.status == 200) {
      setIsSessionValid(true);
      setUser(answer.user);
    }

    setIsLoading(false);
  }

  return (
    <div className="">
      {isLoading && <p>Loading...</p>}
      {!isLoading && !isSessionValid ? (
        <p className="">Invalid session.</p>
      ) : (
        <div>Hello! Your balance is ${user.amount}.</div>
      )}
    </div>
  );
}

// TODO
// Send token to frontend
// finish getUserInfo()
