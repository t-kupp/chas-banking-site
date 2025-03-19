import mysql from "mysql2/promise";

// Connect to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "chas_banking",
  port: 3306,
});

export default async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}
