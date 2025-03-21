import mysql from "mysql2/promise";

// Connect to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "chas_banking",
  port: 3306,
  connectionLimit: 10,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection error:", err);
    return;
  }

  console.log("Connected to the database");

  connection.release(); // Always release the connection after use
});

export default async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}
