const { config } = require("dotenv");
const { Router } = require("express");
const { Order } = require("../models/order");
const { User } = require("../models/user");
const authorization = require("../middleware/authorization");
const { hashSync } = require("bcrypt");
const { generate } = require("randomstring");
const { log } = require("console");

config();

const router = Router();
const serverError = process.env.SERVER_ERROR || "Internal Server Error";

router.get("/get-orders", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id);
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    const orders = await Order.find({}).populate("user");
    if (!orders.length)
      return res.status(404).json({ msg: "No Orders Are Found" });
    return res.status(200).json(orders);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-user-order", authorization, async (req, res) => {
  try {
    const order = await Order.find({ user: req.headers.id });
    if (!order.length)
      return res.status(404).json({ msg: "This User Have Not Orders" });
    return res.status(200).json(order);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.post("/add-order", authorization, async (req, res) => {
  try {
    const {
      totalPrice,
      address,
      items,
      paymentMethod,
      cardNumber,
      cardExpiry,
      cardCVV,
      cardHolderName,
      payerId,
      payerEmail,
    } = req.body;
    const requestBody = {
      user: req.headers.id,
      totalPrice,
      items: items,
      address: address,
      paymentMethod: paymentMethod,
    };
    if (paymentMethod === "credit cart")
      requestBody.creditCardDetails = {
        cardNumber: hashSync(cardNumber, 10),
        cardExpiry: cardExpiry,
        cardCVV: cardCVV,
        cardHolderName: cardHolderName,
      };
    if (paymentMethod === "Paypal")
      requestBody.paypalDeails = {
        payerEmail: payerEmail,
        paymentId: generate({
          length: 12,
          charset: "alphanumeric",
          capitalization: true,
        }),
        payerId: payerId,
      };
    const newOrder = new Order(requestBody);
    await newOrder.save();
    return res.status(200).json({ msg: "Order is Shipping" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.patch("/update-order-status/:id", authorization, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const currentOrder = await Order.findById(req.params.id);
    let message = "";
    if (!currentOrder)
      return res.status(404).json({ msg: "This Order is Not Found" });
    if (orderStatus === "cancelled") message = "This Order is Cancelled";
    if (orderStatus === "delivered") message = "This Order is Delivered";
    await Order.findByIdAndUpdate(req.params.id, {
      $set: { orderStatus: orderStatus },
    });
    return res.status(200).json({ msg: message });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.delete("/delete-order/:id", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id);
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    const currentOrder = await Order.findById(req.params.id);
    if (!currentOrder)
      return res.status(404).json({ msg: "This Order is Not Found" });
    await Order.findOneAndDelete(req.params.id);
    return res.status(200).json({ msg: "Order is Deleted" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

module.exports = { router };
