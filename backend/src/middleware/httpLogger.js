const morgan = require("morgan");
const logger = require("../utils/logger");

// Formato de log para registrar detalles de cada request
const stream = {
  write: (message) => logger.http(message.trim()),
};

// Middleware morgan con formato personalizado
const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

module.exports = httpLogger;
