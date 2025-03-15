"use client";

// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "http://13.60.105.124:3000/";

export default function Account() {
  async function getUserInfo() {
    const res = await fetch(`${BASE_URL}/api/account`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    setResponse(res);
  }

  return <p>Hello!</p>;
}

// TODO
// Send token to frontend
// finish getUserInfo()
