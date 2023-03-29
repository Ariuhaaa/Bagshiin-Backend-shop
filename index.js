const port = 9000;
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const menuRouter = require("./routes/menu.route.js");
const cateRouter = require("./routes/category.route.js");
const productRouter = require("./routes/product.route.js");
const userRouter = require("./routes/user.route.js");
const brandRouter = require("./routes/brand.route.js");
const orderRouter = require("./routes/order.routes");

app.use(cors());
app.use(express.json());

app.use("/api", menuRouter);
app.use("/api", cateRouter);
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", brandRouter);
app.use("/api", orderRouter);

app.get("/api", (req, res) => {
  res.json({ message: "Welcome Rest API" });
});

app.listen(port, () => console.log("server is running on " + port));
