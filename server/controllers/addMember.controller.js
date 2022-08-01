const nodemailer = require('nodemailer');
const Team = require('../models/Team');
const Player = require('../models/Player');
const Coach = require('../models/Coach');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'patsy78@ethereal.email',
        pass: '5cjvg3kJYnfUQG3zdH'
    }
});

module.exports = {
    addPlayer: async (req, res, next) => {
        try {
            const { playerId, teamId, playerSalary } = req.body;
            const activeTeam = await Team.findById(teamId).populate('players').populate('coach');
            let teamBudget = activeTeam.budget;
            const playersWages = activeTeam.players.map(player => player.salary).reduce((prev, act) => prev + act, 0);
            const coachWages = activeTeam.coach.map(player => player.salary).reduce((prev, act) => prev + act, 0);
            const activePlayerSalary = Number(playerSalary);

            const totalWages = playersWages + coachWages + activePlayerSalary;

            if (teamBudget < totalWages) {
                return res.status(403).json({ message: 'Estás excediendo el presupuesto de tu equipo' })
            };

            const existingPlayer = await Team.findOne({ players: playerId });

            if (existingPlayer) {
                return res.status(403).json({ message: 'Este jugador ya tiene equipo' });
            }

            const updatedPlayer = await Player.findByIdAndUpdate(
                playerId,
                { $push: { team: teamId }, salary: playerSalary },
                { new: true },
            );
            await Team.findByIdAndUpdate(
                teamId,
                { $push: { players: playerId } },
                { new: true }
            );

            const currentPlayer = await Player.findById(playerId)

            const mailOptions = {
                from: req.user.email,
                to: currentPlayer.email,
                subject: `Notificación recibida de ${req.user.name}`,
                text: `Has sido dado de alta en el equipo ${req.user.name}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'No se ha podido notificar al usuario' });
                }
                return res.status(200).json({ message: 'Email Enviado' })
            });

            return res.status(200).json(updatedPlayer);
        } catch (err) {
            return next(err);
        };
    },
    addCoach: async (req, res, next) => {
        try {
            const { coachId, teamId, coachSalary } = req.body;

            const activeTeam = await Team.findById(teamId).populate('players').populate('coach');
            let teamBudget = activeTeam.budget;
            const playersWages = activeTeam.players.map(player => player.salary).reduce((prev, act) => prev + act, 0);
            const coachWages = activeTeam.coach.map(player => player.salary).reduce((prev, act) => prev + act, 0);
            const activeCoachSalary = Number(coachSalary);

            const totalWages = playersWages + coachWages + activeCoachSalary;

            if (teamBudget < totalWages) {
                console.error('Excediendo máximo presupuesto')
                return res.status(403).json({ message: 'Estás excediendo el presupuesto de tu equipo' })
            };

            const existingCoach = await Team.findOne({ coach: coachId });

            if (existingCoach) {
                return res.status(403).json({ message: 'Este entrenador ya tiene equipo' });
            };

            const updatedCoach = await Coach.findByIdAndUpdate(
                coachId,
                { $push: { team: teamId }, salary: coachSalary },
                { new: true },
            );
            await Team.findByIdAndUpdate(
                teamId,
                { $push: { coach: coachId } },
                { new: true }
            );

            const currentCoach = await Coach.findById(coachId);

            const mailOptions = {
                from: req.user.email,
                to: currentCoach.email,
                subject: `Notificación recibida de ${req.user.name}`,
                text: `Has sido dado de alta en el equipo ${req.user.name}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ message: 'No se ha podido notificar al usuario' });
                }
                return res.status(200).json({ message: 'Email Enviado' })
            });

            return res.status(200).json(updatedCoach);

        } catch (err) {
            return next(err);
        };
    }
};