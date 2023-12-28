const FonctionsController = require("../controllers/Fonction.js");
const express = require("express");
const router = express.Router();


router.get("/", FonctionsController.getFonctions);
// router.get("/:id", FonctionsController.getFonctionsById);
// router.post("/", FonctionsController.createNewFonctions);
// router.put("/:id", FonctionsController.updateAgent);
// router.get("/", FonctionsController.getFonctions);

module.exports = router;