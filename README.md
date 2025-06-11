
# Terra Ripple

**Terra Ripple** es una aplicación **Full Stack** desarrollada para facilitar la **gestión de errores e incidencias** de *Terra* con integración directa a **ClickUp API**. Nuestra solución permite a administradores y clientes colaborar en la creación, clasificación y seguimiento de *issues* de manera sencilla y eficiente.

## ✨ Funcionalidades principales

- **Sistema de roles:**
  - 🛡️ **Admin**: puede crear nuevos proyectos, usuarios y ver todos los issues.
  - 👤 **Cliente**: solo puede acceder si un administrador lo invita. Recibe un email para establecer su contraseña y activar su cuenta.
  
- **Gestión de Proyectos e Issues:**
  - Cada cliente puede ver los proyectos asignados.
  - Los issues creados se categorizan y se envían posteriormente a ClickUp mediante su API.
  - El cliente puede **aceptar o rechazar cambios** en los issues, modificando su estado.

- **Emails automáticos:**
  - Al crear usuarios (registro).
  - Notificaciones de cambios o actualizaciones en los issues.

- **Validaciones robustas:**
  - Contraseñas seguras mediante expresiones regulares.
  - Validaciones de formularios en frontend y backend.
  - Gestión centralizada de errores.

---

## 🖥️ Tecnologías utilizadas

### Backend
- **Node.js**
- **Express**
- **Mongoose (MongoDB)**
- **Nodemailer** (envío de emails)
- **bcrypt** (hash de contraseñas)
- **jsonwebtoken (JWT)** (autenticación)
- **multer** (subida de archivos)
- **axios** (consumo de ClickUp API)
- **cookie-parser**
- **cors**
- **markdown-builder**

### Frontend
- **Vite**
- **React**
- **react-router-dom**
- **react-select**
- **react-joyride**
- **React DOM**

### Herramientas
- **Docker** (orquestación backend + base de datos)
- **Nodemon**
- **dotenv**

---

## ⚙️ Instalación y configuración

### 📦 Opción 1: Uso con Docker

1. Clonar el repositorio:

```bash
git clone https://github.com/arakiztain/TerraRipple.git
cd TerraRipple
```

2. Configura las variables de entorno necesarias en el archivo `.env` (ejemplo en `.env.example`).

3. Levanta los contenedores de backend y base de datos con Docker Compose:

```bash
docker-compose up --build
```

El backend se conectará automáticamente a la base de datos MongoDB.

4. Inicia el frontend (React) por separado:

```bash
cd client
npm install
npm run dev
```

### ⚙️ Opción 2: Manual (sin Docker)

1. Instalar dependencias:

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

2. Configura tu `.env` como se indica en el apartado Docker.

3. Levanta los servicios:

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev
```

---

## 🗂️ Estructura del proyecto

```
terraRipple/
│
├── client/                   # Frontend React con Vite
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # Chatbot, formularios, listas, etc.
│   │   ├── context/
│   │   ├── fonts/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── global.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                   # Backend Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/      # authController.js, issueController.js...
│   │   ├── middlewares/
│   │   ├── models/           # issue.js, project.js, user.js
│   │   ├── routes/           # authRouter.js, userRouter.js...
│   │   ├── utils/
│   │   └── index.js
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── init-mongo.js
│   └── package.json
│
├── .gitignore
├── eslint.config.js
├── README.md
└── package-lock.json
```

---

## 🚀 Funcionalidades futuras (Roadmap)

- [ ] Panel de estadísticas para admins.
- [ ] Sistema de filtros y búsqueda avanzada de issues.
- [ ] Logs de actividad.
- [ ] Mejoras en UI/UX.

---

## 📄 Licencia

Este proyecto es de uso privado para **Terra**. Su uso o distribución externa está sujeta a autorización.