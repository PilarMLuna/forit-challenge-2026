import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newTask = { title, description };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask) 
            });

            if (response.ok) {
                navigate('/');
            } else {
                console.error('Error al crear la tarea');
            }
        } catch (error) {
            console.error('Error de red al conectar con el backend:', error);
        }
    };

    return (
        <div>
            <h2>Crear Nueva Tarea</h2>
            
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
                    Guardar Tarea
                </button>
            </form>

            <button onClick={() => navigate('/')} style={{ marginTop: '10px', cursor: 'pointer' }}>
                Cancelar
            </button>
        </div>
    );
}

export default TaskForm;