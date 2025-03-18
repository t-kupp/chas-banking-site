"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "http://13.60.105.124:3000/";

export default function Account() {
  useEffect(() => {
    getUserInfo();
    console.log("userinfo called");
  }, []);

  async function getUserInfo() {
    const session = localStorage.getItem("session");

    if (!session) {
      console.log("No session token found.");
      return;
    }

    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "POST",
      headers: { "Content-Type": "application/json", session: session },
    });

    const answer = await res.json();
    console.log(answer);
  }

  return <div className="">Hello! </div>;
}

// TODO
// Send token to frontend
// finish getUserInfo()
