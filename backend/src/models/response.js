const mongoose = require("mongoose");

// Survey Response Schema
const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  choices: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
      },
      answer: String,
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model("Response", responseSchema);
