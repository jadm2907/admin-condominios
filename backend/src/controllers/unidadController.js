// src/controllers/unidadController.js
const unidadService = require('../services/unidadService');
const HttpUtils = require('../utils/HttpUtils');
const logger = require('../utils/logger');

exports.getUnidades = async (req, res, next) => {
  try {
    const data = await unidadService.getAll();
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener unidades: ${error.message}`);
    return next(error);
  }
};

exports.getUnidadById = async (req, res, next) => {
  try {
    const data = await unidadService.getById(req.params.id);
    if (!data) return HttpUtils.errorResponse(res, 'Unidad no encontrada', 404);
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener unidad: ${error.message}`);
    return next(error);
  }
};

exports.createUnidad = async (req, res, next) => {
  try {
    const data = await unidadService.create(req.body);
    logger.info('[SUCCESS] Unidad creada');
    return HttpUtils.successResponse(res, data, 201);
  } catch (error) {
    logger.error(`Error al crear unidad: ${error.message}`);
    return next(error);
  }
};

exports.updateUnidad = async (req, res, next) => {
  try {
    const updated = await unidadService.update(req.params.id, req.body);
    if (!updated) return HttpUtils.errorResponse(res, 'Unidad no encontrada', 404);
    logger.info('[SUCCESS] Unidad actualizada');
    return HttpUtils.successResponse(res, 'Unidad actualizada', 200);
  } catch (error) {
    logger.error(`Error al actualizar unidad: ${error.message}`);
    return next(error);
  }
};

exports.deleteUnidad = async (req, res, next) => {
  try {
    const deleted = await unidadService.delete(req.params.id);
    if (!deleted) return HttpUtils.errorResponse(res, 'Unidad no encontrada', 404);
    logger.info('[SUCCESS] Unidad eliminada (soft delete)');
    return HttpUtils.successResponse(res, 'Unidad eliminada', 200);
  } catch (error) {
    logger.error(`Error al eliminar unidad: ${error.message}`);
    return next(error);
  }
};

