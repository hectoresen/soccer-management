const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Coach = require('./models/Coach');

const validate = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

passport.serializeUser((coach, done) => {
    return done(null, coach._id);
});

passport.deserializeUser(async (coachId, done) => {
    try {
        const existingCoach = await Coach.findById(coachId);
        return done(null, existingCoach);
    } catch (err) {
        return done(err);
    }
});

const saltRound = 10;


passport.use(
    'coachregister',
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

                const previousCoach = await Coach.findOne({
                    email: email.toLowerCase(),
                });

                if (previousCoach) {
                    const error = new Error("El entrenador ya existe");
                    return done(error);
                }

                const hash = await bcrypt.hash(password, saltRound);

                const newCoach = new Coach({
                    name: req.body.name,
                    email: email.toLowerCase(),
                    password: hash,
                });

                const savedCoach = await newCoach.save();

                return done(null, savedCoach);
            } catch (err) {
                return done(err);
            }
        }
    )
);


passport.use(
    "coachlogin",
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

                const currentCoach = await Coach.findOne({ email: email.toLowerCase() });

                if (!currentCoach) {
                    const error = new Error("El usuario no existe");
                    return done(error);
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    currentCoach.password
                );

                if (!isValidPassword) {
                    const error = new Error("Email o contraseña no válido");
                    /* Por seguridad no se da feedback concreto al usuario email/pass */
                    return done(error);
                }

                return done(null, currentCoach);
            } catch (err) {
                return done(err);
            }
        }
    )
);