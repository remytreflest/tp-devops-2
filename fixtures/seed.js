import 'dotenv/config';
import pool from '../src/db.js';

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
