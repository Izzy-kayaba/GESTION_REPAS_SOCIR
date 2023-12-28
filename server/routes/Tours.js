const ToursController = require("../controllers/Tour.js");
const express = require("express");
const router = express.Router();


router.get("/", ToursController.getTours);
// router.get("/:id", ToursController.getToursById);
// router.post("/", ToursController.createNewTours);
// router.put("/:id", ToursController.updateAgent);
// router.get("/", ToursController.getTours);

module.exports = router;