const express = require('express');
const annonceController = require('../controllers/annonce');

const router = express.Router();

router.get('/information/:id', annonceController.information);

router.get('/annonce', annonceController.annonce);

module.exports = router;