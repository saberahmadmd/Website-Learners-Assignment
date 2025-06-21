const express = require('express');
const db = require('../db');
const { getTodayDateUTC } = require('../utils/date');

const router = express.Router();

router.post('/medications', (req, res) => {
  const { name, dosage, frequency, userId } = req.body;
  db.run(
    `INSERT INTO medications (name, dosage, frequency, userId) VALUES (?, ?, ?, ?)`,
    [name, dosage, frequency, userId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

router.get('/medications', (req, res) => {
  const { userId } = req.query;
  const today = getTodayDateUTC();
  console.log('✅ Checking takenToday for date:', today);

  db.all(
    `
    SELECT m.*,
      EXISTS (
        SELECT 1 FROM medication_logs ml
        WHERE ml.medicationId = m.id AND ml.date_taken = ?
      ) AS takenToday
    FROM medications m
    WHERE m.userId = ?
    `,
    [today, userId],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    }
  );
});

router.put('/medications/:id/taken', (req, res) => {
  const medicationId = req.params.id;
  const today = getTodayDateUTC();
  console.log('✅ Marking as taken:', medicationId, today);

  db.run(
    `INSERT INTO medication_logs (medicationId, date_taken) VALUES (?, ?)`,
    [medicationId, today],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});

router.delete('/medications/:id', (req, res) => {
  const medicationId = req.params.id;

  db.run(
    `DELETE FROM medications WHERE id = ?`,
    [medicationId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

module.exports = router;
