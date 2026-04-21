import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import path from 'path';

// Define the absolute path for the SQLite database
const dbPath = path.resolve('database.sqlite');
console.log(`Using database file at: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            role TEXT
        )`, (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      } else {
        console.log('Users table ready');
      }
    });
  }
});

const app = express();
app.use(express.json());
app.use(cors());

// Get all users
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success", "data": rows });
  });
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
  db.get("SELECT * FROM users WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "message": "success", "data": row });
  });
});

// Create a new user
app.post('/users', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) {
    res.status(400).json({ "error": "Name and Email are required" });
    return;
  }
  
  db.run(`INSERT INTO users (name, email, role) VALUES (?, ?, ?)`,
    [name, email, role || 'User'],
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.json({
        "message": "success",
        "data": { id: this.lastID, name, email, role: role || 'User' }
      });
    });
});

// Update an existing user
app.put('/users/:id', (req, res) => {
  const { name, email, role } = req.body;
  
  db.run(`UPDATE users SET 
             name = COALESCE(?, name), 
             email = COALESCE(?, email), 
             role = COALESCE(?, role) 
             WHERE id = ?`,
    [name, email, role, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      if (this.changes === 0) {
        return res.status(404).json({ "error": "User not found" });
      }
      res.json({ "message": "success", "data": { id: req.params.id, name, email, role } });
    });
});

// Delete a user
app.delete('/users/:id', (req, res) => {
  db.run("DELETE FROM users WHERE id = ?", req.params.id, function (err) {
    if (err) {
      res.status(400).json({ "error": res.message });
      return;
    }
    if (this.changes === 0) {
      return res.status(404).json({ "error": "User not found" });
    }
    res.json({ "message": "deleted", changes: this.changes });
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
