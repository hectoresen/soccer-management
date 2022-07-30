const passport = require('passport');

module.exports = {
    checkSession: async (req, res, next) => {
        if (req.coach) {
            let coachRegister = req.coach;
            coachRegister.password = null;

            return res.status(200).json(coachRegister);
        } else {
            return res.status(401).json({ message: 'Jugador no encontrado' });
        }
    },

    coachRegister: (req, res, next) => {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({ message: 'Completa todos los campos' });
        }

        passport.authenticate("coachregister", (error, coach) => {
            if (error) {
                return res.status(403).json({ message: error.message });
            }
            req.logIn(coach, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let coachRegister = coach;
                coachRegister.password = null;

                return res.json(coachRegister);
            });
        })(req, res, next);
    },

    coachLogin: (req, res, next) => {
        passport.authenticate("coachlogin", (error, coach) => {
            if (error) {
                return res.status(401).json({ message: error.message });
            }
            req.logIn(coach, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let coachLogged = coach;
                coachLogged.password = null;

                return res.json(coachLogged);
            });
        })(req, res, next);
    },
}