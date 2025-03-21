import { NextResponse } from "next/server";
import query from "@/lib/database";

export async function POST(req) {
  const { action, session, amount } = await req.json();

  if (!session) {
    return NextResponse.json({ message: "Missing session." }, { status: 401 });
  }

  const { userId, token } = session;

  // Check token validity
  const tokenQuery = await query(
    "SELECT userId, token FROM sessions WHERE userId = ? AND token = ?",
    [userId, token],
  );

  if (tokenQuery.length == 0) {
    return NextResponse.json({ message: "Invalid session." }, { status: 401 });
  }

  // Action: Get userdata
  if (action == "getUserData") {
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

    const user = { username, amount, userId };
    return NextResponse.json({ message: "Got userinfo.", user: user }, { status: 200 });
  }

  // Action: Deposit funds
  else if (action == "depositFunds") {
    if (amount <= 0) {
      return NextResponse.json({ message: "Can't deposit negative funds!" }, { status: 400 });
    }

    const accountQuery = await query("UPDATE accounts SET amount = amount + ? WHERE userId = ?", [
      amount,
      userId,
    ]);

    const accountIdQuery = await query("SELECT id FROM accounts WHERE userId = ?", [userId]);
    const accountId = accountIdQuery[0].id;

    const transactionQuery = await query(
      "INSERT INTO transactions (accountId, amount, transactionType, fromAccountId, toAccountId) VALUES (?, ?, ?, ?, ?)",
      [accountId, amount, "deposit", null, accountId],
    );

    const amountQuery = await query("SELECT amount FROM accounts WHERE userId = ?", [userId]);

    const newBalance = amountQuery[0].amount;
    console.log("newBalance", newBalance);

    return NextResponse.json({ message: "Added funds. New balance:", newBalance }, { status: 200 });
  }

  // Action: Transfer funds
  else if (action == "transferFunds") {
    if (amount <= 0) {
      return NextResponse.json({ message: "Can't transfer negative funds!" }, { status: 400 });
    }

    const accountQuery = await query("UPDATE accounts SET amount = amount - ? WHERE userId = ?", [
      amount,
      userId,
    ]);

    const accountIdQuery = await query("SELECT id FROM accounts WHERE userId = ?", [userId]);
    const accountId = accountIdQuery[0].id;

    const transactionQuery = await query(
      "INSERT INTO transactions (accountId, amount, transactionType, fromAccountId, toAccountId) VALUES (?, ?, ?, ?, ?)",
      [accountId, amount, "withdrawal", null, accountId],
    );

    const amountQuery = await query("SELECT amount FROM accounts WHERE userId = ?", [userId]);

    const newBalance = amountQuery[0].amount;
    console.log("newBalance", newBalance);

    return NextResponse.json(
      { message: "Withdrew funds. New balance:", newBalance },
      { status: 200 },
    );
  }

  // Action: Get transactions
  else if (action == "getTransactions") {
    let transactions = null;
    try {
      const transactionsQuery = await query(
        "SELECT amount, transactionType, created FROM transactions WHERE accountId = ?",
        [userId],
      );
      transactions = transactionsQuery;
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error getting transaction data." }, { status: 400 });
    }
    return NextResponse.json({ message: "Got transaction data.", transactions }, { status: 200 });
  }
}
