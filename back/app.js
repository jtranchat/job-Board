const mysql = require('mysql');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
var app = express();
const bodyparser = require('body-parser');

var url = 'localhost:3000/';
var information = 'information/';

dotenv.config({ path: './.env'});

app.use(bodyparser.json());

const frontDirectory = path.join(__dirname, '../front');
app.use(express.static(frontDirectory));

const mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

//fonction permettant de lire la base de données
//recuperer les information d'une annonce specifique
app.get("/information/:id", (req, res, next) => {
    console.log("idAnnonce =" + req.params.id)
        mysqlConnection.query('SELECT Annonce.nom, Annonce.description, Annonce.place, Annonce.salaires, Annonce.tempDeTravailParSemaine, Annonce.contrat, Entreprise.nomEntreprise AS nomEntreprise, Entreprise.localisation AS localisation, Entreprise.activites AS activites FROM Annonce INNER JOIN Entreprise ON Annonce.idEntreprise = Entreprise.idEntreprise WHERE idAnnonce =' + req.params.id, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
      });
  });

//fonction permettant d'écrire dans la base de données
app.post('/addPersonne', function(req, res) {
    let data = req.body;
    mysqlConnection.query('INSERT INTO Personne SET ?', data, function(err, rows, fields) {
        if (err) throw err;
        res.end(JSON.stringify(rows));
    });
});

//fonction permettant de delete une personne
app.delete('/deletePersonne/:id', function(req, res) {
    console.log(req.params.id);
    mysqlConnection.query('DELETE FROM Personne WHERE idPersonne=?', [req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.end("record deleted!!!");
    });
});

module.exports = app;