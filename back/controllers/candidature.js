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

exports.candidature = (req, res) => {
    let data = req.body;
    mysqlConnection.query("INSERT INTO Candidature SET idAnnonce= ?, \
    idPersonne= ?, contenuMail= ?", [data.idAnnonce, data.idPersonne, data.message], function(err, rows, fiels) {
        if (err) throw err;
        res.end(JSON.stringify(rows));
    });
}
