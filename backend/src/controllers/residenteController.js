// src/controllers/residenteController.js
const residenteService = require('../services/residenteService');
const HttpUtils = require('../utils/HttpUtils');
const logger = require('../utils/logger');

exports.getResidentes = async (req, res, next) => {
  try {
    const data = await residenteService.getAll();
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener residentes: ${error.message}`);
    return next(error);
  }
};

exports.getResidenteById = async (req, res, next) => {
  try {
    const data = await residenteService.getById(req.params.id);
    if (!data) return HttpUtils.errorResponse(res, 'Residente no encontrado', 404);
    return HttpUtils.successResponse(res, data, 200);
  } catch (error) {
    logger.error(`Error al obtener residente: ${error.message}`);
    return next(error);
  }
};

exports.createResidente = async (req, res, next) => {
  try {
    const data = await residenteService.create(req.body);
    logger.info('[SUCCESS] Residente creado');
    return HttpUtils.successResponse(res, data, 201);
  } catch (error) {
    logger.error(`Error al crear residente: ${error.message}`);
    return next(error);
  }
};

exports.updateResidente = async (req, res, next) => {
  try {
    const updated = await residenteService.update(req.params.id, req.body);
    if (!updated) return HttpUtils.errorResponse(res, 'Residente no encontrado', 404);
    logger.info('[SUCCESS] Residente actualizado');
    return HttpUtils.successResponse(res, 'Residente actualizado', 200);
  } catch (error) {
    logger.error(`Error al actualizar residente: ${error.message}`);
    return next(error);
  }
};

exports.deleteResidente = async (req, res, next) => {
  try {
    const deleted = await residenteService.delete(req.params.id);
    if (!deleted) return HttpUtils.errorResponse(res, 'Residente no encontrado', 404);
    logger.info('[SUCCESS] Residente eliminado (soft delete)');
    return HttpUtils.successResponse(res, 'Residente eliminado', 200);
  } catch (error) {
    logger.error(`Error al eliminar residente: ${error.message}`);
    return next(error);
  }
};

