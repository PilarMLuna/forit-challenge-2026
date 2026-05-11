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
            <h2>Mis Tareas</h2>
            <Link to="/new">
                <button style={{ padding: '10px', marginBottom: '20px', cursor: 'pointer' }}>
                    Crear Nueva Tarea
                </button>
            </Link>

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.length === 0 ? (
                    <p>No hay tareas todavía. ¡Creá una!</p>
                ) : (
                    tasks.map(task => (
                        <li key={task.id} style={{ border: '1px solid gray', margin: '10px 0', padding: '10px' }}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>Estado: {task.completed ? '✅ Completada' : '⏳ Pendiente'}</p>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button onClick={() => handleToggle(task)} style={{ cursor: 'pointer' }}>
                                    {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
                                </button>

                                <Link to={`/edit/${task.id}`} state={{ task }}>
                                    <button style={{ cursor: 'pointer', color: 'blue' }}>Editar</button>
                                </Link>

                                <button onClick={() => handleDelete(task.id)} style={{ cursor: 'pointer', color: 'red' }}>
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