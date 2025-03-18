import { users } from "../../../app/api/register/route.js";
import { NextResponse } from "next/server";

export let sessions = [];

const randomString = () => crypto.randomUUID();

export async function POST(req) {
  const { username, password } = await req.json();

  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const sessionToken = randomString();

  const newSession = { userId: user.id, token: sessionToken };

  sessions.push(newSession);
  console.log("New session added:", newSession);
  console.log("Current sessions:", sessions);

  return NextResponse.json({ message: "Session added.", session: newSession }, { status: 201 });
}
