const { config } = require("dotenv");
const { Router } = require("express");
const authorization = require("../middleware/authorization");
const { log } = require("console");
const { Cart } = require("../models/cart");

config();

const router = Router();
const serverError = process.env.SERVER_ERROR || "Internal Server Error";

router.post("/add-to-cart/:id", authorization, async (req, res) => {
  try {
    const userId = req.headers.id;
    const productId = req.params.id;
    const currentCart = await Cart.findOne({ user: userId });
    if (!currentCart) {
      const newCart = new Cart({
        user: userId,
        items: [
          {
            product: productId,
            amount: req.body.amount,
            size: req.body.size,
          },
        ],
      });
      await newCart.save();
    } else {
      currentCart.items.push({
        product: productId,
        amount: req.body.amount,
        size: req.body.size,
      });
      await currentCart.save();
    }
    return res.status(201).json({ msg: "Added To Cart" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-carts", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id);
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    const carts = await Cart.find({});
    if (!carts.length)
      return res.status(404).json({ msg: "No Carts Are Found" });
    return res.status(200).json(carts);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-user-cart", authorization, async (req, res) => {
  try {
    const currentCart = await Cart.findOne({ user: req.headers.id })
      .select(["user", "items"])
      .populate("items.product");
    if (!currentCart) return res.status(404).json({ msg: "Cart is Not Found" });
    return res.status(200).json(currentCart);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.delete("/delete-from-cart/:id", authorization, async (req, res) => {
  try {
    const userId = req.headers.id;
    const productId = req.params.id;
    const currentCart = await Cart.findOne({ user: userId });
    const currentProduct = currentCart.items.find(
      (product) => product.product.toString() === productId
    );
    if (!currentProduct)
      return res.status(404).json({ msg: "This Product is Not Found in Cart" });
    await currentCart.updateOne({ $pull: { items: currentProduct } });
    await currentCart.save();
    return res.status(200).json({ msg: "Deleted From Cart" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

module.exports = { router };
