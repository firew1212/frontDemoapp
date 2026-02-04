import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // must be exactly like this
  ssl: {
    rejectUnauthorized: false, // required for Neon sometimes
  },
});

export default pool;

