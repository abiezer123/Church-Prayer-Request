const express = require("express");

const {getPrayers, getPrayer, postPrayer, patchPrayer, deletePrayer} = require("../controllers/prayerController");

const route = express.Router();

route.get("/", getPrayer);
route.get("/:id", getPrayers);
route.post("/:id", postPrayer);
route.patch("/:id", patchPrayer);
route.delete("/:id", deletePrayer);

module.exports = route;