const express = require("express");
const router = express.Router();
const { aiInsight } = require("../controllers/aiController");

router.post("/ai-insight", aiInsight);

module.exports = router;
