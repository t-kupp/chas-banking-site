import { NextResponse } from "next/server";
import { sessions } from "../login/route";

export async function POST(req) {
  const storedSession = JSON.parse(req.headers.get("session"));
  console.log("storedSession:", storedSession);
  console.log("Current sessions:", sessions);

  const sessionExists = sessions.some((session) => storedSession.token == session.token);
  console.log("Session found?", sessionExists);

  if (!sessionExists) {
    return NextResponse.json({ message: "Session not found." }, { status: 401 });
  }

  return NextResponse.json({ message: "Got userinfo." }, { status: 200 });
}
