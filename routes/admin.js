const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.get("/", (req, res) => {
  res.json({ admin: true });
});

module.exports = router;
