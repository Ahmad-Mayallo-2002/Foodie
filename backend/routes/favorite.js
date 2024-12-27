const { config } = require("dotenv");
const { Router } = require("express");
const { log } = require("console");
const authorization = require("../middleware/authorization");
const { User } = require("../models/user");
const { Favorite } = require("../models/favorites");
const { mongo } = require("mongoose");

config();

const router = Router();
const serverError = process.env.SERVER_ERROR || "Internal Server Error";

router.post("/add-to-favorite/:id", authorization, async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.headers.id;
    const currentFavorite = await Favorite.findOne({ user: userId });
    if (currentFavorite) {
      if (currentFavorite.items.includes(productId)) {
        return res
          .status(400)
          .json({ msg: "This Product is Already in Favorites List" });
      }
      currentFavorite.items.push(productId);
      await currentFavorite.save();
      return res.status(201).json({ msg: "Added To Favorites List" });
    } else {
      const newFavorite = new Favorite({
        user: userId,
        items: [productId],
      });
      await newFavorite.save();
      return res.status(201).json({ msg: "Added To Favorites List" });
    }
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-favorites-lists", authorization, async (req, res) => {
  try {
    const currentUser = await User.findById(req.headers.id);
    if (currentUser.role !== "admin")
      return res.status(400).json({ msg: "You Are Not Admin" });
    const favorites = await Favorite.find({});
    if (!favorites.length)
      return res.status(404).json({ msg: "No Favorites Lists Are Found" });
    return res.status(200).json(favorites);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.get("/get-user-favorite", authorization, async (req, res) => {
  try {
    const favorite = await Favorite.findOne({ user: req.headers.id }).populate(
      "items"
    );
    if (!favorite)
      return res.status(404).json({ msg: "This User Have Not Favorites List" });
    return res.status(200).json(favorite);
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

router.delete("/delete-from-favorites/:id", authorization, async (req, res) => {
  try {
    const userId = req.headers.id;
    const productId = req.params.id;
    const currentProduct = await Favorite.findOne({ user: userId });
    if (!currentProduct.items.includes(productId))
      return res
        .status(404)
        .json({ msg: "This Product is Not Exist in Favorites" });
    await currentProduct.updateOne({ $pull: { items: productId } });
    return res.status(200).json({ msg: "Removed From Favorites" });
  } catch (error) {
    log(error);
    res.status(500).json({ msg: serverError });
  }
});

module.exports = { router };
