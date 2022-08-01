const express = require('express');
const teamController = require('../controllers/team.controllers');
const unsusbscribeController = require('../controllers/unsbuscribe.controller');
const addMemberController = require('../controllers/addMember.controller');
const Player = require('../models/Player');
const Team = require('../models/Team');
const Coach = require('../models/Coach');

const router = express.Router();

router.post('/register', teamController.teamRegister);
router.post('/login', teamController.teamLogin);
router.get('/check-session', teamController.checkSession);
router.put('/unsubscribe', unsusbscribeController.unsubscribe);
router.put('/addplayer', addMemberController.addPlayer);
router.put('/addcoach', addMemberController.addCoach);


/* PAGINATION ALL PLAYERS */
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


/* GET TEAM TEMPLATE */
router.get('/teamtemplate/:teamId', async(req, res, next) =>{
    try{
        const {teamId} = req.params;
        const teamPlayers = await Team.findById(teamId).populate('players');
        const teamCoachs = await Team.findById(teamId).populate('coach');

        const teamTemplate = {
            players: teamPlayers.players.map(player => ({id: player._id, name: player.name, salary: player.salary})),
            coachs: teamCoachs.coach.map(coach => ({id: coach._id, name: coach.name, salary: coach.salary})) || []
        };
        return res.status(200).json(teamTemplate);
    }catch(err){
        return next(err);
    }
});

/* GET ALL COACHS */
router.get('/allcoachs', async(req, res, next) =>{
    try{
        const allCoachs = await Coach.find().populate('team');
        const coachList = allCoachs.map(coach => ({
            id: coach._id,
            name: coach.name,
            salary: coach.salary,
            team: coach.team.map(element => element.name)
        }));
        return res.status(200).json(coachList);

    }catch(err){
        return next(err);
    };
});

/* FILTERING PLAYERS */
router.get('/filteringplayer/:player', async(req, res, next) =>{
    try{
        const {player} = req.params;
        const playersFoundList = await Player.find({name:{$regex: player}}).populate('team');

        if(!playersFoundList){
            return res.status(404).json({message: 'Ninguna coincidencia'})
        }

        const playersFound = playersFoundList.map(player =>({id: player._id, name: player.name, salary: player.salary, team: player.team.map(team => team.name)}));
        return res.status(200).json(playersFound)

    }catch(err){
        return next(err)
    };
});

/* UPDATE BUDGET */
router.put('/updatebudget', async(req, res, next) =>{
    try{
        const {teamId, newBudget} = req.body;
        const activeTeam = await Team.findById(teamId).populate('players').populate('coach');
        const playersWages = activeTeam.players.map(player => player.salary).reduce((prev, act) =>prev + act, 0);
        const coachWages = activeTeam.coach.map(player => player.salary).reduce((prev, act) =>prev + act, 0);

        const totalWages = playersWages + coachWages;

        if((totalWages > newBudget) || newBudget < 0){
            return res.status(403).json({message: 'No puedes reducir el presupuesto, tienes salarios que superan el nuevo presupuesto'});
        };

        await Team.findByIdAndUpdate(teamId, {$set: {budget: newBudget}});
        return res.status(200).json({message: 'Presupuesto actualizado'})

    }catch(err){
        return next(err);
    };
});


module.exports = router;