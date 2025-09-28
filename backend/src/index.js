// ==============================
// Backend - Administración de Condominios
// index.js
// ==============================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db"); // conexión a MySQL
const httpLogger = require("./middleware/httpLogger"); // si usas este middleware
const condominioRoutes = require("./routes/condominioRoutes");
const unidadRoutes = require("./routes/unidadRoutes");
const residenteRoutes = require("./routes/residenteRoutes");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler"); // ✅ ruta corregida
const requestLogger = require("./middleware/requestLogger"); // ✅ ruta corregida

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(httpLogger);       // si no usas este, lo puedes comentar
app.use(requestLogger);    // log de requests/respuestas

// Rutas principales
app.use("/api/condominios", condominioRoutes);
app.use("/api/unidades", unidadRoutes);
app.use("/api/residentes", residenteRoutes);

// Ruta de prueba
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "✅ API Administración de Condominios funcionando 🚀",
    timestamp: new Date(),
  });
});

// Middleware de errores (AL FINAL siempre)
app.use(errorHandler);

// Conexión a la base de datos y arranque del servidor
sequelize
  .authenticate()
  .then(() => {
    logger.info("✅ Conectado a la base de datos MySQL");
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("❌ Error al conectar con la base de datos:", err.message);
  });
