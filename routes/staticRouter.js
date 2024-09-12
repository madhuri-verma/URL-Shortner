const express = require("express");
const urlModel = require("../models/url");
const staticRouter = express.Router();

staticRouter.get("/", async (req, res) => {
  const url = await urlModel.find({});
  return res.render("home", {
    urls: url,
  });
});

staticRouter.get("/signup", (req, res)=>{
  return res.render("signup")
})
staticRouter.get("/login", (req, res)=>{
  return res.render("login")
})
module.exports = staticRouter;
