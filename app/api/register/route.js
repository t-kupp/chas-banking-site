import { NextResponse } from "next/server";
import query from "@/lib/database";

export async function POST(req) {
  const data = await req.json();
  const newUser = data;

  // Check for existing user
  const check = await query(
    "(SELECT EXISTS(SELECT 1 FROM users WHERE username = ?) AS userExists)",
    [newUser.username],
  );
  const userExists = check[0].userExists === 1;

  if (userExists) {
    console.log("Tried to add user, but user already exists!");
    return NextResponse.json({ message: "User already exists!" }, { status: 400 });
  }

  // Add new user to users database
  try {
    await query("INSERT INTO users (username, password) VALUES (?, ?)", [
      newUser.username,
      newUser.password,
    ]);
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
    const userId = await query("SELECT id FROM users WHERE username = ?", [newUser.username]);
    await query("INSERT INTO accounts (userId) VALUES (?)", [userId[0].id]);
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
