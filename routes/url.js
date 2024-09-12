const express = require("express");

const urlRouter = express.Router();
const {
  handleCreateShortURL,
  handleUpdateShortURL,
  handleClicks,
  handleGetAllURL,
} = require("../controllers/url");

urlRouter.post("/", handleCreateShortURL);
urlRouter.get("/", handleGetAllURL);
urlRouter.get("/:shortId", handleUpdateShortURL);
urlRouter.get("/analytics/:shortId", handleClicks);

module.exports = urlRouter;
