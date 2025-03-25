"use client";

import Dashboard from "@/components/Account/Dashboard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/baseUrl";
import { useLogin } from "@/context/loginContext";

export default function Account() {
  const [user, setUser] = useState(null);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsLoggedIn } = useLogin();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const session = JSON.parse(localStorage.getItem("session"));

    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getUserData", session: session }),
    });

    const answer = await res.json();

    if (res.status != 200) {
      setIsSessionValid(false);
      localStorage.removeItem("session");
      setIsLoggedIn(false);
    }

    if (res.status == 200) {
      setIsSessionValid(true);
      setUser(answer.user);
    }

    setIsLoading(false);
  }

  return (
    <div className="flex w-full p-4 lg:p-8 2xl:mt-16">
      <div
        className={`${!isLoading && "border"} mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-xl p-4 lg:p-8`}
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
