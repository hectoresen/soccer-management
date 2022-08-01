const Team = require('../models/Team');
const Player = require('../models/Player');
const Coach = require('../models/Coach');

module.exports = {
    unsubscribe : async(req, res, next) =>{
        try{
            const {memberId, teamId} = req.body;
            const updateTeamPlayer = await Team.updateOne({players: memberId}, {$pull: {players: memberId}});
            const updateTeamCoach = await Team.updateOne({coach: memberId}, {$pull: {coach: memberId}})
            const updatePlayerTeam = await Player.updateOne({team: teamId}, {$pull: {team: teamId}, $set:{salary: 0}});
            const updateCoachTeam = await Coach.updateOne({team: teamId}, {$pull: {team: teamId}, $set:{salary: 0}});
            return res.status(200).json({message: 'Jugador actualizado'});
        }catch(err){
            return next(err);
        };
    }
}