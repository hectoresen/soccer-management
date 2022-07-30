const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Player = require('./models/Player');

const validate = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

passport.serializeUser((player, done) => {
    return done(null, player._id);
});

passport.deserializeUser(async (playerId, done) => {
    try {
        const existingPlayer = await Player.findById(playerId);
        return done(null, existingPlayer);
    } catch (err) {
        return done(err);
    }
});

const saltRound = 10;

passport.use(
    'playerregister',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                if (email.length < 6) {
                    const error = new Error("El Email debe contener al menos 6 caracteres");
                    return done(error);
                }

                const validEmail = validate(email);

                if (!validEmail) {
                    const error = new Error("Email no es valido");
                    return done(error);
                }

                const previousPlayer = await Player.findOne({
                    email: email.toLowerCase(),
                });

                if (previousPlayer) {
                    const error = new Error("El jugador ya existe");
                    return done(error);
                }

                const hash = await bcrypt.hash(password, saltRound);

                const newPlayer = new Player({
                    name: req.body.name,
                    email: email.toLowerCase(),
                    password: hash,
                });

                const savedPlayer = await newPlayer.save();

                return done(null, savedPlayer);
            } catch (err) {
                return done(err);
            }
        }
    )
);


passport.use(
    "playerlogin",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                const validEmail = validate(email);

                if (!validEmail) {
                    const error = new Error("Email no válido");
                    return done(error);
                }

                const currentPlayer = await Player.findOne({ email: email.toLowerCase() });

                if (!currentPlayer) {
                    const error = new Error("El usuario no existe");
                    return done(error);
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    currentPlayer.password
                );

                if (!isValidPassword) {
                    const error = new Error("Email o contraseña no válido");
                    /* Por seguridad no se da feedback concreto al usuario email/pass */
                    return done(error);
                }

                return done(null, currentPlayer);
            } catch (err) {
                return done(err);
            }
        }
    )
);