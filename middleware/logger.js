
module.exports = () => {
    return (req, res, next) => {
        console.log(`*** URL:${req.url} *** STATUS:${res.statusCode} *** METHOD:${req.method}`);
        next();
    }
}