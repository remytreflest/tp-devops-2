const express = require('express');
const router = express.Router();
const pool = require('../db');

// POST /submit
router.post('/', async (req, res) => {
  const { email } = req.body;
  let conn;
  console.log("MON EMAIL")
  console.log(email)
  try {
    conn = await pool.getConnection();
    await conn.query('INSERT INTO users (email) VALUES (?)', [email]);
    res.redirect('/submissions');
  } catch (err) {
    console.error('Erreur insertion', err);
    res.status(500).send('Erreur serveur');
  } finally {
    if (conn) conn.release();
  }
});

// GET /submissions
router.get('/submissions', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM users');
    const listItems = rows.map(row =>
      `<li>${row.email}</li>`
    ).join('');

    res.send(`
      <h1>Soumissions</h1>
      <ul>${listItems}</ul>
      <p><a href="/">⬅ Retour</a></p>
    `);
  } catch (err) {
    console.error('Erreur lecture', err);
    res.status(500).send('Erreur serveur');
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
