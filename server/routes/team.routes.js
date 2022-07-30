const express = require('express');
const teamController = require('../controllers/team.controllers');
const Player = require('../models/Player');

const router = express.Router();

router.post('/register', teamController.teamRegister);
router.post('/login', teamController.teamLogin);
router.get('/check-session', teamController.checkSession);


router.get('/allplayers', async(req, res, next) =>{
    try{
        const results = await Player.find();
        const playersFound = results.map(player => ({
            name: player.name,
            team: player.team
        }));
        return res.status(200).json(playersFound);
    }catch(err){
        return next(err)
    };
})

module.exports = router;