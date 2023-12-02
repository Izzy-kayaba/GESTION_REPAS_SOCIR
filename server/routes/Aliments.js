const AlimentsController = require("../controllers/Aliment");
const express = require("express");
const router = express.Router();


router.get("/", AlimentsController.getAliments);
// router.get("/:id", AlimentsController.getAlimentsById);
// router.post("/", AlimentsController.createNewAliments);
// router.put("/:id", AlimentsController.updateAgent);
// router.get("/", AlimentsController.getAliments);

module.exports = router;