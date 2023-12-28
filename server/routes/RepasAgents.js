const RepasAgentsController = require("../controllers/RepasAgent.js");
const express = require("express");
const router = express.Router();


router.get("/", RepasAgentsController.getRepasAgents);
// router.get("/:id", RepasAgentsController.getRepasAgentsById);
// router.post("/", RepasAgentsController.createNewRepasAgents);
// router.put("/:id", RepasAgentsController.updateAgent);
// router.get("/", RepasAgentsController.getRepasAgents);

module.exports = router;