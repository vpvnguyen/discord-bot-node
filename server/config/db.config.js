require("dotenv").config({ path: "../../.env" });
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_NAME,
});

module.exports = pool;
