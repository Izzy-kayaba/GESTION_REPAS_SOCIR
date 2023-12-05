const UsersController = require("../controllers/User");
const express = require("express");
const router = express.Router();


router.get("/", UsersController.getUsers);
// router.get("/", AgentsController.getAgents);

module.exports = router;