const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      required: true,
    },

    visitHistory: [{ timestamp: Number }],
  },
  { timestamps: true }
);

const urlModel = mongoose.model("URL-Shortner", urlSchema);

module.exports = urlModel;
