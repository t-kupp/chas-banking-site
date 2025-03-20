"use client";

import Dashboard from "@/components/Account/Dashboard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/baseUrl";

export default function Account() {
  const [user, setUser] = useState(null);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserData();
    console.log("userinfo called");
  }, []);

  async function getUserData() {
    const session = JSON.parse(localStorage.getItem("session"));

    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getUserData", session: session }),
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

  return (
    <div className="my-auto flex w-full p-8">
      <div
        className={`${!isLoading && "border"} mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-xl p-8`}
      >
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : !isSessionValid ? (
          <p className="">
            Oops! You are not signed in or token authentication failed. <br />
            Please go to the{" "}
            <Link href={"/login"}>
              <Button variant={"link"} className={"p-0 text-base"}>
                login page
              </Button>
            </Link>{" "}
            to access your account.
          </p>
        ) : (
          <Dashboard user={user} />
        )}
      </div>
    </div>
  );
}
