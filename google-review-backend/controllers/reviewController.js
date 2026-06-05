const Review = require("../models/Review");

// Save Review
exports.submitReview = async (req, res) => {
  try {
    const {
      rating,
      feedback,
      customerName,
      customerEmail,
    } = req.body;

    const review = await Review.create({
      rating,
      feedback,
      customerName,
      customerEmail,
      reviewType:
        rating >= 4 ? "positive" : "negative",
    });

    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteReview = async (
  req,
  res
) => {
  try {
    await Review.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
    });
  }
};