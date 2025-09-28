// src/controllers/residenteUnidadController.js
const residenteUnidadService = require('../services/residenteUnidadService');
const HttpUtils = require('../utils/HttpUtils');
const logger = require('../utils/logger');

exports.getResidentesUnidades = async (req, res, next) => {
  try {
    const data = await residenteUnidadService.getAll();
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener relaciones Residente_Unidad: ${error.message}`);
    return next(error);
  }
};

exports.getResidenteUnidadById = async (req, res, next) => {
  try {
    const data = await residenteUnidadService.getById(req.params.id);
    if (!data) return HttpUtils.errorResponse(res, 'Relación no encontrada', 404);
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener relación: ${error.message}`);
    return next(error);
  }
};

exports.createResidenteUnidad = async (req, res, next) => {
  try {
    const data = await residenteUnidadService.create(req.body);
    logger.info('[SUCCESS] Relación Residente_Unidad creada');
    return HttpUtils.successResponse(res, data, 201);
  } catch (error) {
    logger.error(`Error al crear relación: ${error.message}`);
    return next(error);
  }
};

exports.updateResidenteUnidad = async (req, res, next) => {
  try {
    const updated = await residenteUnidadService.update(req.params.id, req.body);
    if (!updated) return HttpUtils.errorResponse(res, 'Relación no encontrada', 404);
    logger.info('[SUCCESS] Relación actualizada');
    return HttpUtils.successResponse(res, 'Relación actualizada', 200);
  } catch (error) {
    logger.error(`Error al actualizar relación: ${error.message}`);
    return next(error);
  }
};

exports.deleteResidenteUnidad = async (req, res, next) => {
  try {
    const deleted = await residenteUnidadService.delete(req.params.id);
    if (!deleted) return HttpUtils.errorResponse(res, 'Relación no encontrada', 404);
    logger.info('[SUCCESS] Relación eliminada (soft delete)');
    return HttpUtils.successResponse(res, 'Relación eliminada', 200);
  } catch (error) {
    logger.error(`Error al eliminar relación: ${error.message}`);
    return next(error);
  }
};

