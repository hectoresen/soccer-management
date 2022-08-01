const nodemailer = require('nodemailer');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Coach = require('../models/Coach');

module.exports = {
    unsubscribe: async (req, res, next) => {
        try {
            const { memberId, teamId } = req.body;

            const foundPlayer = await Player.findById(memberId);
            const foundCoach = await Coach.findById(memberId);

            if (foundPlayer) {
                await Team.updateOne({ players: memberId }, { $pull: { players: memberId } });
                await Player.updateOne({ team: teamId }, { $pull: { team: teamId }, $set: { salary: 0 } });
            };

            if (foundCoach) {
                await Coach.updateOne({ team: teamId }, { $pull: { team: teamId }, $set: { salary: 0 } });
                await Team.updateOne({ coach: memberId }, { $pull: { coach: memberId } });
            };

            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'patsy78@ethereal.email',
                    pass: '5cjvg3kJYnfUQG3zdH'
                }
            });


            const mailOptions = {
                from: req.user.email,
                to: (foundPlayer) ? foundPlayer.email : foundCoach.email,
                subject: `Notificación recibida de ${req.user.name}`,
                text: `Has sido dado de baja del equipo ${req.user.name}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'No se ha podido notificar al usuario' });
                }
                return res.status(200).json({ message: 'Email Enviado' })
            });

            return res.status(200).json({ message: 'Jugador actualizado' });
        } catch (err) {
            return next(err);
        };
    }
}