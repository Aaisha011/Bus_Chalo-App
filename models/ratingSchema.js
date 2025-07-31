const { mongoose } = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      default: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
