let users = [{ id: 101, username: "Jan", password: "test" }];
let accounts = [{ id: 1, userId: 101, amount: 500 }];
let sessions = [];

export async function GET(req) {
  return new Response("GET");
}

export async function POST(req) {
  const data = await req.json();
  const newUser = { id: Date.now(), ...data };

  // Checking for existing user
  const userExists = users.some(
    (user) => newUser.username.toLowerCase() === user.username.toLowerCase(),
  );

  if (userExists) {
    console.log("User already exists, account not created!");
    return new Response({ message: "User already exists, account not created!" }, { status: 400 });
  }

  users.push(newUser);
  console.log("New user added. Users:", users);
  return new Response({ message: "New user added" }, { status: 201 });
}
