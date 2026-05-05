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

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (title !== undefined) tasks[taskIndex].title = title;
    if (description !== undefined) tasks[taskIndex].description = description;
    if (completed !== undefined) tasks[taskIndex].completed = completed;

    res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    tasks.splice(taskIndex, 1);

    res.json({ message: 'Tarea eliminada correctamente' });
});

app.listen(PORT, () => {
    console.log(`Servidor de ForIT corriendo en http://localhost:${PORT}`);
});