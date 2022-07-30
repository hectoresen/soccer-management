const express = require('express');
const teamController = require('../controllers/team.controllers');
const Player = require('../models/Player');
const Team = require('../models/Team');

const router = express.Router();

router.post('/register', teamController.teamRegister);
router.post('/login', teamController.teamLogin);
router.get('/check-session', teamController.checkSession);


router.get('/allplayers', async(req, res, next) =>{
    /* FALTA PAGINACIÓN Y POPULAR */
    try{
        const results = await Player.find().populate('team');
        const playersFound = results.map(player => ({
            id: player._id,
            name: player.name,
            team: player.team.map(element => element.name)
        }));
        return res.status(200).json(playersFound);
    }catch(err){
        return next(err)
    };
});

router.put('/addplayer', async(req, res, next) =>{
    try{
        const {playerId, teamId} = req.body;
        const updatedPlayer = await Player.findByIdAndUpdate(
            playerId,
            {$push: {team: teamId}},
            {new: true}
        );
        await Team.findByIdAndUpdate(
            teamId,
            {$push: {players: playerId}},
            {new: true}
        );
        return res.status(200).json(updatedPlayer);
    }catch(err){
        return next(err);
    };
});

module.exports = router;