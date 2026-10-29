function print2(req, res, next) {
    console.log('print2');
    next(); // Call the next middleware or route handler
}

module.exports = print2;