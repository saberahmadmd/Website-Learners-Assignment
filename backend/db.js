const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./medication.db')

db.serialize(() => {
   db.run(`
     CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
     )    
  `)

   db.run(`
    CREATE TABLE IF NOT EXISTS medications(
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT,
       dosage TEXT,
       frequency TEXT,
       userId INTEGER
    )  
  `)

   db.run(`
  CREATE TABLE IF NOT EXISTS medication_logs(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    medicationId INTEGER,
    date_taken DATE,
    UNIQUE (medicationId, date_taken)
  )
`);

})


module.exports = db
