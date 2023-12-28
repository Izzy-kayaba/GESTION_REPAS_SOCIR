const RepasController = require("../controllers/Repas.js");
const express = require("express");
const router = express.Router();


router.get("/", RepasController.getRepas);
// router.get("/:id", RepasController.getRepasById);
// router.post("/", RepasController.createNewRepas);
// router.put("/:id", RepasController.updateAgent);
// router.get("/", RepasController.getRepas);

module.exports = router;