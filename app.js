const express = require("express");

// Importing middleware functions
// const logger = require("./middlewares/logger"); 
// const print1 = require("./middlewares/print1");
// const print2 = require("./middlewares/print2");

//routes
const menuRoutes = require("./routes/menu.routes");
const categoriesRoutes = require("./routes/categories.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

// Application-level middleware -- runs on every request, before any route.
// This logger middleware logs the HTTP method and URL of each incoming request to the console.

// the express.json() middleware parses JSON request bodies and populates req.body
// app.use(express.json()); // mn abel kena n3mil app.get we mn 7ot fiya function

// app.use(logger);
// app.use(print1);
// app.use(print2);

app.use("/menu", menuRoutes);
app.use("/categories", categoriesRoutes);
app.use("/orders", ordersRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Page Not found" });
});

module.exports = app;