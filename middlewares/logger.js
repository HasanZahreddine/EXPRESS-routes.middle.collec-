// Middleware function to log the HTTP method and URL of incoming requests
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`); 
    next(); // Call the next middleware or route handler
}

module.exports = logger;