const express = require('express');
const coachController = require('../controllers/coach.controller');

const router = express.Router();

router.post('/register', coachController.coachRegister);
router.post('/login', coachController.coachLogin);
router.get('/check-session', coachController.checkSession);

module.exports = router;