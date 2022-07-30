const express = require('express');
const playerController = require('../controllers/player.controller');

const router = express.Router();

router.post('/register', playerController.playerRegister);
router.post('/login', playerController.playerLogin);
router.get('/check-session', playerController.checkSession);

module.exports = router;