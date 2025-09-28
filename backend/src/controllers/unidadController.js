const UnidadService = require("../services/unidadService");
const HttpUtils = require("../utils/HttpUtils");
const logger = require("../utils/logger");

exports.getUnidades = async (req, res) => {
  try {
    const unidades = await UnidadService.getAll();
    HttpUtils.successResponse(res, unidades);
  } catch (error) {
    logger.error("Error al obtener unidades:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.getUnidadById = async (req, res) => {
  try {
    const unidad = await UnidadService.getById(req.params.id);
    if (!unidad) return HttpUtils.notFoundResponse(res, "Unidad no encontrada");
    HttpUtils.successResponse(res, unidad);
  } catch (error) {
    logger.error("Error al obtener unidad:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.createUnidad = async (req, res) => {
  try {
    const unidad = await UnidadService.create(req.body);
    logger.info(`[SUCCESS 201] POST /api/unidades - Unidad creada con éxito`);
    HttpUtils.createdResponse(res, unidad);
  } catch (error) {
    logger.error("Error al crear unidad:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.updateUnidad = async (req, res) => {
  try {
    const unidad = await UnidadService.update(req.params.id, req.body);
    if (!unidad) return HttpUtils.notFoundResponse(res, "Unidad no encontrada");
    HttpUtils.successResponse(res, unidad);
  } catch (error) {
    logger.error("Error al actualizar unidad:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.deleteUnidad = async (req, res) => {
  try {
    const deleted = await UnidadService.delete(req.params.id);
    if (!deleted) return HttpUtils.notFoundResponse(res, "Unidad no encontrada");
    HttpUtils.successResponse(res, { message: "Unidad eliminada con éxito" });
  } catch (error) {
    logger.error("Error al eliminar unidad:", error);
    HttpUtils.errorResponse(res, error);
  }
};
