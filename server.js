const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./task_manager.db', (err) => {
  if (err) {
    console.error('Failed to connect to SQLite', err);
  } else {
    console.log('Connected to SQLite');
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      priority TEXT,
      dueDate TEXT,
      completed BOOLEAN DEFAULT 0
    )`);
  }
});

app.post('/tasks', (req, res) => {
  const { title, description, priority, dueDate, completed } = req.body;
  db.run(`INSERT INTO tasks (title, description, priority, dueDate, completed) VALUES (?, ?, ?, ?, ?)`,
    [title, description, priority, dueDate, completed],
    function (err) {
      if (err) {
        return res.status(400).send(err.message);
      }
      res.status(201).send({ id: this.lastID, ...req.body });
    }
  );
});

app.get('/tasks', (req, res) => {
  db.all(`SELECT * FROM tasks`, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(rows);
  });
});

app.put('/tasks/:id', (req, res) => {
  const { title, description, priority, dueDate, completed } = req.body;
  db.run(`UPDATE tasks SET title = ?, description = ?, priority = ?, dueDate = ?, completed = ? WHERE id = ?`,
    [title, description, priority, dueDate, completed, req.params.id],
    function (err) {
      if (err) {
        return res.status(400).send(err.message);
      }
      if (this.changes === 0) {
        return res.status(404).send('Task not found');
      }
      res.send({ id: req.params.id, ...req.body });
    }
  );
});

app.delete('/tasks/:id', (req, res) => {
  db.run(`DELETE FROM tasks WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (this.changes === 0) {
      return res.status(404).send('Task not found');
    }
    res.send({ message: 'Task deleted' });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
