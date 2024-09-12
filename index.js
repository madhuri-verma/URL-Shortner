const express = require("express");
const app = express();
const path = require("path");
const PORT = 3001;
const { connectMongoDB } = require("./connection/index");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const cors = require("cors");
const userRoute = require("./routes/user");
app.use(
  cors({
    origin: "http://localhost:3000", // or your frontend URL
  })
);

connectMongoDB("mongodb://127.0.0.1:27017/URL-Shortner")
  .then(() => console.log(`MongoDB connected!`))
  .catch((err) => console.log(`Something went wrong with mongDB ${err}`));

app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRouter);
app.use("/", staticRouter);
app.use("/user", userRoute);
app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
