// This middleware function validates the ID parameter in the request URL.
// Only applied to routes that require an ID parameter (e.g., /menu/:id, /categories/:id, /orders/:id).
function validate(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid ID. ID must be a positive integer." });
  }

  req.validatedId = id; // Store the validated ID in the request object for later use
  next();
}

module.exports = validate;
