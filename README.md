# Sistema de Tareas - ForIT Challenge

Aplicación Full Stack para la gestión de tareas (CRUD completo) desarrollada como prueba técnica para el ForIT Challenge.

## 🚀 Tecnologías Utilizadas

* **Frontend:** React.js, Vite, React Router DOM.
* **Backend:** Node.js, Express.
* **Base de Datos:** SQLite (Persistencia local).

## ⚙️ Características

* Arquitectura Cliente-Servidor separada en dos directorios (`/frontend` y `/backend`).
* Configuración de Proxy en Vite para evitar errores de CORS durante el desarrollo.
* Base de datos relacional (SQLite) para asegurar la persistencia de datos tras el reinicio del servidor.
* Rutas dinámicas en el frontend para crear, visualizar, editar y eliminar tareas.

## 🛠️ Instalación y Ejecución Local

Para correr este proyecto en tu entorno local, sigue estos pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/PilarMLuna/forit-challenge-2026.git
cd forit-challenge-2026
```

### 2. Levantar el Backend

Abre una terminal y ejecuta:

```bash
cd backend
npm install
node server.js
```

El servidor iniciará en `http://localhost:3000` y generará automáticamente el archivo `database.sqlite`.

### 3. Levantar el Frontend

Abre una nueva pestaña en la terminal y ejecuta:

```bash
cd frontend
npm install
npm run dev
```

La aplicación web estará disponible en `http://localhost:5173`.