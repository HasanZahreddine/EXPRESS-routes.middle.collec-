function print1(req, res, next) {
    console.log('print1');
    next(); // Call the next middleware or route handler
}

module.exports = print1;