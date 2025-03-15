import { users } from "../../../app/api/register/route.js";
import { NextResponse } from "next/server";

let sessions = [];

const randomString = () => crypto.randomUUID();

export async function POST(req) {
  const { username, password } = await req.json();

  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const sessionToken = randomString();
  sessions.push({ userId: user.id, token: sessionToken });

  return NextResponse.json({ redirectUrl: "/account" });
}
