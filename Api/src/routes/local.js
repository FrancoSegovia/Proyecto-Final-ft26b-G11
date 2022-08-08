const express = require("express");
const localController = require("../routes/controllers/controller_locals");
const router = express.Router();

router.post("/", localController.post);
router.get("/", localController.get);
router.get("/:id", localController.getId);

module.exports = router;
