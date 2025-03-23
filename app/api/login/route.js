import { NextResponse } from "next/server";
import query from "@/lib/database";
import { comparePasswords } from "@/lib/bcrypt";

export async function POST(req) {
  const data = await req.json();
  const { username, password } = data;

  // Find user in users and compare password for login request
  const userQuery = await query("SELECT id, password FROM users WHERE username = $1", [username]);

  if (userQuery.length === 0) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  const { id: userId, password: storedPassword } = userQuery[0];

  // Compare hashed password
  const passwordsMatch = await comparePasswords(password, storedPassword);

  if (!passwordsMatch) {
    return NextResponse.json({ message: "Invalid credentials." }, { status: 401 });
  }

  // Add session to sessions
  const token = crypto.randomUUID();

  try {
    await query("INSERT INTO sessions (user_id, token) VALUES ($1, $2)", [userId, token]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding session.", error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "Session added.", session: { userId, token } },
    { status: 201 },
  );
}
