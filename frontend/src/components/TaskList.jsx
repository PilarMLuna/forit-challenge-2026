import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('/api/tasks');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error al traer las tareas:', error);
            }
        };

        fetchTasks();
    }, []);

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
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TaskList;