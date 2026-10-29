const express = require("express");
const path = require('path');

const { readJsonFile, writeJsonFile } = require('../utils/helpers');
const MENU_FILE = path.join(__dirname, '..', 'data', 'menu.json');

// const controller = require("../controller/menu.controller");

const validateId = require('../middlewares/print2');

const router = express.Router();

//before the controller function
// // GET /menu
router.get('/', async (req, res) => {
  const items = await readJsonFile(MENU_FILE);
  res.json(items);
});

// before the controller function
// GET /menu/:id
router.get("/:id", validateId, async (req, res) => {
  const items = await readJsonFile(MENU_FILE);
  const item = items.find((i) => i.id === req.validatedId);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// before the controller function
// PUT /menu/:id -- replaces the whole item, so every field must be sent
// validateMenuItem() rejects the request with 400 if any field is missing or invalid
// router.put("/:id", validateId, validateMenuItem(), async (req, res) => {
//   const items = await readJsonFile(MENU_FILE);
//   const index = items.findIndex((i) => i.id === req.validatedId);
//   if (index === -1) return res.status(404).json({ error: "Item not found" });

//   items[index] = {
//     id: req.validatedId,
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     categoryId: req.body.categoryId,
//   };

//   await writeJsonFile(MENU_FILE, items);
//   res.json(items[index]);
// });

// before the controller function
// PATCH /menu/:id -- changes only the fields that were sent
// validateMenuItem({ partial: true }) only checks the fields that were sent
// router.patch(
//   "/:id",
//   validateId,
//   validateMenuItem({ partial: true }),
//   async (req, res) => {
//     const items = await readJsonFile(MENU_FILE);
//     const item = items.find((i) => i.id === req.validatedId);
//     if (!item) return res.status(404).json({ error: "Item not found" });

//     for (const field of MENU_FIELDS) {
//       if (req.body[field] !== undefined) item[field] = req.body[field];
//     }

//     await writeJsonFile(MENU_FILE, items);
//     res.json(item);
//   },
// );

// before the controller function
// DELETE /menu/:id
router.delete("/:id", validateId, async (req, res) => {
  const items = await readJsonFile(MENU_FILE);
  const index = items.findIndex((i) => i.id === req.validatedId);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  items.splice(index, 1);
  await writeJsonFile(MENU_FILE, items);
  res.status(204).end(); // 204 No Content -- success, nothing to send back
});

// after the controller function
// router.get("/", controller.getAll);
// router.get("/:id", validateId, controller.getOne);
// router.put("/:id", validateMenuItem(), controller.update);
// router.patch(
//   "/:id",
//   validateMenuItem({ partial: true }),
//   controller.partialUpdate,
// );
// router.delete("/:id", validateId, controller.remove);

module.exports = router;
