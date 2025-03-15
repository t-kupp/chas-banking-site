import { NextResponse } from "next/server";

export let users = [{ id: 101, username: "jan", password: "test123" }];
export let accounts = [{ id: 1, userId: 101, amount: 500 }];

const randomString = () => crypto.randomUUID();

export async function POST(req) {
  const data = await req.json();
  const newUser = { id: randomString(), ...data };

  // Checking for existing user
  const userExists = users.some(
    (user) => newUser.username.toLowerCase() === user.username.toLowerCase(),
  );
  if (userExists) {
    console.log("User already exists, account not created!");
    return NextResponse.json(
      { message: "User already exists, account not created!" },
      { status: 400 },
    );
  }

  users.push(newUser);
  console.log("New user added:", newUser);

  const newAccount = { id: randomString(), userId: newUser.id, amount: 0 };
  accounts.push(newAccount);
  console.log("New account added:", newAccount);

  return NextResponse.json({ message: "New user added" }, { status: 201 });
}
