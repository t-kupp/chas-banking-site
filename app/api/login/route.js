import { NextResponse } from "next/server";
import query from "@/lib/database";

export async function POST(req) {
  const data = await req.json();
  const { username, password } = data;

  // Find user in users and compare password for login request
  const userQuery = await query(
    "SELECT username, password FROM users WHERE username = ? AND password = ?",
    [username, password],
  );

  if (userQuery.length == 0) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  // Add session to sessions
  const token = crypto.randomUUID();
  const userId = await query("SELECT id FROM users WHERE username = ?", [username]);

  try {
    await query("INSERT INTO sessions (userId, token) VALUES (?, ?)", [userId[0].id, token]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding session.", error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Session added.", session: { userId: userId[0].id, token: token } },
    { status: 201 },
  );
}
