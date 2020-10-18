const express = require('express');
const candidatureController = require('../controllers/candidature');

const router = express.Router();

router.post('/candidature', candidatureController.candidature);

module.exports = router;