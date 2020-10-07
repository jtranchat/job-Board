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

//recuperer les information d'une annonce specifique
app.get("/information/:id", (req, res, next) => {
    console.log("idAnnonce =" + req.params.id)
        mysqlConnection.query('SELECT Annonce.nom, Annonce.description, Annonce.place, Annonce.salaires, Annonce.tempDeTravailParSemaine, Annonce.contrat, Entreprise.nomEntreprise AS nomEntreprise, Entreprise.localisation AS localisation, Entreprise.activites AS activites FROM Annonce INNER JOIN Entreprise ON Annonce.idEntreprise = Entreprise.idEntreprise WHERE idAnnonce =' + req.params.id, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
      });
  });

//fonction permettant de lire la base de données
//récupérer une ou plusieurs personne personne
app.get('/personne/:id', (req, res) => {
    if(req.params.id == 0)
    {
        mysqlConnection.query('SELECT * FROM Personne', (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        });
    } else {
        mysqlConnection.query('SELECT * FROM Personne WHERE idPersonne = ?', [req.params.id], (err, rows, fields) => {
            if (!err)
                res.send(rows);
            else
                console.log(err);
        });
    }
});

module.exports = app;