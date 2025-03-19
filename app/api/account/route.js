import { NextResponse } from "next/server";
import { sessions } from "../login/route";
import { accounts } from "../register/route";

export async function POST(req) {
  // Check access token
  const sessionHeader = req.headers.get("session");

  if (!sessionHeader) {
    return NextResponse.json({ message: "Missing session token." }, { status: 400 });
  }

  let storedSession;
  try {
    storedSession = JSON.parse(sessionHeader);
  } catch (error) {
    return NextResponse.json({ message: "Invalid session token format." }, { status: 400 });
  }

  console.log("storedSession:", storedSession);
  console.log("Current sessions:", sessions);

  // Ensure sessions exist before checking
  if (!Array.isArray(sessions)) {
    return NextResponse.json({ message: "Session storage error." }, { status: 500 });
  }

  const sessionExists = sessions.some(
    (session) => storedSession.token === session.token && storedSession.userId === session.userId,
  );

  console.log("Session found?", sessionExists);

  if (!sessionExists) {
    return NextResponse.json({ message: "Session not found." }, { status: 401 });
  }

  // Get user info
  const userId = storedSession.userId;
  const user = accounts.find((account) => account.userId === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  console.log("Sending user info:", user);

  return NextResponse.json({ message: "Got userinfo.", user }, { status: 200 });
}
