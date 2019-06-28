//Imports
var db = require("../db");
var bcrypt= require("bcrypt");

module.exports = {
    //Cherche le medecin en fonction de son ID
    getSpe: function (req, res) {
        //Params
        var id = req.params.id;
        var sql = "SELECT * FROM `t_specialite_enum` WHERE id_specialite = " + id;


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                res.status(500).send("Error connection to database");
            }
            else {


                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query GetSpecialiteById");
                            console.log(error.message);
                            res.status(500).send("Error in query");
                        }
                        else {
                            console.log("Success query");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    }, 

    //Renvoie toute les Specialite.
    getAllSpe: function (req, res) {
        //Params
        var sql = "SELECT * FROM `t_specialite_enum`";
        console.log(sql);


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                res.status("500").send("Error connection to database");
            }
            else {
                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query");
                            console.log(error.message);
                            res.status(500).send("Error in query")

                        }
                        else {
                            console.log("Success query");
                            res.status(200).json(rows);
                        }
                    });
            }
        });
    }, //Fonctionel
}