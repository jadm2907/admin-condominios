const logger = require("../utils/logger");

function requestLogger(req, res, next) {
  const start = Date.now();

  // Log de la request entrante
  logger.info(`[REQUEST] ${req.method} ${req.originalUrl} - Body: ${JSON.stringify(req.body)}`);

  // Cuando termine la respuesta, calculamos tiempo y loggeamos
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    if (statusCode >= 400) {
      logger.error(`[RESPONSE ${statusCode}] ${req.method} ${req.originalUrl} - ${duration}ms`);
    } else {
      logger.info(`[RESPONSE ${statusCode}] ${req.method} ${req.originalUrl} - ${duration}ms`);
    }
  });

  next();
}

module.exports = requestLogger;
