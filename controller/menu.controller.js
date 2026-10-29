// A controller is a module that contains functions that handle the logic for each route.

const path = require('path');
 
const { readJsonFile, writeJsonFile } = require('../utils/helpers');
const MENU_FILE = path.join(__dirname, '..', 'data', 'menu.json');
const MENU_FIELDS = ['name', 'description', 'price', 'categoryId'];
 
const validateId = require('../middlewares/print2');

// This is a controller function that can be used in the route handler for GET /menu
// It reads the menu items from the JSON file and sends them as a JSON response
async function getAll(req, res) {
  const items = await readJsonFile(MENU_FILE);
  res.json(items);
};

async function getOne(req, res) {
  const items = await readJsonFile(MENU_FILE);
  const item = items.find((i) => i.id === req.validatedId);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
};

async function update(req, res) {
  const items = await readJsonFile(MENU_FILE);
  const index = items.findIndex((i) => i.id === req.validatedId);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
 
  items[index] = {
    id: req.validatedId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    categoryId: req.body.categoryId,
  };
 
  await writeJsonFile(MENU_FILE, items);
  res.json(items[index]);
};

async function partialUpdate(req, res) {
  const items = await readJsonFile(MENU_FILE);
  const item = items.find((i) => i.id === req.validatedId);
  if (!item) return res.status(404).json({ error: 'Item not found' });
 
  for (const field of MENU_FIELDS) {
    if (req.body[field] !== undefined) item[field] = req.body[field];
  }
 
  await writeJsonFile(MENU_FILE, items);
  res.json(item);
};

async function remove(req, res) {
  const items = await readJsonFile(MENU_FILE);
  const index = items.findIndex((i) => i.id === req.validatedId);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
 
  items.splice(index, 1);
  await writeJsonFile(MENU_FILE, items);
  res.status(204).end(); // 204 No Content -- success, nothing to send back
};

module.exports = {
  getAll,
  getOne,
  update,
  partialUpdate,
  remove
};