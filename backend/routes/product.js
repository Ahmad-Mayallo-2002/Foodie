const { config } = require("dotenv");
const { log } = require("console");
const { Router } = require("express");
const { Product } = require("../models/product");
const authorization = require("../middleware/authorization");
const multer = require("multer");
const { resolve } = require("path");
const { writeFileSync, unlinkSync } = require("fs");
const { User } = require("../models/user");

config();

const router = Router();
const serverError = process.env.SERVER_ERROR || "Internal Server Error";
const upload = multer();

router.post(
  "/add-product",
  upload.single("image"),
  authorization,
  async (req, res) => {
    try {
      const { name, description, category, price } = req.body;
      const file = req.file;
      const currentProduct = await Product.findOne({ name: name });
      if (currentProduct)
        return res.status(400).json({ msg: "This Product is Already Exist" });
      const fileArray = file.originalname.split(".");
      const fileName = `${fileArray[0]}-${Date.now()}.${fileArray[1]}`;
      const filePath = resolve(
        `/My Projects/Food Delivery/frontend/public/products_images/${fileName}`
      );
      writeFileSync(filePath, file.buffer);
      const newProduct = new Product({
        name: name,
        description: description,
        category: category,
        price: Number(price),
        image: `/products_images/${fileName}`,
      });
      await newProduct.save();
      return res.status(201).json({ msg: "New Product is Added" });
    } catch (error) {
      log(error);
      res.status(500).json({ msg: serverError });
    }
  }
);

router.delete("/delete-product/:id", authorization, async (req, res) => {
  try {
    const currentProduct = await Product.findById(req.params.id);
    const currentUser = await User.findById(req.headers.id);
    if (!currentProduct)
      return res.status(404).json({ msg: "This Product is Not Found" });
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    unlinkSync(
      resolve(
        `/My Projects/Food Delivery/frontend/public/${currentProduct.image}`
      )
    );
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "One Product is Deleted" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.patch("/update-product/:id", authorization, async (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    const file = req.file;
    const requestBody = {};
    const currentProduct = await Product.findById(req.params.id);
    const currentUser = await User.findById(req.headers.id);
    if (!currentProduct)
      return res.status(404).json({ msg: "This Product is Not Found" });
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    if (name) requestBody.name = name;
    if (description) requestBody.description = description;
    if (category) requestBody.category = category;
    if (price) requestBody.price = price;
    if (file) {
      const fileArray = file.originalname.split(".");
      const fileName = `${fileArray[0]}-${Date.now()}.${fileArray[1]}`;
      const filePath = resolve(
        `/My Projects/Food Delivery/frontend/public/products_images/${fileName}`
      );
      unlinkSync(filePath);
      writeFileSync(filePath, file.buffer);
    }
    await Product.findByIdAndUpdate(req.params.id, { $set: requestBody });
    return res.status(200).json({ msg: "Product Data is Updated" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const category = req.query.category;
    const categoryObject =
      category === "all" || !category ? {} : { category: category };
    const products = await Product.find(categoryObject)
      .limit(req.query.limit)
      .skip(req.query.skip);
    const length = await Product.countDocuments({});
    if (!products.length)
      return res.status(404).json({ msg: "No Products are Found" });
    return res.status(200).json({ products: products, length: length });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "No Product Found" });
    return res.status(200).json(product);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

module.exports = { router };
