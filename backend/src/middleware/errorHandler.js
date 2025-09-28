// backend/src/middleware/errorHandler.js
const HttpUtils = require("../utils/HttpUtils");
const logger = require("../utils/logger");

function errorHandler(err, req, res, next) {
  try {
    // Log estructurado básico
    logger.error(
      `[ERROR ${err && err.status ? err.status : 500}] ${req.method} ${req.originalUrl} - ${err && err.message ? err.message : String(err)}`
    );
  } catch (logErr) {
    // en caso de que logger falle, no romper todo
    console.error("Logger failed inside errorHandler:", logErr);
  }

  // Si HttpUtils.errorResponse existe, úsalo (esperado)
  if (HttpUtils && typeof HttpUtils.errorResponse === "function") {
    return HttpUtils.errorResponse(res, err, req);
  }

  // Fallback seguro si HttpUtils no está bien definido
  const status = (err && err.status) || 500;
  return res.status(status).json({
    success: false,
    category: status >= 500 ? "ServerError" : "ClientError",
    message: status >= 500 ? "Error interno del servidor" : (err && err.message) || "Error",
    error: {
      name: err && err.name ? err.name : "Error",
      message: err && err.message ? err.message : String(err),
    },
    data: null,
    code: status,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
}

module.exports = errorHandler;
