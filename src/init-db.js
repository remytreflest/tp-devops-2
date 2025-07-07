require('dotenv').config();
const pool = require('./db');

async function init() {
  const conn = await pool.getConnection();
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL
    )
  `);
  console.log('✅ Table users ready');
  conn.release();
  pool.end();
}

init().catch(err => {
  console.error('❌ DB init error', err);
  pool.end();
});
