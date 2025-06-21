const express = require('express');
const db = require('../db');
const { getTodayDateUTC } = require('../utils/date');

const router = express.Router();

// === ADDING MEDICATION ===
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

// === GETTING MEDICATIONS for a USER ===
// Uses correct UTC date to check takenToday
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

// === MARKING MEDICATION AS TAKEN ===
// Also uses the same UTC date
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

// === DELETING MEDICATION ===
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



/*
const express = require('express')
const db = require('../db')

const router = express.Router()

//adding medication
router.post('/medications', (req, res) => {
  const { name, dosage, frequency, userId } = req.body
  db.run(
    `INSERT INTO medications (name, dosage, frequency, userId) VALUES (?, ?, ?, ?)`,
    [name, dosage, frequency, userId],
    function (err) {
      if (err) return res.status(400).json({ error: err.message })
      res.json({ id: this.lastID })
    }
  )
})

//getting medications for users
router.get('/medications', (req, res) => {
  const { userId } = req.query
  db.all(
    `SELECT * FROM medications WHERE userId = ?`,
    [userId],
    (err, rows) => {
      if (err) return res.status(400).json({ error: err.message })
      res.json(rows)
    }
  )
})

//marking medications as taken
// In routes/medications.js
router.put('/medications/:id/taken', (req, res) => {
  const medicationId = req.params.id;
  const today = new Date().toISOString().split('T')[0];

  console.log('Marking as taken:', medicationId, today); // ✅ Add this

  db.run(
    `INSERT INTO medication_logs (medicationId, date_taken) VALUES (?, ?)`,
    [medicationId, today],
    function (err) {
      if (err) {
        console.error(err); // ✅ Add this
        return res.status(400).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});

/*
router.put('/medications/:id/taken', (req, res) => {
  const medicationId = req.params.id;
  const today = new Date().toISOString().split('T')[0];
  db.run(
    `INSERT INTO medication_logs (medicationId, date_taken) VALUES (?, ?)`,
    [medicationId, today],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true });
    }
  );
});


//deleting medication by ID
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

// updated medications route
router.get('/medications', (req, res) => {
  const { userId } = req.query;
  const today = new Date().toISOString().split('T')[0];

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

module.exports = router

*/