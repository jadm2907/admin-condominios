const winston = require("winston");
const fs = require("fs");
const path = require("path");
const DailyRotateFile = require("winston-daily-rotate-file");

// Directorio de logs
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Determinar si estamos en desarrollo
const isDevelopment =
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "dev" ||
  !process.env.NODE_ENV;

// Configuración de rotación
const getDailyRotateConfig = (filename, level = "info") => ({
  filename: path.join(logDir, filename),
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: isDevelopment ? "3d" : "14d",
  level: level,
});

// Formato consola
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

// Formato archivos
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

// Definir niveles personalizados
const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  sql: 4,
  debug: 5,
};

// Logger principal
const logger = winston.createLogger({
  levels: customLevels,
  level: process.env.LOG_LEVEL || "info",
  format: fileFormat,
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new DailyRotateFile(getDailyRotateConfig("admin-condominios-combined-%DATE%.log", "info")),
    new DailyRotateFile(getDailyRotateConfig("admin-condominios-error-%DATE%.log", "error")),
  ],
  exceptionHandlers: [
    new DailyRotateFile(getDailyRotateConfig("admin-condominios-exceptions-%DATE%.log")),
  ],
  rejectionHandlers: [
    new DailyRotateFile(getDailyRotateConfig("admin-condominios-rejections-%DATE%.log")),
  ],
});

// Limpieza de logs antiguos en desarrollo
const cleanupDevLogs = () => {
  if (!isDevelopment) return;

  const maxAge = 3 * 24 * 60 * 60 * 1000;
  const now = Date.now();

  try {
    const files = fs.readdirSync(logDir);
    files.forEach((file) => {
      if (file.startsWith("admin-condominios-") && (file.endsWith(".log") || file.endsWith(".gz"))) {
        const filePath = path.join(logDir, file);
        const stats = fs.statSync(filePath);
        const limit = file.endsWith(".gz") ? maxAge * 2 : maxAge;

        if (now - stats.mtimeMs > limit) {
          fs.unlinkSync(filePath);
          console.log(`🔄 [DEV] Log eliminado: ${file}`);
        }
      }
    });
  } catch (error) {
    console.error("❌ Error limpiando logs en desarrollo:", error.message);
  }
};

if (isDevelopment) {
  console.log("🔧 MODO DESARROLLO: Limpieza automática de logs (3 días)");
  cleanupDevLogs();
  setInterval(cleanupDevLogs, 24 * 60 * 60 * 1000);
} else {
  console.log("🚀 MODO PRODUCCIÓN: Retención normal de logs (14 días)");
}

// ==============================
// Middleware de manejo de errores
// ==============================
logger.errorHandler = (err, req, res, next) => {
  logger.error(
    `❌ [${req.method}] ${req.originalUrl} - ${err.message} | Stack: ${err.stack}`
  );

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
};

module.exports = logger;
