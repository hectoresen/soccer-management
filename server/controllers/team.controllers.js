const passport = require('passport');

module.exports = {
    checkSession: async (req, res, next) => {
        if (req.team) {
            let teamRegister = req.team;
            teamRegister.password = null;

            return res.status(200).json(teamRegister);
        } else {
            return res.status(401).json({ message: 'Team not found' });
        }
    },

    teamRegister: (req, res, next) => {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({ message: 'Completa todos los campos' });
        }

        passport.authenticate("teamregister", (error, team) => {
            if (error) {
                console.log(1);
                return res.status(403).json({ message: error.message });
            }
            req.logIn(team, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let teamRegister = team;
                teamRegister.password = null;

                return res.json(teamRegister);
            });
        })(req, res, next);
    },

    teamLogin: (req, res, next) => {
        passport.authenticate("teamlogin", (error, team) => {
            if (error) {
                return res.status(401).json({ message: error.message });
            }
            req.logIn(team, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let teamLogged = team;
                teamLogged.password = null;

                return res.json(teamLogged);
            });
        })(req, res, next);
    },
}