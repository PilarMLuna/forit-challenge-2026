import { Routes, Route } from 'react-router-dom'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
  return (
    <div>
      <h1>Sistema de Tareas ForIT</h1>
      
      <Routes>
        {/* Ruta principal: Muestra la lista */}
        <Route path="/" element={<TaskList />} />
        
        {/* Ruta para crear: Muestra el formulario vacío */}
        <Route path="/new" element={<TaskForm />} />
        
        {/* Ruta para editar: Muestra el formulario, esperando un ID dinámico */}
        <Route path="/edit/:id" element={<TaskForm />} />
      </Routes>
    </div>
  )
}

export default App