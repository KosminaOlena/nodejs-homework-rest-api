require("dotenv").config();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });

const sendEmail = (verifyEmail) => {
    transport.sendMail(verifyEmail)
    .then(response => console.log(response))
    .catch(error => console.log(error))}

module.exports = sendEmail;