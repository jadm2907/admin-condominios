const express = require("express");
const router = express.Router();
const unidadController = require("../controllers/unidadController");

// CRUD Unidad
router.get("/", unidadController.getUnidades);
router.get("/:id", unidadController.getUnidadById);
router.post("/", unidadController.createUnidad);
router.put("/:id", unidadController.updateUnidad);
router.delete("/:id", unidadController.deleteUnidad);

module.exports = router;
