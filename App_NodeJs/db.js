//Connection a la Base de Donnée

var mysql = require('mysql');
var connection = mysql.createPool({
    //connectionLimit : 50  //<= limite de connection par sec a la bdd
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'solucdocteur_db'
});

module.exports = connection;