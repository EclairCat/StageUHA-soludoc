//Imports
var db = require("../db");
var bcrypt= require("bcrypt");

module.exports = {
    //Cherche le medecin en fonction de son ID
    getSpe: function (req, res) {
        //Params
        var id = req.params.id;
        var sql = "SELECT * FROM `t_specialite_enum` WHERE id = " + id;
        console.log(sql);


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
                res.status("500").json();

            }
            else {


                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query");
                            console.log("query : [ " + sql + " ]");
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query");
                            res.json(rows);
                            res.status("200").json();

                        }
                    });
            }
        });
    }, //Fonctionel

    getAllSpe: function (req, res) {
        //Params
        var sql = "SELECT * FROM `t_specialite_enum`";
        console.log(sql);


        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
                res.status("500").json();

            }
            else {


                db.query(sql, //changer la requete
                    function (error, rows, fields) {
                        tempCo.release();
                        if (!!error) {
                            console.log("error in query");
                            console.log("query : [ " + sql + " ]");
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query");
                            res.json(rows);

                        }
                    });
            }
        });
    }, //Fonctionel
}