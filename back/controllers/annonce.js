const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env'});

const mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

exports.information = (req, res) => {
    mysqlConnection.query('SELECT Annonce.idAnnonce, Annonce.nom, Annonce.description, Annonce.salaires,Annonce.Contrat, Entreprise.nomEntreprise AS nomEntreprise \
    FROM Annonce INNER JOIN Entreprise ON Annonce.idEntreprise = Entreprise.idEntreprise WHERE idAnnonce =' 
    + req.params.id, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    });
}

exports.annonce = (req, res) => {
    mysqlConnection.query('SELECT Annonce.idAnnonce, Annonce.description, Entreprise.nomEntreprise AS nomEntreprise FROM Annonce INNER JOIN Entreprise ON \
    Annonce.idEntreprise = Entreprise.idEntreprise' , function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    });
}
