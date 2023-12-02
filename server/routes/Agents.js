const AgentsController = require("../controllers/Agent");
const express = require("express");
const router = express.Router();


router.get("/", AgentsController.getAgents);
router.get("/:id", AgentsController.getAgentsById);
router.post("/", AgentsController.createNewAgents);
router.put("/:id", AgentsController.updateAgent);
// router.get("/", AgentsController.getAgents);

module.exports = router;