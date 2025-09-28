// src/controllers/condominioController.js
const condominioService = require('../services/condominioService');
const HttpUtils = require('../utils/HttpUtils');
const logger = require('../utils/logger');

exports.getCondominios = async (req, res, next) => {
  try {
    const data = await condominioService.getAll();
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener condominios: ${error.message}`);
    return next(error);
  }
};

exports.getCondominioById = async (req, res, next) => {
  try {
    const data = await condominioService.getById(req.params.id);
    if (!data) return HttpUtils.errorResponse(res, 'Condominio no encontrado', 404);
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener condominio: ${error.message}`);
    return next(error);
  }
};

exports.createCondominio = async (req, res, next) => {
  try {
    const data = await condominioService.create(req.body);
    logger.info('[SUCCESS] Condominio creado');
    return HttpUtils.successResponse(res, data, 201);
  } catch (error) {
    logger.error(`Error al crear condominio: ${error.message}`);
    return next(error);
  }
};

exports.updateCondominio = async (req, res, next) => {
  try {
    const updated = await condominioService.update(req.params.id, req.body);
    if (!updated) return HttpUtils.errorResponse(res, 'Condominio no encontrado', 404);
    logger.info('[SUCCESS] Condominio actualizado');
    return HttpUtils.successResponse(res, 'Condominio actualizado', 200);
  } catch (error) {
    logger.error(`Error al actualizar condominio: ${error.message}`);
    return next(error);
  }
};

exports.deleteCondominio = async (req, res, next) => {
  try {
    const deleted = await condominioService.delete(req.params.id);
    if (!deleted) return HttpUtils.errorResponse(res, 'Condominio no encontrado', 404);
    logger.info('[SUCCESS] Condominio eliminado (soft delete)');
    return HttpUtils.successResponse(res, 'Condominio eliminado', 200);
  } catch (error) {
    logger.error(`Error al eliminar condominio: ${error.message}`);
    return next(error);
  }
};

