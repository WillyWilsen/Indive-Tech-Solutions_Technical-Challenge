// config/emailConfig.js
const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

module.exports = transporter;
