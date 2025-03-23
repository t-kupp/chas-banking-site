import { NextResponse } from "next/server";
import query from "@/lib/database";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req) {
  const data = await req.json();
  const { username, password } = data;

  // Check for existing user
  const check = await query(
    "SELECT EXISTS(SELECT 1 FROM users WHERE username = $1) AS userExists",
    [username],
  );
  const userExists = check[0].userExists;

  if (userExists) {
    console.log("Tried to add user, but user already exists!");
    return NextResponse.json({ message: "User already exists!" }, { status: 400 });
  }

  // Add new user to users table & get user ID
  let userId;
  try {
    const hashedPassword = await hashPassword(password);
    const userInsert = await query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedPassword],
    );
    userId = userInsert[0].id;
    console.log("New user added.");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding user", error: error.message },
      { status: 500 },
    );
  }

  // Create account for new user
  try {
    await query("INSERT INTO accounts (user_id) VALUES ($1)", [userId]);
    console.log("Account created.");
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating account", error: error.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "New user added" }, { status: 201 });
}
