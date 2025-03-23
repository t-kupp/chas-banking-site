import { Pool } from "pg";
const password = process.env.DB_PASS;

const pool = new Pool({
  connectionString: `postgresql://postgres.ilbvpbugaaajizfkdovr:${password}@aws-0-eu-north-1.pooler.supabase.com:5432/postgres`,
  ssl: { rejectUnauthorized: false },
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if no connection is available
});

pool
  .connect()
  .then(() => console.log("Connected to Supabase PostgreSQL"))
  .catch((err) => console.error("Database connection error:", err));

export default async function query(sql, params) {
  const client = await pool.connect();

  try {
    const res = await client.query(sql, params);
    return res.rows;
  } catch (err) {
    console.error("Query error:", err);
    throw err; // Re-throw the error after logging
  } finally {
    client.release(); // Ensure the client is always released
  }
}
