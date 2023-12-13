const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model for the user who created the survey
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
