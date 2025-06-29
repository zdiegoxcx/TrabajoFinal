# 📝 Trabajo Final - PomoTask

Aplicación web de gestión de tareas con inicio de sesión y conexión a MongoDB. Esta versión busca ser sencilla y funcional.

---

## 📁 Estructura del Proyecto
```
TrabajoFinal/
│
├── node_modules                     # Carpeta de dependencias (no eliminar si quieres que funcione)
├── index.js                         # Lógica principal del servidor (Express + rutas)
├── Usuario.js                       # Modelo Mongoose (usuario y tareas)
├── package.json                     # Dependencias y scripts
├── docs/
│ ├── index.html                     # Página de inicio de sesión
│ ├── estilos_usuarios.css           # Estilo para login y registro
│ ├── principal.html                 # Página principal del sistema
│ ├── estilos_principal.css          # Estilo para la página principal
│ └── register.html                  # Página para registrar nuevos usuarios
├── docker-compose.yml               # Configuración para levantar MongoDB en Docker
└── .gitignore                       # Archivos ignorados por Git (generado por GitHub para Node.js)

```
---

## 📌 Pre-requisitos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) y Docker Compose (para levantar MongoDB)
- Git (Para clonar el repositorio)

---

## ⚙️ Comandos para ejecutar el backend

1. **Instalar dependencias:**

```bash
npm install
```
2. **Levantar la base de datos con Docker:**
```bash
docker-compose up -d
```
3. **Iniciar el servidor Express:**
```bash
docker-compose up -d
```
3. **Abre tu navegador en:**
```bash
http://localhost:3000
```
---

## 🗂️ Notas de Organización

- **Backend en la raíz:**
  Todo lo relacionado con el backend se encuentra en la raíz del proyecto.  
  Intenté separar los archivos en carpetas, pero fue más confuso que útil.

- **Mantenerlo simple:**
  Esta versión del proyecto está lo más limpia posible para facilitar su entendimiento.  
  Algunos mensajes dentro de los archivos explican decisiones o simplificaciones hechas.
