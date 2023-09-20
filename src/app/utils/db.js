const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "db",
  password: "postgres",
  port: 5432,
});

const initDb = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        date DATE DEFAULT NULL,
        status TEXT NOT NULL DEFAULT 'Draft',
        hosts JSON NOT NULL,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "events" created or already exists.');
  } catch (error) {
    console.error("Could not initialize database:", error);
  } finally {
    client.release();
  }
};

const query = async (text, params) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } catch (err) {
    console.error("Query Error:", err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  initDb,
  query,
};