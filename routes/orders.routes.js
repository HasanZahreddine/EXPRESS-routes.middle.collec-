const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();

const ORDERS_FILE = path.join(__dirname, "..", "data", "orders.json");

// GET /orders
router.get("/", async (req, res) => {
  const data = await fs.readFile(ORDERS_FILE, "utf8");
  res.json(JSON.parse(data));
});

module.exports = router;
