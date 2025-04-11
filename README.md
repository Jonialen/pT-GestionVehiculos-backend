# Backend API - Gestión de Vehículos

Este es un backend construido con Node.js, Express y MySQL, diseñado para gestionar registros de vehículos. Ofrece endpoints para crear, leer, actualizar y eliminar información de vehículos.

---

## Tecnologías utilizadas

- Node.js  
- Express  
- MySQL  
- Docker (opcional)  
- dotenv (variables de entorno)

---

## Estructura del Proyecto
```
vehiculos-api/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   └── vehiculosController.js
├── routes/
│   └── vehiculos.js
├── .env
├── .gitignore
├── package.json
└── README.md
```
---

## Requisitos

- Node.js 22.14.0 (solo si lo ejecutas sin Docker)
- Docker (opcional)
- Acceso a una base de datos MySQL

---

## Variables de Entorno

Las variables de conexión se definen en el archivo `.env`:

DB_HOST={ip database}
DB_USER={user database}
DB_PASSWORD={password database} 
DB_NAME={name database}
PORT=3000

---

## Ejecutar la App

### Opción 1: Usar Docker

1. Construye la imagen:

   docker build -t back-pt .

2. Ejecuta el contenedor:

   docker run -d -p 3000:3000 --name node-api-pt-container back-pt

   La API estará disponible en: http://localhost:3000

3. (Opcional) Si el puerto 3000 está ocupado:

   docker run -d -p 3001:3000 --name node-api-pt-container back-pt

---

### Opción 2: Ejecutar localmente (sin Docker)

1. Instala las dependencias:

   npm install

2. Crea el archivo `.env` y configura las variables necesarias (ver sección anterior).

3. Corre el servidor:

   node app.js

---

## Endpoints Disponibles

Método | Ruta                | Descripción
-------|---------------------|------------------------------------------
GET    | /                   | Verifica que la API está funcionando
GET    | /vehiculos          | Obtener todos los vehículos
GET    | /vehiculos/:placa   | Obtener un vehículo por placa
POST   | /vehiculos          | Crear un nuevo vehículo
PUT    | /vehiculos/:placa   | Editar un vehículo existente
DELETE | /vehiculos/:placa   | Eliminar un vehículo por placa

---

## Comandos Docker útiles

- Ver contenedores activos:  
  docker ps

- Detener contenedor:  
  docker stop node-api-pt-container

- Eliminar contenedor:  
  docker rm node-api-pt-container

---

## Autor

Desarrollado por Jonialen

