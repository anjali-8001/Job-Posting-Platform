const mongoose = require("mongoose");

const userOtpSchema = new mongoose.Schema(
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
    emailOtp: {
      type: String,
    },
    emailOtpExpires: {
      type: Date,
    },
    mobileOtp: {
      type: String,
    },
    mobileOtpExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("userOtps", userOtpSchema);
