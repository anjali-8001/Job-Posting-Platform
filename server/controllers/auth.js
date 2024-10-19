const Company = require("../models/Company");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const express = require("express");
const crypto = require("crypto");
const UserOtp = require("../models/UserOtp");
const twilio = require("twilio");
const JWT = require("jsonwebtoken");
const Job = require("../models/Job");

exports.registerCompany = async (req, res) => {
  try {
    const { name, mobile, companyName, companyEmail, employeeSize, password } =
      req.body;
    if (
      !name ||
      !mobile ||
      !companyEmail ||
      !companyName ||
      !employeeSize ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields.",
      });
    }

    const companyExists = await Company.findOne({ companyEmail });

    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const company = await Company.create({
      name,
      mobile,
      companyEmail,
      companyName,
      employeeSize,
      password: hashedPassword,
    });

    console.log(company);
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const otpExpires = Date.now() + 15 * 60 * 1000; // OTP expires in 15 minutes

    const mobileotp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP

    const user = await UserOtp.create({
      user: {
        id: company._id,
        email: company.companyEmail,
      },
      emailOtp: otp,
      emailOtpExpires: otpExpires,
      mobileOtp: mobileotp,
      mobileOtpExpires: otpExpires,
    });
    const u = await UserOtp.findById(user._id);
    console.log("u", u);

    try {
      // Send the verification email
      // const sentEmail = await sendEmail({
      //   to: company.companyEmail,
      //   subject: "Your OTP for Email Verification",
      //   html: `Your OTP is ${otp}. It will expire in 15 minutes.`,
      // });
      // // send verification otp to mobile
      // const accountSid = process.env.TWILIO_ACCOUNT_SID;
      // const authToken = process.env.TWILIO_AUTH_TOKEN;
      // const client = twilio(accountSid, authToken);
      // const sendMsg = await client.messages.create({
      //   body: `Your OTP is ${otp}`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: company.mobile,
      // });
      // console.log(sendMsg);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "You've successfully signed up.",
      data: companyEmail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.loginCompany = async (req, res) => {
  try {
    const { companyEmail, password } = req.body;

    if (!companyEmail || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    //if existing user
    const existingUser = await Company.findOne({ companyEmail });
    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    //all conditions are satisfied so token is generated
    const token = JWT.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { companyEmail, otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Otp is required.",
      });
    }
    if (!companyEmail) {
      return res.status(400).json({
        success: false,
        message: "Please Signup.",
      });
    }
    const company = await Company.findOne({ companyEmail });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Please Signup.",
      });
    }

    const user = await UserOtp.findOne({ "user.email": companyEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.emailOtp !== otp) {
      return res.status(400).send("Invalid or expired OTP");
    }

    company.isEmailVerified = true;
    await company.save();
    let token;

    if (company.isMobileVerified) {
      await UserOtp.deleteOne({ _id: user._id });
      token = JWT.sign({ userId: company._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email has been verified.",
      data: company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.verifyMobile = async (req, res) => {
  try {
    const { companyEmail, otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "Otp is required.",
      });
    }
    if (!companyEmail) {
      return res.status(400).json({
        success: false,
        message: "Please Signup.",
      });
    }
    const company = await Company.findOne({ companyEmail });
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Please Signup.",
      });
    }

    const user = await UserOtp.findOne({ "user.email": companyEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.mobileOtp !== otp) {
      return res.status(400).send("Invalid or expired OTP");
    }

    company.isMobileVerified = true;
    await company.save();

    let token;

    if (company.isEmailVerified) {
      await UserOtp.deleteOne({ _id: user._id });
      token = JWT.sign({ userId: company._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email has been verified.",
      data: company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.createJobPost = async (req, res) => {
  try {
    const { title, description, experienceLevel, candidates, endDate } =
      req.body;
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized.",
      });
    }
    const company = await Company.findById(userId);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    const newJob = await Job.create({
      title,
      description,
      experienceLevel,
      candidates: candidates.map((email) => ({ email })),
      endDate,
    });

    const jobDetailsHtml = `
    <p>Hello,</p>
    <p>We are excited to inform you about a new job posting.</p>
    <p><strong>Job Title:</strong> ${title}</p>
    <p><strong>Description:</strong> ${description}</p>
    <p><strong>Experience Level:</strong> ${experienceLevel}</p>
    <p><strong>End Date:</strong> ${new Date(endDate).toLocaleDateString()}</p>
    <p>Best Regards,<br>${company.companyName}<br>${company.companyEmail}</p>
  `;

    // Send emails to all candidates
    const emailPromises = candidates.map((email) => {
      return sendEmail({
        to: email,
        subject: `New Job Posting: ${title}`,
        html: jobDetailsHtml,
      });
    });

    // Wait for all emails to be sent
    await Promise.all(emailPromises);

    res.status(200).json({
      success: true,
      message: "Job Post created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getJobPosts = async (req, res) => {
  try {
    // Fetch all job posts from the database
    const jobs = await Job.find();

    // Check if there are no jobs
    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No job posts found", success: true, data: [] });
    }

    // Respond with the list of job posts
    res
      .status(200)
      .json({ success: true, message: "Jobs fetched", data: jobs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
