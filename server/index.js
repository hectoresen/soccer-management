const express = require('express');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

/* ROUTES */
const teamRouter = require('./routes/team.routes');
const playerRouter = require('./routes/player.routes');
const coachRouter = require('./routes/coach.routes');

const dotenv = require('dotenv').config({ path: './.env' });


const PORT = process.env.PORT || 5000;
const server = express();

const { dbConnect } = require('./config/db');
dbConnect();

require('./team.passport');
require('./player.passport');
require('./coach.passport');


server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
    }
));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));

server.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: false,
            secure: false,
            sameSite: false,
        },
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

server.use(passport.initialize());
server.use(passport.session());

server.use('/team', teamRouter);
server.use('/player', playerRouter);
server.use('/coach', coachRouter);


server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});

server.use((err, req, res, next) => {
    console.log(err);
    return res.status(err.status || 500).json(err);
});


server.listen(PORT, () => {
    console.log(dotenv);
    console.log(`servidor arrancado en http://localhost:${PORT}`)
})