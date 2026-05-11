import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation(); 

    useEffect(() => {
        if (id && location.state && location.state.task) {
            setTitle(location.state.task.title);
            setDescription(location.state.task.description);
        }
    }, [id, location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = { title, description };

        try {
            const url = id ? `/api/tasks/${id}` : '/api/tasks';
            const method = id ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Error al procesar la tarea en el backend');
            }
        } catch (error) {
            console.error('Error de red al intentar hacer el POST/PUT:', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input
                    type="text"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ minHeight: '80px' }}
                />

                <button type="submit" style={{ cursor: 'pointer', padding: '10px' }}>
                    {id ? 'Actualizar Tarea' : 'Guardar Tarea'}
                </button>
            </form>

            <button onClick={() => navigate('/')} style={{ marginTop: '10px', cursor: 'pointer' }}>
                Cancelar
            </button>
        </div>
    );
}

export default TaskForm;