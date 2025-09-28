const CondominioService = require("../services/condominioService");
const HttpUtils = require("../utils/HttpUtils");
const logger = require("../utils/logger");

exports.getCondominios = async (req, res) => {
  try {
    const condominios = await CondominioService.getAll();
    HttpUtils.successResponse(res, condominios);
  } catch (error) {
    logger.error("Error al obtener condominios:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.getCondominioById = async (req, res) => {
  try {
    const condominio = await CondominioService.getById(req.params.id);
    if (!condominio) return HttpUtils.notFoundResponse(res, "Condominio no encontrado");
    HttpUtils.successResponse(res, condominio);
  } catch (error) {
    logger.error("Error al obtener condominio:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.createCondominio = async (req, res) => {
  try {
    const condominio = await CondominioService.create(req.body);
    logger.info(`[SUCCESS 201] POST /api/condominios - Condominio creado con éxito`);
    HttpUtils.createdResponse(res, condominio);
  } catch (error) {
    logger.error("Error al crear condominio:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.updateCondominio = async (req, res) => {
  try {
    const condominio = await CondominioService.update(req.params.id, req.body);
    if (!condominio) return HttpUtils.notFoundResponse(res, "Condominio no encontrado");
    HttpUtils.successResponse(res, condominio);
  } catch (error) {
    logger.error("Error al actualizar condominio:", error);
    HttpUtils.errorResponse(res, error);
  }
};

exports.deleteCondominio = async (req, res) => {
  try {
    const deleted = await CondominioService.delete(req.params.id);
    if (!deleted) return HttpUtils.notFoundResponse(res, "Condominio no encontrado");
    HttpUtils.successResponse(res, { message: "Condominio eliminado con éxito" });
  } catch (error) {
    logger.error("Error al eliminar condominio:", error);
    HttpUtils.errorResponse(res, error);
  }
};
