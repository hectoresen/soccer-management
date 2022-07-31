const express = require('express');
const teamController = require('../controllers/team.controllers');
const Player = require('../models/Player');
const Team = require('../models/Team');

const router = express.Router();

router.post('/register', teamController.teamRegister);
router.post('/login', teamController.teamLogin);
router.get('/check-session', teamController.checkSession);


router.get('/allplayers/:page', async(req, res, next) =>{
    const {page} = req.params;
    try{
        const options = {
            page: page,
            populate: "team",
            limit: 5
        };
        Player.paginate({}, options)
            .then(data =>{
                const playersFound = data.docs.map(player => (
                    {
                    id: player._id,
                    name: player.name,
                    salary: player.salary,
                    team: player.team.map(element => element.name)
                    }
                ));
                const playersInfo = {players: playersFound, totalPages: data.totalPages};
                return res.status(200).json(playersInfo)
            })
            .catch(error =>{
                res.status(400).json(error)
            });
    }catch(err){
        return next(err)
    }
});

router.put('/addplayer', async(req, res, next) =>{
    try{
        const {playerId, teamId, playerSalary} = req.body;

        const activeTeam = await Team.findById(teamId).populate('players');
        let teamBudget = activeTeam.budget;
        const totalWages = activeTeam.players.map(player => player.salary).reduce((prev, act) =>prev + act, 0);

        if(teamBudget < (totalWages + playerSalary)){
            return res.status(403).json({message: 'Estás excediendo el presupuesto de tu equipo'})
        };
        const updatedPlayer = await Player.findByIdAndUpdate(
            playerId,
            {$push: {team: teamId}, salary: playerSalary},
            {new: true},
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

router.put('/addcoach', async(req, res, next) =>{
    try{
        console.log(req.body);

    }catch(err){
        return next(err);
    };
})

module.exports = router;