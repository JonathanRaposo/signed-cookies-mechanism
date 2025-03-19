require('dotenv').config()
const express = require('express');
const app = express();


// configuration middleware functionsgtig
require('./config/index.js')(app);


// ROUTES HERE

const indexRouter = require('./routes/index.js');
app.use('/', indexRouter);

const authRouter = require('./routes/auth.routes.js');
app.use('/', authRouter);


// error middleware
app.use((req, res, next) => {
    res.status(404).render('not-found.hbs')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));