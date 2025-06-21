const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error.' });
      if (user) return res.status(400).json({ error: 'User already exists.' });

      const hashed = await bcrypt.hash(password, 10);
      db.run(
        `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`,
        [email, hashed, role || 'patient'],
        function (err) {
          if (err) return res.status(500).json({ error: 'Failed to create user.' });
          res.json({ id: this.lastID, email, role: role || 'patient' });
        }
      );
    });
  } catch (e) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials.' });

    res.json({
      id: user.id,
      email: user.email,
      role: user.role
    });
  });
});

module.exports = router;
