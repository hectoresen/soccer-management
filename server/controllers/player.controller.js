const passport = require('passport');

module.exports = {
    checkSession: async (req, res, next) => {
        if (req.player) {
            let playerRegister = req.player;
            playerRegister.password = null;

            return res.status(200).json(playerRegister);
        } else {
            return res.status(401).json({ message: 'Jugador no encontrado' });
        }
    },

    playerRegister: (req, res, next) => {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({ message: 'Completa todos los campos' });
        }

        passport.authenticate("playerregister", (error, player) => {
            if (error) {
                return res.status(403).json({ message: error.message });
            }
            req.logIn(player, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let playerRegister = player;
                playerRegister.password = null;

                return res.json(playerRegister);
            });
        })(req, res, next);
    },

    playerLogin: (req, res, next) => {
        passport.authenticate("playerlogin", (error, player) => {
            if (error) {
                return res.status(401).json({ message: error.message });
            }
            req.logIn(player, (error) => {
                if (error) {
                    return res.status(403).json({ message: error.message });
                };

                let playerLogged = player;
                playerLogged.password = null;

                return res.json(playerLogged);
            });
        })(req, res, next);
    },
}