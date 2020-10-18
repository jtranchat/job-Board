const express = require('express');
const personneController = require('../controllers/personne');

const router = express.Router();

router.get('/page_login/personne/:identifiant/:motDePasse', personneController.loginPersonne);

router.get('/personne/:mail', personneController.personne);

router.post('/addPersonne', personneController.addPersonne);

router.put('/updatePersonne/:mail', personneController.updatePersonne);

router.delete('/deletePersonne/:id', personneController.deletePersonne);

module.exports = router;