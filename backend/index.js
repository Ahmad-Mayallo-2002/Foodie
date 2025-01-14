const bodyParser = require("body-parser");
const { log } = require("console");
const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { router: cart } = require("./routes/cart");
const { router: order } = require("./routes/order");
const { router: user } = require("./routes/user");
const { router: product } = require("./routes/product");
const { router: favorite } = require("./routes/favorite");
const cookieParser = require("cookie-parser");

config();

const serverError = process.env.SERVER_ERROR || "Internal Server Error";
const port = process.env.PORT;
const api = "/api";

const app = express();

(async function DB() {
  try {
    mongoose.connect(process.env.DB_CONNECTION);
    log("Database Connection is Done");
  } catch (error) {
    log("Database Connection is Failed");
  }
})();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  })
);
app.use(cookieParser());

app.use(api, user);
app.use(api, cart);
app.use(api, order);
app.use(api, product);
app.use(api, favorite);

app.get("/", async (req, res) => {
  try {
    res.status(200).json({ msg: "Hello World" });
  } catch (error) {
    log(serverError);
  }
});

app.listen(port, () =>
  log(`Server is Running on Port ${port} http://localhost:${port}`)
);
