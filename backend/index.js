const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
// const stripeRoute = require("./routes/stripe");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
const appVersion = "/api/v1";
app.use(`${appVersion}/auth`, authRoute);
app.use(`${appVersion}/users`, userRoute);
app.use(`${appVersion}/products`, productRoute);
app.use(`${appVersion}/carts`, cartRoute);
app.use(`${appVersion}/orders`, orderRoute);
// app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5050, () => {
  console.log("Backend server is running!");
});
