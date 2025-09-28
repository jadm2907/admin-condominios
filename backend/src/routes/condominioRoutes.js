const express = require("express");
const router = express.Router();
const condominioController = require("../controllers/condominioController");

// CRUD Condominio
router.get("/", condominioController.getCondominios);
router.get("/:id", condominioController.getCondominioById);
router.post("/", condominioController.createCondominio);
router.put("/:id", condominioController.updateCondominio);
router.delete("/:id", condominioController.deleteCondominio);

module.exports = router;
