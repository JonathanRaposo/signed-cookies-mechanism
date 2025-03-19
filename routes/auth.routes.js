
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY;

const ApiService = require('../api_service/index.js');
const apiService = new ApiService();


const crypto = require('crypto');


//HELPER FUNCTION TO SIGN COOKIES

function signCookie(value, secretKey) {
    return value + '.' + crypto.createHmac('sha256', secretKey).update(value).digest('base64url');
}
// ROUTE GUARD MIDDLEWARES
const { isLoggedIn, isAdmin } = require('../middleware/route-guard.js');


// AUTH ROUTES HERE

router.get('/login', (req, res) => {
    res.render('auth/login.hbs');
})

router.post('/login', (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).render('auth/login.hbs', { errorMessage: 'Enter both email and password.' });
        return;
    }
    const user = apiService.findOne({ email });

    if (!user) {
        res.status(400).render('auth/login.hbs', { errorMessage: 'Email not registered.Try with other email.' });
        return;
    } else if (bcrypt.compareSync(password, user.password)) {

        const { id } = user;

        const signedValue = signCookie(id, SECRET_KEY);

        res.setHeader('Set-Cookie', `session=${signedValue}; HttpOnly; Max-Age=3600000`)
        res.redirect('/userProfile');

    } else {
        res.status(400).render('auth/login.hbs', { errorMessage: 'Incorrect password.' })
    }

})
router.get('/userProfile', isLoggedIn, (req, res) => {

    res.render('users/user-profile.hbs', { user: req.currentUser });

})

router.get('/admin', isLoggedIn, isAdmin, (req, res) => {
    res.render('users/admin/dashboard.hbs', { user: req.currentUser })
})

router.post('/logout', (req, res) => {
    res.setHeader('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly')
    res.redirect('/login')
})

module.exports = router;

// note
//     cookie: 'session=s%3Auser123.E6m4p2wYTxoVi6XQObjf19IHMQXXS5tFGgzNt%2B5pVxg'
// decoded: s:user123.E6m4p2wYTxoVi6XQObjf19IHMQXXS5tFGgzNt+5pVxg