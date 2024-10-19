const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    candidates: [
      {
        email: {
          type: String,
          required: true,
        },
      },
    ],
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("jobs", JobSchema);
