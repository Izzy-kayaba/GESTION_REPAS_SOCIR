const CondimentsController = require("../controllers/Condiment");
const express = require("express");
const router = express.Router();


router.get("/", CondimentsController.getCondiments);
// router.get("/:id", CondimentsController.getCondimentsById);
// router.post("/", CondimentsController.createNewCondiments);
// router.put("/:id", CondimentsController.updateAgent);
// router.get("/", CondimentsController.getCondiments);

module.exports = router;