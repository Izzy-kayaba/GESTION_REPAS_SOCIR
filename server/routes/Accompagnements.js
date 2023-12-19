const AccompagnementsController = require("../controllers/Accompagnement");
const express = require("express");
const router = express.Router();


router.get("/", AccompagnementsController.getAccompagnements);
// router.get("/:id", AccompagnementsController.getAccompagnementsById);
// router.post("/", AccompagnementsController.createNewAccompagnements);
// router.put("/:id", AccompagnementsController.updateAgent);
// router.get("/", AccompagnementsController.getAccompagnements);
 
module.exports = router;