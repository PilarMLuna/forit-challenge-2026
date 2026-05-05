const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.listen(PORT, () => {
    console.log(`Servidor de ForIT corriendo en http://localhost:${PORT}`);
});