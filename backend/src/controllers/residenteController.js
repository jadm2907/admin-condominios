const ResidenteService = require("../services/residenteService");
const HttpUtils = require("../utils/HttpUtils");
const logger = require("../utils/logger");

exports.getResidentes = async (req, res) => {
  try {
    const residentes = await ResidenteService.getAll();
    HttpUtils.successResponse(res, residentes);
  } catch (error) {
    logger.error("Error al obtener residentes:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.getResidenteById = async (req, res) => {
  try {
    const residente = await ResidenteService.getById(req.params.id);
    if (!residente) return HttpUtils.notFoundResponse(res, "Residente no encontrado");
    HttpUtils.successResponse(res, residente);
  } catch (error) {
    logger.error("Error al obtener residente:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.createResidente = async (req, res) => {
  try {
    const residente = await ResidenteService.create(req.body);
    logger.info(`[SUCCESS 201] POST /api/residentes - Residente creado con éxito`);
    return HttpUtils.createdResponse(res, residente, "Residente creado con éxito", req);
  } catch (error) {
    // Caso: violación de UNIQUE en DB (por ejemplo rut duplicado)
    if (error && (error.name === "SequelizeUniqueConstraintError" || error.status === 409)) {
      logger.warn(`Intento de crear residente duplicado: ${req.body?.rut || ""}`);
      return HttpUtils.sendError(res, "Residente con ese RUT ya existe", error, 409, req);
    }

    // Otro error - manejo general
    logger.error(`Error al crear residente: ${error && error.message}`);
    return HttpUtils.errorResponse(res, error, req);
  }
};

exports.updateResidente = async (req, res) => {
  try {
    const residente = await ResidenteService.update(req.params.id, req.body);
    if (!residente) return HttpUtils.notFoundResponse(res, "Residente no encontrado");
    HttpUtils.successResponse(res, residente);
  } catch (error) {
    logger.error("Error al actualizar residente:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.deleteResidente = async (req, res) => {
  try {
    const deleted = await ResidenteService.delete(req.params.id);
    if (!deleted) return HttpUtils.notFoundResponse(res, "Residente no encontrado");
    HttpUtils.successResponse(res, { message: "Residente eliminado con éxito" });
  } catch (error) {
    logger.error("Error al eliminar residente:", error);
    HttpUtils.errorResponse(res, error);
  }
};
