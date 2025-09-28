// src/utils/HttpUtils.js
const { v4: uuidv4 } = require("uuid");
const logger = require("./logger");

const messages = { /* … tus mensajes ES/EN existentes … */ };

const getLang = (req) => {
  if (!req || !req.headers) return "es";
  const lang = req.headers["accept-language"];
  return lang && lang.startsWith("en") ? "en" : "es";
};

const getMessageForCode = (code, lang = "es") =>
  messages[lang]?.[code] || messages[lang]?.[500];

const getCategory = (code) => {
  if (code >= 100 && code < 200) return "Info";
  if (code >= 200 && code < 300) return "Success";
  if (code >= 300 && code < 400) return "Redirection";
  if (code >= 400 && code < 500) return "ClientError";
  if (code >= 500) return "ServerError";
  return "Unknown";
};

const formatError = (error) => {
  if (!error) return null;
  if (typeof error === "string") return { message: error };
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack:
        process.env.NODE_ENV === "development" ? error.stack : undefined,
    };
  }
  return error;
};

const buildResponse = (success, message, error, data, code, req) => {
  const lang = getLang(req);
  let msg = getMessageForCode(code, lang);
  if (message) msg = message;

  return {
    success,
    category: getCategory(code),
    message: msg,
    error: error ? formatError(error) : null,
    data: data ?? null,
    code,
    timestamp: new Date().toISOString(),
    path: req?.originalUrl || null,
    requestId: req?.id || uuidv4(),
  };
};

const HttpUtils = {
  // --- Métodos principales ---
  sendSuccess: (res, data = null, message = null, code = 200, req = null) => {
    if (res.headersSent) return;
    const response = buildResponse(true, message, null, data, code, req);
    logger.info(
      `[SUCCESS ${code}] ${req?.method || ""} ${req?.originalUrl || ""} - ${response.message}`
    );
    return res.status(code).json(response);
  },

  sendError: (res, message = null, error = null, code = 500, req = null) => {
    if (res.headersSent) return;
    const response = buildResponse(false, message, error, null, code, req);
    if (error?.stack) {
      logger.error(
        `[ERROR ${code}] ${req?.method || ""} ${req?.originalUrl || ""} - ${response.message} :: ${error.message}\n${error.stack}`
      );
    } else {
      logger.error(
        `[ERROR ${code}] ${req?.method || ""} ${req?.originalUrl || ""} - ${response.message} :: ${error?.message || ""}`
      );
    }
    return res.status(code).json(response);
  },

  // --- Alias retrocompatibles (lo que esperan tus controllers) ---
  successResponse(res, data, message = null, req = null) {
    return this.sendSuccess(res, data, message, 200, req);
  },

  createdResponse(res, data, message = null, req = null) {
    return this.sendSuccess(res, data, message, 201, req);
  },

  notFoundResponse(res, message = "Recurso no encontrado", req = null) {
    return this.sendError(res, message, null, 404, req);
  },

  errorResponse(res, error = null, req = null) {
    return this.sendError(
      res,
      "Error interno del servidor",
      error,
      500,
      req
    );
  },

  // Mensajes genéricos
  getMessages: () => ({
    success: "Operación exitosa",
    error: "Ha ocurrido un error",
    notFound: "Recurso no encontrado",
    created: "Recurso creado correctamente",
    updated: "Recurso actualizado correctamente",
    deleted: "Recurso eliminado correctamente",
  }),
};

module.exports = HttpUtils;
