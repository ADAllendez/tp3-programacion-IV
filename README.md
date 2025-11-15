🚚 Sistema de Gestión de Vehículos, Conductores y Viajes

Este proyecto es una aplicación completa que permite administrar vehículos, conductores y los viajes realizados por una empresa de transporte. Incluye autenticación de usuarios, operaciones CRUD y consultas avanzadas.

🔧 ¿Para qué sirve?

El sistema permite:

Registrar vehículos y conductores.

Crear y consultar viajes realizados.

Ver historial de viajes por conductor o vehículo.

Calcular los kilómetros totales recorridos.

Proteger la información mediante inicio de sesión y autenticación con token.

🖥️ Tecnologías utilizadas
Frontend

Vite + React.

TailwindCSS para estilos.

Formularios de login, registro y CRUD.

Comunicación con el backend mediante fetch y API REST.

Validaciones de datos (formularios, campos requeridos, formatos correctos).

Páginas:

Vehículos

Conductores

Viajes (carga, listado e historial)

Backend

Node.js + Express.js.

Base de datos MySQL usando mysql2.

Validaciones con express-validator en todas las rutas.

Manejo de errores con respuestas HTTP adecuadas (400, 401, 403, 404, 500).

Archivos .http para probar la API desde VSCode.

Archivo .sql con las tablas necesarias:

Vehículos

Conductores

Viajes

🔐 Autenticación y seguridad

Registro e inicio de sesión de usuarios.

Autenticación por medio de JWT, con expiración de 4 horas.

Middleware con Passport para verificar tokens y proteger rutas.

Contraseñas encriptadas con bcrypt (no se guardan ni envían en texto plano).

📦 Entidades principales
Vehículo

id, marca, modelo, patente, año, capacidad de carga

Conductor

id, nombre, apellido, DNI, licencia, vencimiento de licencia

Viaje

id, vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilómetros, observaciones
