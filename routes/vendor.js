const express = require("express");
const router = express.Router();

const Vendor = require("../models/vendor");

router.get("/", (req, res) => {
  res.json({ vender: true });
});

module.exports = router;
