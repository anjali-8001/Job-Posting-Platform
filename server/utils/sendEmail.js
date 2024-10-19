const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: "Gmail", // You can use any email service like SendGrid, Gmail, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email (from .env)
        pass: process.env.EMAIL_PASSWORD, // Your email password (from .env)
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: options.to, // List of receivers
      subject: options.subject, // Subject line
      //   text: options.text, // Plain text body
      html: options.html, // HTML body
    };

    // Send the email
    const emailSent = await transporter.sendMail(mailOptions);
    return emailSent;
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
