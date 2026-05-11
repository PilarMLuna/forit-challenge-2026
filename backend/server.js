const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error('Error al abrir la base de datos:', err.message);
    else console.log('Conexión establecida con SQLite.');
});

db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT 0
    )
`);

app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const formattedTasks = rows.map(t => ({ ...t, completed: !!t.completed }));
        res.json(formattedTasks);
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;
    db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, title, description, completed: false });
        }
    );
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    db.run(
        `UPDATE tasks 
         SET title = COALESCE(?, title), 
             description = COALESCE(?, description), 
             completed = COALESCE(?, completed) 
         WHERE id = ?`,
        [title, description, completed !== undefined ? (completed ? 1 : 0) : null, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Tarea actualizada correctamente' });
        }
    );
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Tarea eliminada' });
    });
});

app.listen(3000, () => {
    console.log('Servidor backend escuchando en el puerto 3000');
});