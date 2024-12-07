const nodemailer = require("nodemailer");

// Create a transporter object using SMTP settings (using Gmail here)
const transporter = nodemailer.createTransport({
  service: "gmail", // You can change it to another service
  auth: {
    user: "muskankumari00999.mk@gmail.com", // Your email address
    pass: "your-email-password", // Your email password (or use OAuth2 for more secure options)
  },
});

const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: "your-email@gmail.com", // Sender address
    to: to, // Recipient address
    subject: subject, // Subject line
    text: text, // Plain text body
    html: html, // HTML body (can include formatting, links, etc.)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
};
module.exports = sendEmail;
