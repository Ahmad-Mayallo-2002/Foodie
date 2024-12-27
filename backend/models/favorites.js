const { Schema, model, Types, default: mongoose } = require("mongoose");

const favoriteSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { collection: "Favorite", timestamps: true }
);

const Favorite = model("Favorite", favoriteSchema);

module.exports.Favorite = Favorite;
