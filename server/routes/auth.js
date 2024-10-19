const express = require("express");
const {
  registerCompany,
  verifyEmail,
  verifyMobile,
  loginCompany,
  createJobPost,
  getJobPosts,
} = require("../controllers/auth");
const auth = require("../middlewares/auth");
const Company = require("../models/Company");

const router = express.Router();

router.post("/company-register", registerCompany);
router.post("/login", loginCompany);

router.post("/verify-email", verifyEmail);
router.post("/verify-mobile", verifyMobile);

router.post("/create-job-post", auth, createJobPost);
router.get("/get-jobs", auth, getJobPosts);

router.get("/auth-user", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const company = await Company.findById(userId);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }
    company.password = null;
    return res.status(200).json({
      success: true,
      message: "User logged in.",
      data: company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
