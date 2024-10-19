const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
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
