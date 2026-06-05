const express = require("express");
const router = express.Router();

const {
  generateReview,
} = require("../controllers/aiController");

router.post("/generate", generateReview);

module.exports = router;