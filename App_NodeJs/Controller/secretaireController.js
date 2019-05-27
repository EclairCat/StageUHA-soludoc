//Imports
var db = require("../db");
var bcrypt = require("bcrypt");
var hashpassword = require('../passwordHash');

module.exports = {

    //Inscription
    addSecretariat: function (req, res) {

        //Params
        var email = req.body.email;
        var mdp = req.body.mdp; //<= A crypter
        var id_m = req.body.id_medecin;


        var sql = 'INSERT INTO t_secretaire (email, mdp, id_medecin) VALUES ';


        if (email != null && mdp != null) {
            hashpassword(mdp, function (err, hashedMdp) {
                if (err) {
                    console.log();
                }
                else {
                    sql = sql + '("' + email + '","' + hashedMdp + '","' + id_m + '")';
                    db.getConnection(function (err, tempCo) {
                        if (!!err) {
                            console.log("error in connection");
                            tempCo.release();
                            res.status("500").json();

                        }
                        else {
                            db.query(sql, function (error, rows, fields) {
                                tempCo.release();
                                if (!!error) {
                                    console.log("error in query AddSecretariat");
                                    console.log(error);
                                    res.status("500").json();

                                }
                                else {
                                    console.log("Success query AddSecretariat");
                                    res.status("200").json();

                                }
                            });
                        }
                    });
                }

            });
        }


    },

    //Modif Profil
    editSecretariat: function (req, res) {

        //Params
        var email = req.body.email;
        var mdp = req.body.mdp; // <= a crypter


        var sql = 'UPDATE t_secretaire ';

        db.getConnection(function (err, tempCo) {
            if (!!err) {
                console.log("error in connection");
                tempCo.release();
                res.status("500").json();

            }
            else {
                //Mdp
                if (mdp != null && mdp != "") {
                    hashpassword(mdp, function (err, hashedMdp) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            db.query(sql + 'SET mdp = "' + hashedMdp + '" WHERE email = "' + email + '"',
                                function (error, rows, fields) {
                                    if (!!error) {
                                        console.log("error in query mdp");
                                        console.log(error);
                                        res.status("500").json();

                                    }
                                    else {
                                        console.log("Success query mdp");
                                        res.status("200").json();

                                    }
                                });
                        }

                    });

                }
                //FIN MODIF 
                tempCo.release();

            }
        });
    },

    //Suppression du compte
    deleteSecretariat: function (req, res) {

        //Params
        var id = req.body.id;

        var sql = 'DELETE FROM t_secretaire WHERE id = ' + id;

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
                            console.log("error in query DeleteSecretariat");
                            console.log(error);
                            res.status("500").json();

                        }
                        else {
                            console.log("Success query | Delete Success");
                            res.status("200").json();

                        }
                    });
            }
        });
    },

    login: function (req, res) {
        //Params
        var email = req.params.email;
        var mdp = req.params.mdp;
        var sql = "SELECT * FROM `t_secretaire` WHERE email = '" + email + "'";


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
                            if (rows.length != 0) {
                                bcrypt.compare(mdp, rows[0].mdp, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        if (!result) {
                                            res.json(result);
                                        }
                                        else {
                                            res.json(rows);
                                        }
                                    }
                                })
                            }
                            else {
                                res.json(false);
                            }


                        }
                    });
            }
        });
    }, //Fonctionel


}