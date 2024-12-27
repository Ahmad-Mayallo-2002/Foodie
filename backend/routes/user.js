const { Router } = require("express");
const { log } = require("console");
const { config } = require("dotenv");
const { User } = require("../models/user");
const { hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const authorization = require("../middleware/authorization");
const { SendMail } = require("../middleware/sendOTP");

config();

const serverError = process.env.SERVER_ERROR || "Internal Server Error";
const router = Router();

router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, country, phone } = req.body;
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail)
      return res.status(400).json({ msg: "This Email is Already Exist" });
    const newUser = new User({
      username: username,
      email: email,
      password: hashSync(password, 10),
      country: country,
      phone: phone,
    });
    await newUser.save();
    return res.status(201).json({ msg: "Sign Up is Done" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await User.findOne({ email: email });
    if (!checkEmail) return res.status(404).json({ msg: "Invalid Email" });
    const checkPassword = compareSync(password, checkEmail.password);
    if (!checkPassword)
      return res.status(404).json({ msg: "Invalid Password" });
    const payload = {
      id: checkEmail._id,
      email: email,
      username: checkEmail.username,
    };
    const token = sign(payload, process.env.JWT_KEY, {
      expiresIn: "30d",
    });
    const sendData = JSON.stringify({
      token: token,
      _id: checkEmail._id,
      role: checkEmail.role,
    });
    res
      .cookie("token", sendData, {
        sameSite: "strict",
        secure: true,
        httpOnly: false,
      })
      .json({ msg: "Login is Done" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-users", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id);
    const users = await User.find({ role: "user" }).select("-password");
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    if (!users.length) return res.status(404).json({ msg: "No Users Found" });
    return res.status(200).json(users);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-users/:id", authorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "This User is Not Found" });
    return res.status(200).json(user);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.delete("/delete-user/:id", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser)
      return res.status(404).json({ msg: "This User is Not Found" });
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "Delete User is Done" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.patch("/update-user", authorization, async (req, res) => {
  try {
    const { username, email, country, phone } = req.body;
    if (!username && !email && !country && !phone)
      return res
        .status(404)
        .json({ msg: "You Must Update At Least One Property" });
    const requestBody = {};
    const currentUser = await User.findById(req.headers.id);
    if (!currentUser)
      return res.status(404).json({ msg: "This User is Not Found" });
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail)
      return res.status(400).json({ msg: "This Email is Already Exist" });
    if (username) requestBody.username = username;
    if (email) requestBody.email = email;
    if (country) requestBody.country = country;
    if (phone) requestBody.phone = phone;
    await User.findByIdAndUpdate(req.headers.id, { $set: requestBody });
    return res.status(200).json({ msg: "Update User is Done" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.post("/confirm-email", async (req, res) => {
  try {
    const currentUser = await User.findOne({ email: req.body.email });
    if (!currentUser) return res.status(404).json({ msg: "Invalid Email" });
    const OTP = await SendMail(req.body.email);
    res
      .cookie("otp", OTP, { maxAge: 1000 * 60 * 60 })
      .json({ msg: "OTP Sent Successfully" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.patch("/update-password", async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ msg: "Two Passwords Must Be Equals" });
    await User.findOneAndUpdate(
      { email: req.cookies.email },
      { $set: { password: hashSync(password, 10) } }
    );
    return res.status(200).json({ msg: "Password Update is Done" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

module.exports = { router };
