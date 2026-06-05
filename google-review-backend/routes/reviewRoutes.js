const express = require("express");
const router = express.Router();

const {
  submitReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", submitReview);
router.get("/", getReviews);
router.delete("/:id", deleteReview);

module.exports = router;