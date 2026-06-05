const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: Number,

    feedback: String,

    customerName: String,

    customerEmail: String,

    reviewType: {
      type: String,
      enum: ["positive", "negative"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Review",
  reviewSchema
);