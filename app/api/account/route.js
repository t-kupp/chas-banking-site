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
    "SELECT user_id, token FROM sessions WHERE user_id = $1 AND token = $2",
    [userId, token],
  );

  if (tokenQuery.length === 0) {
    return NextResponse.json({ message: "Invalid session." }, { status: 401 });
  }

  // Action: Get User Data
  if (action === "getUserData") {
    try {
      const userQuery = await query("SELECT username FROM users WHERE id = $1", [userId]);
      const accountQuery = await query("SELECT amount FROM accounts WHERE user_id = $1", [userId]);

      if (userQuery.length === 0 || accountQuery.length === 0) {
        return NextResponse.json({ message: "User not found." }, { status: 404 });
      }

      const user = { username: userQuery[0].username, amount: accountQuery[0].amount, userId };
      return NextResponse.json({ message: "Got userinfo.", user }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error retrieving user data." }, { status: 500 });
    }
  }

  // Action: Deposit Funds
  else if (action === "depositFunds") {
    if (amount <= 0) {
      return NextResponse.json({ message: "Can't deposit negative funds!" }, { status: 400 });
    }

    try {
      await query("BEGIN"); // Start transaction

      await query("UPDATE accounts SET amount = amount + $1 WHERE user_id = $2", [amount, userId]);

      const accountIdQuery = await query("SELECT id FROM accounts WHERE user_id = $1", [userId]);
      const accountId = accountIdQuery[0].id;

      await query(
        "INSERT INTO transactions (account_id, amount, transaction_type, from_account_id, to_account_id) VALUES ($1, $2, $3, $4, $5)",
        [accountId, amount, "deposit", null, accountId],
      );

      const amountQuery = await query("SELECT amount FROM accounts WHERE user_id = $1", [userId]);
      const newBalance = amountQuery[0].amount;

      await query("COMMIT"); // Commit transaction

      return NextResponse.json({ message: "Added funds.", newBalance }, { status: 200 });
    } catch (error) {
      await query("ROLLBACK"); // Rollback on failure
      console.error(error);
      return NextResponse.json({ message: "Deposit failed." }, { status: 500 });
    }
  }

  // Action: Transfer Funds
  else if (action === "transferFunds") {
    if (amount <= 0) {
      return NextResponse.json({ message: "Can't transfer negative funds!" }, { status: 400 });
    }

    try {
      await query("BEGIN"); // Start transaction

      await query("UPDATE accounts SET amount = amount - $1 WHERE user_id = $2", [amount, userId]);

      const accountIdQuery = await query("SELECT id FROM accounts WHERE user_id = $1", [userId]);
      const accountId = accountIdQuery[0].id;

      await query(
        "INSERT INTO transactions (account_id, amount, transaction_type, from_account_id, to_account_id) VALUES ($1, $2, $3, $4, $5)",
        [accountId, amount, "withdrawal", null, accountId],
      );

      const amountQuery = await query("SELECT amount FROM accounts WHERE user_id = $1", [userId]);
      const newBalance = amountQuery[0].amount;

      await query("COMMIT"); // Commit transaction

      return NextResponse.json({ message: "Transferred funds.", newBalance }, { status: 200 });
    } catch (error) {
      await query("ROLLBACK"); // Rollback on failure
      console.error(error);
      return NextResponse.json({ message: "Transfer failed." }, { status: 500 });
    }
  }

  // Action: Get Transactions
  else if (action === "getTransactions") {
    try {
      const accountIdQuery = await query("SELECT id FROM accounts WHERE user_id = $1", [userId]);
      if (accountIdQuery.length === 0) {
        return NextResponse.json({ message: "Account not found." }, { status: 404 });
      }

      const accountId = accountIdQuery[0].id;

      const transactionsQuery = await query(
        "SELECT amount, transaction_type, created FROM transactions WHERE account_id = $1",
        [accountId],
      );

      return NextResponse.json(
        { message: "Got transaction data.", transactions: transactionsQuery },
        { status: 200 },
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Error getting transaction data." }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Invalid action." }, { status: 400 });
}
