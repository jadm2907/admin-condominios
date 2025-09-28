const express = require("express");
const router = express.Router();
const residenteController = require("../controllers/residenteController");

// CRUD Residente
router.get("/", residenteController.getResidentes);
router.get("/:id", residenteController.getResidenteById);
router.post("/", residenteController.createResidente);
router.put("/:id", residenteController.updateResidente);
router.delete("/:id", residenteController.deleteResidente);

module.exports = router;
