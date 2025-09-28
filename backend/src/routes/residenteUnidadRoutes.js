const express = require('express');
const router = express.Router();
const residenteUnidadController = require('../controllers/residenteUnidadController');

router.get('/', residenteUnidadController.getResidentesUnidades);
router.get('/:id', residenteUnidadController.getResidenteUnidadById);
router.post('/', residenteUnidadController.createResidenteUnidad);
router.put('/:id', residenteUnidadController.updateResidenteUnidad);
router.delete('/:id', residenteUnidadController.deleteResidenteUnidad);

module.exports = router;
