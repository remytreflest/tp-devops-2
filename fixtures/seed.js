// src/seed.js
require('dotenv').config();
const pool = require('../src/db');

// Données à insérer (adapte selon ta table)
const emails = [
  'alice@example.com',
  'bob@example.com',
  'carol@example.com',
];

async function seed() {
  let conn;
  try {
    conn = await pool.getConnection();

    await conn.query('DELETE FROM users');

    for (const email of emails) {
      await conn.query('INSERT INTO users (email) VALUES (?)', [email]);
    }

    console.log('✅ Base de données seedée avec succès !');
  } catch (err) {
    console.error('❌ Erreur lors du seed', err);
  } finally {
    if (conn) conn.release();
    pool.end();
  }
}

seed();
