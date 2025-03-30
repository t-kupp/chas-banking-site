import { Pool } from "pg";
const password = process.env.DB_PASS;

const pool = new Pool({
  connectionString: `postgresql://postgres.ilbvpbugaaajizfkdovr:${password}@aws-0-eu-north-1.pooler.supabase.com:5432/postgres?pgbouncer=true&sslmode=require`,
  ssl: { rejectUnauthorized: false },
  max: 8, // Adjusted for better stability
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 10000, // Timeout if a connection takes longer than 10s
});

// Test connection on startup
(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to Supabase PostgreSQL");
    client.release();
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();

// Query function for executing SQL commands
export default async function query(sql, params) {
  const client = await pool.connect();

  try {
    const res = await client.query(sql, params);
    return res.rows;
  } catch (err) {
    console.error("Query error:", {
      message: err.message,
      query: sql,
      params,
    });
    throw err;
  } finally {
    client.release();
  }
}
