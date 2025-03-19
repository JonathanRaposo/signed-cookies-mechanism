
const ApiService = require('../api_service/index.js');
const apiService = new ApiService();
const crypto = require('crypto');
const SECRET_KEY = process.env.SECRET_KEY;


// HELPER FUNCTION TO VERIFY SIGNED COOKIES

function verify(signedValue, secretKey) {

    const [payload, hash] = signedValue.split('.');
    const expectedSignature = crypto.createHmac('sha256', secretKey).update(payload).digest('base64url');

    return expectedSignature === hash ? payload : false;
}

// ROUTE GUARD MIDDLEWARE

function isLoggedIn(req, res, next) {

    // manually parse the cookies from headers
    const rawCookies = req.headers.cookie;

    if (!rawCookies) {
        res.redirect('/login');
        return;
    }
    const cookies = {}
    const cookieArray = rawCookies.split('; ');;
    for (let cookie of cookieArray) {
        const [key, value] = cookie.split('=');
        cookies[key] = decodeURIComponent(value);
    }
    const signature = cookies.session;
    if (!signature) return res.redirect('/login');

    const verifiedValue = verify(signature, SECRET_KEY);

    if (verifiedValue) {
        const user = apiService.findOne({ id: verifiedValue });
        const { id, name, isAdmin } = user;
        req.currentUser = { id, name, isAdmin };
        res.locals.user = req.currentUser;
    } else {
        res.redirect('/login')
    }
    next();

}


function isAdmin(req, res, next) {
    if (!req.currentUser || !req.currentUser.isAdmin) {
        res.status(403).render('auth/403-error.hbs')
        return;
    }
    next()
}


module.exports = { isLoggedIn, isAdmin }
