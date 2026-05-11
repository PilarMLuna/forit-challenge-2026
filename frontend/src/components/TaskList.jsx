import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await fetch('/api/tasks');
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error al traer las tareas:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleToggle = async (task) => {
        try {
            const response = await fetch(`/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: !task.completed })
            });
            if (response.ok) fetchTasks();
        } catch (error) {
            console.error('Error al actualizar:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            if (response.ok) fetchTasks();
        } catch (error) {
            console.error('Error al borrar:', error);
        }
    };

    return (
        <div>
            <h2>Mis tareas</h2>
            
            <Link to="/new">
                <button className="btn-primary btn-create">Crear nueva tarea</button>
            </Link>

            <ul className="task-list">
                {tasks.length === 0 ? (
                    <p className="empty-msg">No hay tareas todavía. ¡Creá una!</p>
                ) : (
                    [...tasks].sort((a, b) => {
                        if (a.completed === b.completed) {
                            return b.id - a.id; 
                        }
                        return Number(a.completed) - Number(b.completed);
                    }).map(task => (
                        <li key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                            <h3>{task.title}</h3>
                            <p className="task-desc">{task.description}</p>
                            <p className="task-status">Estado: {task.completed ? '✅ Completada' : '⏳ Pendiente'}</p>

                            <div className="btn-group">
                                <button className="btn-secondary" onClick={() => handleToggle(task)}>
                                    {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
                                </button>

                                <Link to={`/edit/${task.id}`} state={{ task }}>
                                    <button className="btn-edit">Editar</button>
                                </Link>

                                <button className="btn-delete" onClick={() => handleDelete(task.id)}>
                                    Borrar
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TaskList;