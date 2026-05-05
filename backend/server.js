const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'El título y la descripción son obligatorios' });
    }

    const newTask = {
        id: Date.now().toString(),
        title: title,
        description: description,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

app.listen(PORT, () => {
    console.log(`Servidor de ForIT corriendo en http://localhost:${PORT}`);
});