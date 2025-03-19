"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000/";
// const BASE_URL = "http://13.60.105.124:3000/";

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
    }

    if (res.status == 200) {
      setIsSessionValid(true);
      setUser(answer.user);
    }

    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      {!isSessionValid ? (
        <p className="">
          Oops! You're not signed in. Please go to the{" "}
          <Link href={"/login"}>
            <Button variant={"link"} className={"p-0 text-base"}>
              login page
            </Button>
          </Link>{" "}
          to access your account.
        </p>
      ) : (
        <div>Hello! Your balance is ${user.amount}.</div>
      )}
    </div>
  );
}

// TODO
// Send session to frontend
// finish getUserInfo()
