const mysql = require('mysql');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
const app = express();

dotenv.config({ path: './.env'});

const frontDirectory = path.join(__dirname, '../front');
app.use(express.static(frontDirectory));

//defines Routes
app.use('/', require('./routes/annonce'));
app.use('/', require('./routes/candidature'));
app.use('/', require('./routes/personne'));

module.exports = app;