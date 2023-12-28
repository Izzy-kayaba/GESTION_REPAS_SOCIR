const EntitesController = require("../controllers/Entite.js");
const express = require("express");
const router = express.Router();


router.get("/", EntitesController.getEntites);
// router.get("/:id", EntitesController.getEntitesById);
// router.post("/", EntitesController.createNewEntites);
// router.put("/:id", EntitesController.updateAgent);
// router.get("/", EntitesController.getEntites);

module.exports = router;