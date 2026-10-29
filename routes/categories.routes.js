const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();

const CATEGORIES_FILE = path.join(__dirname, "..", "data", "categories.json");

// GET /categories
router.get("/", async (req, res) => {
  const data = await fs.readFile(CATEGORIES_FILE, "utf8");
  res.json(JSON.parse(data));
});

module.exports = router;
