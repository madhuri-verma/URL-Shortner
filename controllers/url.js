const urlModel = require("../models/url");
const shortid = require("shortid");

async function handleCreateShortURL(req, res) {
  const shortURLId = shortid();
  const body = req.body;
  if (!body.redirectURL)
    return res.status(400).json({ error: "URL is required" });
  await urlModel.create({
    shortURL: shortURLId,
    redirectURL: body.redirectURL,
    visitHistory: [],
  });
  // return res.json({ id: shortURLId }); //this is for backend showing! or if using frontEnd libraries.
  return res.render("home", {
    id: shortURLId,
  });
}

async function handleGetAllURL(req, res) {
  const url = await urlModel.find({});
  return res.json(url).status(200);

  // return res.status(200).json({data: url});
}

async function handleUpdateShortURL(req, res) {
  const shortURL = req.params.shortId;
  const entry = await urlModel.findOneAndUpdate(
    { shortURL },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectURL);
}

async function handleClicks(req, res) {
  const shortURL = req.params.shortId;
  const entry = await urlModel.findOne({ shortURL });
  const result = entry.visitHistory;
  return res.json({ totalClicks: result.length, analytics: result });
}

module.exports = {
  handleCreateShortURL,
  handleUpdateShortURL,
  handleClicks,
  handleGetAllURL,
};
