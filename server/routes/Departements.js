const DepartementsController = require("../controllers/Departement.js");
const express = require("express");
const router = express.Router();


router.get("/", DepartementsController.getDepartements);
// router.get("/:id", DepartementsController.getDepartementsById);
// router.post("/", DepartementsController.createNewDepartements);
// router.put("/:id", DepartementsController.updateAgent);
// router.get("/", DepartementsController.getDepartements);

module.exports = router;