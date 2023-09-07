const express = require("express");
const router = express.Router();

const Driver = require("../models/driver");

router.get("/", (req, res) => {
  res.json({ driver: true });
});

module.exports = router;
