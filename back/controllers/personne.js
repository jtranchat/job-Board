const mysql = require('mysql'); 

const mysqlConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST ,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

exports.loginPersonne = (req, res) => {
    mysqlConnection.query("SELECT idPersonne FROM Personne WHERE identifiant= ? AND motDePasse= ?\
    ", [req.params.identifiant, req.params.motDePasse], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    });
}

exports.personne = (req, res) => {
    mysqlConnection.query("SELECT idPersonne FROM Personne WHERE mail=?", [req.params.mail], function(err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    });
}

exports.addPersonne = (req, res) => {
    let data = req.body;
    mysqlConnection.query('INSERT INTO Personne SET ?', data, function(err, rows, fields) {
        console.log(res.end(JSON.stringify(rows)));
        res.end(JSON.stringify(rows));
    });
}

exports.updatePersonne = (req, res) => {
    data = req.body;
    mysqlConnection.query('UPDATE Personne SET nom = ?, prenom= ?, sexe= ?, telephone= ?, identifiant= ?, motDePasse= ?, status= ? WHERE\
     mail= ?', [data.nom, data.prenom, data.sexe, data.telephone, data.identifiant, data.motDePasse, data.status, req.params.mail], function(err, rows, fields) {
        if (err) throw err;
        res.end(JSON.stringify(rows));
     });
}

exports.deletePersonne = (req, res) => {
    mysqlConnection.query('DELETE FROM Personne WHERE idPersonne=?', [req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.end(JSON.stringify(rows));
    });
}

