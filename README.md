# 🏢 Admin-Condominios

Sistema de administración de condominios y edificios, desarrollado con **Node.js**, **Express**, **Sequelize** y **MySQL**.
Incluye API REST para la gestión de **Condominios**, **Unidades** y **Residentes**.

---

## 🚀 Tecnologías

* Node.js + Express
* Sequelize (ORM)
* MySQL
* Winston + DailyRotateFile (logging)
* Middleware de manejo de errores centralizado
* Respuestas JSON estandarizadas con `HttpUtils`

---

## ⚙️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tuusuario/admin-condominios.git
cd admin-condominios/backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` en `backend/` con la configuración de base de datos:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=toorpass
DB_NAME=admin_condominios
```

4. Ejecutar el servidor:

```bash
npm start
```

---

## 📦 Estructura del proyecto

```
backend/
├── src/
│   ├── controllers/   # Lógica CRUD
│   ├── models/        # Definición Sequelize
│   ├── routes/        # Endpoints API
│   ├── middleware/    # Error handler, logging
│   ├── utils/         # HttpUtils, logger
│   └── index.js       # Punto de entrada
├── logs/              # Archivos de logs diarios
└── package.json
```

---

## 📡 Endpoints disponibles

### 🔹 Condominios

* `GET /api/condominios` → Listar todos
* `GET /api/condominios/:id` → Obtener por ID
* `POST /api/condominios` → Crear
* `PUT /api/condominios/:id` → Actualizar
* `DELETE /api/condominios/:id` → Eliminar

**Ejemplo JSON (POST/PUT):**

```json
{
  "nombre": "Condominio Central",
  "direccion": "Av. Principal 123",
  "ciudad": "Santiago",
  "region": "RM",
  "estado": "activo"
}
```

---

### 🔹 Unidades

* `GET /api/unidades` → Listar todas
* `GET /api/unidades/:id` → Obtener por ID
* `POST /api/unidades` → Crear
* `PUT /api/unidades/:id` → Actualizar
* `DELETE /api/unidades/:id` → Eliminar

**Ejemplo JSON (POST/PUT):**

```json
{
  "id_condominio": 1,
  "tipo": "departamento",
  "numero": "A101",
  "superficie": 75.5,
  "estado": "ocupada"
}
```

---

### 🔹 Residentes

* `GET /api/residentes` → Listar todos
* `GET /api/residentes/:id` → Obtener por ID
* `POST /api/residentes` → Crear
* `PUT /api/residentes/:id` → Actualizar
* `DELETE /api/residentes/:id` → Eliminar

**Ejemplo JSON (POST/PUT):**

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "rut": "22.222.222-2",
  "correo": "juan.perez@mail.com",
  "telefono": "987654321",
  "tipo": "propietario",
  "estado": "activo"
}
```

⚠️ El campo `rut` es **único**, si intentas registrar un duplicado recibirás un error `409 Conflict`.

---

## 🔍 Ejemplos con `curl`

### Crear condominio

```bash
curl -X POST http://localhost:4000/api/condominios \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Condominio Central",
  "direccion": "Av. Principal 123",
  "ciudad": "Santiago",
  "region": "RM",
  "estado": "activo"
}'
```

### Crear unidad

```bash
curl -X POST http://localhost:4000/api/unidades \
-H "Content-Type: application/json" \
-d '{
  "id_condominio": 1,
  "tipo": "departamento",
  "numero": "A101",
  "superficie": 75.5,
  "estado": "ocupada"
}'
```

### Crear residente

```bash
curl -X POST http://localhost:4000/api/residentes \
-H "Content-Type: application/json" \
-d '{
  "nombre": "María",
  "apellido": "Gómez",
  "rut": "11.111.111-1",
  "correo": "maria.gomez@mail.com",
  "telefono": "912345678",
  "tipo": "arrendatario",
  "estado": "activo"
}'
```

---

## 📝 Logs

* Los logs se guardan en `logs/` con rotación diaria (`.log`).
* Se registran:

  * Errores (`error`)
  * Éxitos (`info`)
  * Advertencias (`warn`)

---

## ✅ Estado actual

* CRUD de Condominios, Unidades y Residentes funcionando.
* Respuestas JSON estandarizadas.
* Manejo de errores centralizado.
* Logger con rotación diaria.
