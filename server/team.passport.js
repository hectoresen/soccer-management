const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Team = require('./models/Team');

const validate = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

passport.serializeUser((team, done) => {
    return done(null, team._id);
});

passport.deserializeUser(async (teamId, done) => {
    try {
        const existingTeam = await Team.findById(teamId);
        return done(null, existingTeam);
    } catch (err) {
        return done(err);
    }
});

const saltRound = 10;

passport.use(
    'teamregister',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {
                if (email.length < 6) {
                    const error = new Error("el Email debe contener al menos 6 caracteres");
                    return done(error);
                }

                const validEmail = validate(email);

                if (!validEmail) {
                    const error = new Error("Email no es valido");
                    return done(error);
                }

                const previousTeam = await Team.findOne({
                    email: email.toLowerCase(),
                });

                if (previousTeam) {
                    const error = new Error("El usuario ya existe");
                    return done(error);
                }

                const hash = await bcrypt.hash(password, saltRound);

                const newTeam = new Team({
                    name: req.body.name,
                    email: email.toLowerCase(),
                    budget: req.body.budget,
                    password: hash,
                });

                const savedTeam = await newTeam.save();

                return done(null, savedTeam);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    "teamlogin",
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
                    const error = new Error("Invalid Email");
                    return done(error);
                }

                const currentTeam = await Team.findOne({ email: email.toLowerCase() });

                if (!currentTeam) {
                    const error = new Error("The user does not exist!");
                    return done(error);
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    currentTeam.password
                );

                if (!isValidPassword) {
                    const error = new Error("The email or password is invalid!");
                    return done(error);
                }

                return done(null, currentTeam);
            } catch (err) {
                return done(err);
            }
        }
    )
);