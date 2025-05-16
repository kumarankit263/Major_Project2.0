const nodemailer = require("nodemailer");

const sendMail = async (receiverEmailAddress, content, subject) => {
  let config = {
    host: "smtp.gmail.com",
    port: 465, // Use 587 if you prefer TLS
    secure: true,
    auth: {
      user: "@gmail.com", // Replace with your actual email
      pass: process.env.APP_PASSWORD, // Ensure this is correctly set
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: "@gmail.com", // Match sender email with authenticated email
    to: receiverEmailAddress,
    subject: subject,
    html: content,
  };

  try {
    await transporter.sendMail(message);
    console.log("✅ Email sent successfully");
    return true;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return false;
  }
};

module.exports = sendMail;

