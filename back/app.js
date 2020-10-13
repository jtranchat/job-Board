const mysql = require('mysql');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
var app = express();
const bodyparser = require('body-parser');

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
        mysqlConnection.query('SELECT Annonce.idAnnonce, Annonce.nom, Annonce.description, Annonce.salaires,Annonce.Contrat, Entreprise.nomEntreprise AS nomEntreprise \
        FROM Annonce INNER JOIN Entreprise ON Annonce.idEntreprise = Entreprise.idEntreprise WHERE idAnnonce =' 
        + req.params.id, function(err, rows, fields) {
            if (err) throw err;
            res.status(200).json(rows);
    });
});

//récupérer les annonces 
app.get("/annonce", (req, res, next) => {
    mysqlConnection.query('SELECT Annonce.idAnnonce, Annonce.description, Entreprise.nomEntreprise AS nomEntreprise FROM Annonce INNER JOIN Entreprise ON \
    Annonce.idEntreprise = Entreprise.idEntreprise' , function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    })
})

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
    mysqlConnection.query('DELETE FROM Personne WHERE idPersonne=?', [req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.end(JSON.stringify(rows));
    });
});

//fonction permettant de modifier l'identifiant et le mot de passe d'une personne
app.put('/updateIdentifiant/:id', function(req, res) {
    mysqlConnection.query('UPDATE Personne SET identifiant= ?, motDePasse= ? WHERE idPersonne = ?', [req.body.identifiant, req.body.motDePasse,req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.end(JSON.stringify(rows));
    });
});

//fonction permettant de stocker les données d'une candidature
app.post('/candidature', function(req, res) {
    let data = req.body;
    mysqlConnection.query('SELECT idPersonne FROM Personne WHERE nom=? AND prenom=?', [data.lname, data.fname], function(err, rows, fields) {
        if(err) throw err;
        res.status(200).json(rows);
    }) 
});

module.exports = app;