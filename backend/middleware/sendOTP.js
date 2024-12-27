const nodemailer = require("nodemailer");
const { generate } = require("randomstring");
const { log } = require("console");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ahmadmayallo02@gmail.com",
    pass: "amdrrrjfvdeschot",
  },
});

async function SendMail(email) {
  const OTP = generate({ length: 4, charset: "numeric" });
  const mailOptions = {
    from: "ahmadmayallo02@gmail.com",
    to: email,
    Subject: "Hello",
    text: `There is Your OTP Number To Confirm Your Account and Change Password Don't Share It With Anyone ${OTP}`,
  };
  transporter.sendMail(mailOptions, (error) =>
    error ? log(error) : log("OTP Sent Successfully")
  );
  return OTP;
}

module.exports.SendMail = SendMail;
