import { NextResponse } from "next/server";
import query from "@/lib/database";

export async function POST(req) {
  const sessionHeader = JSON.parse(req.headers.get("session"));
  console.log("sessionHeader:", sessionHeader);

  if (!sessionHeader) {
    return NextResponse.json({ message: "Missing session." }, { status: 401 });
  }

  const { userId, token } = sessionHeader;

  // Check token validity
  const tokenQuery = await query(
    "SELECT userId, token FROM sessions WHERE userId = ? AND token = ?",
    [userId, token],
  );

  if (tokenQuery.length == 0) {
    return NextResponse.json({ message: "Invalid session." }, { status: 401 });
  }

  // Get user info
  let username = null;
  let amount = null;

  try {
    const userQuery = await query("SELECT username FROM users WHERE id = ?", [userId]);
    username = userQuery[0].username;

    const accountQuery = await query("SELECT amount FROM accounts WHERE userId = ?", [userId]);
    amount = accountQuery[0].amount;
  } catch (error) {
    console.error(error);
  }

  const user = { username, amount };
  return NextResponse.json({ message: "Got userinfo.", user: user }, { status: 200 });
}
