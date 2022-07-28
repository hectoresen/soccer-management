const express = require('express');
const teamController = require('../controllers/team.controllers');

const router = express.Router();

router.post('/register', teamController.teamRegister);
router.post('/login', teamController.teamLogin);
router.get('/check-session', teamController.checkSession);

module.exports = router;